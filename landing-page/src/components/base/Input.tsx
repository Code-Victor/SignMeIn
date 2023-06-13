import { useId, forwardRef } from "react";

type Props = { label: string; error?: string } & JSX.IntrinsicElements["input"];
const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, ...others },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium ">
        {label}
      </label>
      <div>
        <input
          className="rounded-full border-2 border-gray-300 p-2 w-full"
          placeholder={`Enter ` + label.toLowerCase()}
          id={id}
          {...others}
          ref={ref}
        />
        <span className="text-red-500 text-sm font-the">{error}</span>
      </div>
    </div>
  );
});

export default Input;
