"use client";

import { signIn } from "next-auth/react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/lib/schemas/registerSchema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(registerFormSchema) });

  async function onSubmit(formValues: FieldValues) {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) return alert("register failed");

      return signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="shadow-md rounded-md p-6 w-[40vw] bg-white">
      <h3 className="text-xl text-center">Register</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="border-b border-b-black py-1 px-2"
            type="text"
            {...register("name")}
            id="name"
            placeholder="John"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{`${errors.name?.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border-b border-b-black py-1 px-2"
            {...register("email")}
            id="email"
            placeholder="example@gmail.com"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{`${errors.email?.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border-b border-b-black py-1 px-2"
            {...register("password")}
            id="password"
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{`${errors.password?.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm">Confirm</label>
          <input
            type="password"
            className="border-b border-b-black py-1 px-2"
            {...register("confirm")}
            id="confirm"
          />
          {errors.confirm?.message && (
            <p className="text-red-500 text-sm">{`${errors.confirm?.message}`}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-sky-600 text-slate-100 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
