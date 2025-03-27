import {
  InsertBusinessProfile,
  InsertCategory,
  InsertProduct,
  InsertTransaction,
  InsertUser,
  SelectBusinessProfile,
  SelectCategory,
  SelectProduct,
  SelectTransaction,
  SelectUser,
  StoreInfoProduct,
  UpdateProduct,
} from "@/app/database/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { to } from "await-to-ts";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: InsertUser) => {
      const [error, response] = await to(
        ky.post("/api/register", {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectUser>();
    },
  });
};

export const useGetUserByWalletAddress = (
  walletAddress: `0x${string}` | null,
) => {
  return useQuery({
    queryKey: ["user", walletAddress],
    queryFn: async () => {
      const [error, response] = await to(ky.get(`/api/user/${walletAddress}`));
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectUser>();
    },
    enabled: !!walletAddress,
  });
};

export const useAddBusiness = () => {
  return useMutation({
    mutationKey: ["add-business"],
    mutationFn: async (payload: InsertBusinessProfile) => {
      const [error, response] = await to(
        ky.post("/api/business", {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectBusinessProfile>();
    },
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (payload: InsertProduct) => {
      const [error, response] = await to(
        ky.post("/api/product", {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<{ message: string }>();
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: async (payload: UpdateProduct) => {
      const [error, response] = await to(
        ky.put(`/api/product/${payload.id}`, {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<{ message: string }>();
    },
  });
};

export const useGetProductByMerchantAddress = (
  merchantAddress: `0x${string}`,
) => {
  return useQuery({
    queryKey: ["product", merchantAddress],
    queryFn: async () => {
      const [error, response] = await to(
        ky.get(`/api/product/${merchantAddress}`),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectProduct[]>();
    },
    enabled: !!merchantAddress,
  });
};

export const useDeleteProductById = () => {
  return useMutation({
    mutationKey: ["product-delete"],
    mutationFn: async (id: number) => {
      const [error, response] = await to(ky.delete(`/api/product/${id}`));
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<{ message: string }>();
    },
  });
};

export const useGetCategoryByMerchantAddress = (
  merchantAddress: `0x${string}`,
) => {
  return useQuery({
    queryKey: ["category", merchantAddress],
    queryFn: async () => {
      const [error, response] = await to(
        ky.get(`/api/category/${merchantAddress}`),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectCategory[]>();
    },
  });
};

export const useAddCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (payload: InsertCategory) => {
      const [error, response] = await to(
        ky.post("/api/category", {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectCategory>();
    },
  });
};

export const useAddTransaction = () => {
  return useMutation({
    mutationKey: ["transaction"],
    mutationFn: async (payload: InsertTransaction) => {
      const [error, response] = await to(
        ky.post("/api/transaction", {
          json: payload,
        }),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectTransaction>();
    },
  });
};

export const useGetTransactionByMerchantAddress = (
  merchantAddress: `0x${string}`,
) => {
  return useQuery({
    queryKey: ["transaction", merchantAddress],
    queryFn: async () => {
      const [error, response] = await to(
        ky.get(`/api/transaction/${merchantAddress}`),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectTransaction[]>();
    },
  });
};

export const useGetTransactionByCustomerAddress = (
  customerAddress: `0x${string}`,
) => {
  return useQuery({
    queryKey: ["transaction", customerAddress],
    queryFn: async () => {
      const [error, response] = await to(
        ky.get(`/api/transaction/users/${customerAddress}`),
      );
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<SelectTransaction[]>();
    },
  });
};
export const useGetStoreProduct = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const [error, response] = await to(ky.get("/api/store"));
      if (error instanceof HTTPError) {
        const message = await error.response.json();
        console.log(message);
        throw new Error(message.error);
      }
      return response.json<StoreInfoProduct[]>();
    },
  });
};
