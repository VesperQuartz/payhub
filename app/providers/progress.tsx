"use client";
import React from "react";
import { ProgressProvider } from "@bprogress/next/pages";

export const ProgressProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <ProgressProvider
        height="4px"
        color="#FF6B00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
