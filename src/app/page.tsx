import Lists from "@/components/Lists";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Lists />

      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
