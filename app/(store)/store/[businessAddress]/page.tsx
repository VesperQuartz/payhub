"use client";

import React, { useState } from "react";
import {
  MapPin,
  Star,
  ChevronRight,
  Send,
  Stars,
  Loader2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import {
  useAddReview,
  useGetProductReview,
  useGetStoreProduct,
} from "@/app/hooks/api";
import { SelectProduct } from "@/app/database/schema";
import Image from "next/image";
import { useAccount } from "wagmi";
import { usePaymentInfoStore } from "@/app/store";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toEthAddress } from "@/lib/utils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const BusinessPage = () => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [selectedProduct, setSelectedProduct] = useState<SelectProduct | null>(
    null,
  );
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("products");
  const { businessAddress } = useParams<{
    businessAddress: `0x${string}`;
  }>();
  const business = useGetStoreProduct().data?.find(
    (store) => store.merchantAddress === businessAddress,
  );

  const handleSelectProduct = (product: SelectProduct) => {
    setSelectedProduct(product);
  };
  const paymentInfo = usePaymentInfoStore();
  const router = useRouter();

  const handleProcedPayment = () => {
    if (selectedProduct) {
      paymentInfo.setProduct(selectedProduct);
      paymentInfo.setBusiness({
        name: business!.businessName,
        address: businessAddress!,
      });
      router.push("/store/payment/connect");
    }
  };
  const queryClient = useQueryClient();

  const productReview = useGetProductReview(businessAddress);
  const review = useAddReview();
  const ratings = React.useMemo(
    () => productReview.data?.reviews?.map((rev) => rev.ratings),
    [productReview.data?.reviews],
  );
  const groupRatings = React.useMemo(() => {
    let temp = [0, 0];
    const map = new Map();
    ratings?.forEach((rating) => {
      if (map.has(rating)) {
        map.set(rating, map.get(rating) + 1);
      } else {
        map.set(rating, 1);
      }
    });
    for (const [x, y] of map) {
      temp = [(temp[0] += x * y), (temp[1] += y)];
    }
    return temp[0] / temp[1];
  }, [ratings]);
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.warning("Please rate the business");
      return;
    }
    review.mutate(
      {
        ratings: rating,
        review: comment,
        walletAddress: address!,
        merchantAddress: businessAddress!,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully");
          setRating(0);
          setComment("");
          queryClient.invalidateQueries({
            queryKey: ["review", businessAddress],
          });
        },
        onError: () => {
          toast.error("Failed to submit review - You can only rate once");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden bg-white">
              <Image
                width={500}
                height={500}
                src={business?.image || "/placeholder.svg"}
                alt={business?.businessName ?? "Business Image"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">
              {business?.businessName}
            </h1>
            <div className="inline-block px-3 py-1 bg-neutral-900 rounded-full text-white text-sm mb-4">
              {business?.businessCategory}
            </div>

            <p className="text-neutral-300 mb-6">
              {business?.businessDescription}
            </p>

            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center">
                <MapPin size={18} className="text-neutral-400 mr-2" />
                <span>{"NA"}</span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="text-emerald-400 mr-2" />
                <span className="flex items-center">
                  {String(isNaN(groupRatings) ? 0 : groupRatings) ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Tabs
            defaultValue="products"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-neutral-900 border-b border-neutral-800 w-full justify-start">
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-emerald-400 data-[state=active]:text-white rounded-none"
              >
                Products & Services
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-emerald-400 data-[state=active]:text-white rounded-none"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-emerald-400 data-[state=active]:text-white rounded-none"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {business?.product?.map((product) => (
                  <div
                    key={product.id}
                    className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors cursor-pointer"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.productName}</h3>
                        <p className="text-sm text-neutral-400">
                          {product.productDescription}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${product.productPrice.toFixed(2)} PYUSD
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  About {business?.businessName}
                </h2>
                <p className="text-neutral-300">
                  {business?.businessDescription}
                </p>
                <div className="space-y-2">
                  <h3 className="font-medium">Contact Information</h3>
                  <p>Phone: 000-000-000</p>
                  <p>
                    Website:{" "}
                    <a
                      href={business?.businessWebsite ?? "N/A"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      {business?.businessWebsite?.replace(/http(s)?:\/\//, "")}
                    </a>
                  </p>
                  <p>Address: {"N/A"}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Card className="mb-8 bg-zinc-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label
                          htmlFor="rating"
                          className="block mb-2 text-white"
                        >
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <Stars
                                className={`w-8 h-8 ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-zinc-500"}`}
                              />
                              <span className="sr-only">Rate {star} stars</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="comment"
                          className="block mb-2 text-white"
                        >
                          Your Review
                        </label>
                        <Textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience..."
                          className="min-h-[100px] bg-zinc-900 border-zinc-700 text-white placeholder:text-white"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {review.isPending ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          "Submit Review"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                {(productReview.data?.reviews?.length ?? 0 > 0) ? (
                  <div className="space-y-4">
                    {productReview.data?.reviews?.map((review) => (
                      <Card
                        key={review.id}
                        className="bg-zinc-800 border-zinc-700"
                      >
                        <CardContent className="pt-6">
                          <div className="flex flex-col sm:flex-row justify-between mb-2">
                            <div>
                              <p className="text-xs text-zinc-400 font-mono">
                                {toEthAddress(review.walletAddress ?? "0x0")}
                              </p>
                            </div>
                            <div className="flex mt-2 sm:mt-0">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.ratings ? "fill-yellow-400 text-yellow-400" : "text-zinc-500"}`}
                                />
                              ))}
                              <span className="text-xs text-zinc-400 ml-2 self-center">
                                {review.createdAt}
                              </span>
                            </div>
                          </div>
                          <p className="text-zinc-300 mt-2">{review.review}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-zinc-400">
                    Reviews will be displayed here.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {selectedProduct && (
          <div className="border border-emerald-800/30 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">Selected Item</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">{selectedProduct.productName}</p>
              </div>
              <div>
                <p className="font-medium">
                  ${selectedProduct.productPrice.toFixed(2)} PYUSD
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-400">
                Your Wallet is not connected, please connect to continue with
                the payment
              </p>
              <Button
                className="bg-[#FF6B00] hover:bg-[#E05E00]"
                disabled={!address}
                onClick={handleProcedPayment}
              >
                Proceed to Payment
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPage;
