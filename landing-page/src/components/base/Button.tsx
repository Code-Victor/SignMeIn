import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv(
  {
    base: "flex justify-center font-medium rounded-full active:opacity-80",
    variants: {
      color: {
        primary: "bg-primary text-white",
        light: "bg-white text-primary",
      },
      size: {
        sm: "text-sm px-3 py-1",
        md: "text-base px-3 py-2",
        lg: "px-4 py-3 text-lg",
      },
      outline: {
        true: "border-2 bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
    compoundVariants: [
      {
        color: "primary",
        outline: true,
        class: "text-[#663ed6!important] border-primary bg-transparent",
      },
      {
        color: "light",
        outline: true,
        class: "border-white  text-white",
      },
    ],
  },
  {
    responsiveVariants: true,
  }
);

type Modify<T, R> = Omit<T, keyof R> & R;

export interface ButtonProps
  extends Modify<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button>
  > {}

function Button({ size, color, className, outline, ...props }: ButtonProps) {
  return (
    <button
      className={button({ size, color, className, outline })}
      {...props}
    />
  );
}

export default Button;
