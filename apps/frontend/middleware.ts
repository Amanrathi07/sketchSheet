import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest) {
  const token = req.cookies.get("jwt");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/createRoom","/joinRoom","/rooms/:roomId"], 
};
