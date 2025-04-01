"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, Plus } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ProductTable,
  getProductColumns,
} from "@/components/products/product-table";
import {
  InventoryTable,
  getInventoryColumns,
} from "@/components/products/inventory-table";
import { CategoryCard } from "@/components/products/category-card";
import { AddCategoryDialog } from "@/components/products/add-category-dialog";
import {
  useAddProduct,
  useAllCategoryProduct,
  useDeleteProductById,
  useGetProductByMerchantAddress,
  useUpdateProduct,
} from "@/app/hooks/api";
import { useAccount } from "wagmi";
import { SelectProduct } from "@/app/database/schema";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Product schema for form validation
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.string({
    required_error: "Please select a product category.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState<
    "products" | "inventory" | "categories"
  >("products");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SelectProduct | null>(
    null,
  );

  const { address } = useAccount();
  const products = useGetProductByMerchantAddress(address!);
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProductById();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: "",
      stock: undefined,
    },
  });

  function onSubmit(data: ProductFormValues) {
    if (editingProduct) {
      updateProduct.mutate(
        {
          id: editingProduct.id,
          productName: data.name,
          productDescription: data.description,
          productPrice: data.price,
          productCategory: data.category,
          stock: data.stock,
          merchantAddress: address!,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["product", address!],
            });
            queryClient.invalidateQueries({
              queryKey: ["product-category", address!],
            });
            toast.success("Product updated successfully");
            setEditingProduct(null);
            form.reset();
          },
        },
      );
    } else {
      addProduct.mutate(
        {
          productName: data.name,
          productDescription: data.description,
          productPrice: data.price,
          productCategory: data.category,
          stock: data.stock,
          merchantAddress: address!,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["product", address!],
            });
            queryClient.invalidateQueries({
              queryKey: ["product-category", address!],
            });
            toast.success("Product added successfully");
            setIsAddProductOpen(false);
            form.reset();
          },
        },
      );
    }
  }

  const categories = useAllCategoryProduct(address!);
  const handleEditProduct = (product: SelectProduct) => {
    setEditingProduct(product);
    form.reset({
      name: product.productName,
      description: product.productDescription,
      price: product.productPrice,
      category: product!.productCategory!,
      stock: product.stock,
    });
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = (product: SelectProduct) => {
    if (
      window.confirm(`Are you sure you want to delete ${product.productName}?`)
    ) {
      deleteProduct.mutate(product.id);
    }
  };

  const handleUpdateStock = (product: SelectProduct, newStock: number) => {
    updateProduct.mutate(
      {
        id: product.id,
        stock: newStock,
        merchantAddress: address!,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["product", address!],
          });
          toast.success("Stock updated successfully");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-auto pb-2">
        <Button
          variant={activeTab === "products" ? "outline" : "ghost"}
          className={
            activeTab === "products"
              ? "rounded-full bg-neutral-900 text-white"
              : "rounded-full text-neutral-400"
          }
          onClick={() => setActiveTab("products")}
        >
          All Products
        </Button>
        <Button
          variant={activeTab === "inventory" ? "outline" : "ghost"}
          className={
            activeTab === "inventory"
              ? "rounded-full bg-neutral-900 text-white"
              : "rounded-full text-neutral-400"
          }
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </Button>
        <Button
          variant={activeTab === "categories" ? "outline" : "ghost"}
          className={
            activeTab === "categories"
              ? "rounded-full bg-neutral-900 text-white"
              : "rounded-full text-neutral-400"
          }
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </Button>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-black p-6">
        {activeTab === "products" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <p className="text-neutral-400">
                Manage your products and services that customers can pay for
                with PYUSD
              </p>
            </div>

            <div className="mb-6 flex justify-end">
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  form.reset({
                    name: "",
                    description: "",
                    price: undefined,
                    category: "",
                    stock: undefined,
                  });
                  setIsAddProductOpen(true);
                }}
                className="bg-[#FF6B00] hover:bg-[#E05E00]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <ProductTable
              columns={getProductColumns(
                handleEditProduct,
                handleDeleteProduct,
              )}
              data={products.data ?? []}
            />
          </>
        )}

        {activeTab === "inventory" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Inventory Management</h2>
              <p className="text-neutral-400">
                Track and update your product stock levels
              </p>
            </div>

            <InventoryTable
              columns={getInventoryColumns(handleUpdateStock)}
              data={products.data ?? []}
              onUpdateStock={handleUpdateStock}
            />
          </>
        )}

        {activeTab === "categories" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Product Categories</h2>
              <p className="text-neutral-400">
                Organize your products into categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.data?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}

              <div
                className="rounded-lg border border-neutral-800 bg-black p-6 flex flex-col items-center justify-center cursor-pointer hover:border-neutral-700 transition-colors"
                onClick={() => setIsAddCategoryOpen(true)}
              >
                <div className="bg-neutral-900 rounded-full p-4 mb-4">
                  <Plus className="h-6 w-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Add Category</h3>
                <p className="text-neutral-400 text-center">
                  Create a new category to organize your products
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-neutral-800 text-white hover:bg-neutral-800 bg-[#FF6B00] hover:text-white"
                  onClick={() => setIsAddCategoryOpen(true)}
                >
                  New Category
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px] bg-black border-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              {editingProduct
                ? "Update the details of your product."
                : "Fill in the details below to add a new product to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        className="bg-neutral-900 border-neutral-800 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Product Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="bg-neutral-900 border-neutral-800 text-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-neutral-900 border-neutral-800 text-white pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter stock quantity"
                          className="bg-neutral-900 border-neutral-800 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 text-white border-neutral-800">
                        {categories.data?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name}
                            className="text-white hover:bg-neutral-800 hover:text-white"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="border-neutral-800 text-white hover:bg-neutral-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF6B00] hover:bg-[#E05E00]"
                  disabled={form.formState.isSubmitting}
                >
                  {addProduct.isPending || updateProduct.isPending ? (
                    editingProduct ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Loader className="animate-spin" />
                    )
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <AddCategoryDialog
        open={isAddCategoryOpen}
        onOpenChange={setIsAddCategoryOpen}
      />
    </div>
  );
};

export default ProductsPage;
