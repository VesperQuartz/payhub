"use client";
import React from "react";
import { ProgressProvider } from "@bprogress/next/app";

export const ProgressProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ProgressProvider
        height="4px"
        color="#FF6B00"
        options={{ showSpinner: true }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </>
  );
};
