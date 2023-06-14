import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, FieldErrors } from "react-hook-form";
import { Button, Input } from "../base";
import { z } from "zod";
import { useRouter } from "next/router";
import { getError } from "@/utils";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";
import { Orbit } from "@uiball/loaders";

const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
type FormSchemaType = z.infer<typeof formSchema>;
export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });
  const err = getError(errors);
  const router = useRouter();
  function onSubmit(data: FormSchemaType) {
    setLoading(true);
    const status = signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/app",
    }).then((res) => {
      setLoading(false);
      console.log(res);
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3 mb-8"
    >
      <Input
        label="Email"
        type={"email"}
        {...register("email")}
        error={err("email")}
      />
      <Input
        label="Password"
        type={"password"}
        {...register("password")}
        error={err("password")}
      />
      <Button disabled={loading}>
        {loading ? <Orbit size={35} color="#ffffff" /> : "Login"}
      </Button>
    </form>
  );
}
