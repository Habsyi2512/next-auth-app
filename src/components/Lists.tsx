"use client";

import Link from "next/link";
import React from "react";
import { signIn, signOut } from "next-auth/react";

export default function Lists() {
  return (
    <ul className="flex gap-4 bg-neutral-900 text-neutral-200 py-5 px-5">
      <li>
        <Link href={"/register"}>Register</Link>
      </li>
      <li>
        <Link href={"/profile"}>Profile</Link>
      </li>
      <li>
        <button onClick={() => signIn()}>Sign In</button>
      </li>
      <li>
        <button onClick={() => signOut()}>Sign Out</button>
      </li>
    </ul>
  );
}
