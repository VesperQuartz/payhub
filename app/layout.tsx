import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@bprogress/core/css";
import { AsyncProvider } from "./providers/async-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { ProgressProviders } from "./providers/progress";

const space = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAYHUB - Instant and Secure Payments",
  description:
    "Accept PYUSD payments, track sales, and protect purchases effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${space.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <AsyncProvider>
              <ProgressProviders>{children}</ProgressProviders>
            </AsyncProvider>
          </NuqsAdapter>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
