"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/schemas/signInSchema";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignInType = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (formData: SignInType) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      setLoading(false); // Matikan loading setelah proses selesai

      if (result?.error) {
        console.error("Login failed:", result.error);
        alert("Login failed");
      } else {
        // Redirect ke halaman utama jika berhasil
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // Arahkan ke halaman utama setelah login
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 rounded border focus:outline-none"
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email?.message && <ErrorMessage msg={errors.email.message} />}
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 rounded border-transparent"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <ErrorMessage msg={errors.password.message} />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-900 px-5 disabled:cursor-not-allowed py-2 text-neutral-200 rounded  hover:bg-neutral-700 active:bg-neutral-900"
        >
          {loading ? "Signing In..." : " Sign In"}
        </button>
      </form>
      {/* Divider */}
      <div className="flex items-center gap-4">
        <hr className="flex-grow border-neutral-300" />
        <span className="text-neutral-500">OR</span>
        <hr className="flex-grow border-neutral-300" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-700 px-5 py-2 rounded hover:bg-neutral-100 active:bg-neutral-200 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
          className="w-5 h-5"
        >
          {/* Google Icon SVG */}
          <path
            fill="#171717"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1z"
          />
        </svg>
        Sign in with Google
      </button>
    </>
  );
}
