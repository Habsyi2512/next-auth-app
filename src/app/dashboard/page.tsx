"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  return (
    <div>
      <h1>Halaman Dashboard</h1>
      <h1>Name {session?.user?.email}</h1>
    </div>
  );
}
