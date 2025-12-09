import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosInstance from "./lib/axiosInstance";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // list of protected routes
  const protectedRoutes = ["/joinRoom","/createRoom","/rooms/"];

  const pathname = req.nextUrl.pathname;

  // check if this path requires auth
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // no token → force login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // verify token with backend
  try {
    const response = await axiosInstance.get("/v1/auth/checkAuth");

    if (!response.data.auth ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/rooms/:path*", // protect all rooms pages
    "/profile",      // protect profile
  ],
};
