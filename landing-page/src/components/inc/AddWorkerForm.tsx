import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, FieldErrors } from "react-hook-form";
import { Button, Input } from "../base";
import { z } from "zod";
import { useRouter } from "next/router";
import { getError } from "@/utils";
import { signIn, useSession } from "next-auth/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { addWorker } from "../../api";
import { Card } from "@tremor/react";
import { Orbit } from "@uiball/loaders";

const formSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    house_address: z.string().min(1, "House address is required"),
    age: z.number().min(1, "Age is required"),
    gender: z.enum(["Male", "Female"]),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
export type FormSchemaType = z.infer<typeof formSchema>;

export default function AddWorkerForm({
  open,
  onSuccess,
}: {
  open: boolean;
  onSuccess: () => void;
}) {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });
  const mutation = useMutation(addWorker, {
    onSuccess,
  });
  const err = getError(errors);
  const router = useRouter();
  async function onSubmit(data: FormSchemaType) {
    if (session?.user && session.user.access) {
      mutation.mutate({ ...data, access: session.user.access });
    }
  }

  if (!open) return null;
  return (
    <div className="fixed isolate z-10 inset-0 bg-black/20 grid place-items-center">
      <Card className="w-full max-w-lg max-h-[90%] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 mb-8"
        >
          <Input
            label="First Name"
            {...register("first_name")}
            error={err("first_name")}
          />
          <Input
            label="Last Name"
            {...register("last_name")}
            error={err("last_name")}
          />
          <Input
            label="Email"
            type={"email"}
            {...register("email")}
            error={err("email")}
          />
          <Input
            type="number"
            label="Age"
            {...register("age", {
              setValueAs: (v) => parseInt(v, 10),
            })}
            error={err("age")}
          />
          <select {...register("gender")}>
            <option>Male</option>
            <option>Female</option>
          </select>
          <Input
            label="Address"
            {...register("house_address")}
            error={err("house_address")}
          />
          <Input
            label="Password"
            type={"password"}
            {...register("password")}
            error={err("password")}
          />
          <Input
            label="Confirm Password"
            type={"password"}
            {...register("confirm_password")}
            error={err("confirm_password")}
          />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <Orbit size={35} color="#231F20" />
            ) : (
              "Add Worker"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
