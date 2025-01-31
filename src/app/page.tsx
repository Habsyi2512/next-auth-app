import Lists from "@/components/Lists";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";


export default async function Home() {
  const session = await getServerSession(authOptions);
  const token = await getCsrfToken();
  console.log("token =", token);

  return (
    <div>
      <Lists />

      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
