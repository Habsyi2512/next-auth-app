import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isProfilePage = req.nextUrl.pathname.startsWith("/profile");
  const isDashhboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProfilePage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (isDashhboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}
