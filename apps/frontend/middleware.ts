import { NextResponse } from "next/server";

export function middleware(req:Request) {
  const token = req.cookies.get("jwt");
  if (!token.value) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/createRoom","/joinRoom","/rooms/:roomId"], 
};
