"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterWalletButton } from "@/components/register-wallet-button";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useRegister } from "@/app/hooks/api";
import { useUserInfoStore } from "@/app/store";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const MerchantSignup = () => {
  const { address } = useAccount();
  const register = useRegister();
  const user = useUserInfoStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!address) {
      toast.warning("Please connect your wallet first.");
      return;
    }
    console.log(values, address);
    register.mutate(
      {
        role: "merchant",
        businessName: values.businessName,
        email: values.email,
        walletAddress: address!,
      },
      {
        onSuccess: (data) => {
          user.setUserInfo(data);
          toast.success("Account created successfully.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Create Your Account
        </h1>
        <p className="text-neutral-300 text-lg">
          Accept PYUSD Payments with zero hassle. Fast, secure, and low-cost
          transactions
        </p>
      </div>

      <div className="w-full max-w-md relative mb-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FF6B00] via-black to-[#00E676] p-[1px]"></div>

        <div className="relative bg-black rounded-lg p-6">
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
                        placeholder="Your business name"
                        className="bg-black/50 border-neutral-800 text-white focus:ring-[#FF6B00]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF6B00]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        className="bg-black/50 border-neutral-800 text-white focus:ring-[#FF6B00]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF6B00]" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="text-white mt-2">
            <p>Wallet connection</p>
            <RegisterWalletButton />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-full bg-[#FF6B00] hover:bg-[#E05E00] text-white py-6 h-auto rounded-md flex items-center justify-center transition-colors"
        >
          {register.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Sign Up"
          )}{" "}
          <span className="ml-2 text-xl">›</span>
        </Button>
      </div>
    </div>
  );
};

export default MerchantSignup;
