import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../base";
import { z } from "zod";
import { useRouter } from "next/router";
import { getError } from "@/utils";

interface SignupInput {
  name: String;
  email: String;
  address: String;
  description: String;
  workers: Number;
  password: String;
}

const formSchema = z
  .object({
    name: z.string().min(1, "Username is required").max(100),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    company_address: z.string().min(1, "Address is required").max(100),
    description: z.string().min(1, "Description is required").max(100),
    number_of_workers: z
      .number()
      .min(1, "Number of workers is required")
      .max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirm_password: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
type FormSchemaType = z.infer<typeof formSchema>;

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });
  const err = getError(errors);
  const router = useRouter();

  async function onSubmit(data: FormSchemaType) {
    console.log(data);
    const res = await fetch(
      "https://signmein-api.onrender.com/organization/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const isOkay = await res.ok;
    const dataResponse = await res.json();
    if (isOkay) {
      router.push("/login");
    }
    console.log(dataResponse);
    setError("email", {
      message: await dataResponse["email"]?.[0],
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3 mb-8"
    >
      <Input
        label="Name of Organisation"
        {...register("name")}
        error={err("name")}
      />
      <Input
        label="Organisation email"
        type={"email"}
        {...register("email")}
        error={err("email")}
      />
      <Input
        label="Organisation Address"
        {...register("company_address")}
        error={err("company_address")}
      />
      <Input
        label="Organisation Description"
        {...register("description")}
        error={err("description")}
      />
      <Input
        type="number"
        label="Number of Workers"
        {...register("number_of_workers", {
          setValueAs: (v) => parseInt(v, 10),
        })}
        error={err("number_of_workers")}
      />
      <Input
        label="Password"
        type="password"
        {...register("password", {})}
        error={err("password")}
      />
      <Input
        label="Confirm Password"
        type="password"
        {...register("confirm_password", {})}
        error={err("confirm_password")}
      />
      <Button>Sign Up</Button>
    </form>
  );
}

export default SignupForm;
