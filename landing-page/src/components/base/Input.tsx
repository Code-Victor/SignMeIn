import { useId } from "react";

function Input({
  label,
  error,
  ...others
}: { label: string; error?: string } & JSX.IntrinsicElements["input"]) {
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
        />
        <span className="text-red-500 text-sm font-the">{error}</span>
      </div>
    </div>
  );
}

export default Input;
