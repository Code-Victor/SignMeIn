import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
  variants: {
    color: {
      primary: "bg-primary text-white",
      light: "bg-white text-primary",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type Modify<T, R> = Omit<T, keyof R> & R;

export interface ButtonProps
  extends Modify<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button>
  > {}

function Button({ size, color, className, ...props }: ButtonProps) {
  return <button className={button({ size, color, className })} {...props} />;
}

export default Button;
