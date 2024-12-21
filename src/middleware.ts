import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/signin");
  const isProtectedPage = !isAuthPage;

  if (isAuthPage && token?.accessToken) {
    return NextResponse.redirect(new URL("/system/dashboard", req.url));
  }

  if (isProtectedPage && !token?.accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/system/:path*"], // Proteger todas las rutas que comiencen con /system
};
