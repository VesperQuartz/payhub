"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAddCategory } from "@/app/hooks/api";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
}: AddCategoryDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { address } = useAccount();
  const category = useAddCategory();
  const queryClient = useQueryClient();

  const onSubmit = (data: FormValues) => {
    const value = data.name.toLowerCase().replace(/\s+/g, "_");
    category.mutate(
      { name: value, merchantAddress: address! },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
          queryClient.invalidateQueries({
            queryKey: ["category", address],
          });
          queryClient.invalidateQueries({
            queryKey: ["product-category", address],
          });
          toast.success("Category added successfully.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Category
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Create a new category to organize your products.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      className="bg-neutral-900 border-neutral-800 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-neutral-800 text-white hover:bg-neutral-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#FF6B00] hover:bg-[#E05E00]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
