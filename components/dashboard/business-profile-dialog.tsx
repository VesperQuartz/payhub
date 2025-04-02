"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronRight, Loader } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusinessProfileStore, useUserInfoStore } from "@/app/store";
import {
  useAddBusiness,
  useGetBusinessByMerchantAddress,
} from "@/app/hooks/api";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

const businessCategories = [
  { value: "retail", label: "Retail" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" },
  { value: "real_estate", label: "Real Estate" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel & Hospitality" },
  { value: "professional_services", label: "Professional Services" },
  { value: "construction", label: "Construction" },
  { value: "automotive", label: "Automotive" },
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "beauty", label: "Beauty & Wellness" },
  { value: "other", label: "Other" },
];

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessType: z.string().min(2, {
    message: "Business type must be at least 2 characters.",
  }),
  businessCategory: z.string({
    required_error: "Please select a business category.",
  }),
  businessDescription: z.string({
    required_error: "Please select a business category.",
  }),
  businessWebsite: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export const BusinessProfileDialog = () => {
  const [open, setOpen] = React.useState(true);
  const { hasSetupProfile, setProfile } = useBusinessProfileStore();
  const business = useAddBusiness();
  const { address } = useAccount();
  const user = useUserInfoStore();
  const businessProfile = useGetBusinessByMerchantAddress(address!);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: user.payload?.businessName ?? "",
      businessType: "",
      businessCategory: "",
      businessWebsite: "",
      businessDescription: "",
    },
  });

  React.useEffect(() => {
    if (businessProfile?.data) {
      setProfile(businessProfile.data);
    }
  }, [businessProfile?.data, setProfile]);

  function onSubmit(data: FormValues) {
    if (!address) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    business.mutate(
      { ...data, merchantAddress: address },
      {
        onSuccess: (data) => {
          setProfile(data);
          setOpen(false);
          toast.success("Business profile created successfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  if (
    hasSetupProfile ||
    !address ||
    businessProfile?.data ||
    businessProfile.isLoading ||
    businessProfile.isPending
  ) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[600px] border-[#00E676]/30 bg-black h-[500px] overflow-y-auto"
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-white">
            Set Up Your Business Profile
          </DialogTitle>
          <DialogDescription className="text-lg text-center">
            Tell us a little about your business so we can tailor to your
            experience
          </DialogDescription>
        </DialogHeader>
        <div className="mt-1 bg-black/50 p-6 rounded-lg border border-[#00E676]/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business name"
                        className={`bg-black border-[#00E676]/30 focus:border-[#00E676] text-white ${
                          form.formState.errors.businessName
                            ? "border-red-500"
                            : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Business Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Retail, Service, Manufacturing"
                        className={`bg-black border-[#00E676]/30 focus:border-[#00E676] text-white ${
                          form.formState.errors.businessType
                            ? "border-red-500"
                            : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Business category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`bg-black border-[#00E676]/30 focus:border-[#00E676] text-white ${
                            form.formState.errors.businessCategory
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Select a business category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 text-white border-neutral-800">
                        {businessCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                            className="hover:bg-neutral-800 focus:bg-neutral-800"
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Business Website (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        className={`bg-black border-[#00E676]/30 focus:border-[#00E676] text-white ${
                          form.formState.errors.businessWebsite
                            ? "border-red-500"
                            : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your business"
                        className={`bg-black border-[#00E676]/30 focus:border-[#00E676] text-white ${
                          form.formState.errors.businessDescription
                            ? "border-red-500"
                            : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full mt-4 bg-[#FF6B00] hover:bg-[#E05E00] text-white py-6 h-auto rounded-md flex items-center justify-center transition-colors"
          disabled={form.formState.isSubmitting}
        >
          {business.isPending ? <Loader className="animate-spin" /> : "Save"}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
