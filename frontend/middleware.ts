import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // const requiresLoginPath = ["/dashboard", "/reports/submit"];
    // const pathname = req.nextUrl.pathname;

    if (!req.cookies.has("access_token")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    // if (requiresLoginPath.includes(pathname)) {
    // }
}

export const config = {
    matcher: ["/dashboard/:path*", "/reports/submit"],
};
