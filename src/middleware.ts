import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Zero-configuration CORS: dynamically reflects the requesting origin so no .env setup is required
function corsHeaders(origin: string | null) {
  const allowed = origin || "*";

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, Accept, X-Api-Version",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const currentUrl = new URL(req.url);
  const origin = req.headers.get("origin");

  // ── 1. CORS for all /api/ routes ──────────────────────────────────────────
  if (nextUrl.pathname.startsWith("/api/")) {
    // Allow auth endpoints without pre-check (NextAuth internal calls)
    if (nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const hdrs = corsHeaders(origin);

    // OPTIONS preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: hdrs });
    }

    const response = NextResponse.next();
    if (hdrs) {
      for (const [k, v] of Object.entries(hdrs)) {
        response.headers.set(k, v);
      }
    }

    // Security headers on all API responses
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    return response;
  }

  // ── 2. Auth Routes & Public Pages ─────────────────────────────────────────
  const isPublicRoute = ["/login", "/register"].includes(nextUrl.pathname);

  if (isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", currentUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", currentUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
