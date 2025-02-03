import React from "react";

export default function ErrorMessage({ msg }: { msg: string }) {
  return <p className="text-red-500 text-sm">{msg}</p>;
}
