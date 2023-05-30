import React, { useId } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";


interface SignupInput {
  name: String;
  email: String;
  address: String;
  description: String;
  workers: Number;
  password: String;
}

function SignupForm() {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<SignupInput>();
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="flex w-full flex-col gap-3 mb-8">
      <Input label="Name of Organisation" register={register("name")} />
      <Input label="Organisation email" type={"email"} register={register("email")} />
      <Input label="Organisation Address" register={register("address")} />
      <Input label="Organisation Description" register={register("description")} />
      <Input label="Number of Workers" register={register("workers")} />
      <Input label="Password" type="password"  register={register("password",{})}  />
      <Button>Sign Up</Button>
    </form>
  );
}

function Input({ label ,register,...others}: { label: string,register:any }&JSX.IntrinsicElements["input"]) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium ">
        {label}
      </label>
      <input  className="rounded-full border-2 border-gray-300 p-2" placeholder={`Enter `+label.toLowerCase()} id={id} {...register}{...others} />
    </div>
  );
}
export default SignupForm;
