import SignInForm from "@/components/SignInForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="p-5 bg-neutral-200 rounded shadow w-full max-w-xl mx-auto mt-5 ">
      <h2 className="py-5 text-2xl font-bold text-neutral-700">Login Form</h2>
      <SignInForm />
    </div>
  );
}
