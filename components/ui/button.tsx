import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Heavily customised shadcn button.
 * Squared corners, uppercase tracking, and brand colours — nothing default.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-navy text-offwhite hover:bg-brown",
        accent: "bg-brown text-offwhite hover:bg-navy",
        outline:
          "border border-navy/30 text-navy hover:border-brown hover:text-brown",
        ghost: "text-navy hover:text-brown",
        light: "bg-offwhite text-navy hover:bg-cream",
      },
      size: {
        default: "h-14 px-9",
        sm: "h-11 px-6",
        lg: "h-16 px-12 text-sm",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
