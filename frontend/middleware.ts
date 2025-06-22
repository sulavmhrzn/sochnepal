import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const requiresLoginPath = ["/dashboard", "/reports/submit"];
    const pathname = req.nextUrl.pathname;
    if (requiresLoginPath.includes(pathname)) {
        if (!req.cookies.has("access_token")) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
}
