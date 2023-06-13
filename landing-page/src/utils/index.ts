import type { FieldValues, FieldErrors } from "react-hook-form";

export function getError<T extends FieldValues>(error: FieldErrors<T>) {
  return (key: keyof T) => error[key]?.message;
}
