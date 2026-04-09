import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/trade", "/history", "/settings/exchange"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("tp_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/trade/:path*", "/history/:path*", "/settings/exchange/:path*"],
};
