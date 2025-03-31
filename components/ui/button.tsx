import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-orange-500 text-white shadow-xs hover:bg-orange-600 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600 dark:shadow-md dark:hover:shadow-lg",
        destructive:
          "bg-red-500 text-white shadow-xs hover:bg-red-600 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500 dark:hover:bg-red-600 dark:shadow-md dark:hover:shadow-lg",
        outline:
          "border border-gray-700 bg-transparent text-gray-300 shadow-xs hover:bg-gray-800 hover:text-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:shadow-md dark:hover:shadow-lg",
        secondary:
          "bg-gray-900 text-white shadow-xs hover:bg-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:shadow-md dark:hover:shadow-lg",
        ghost:
          "hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-md",
        link: "text-orange-500 underline-offset-4 hover:underline dark:text-orange-500 dark:hover:text-orange-400",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
