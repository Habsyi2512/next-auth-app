import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedRoutes = ["/profile", "/dashboard"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}
