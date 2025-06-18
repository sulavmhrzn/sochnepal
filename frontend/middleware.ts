import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (!req.cookies.has("access_token")) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
}
