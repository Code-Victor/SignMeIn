import React, { useId } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues, FieldErrors } from "react-hook-form";
import { Button, Input } from "../base";

interface SignupInput {
  name: String;
  email: String;
  address: String;
  description: String;
  workers: Number;
  password: String;
}

function getError<T extends FieldValues>(error: FieldErrors<T>) {
  return (key: keyof T) => error[key]?.message;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>();
  const err = getError(errors);
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex w-full flex-col gap-3 mb-8"
    >
      <Input label="Name of Organisation" {...register("name")} />
      <Input label="Organisation email" type={"email"} {...register("email")} />
      <Input label="Organisation Address" {...register("address")} />
      <Input label="Organisation Description" {...register("description")} />
      <Input label="Number of Workers" {...register("workers")} />
      <Input label="Password" type="password" {...register("password", {})} />
      <Button>Sign Up</Button>
    </form>
  );
}

export default SignupForm;
