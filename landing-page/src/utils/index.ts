import type { FieldValues, FieldErrors } from "react-hook-form";

export function getError<T extends FieldValues>(error: FieldErrors<T>) {
  return (key: keyof T) => error[key]?.message;
}

//write a function to covert this plain time 13:43:33.949120 to a more appeal one like this 1:43 AM

export function convertTime(time: string) {
  const [hour, minute, second] = time.split(":");
  const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
  const convertedHour = parseInt(hour) % 12 || 12;
  return `${convertedHour}:${minute} ${ampm}`;
}