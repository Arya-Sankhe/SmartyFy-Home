import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,color,box-shadow,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_12px_30px_hsl(235_40%_18%_/_0.28)] hover:-translate-y-0.5 hover:bg-primary/92",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_10px_24px_hsl(212_100%_60%_/_0.24)] hover:-translate-y-0.5 hover:bg-secondary/90",
        ghost: "bg-transparent text-foreground hover:-translate-y-0.5 hover:bg-white/10",
        outline:
          "border border-border bg-white/8 text-foreground hover:-translate-y-0.5 hover:bg-white/12",
        glass:
          "border border-white/18 bg-white/10 text-white shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px] hover:-translate-y-px hover:bg-white/20 hover:shadow-[0_12px_36px_rgba(31,38,135,0.24)]",
        "glass-outline":
          "border border-white/18 bg-white/6 text-white shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px] hover:-translate-y-px hover:bg-white/20 hover:shadow-[0_12px_36px_rgba(31,38,135,0.24)]",
        "glass-ghost":
          "border border-transparent bg-transparent text-white/88 hover:-translate-y-px hover:border-white/14 hover:bg-white/16 hover:shadow-[0_10px_30px_rgba(31,38,135,0.18)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
