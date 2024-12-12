import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
        return NextResponse.redirect(new URL(`/sign-in`, req.url));
    }

    if (
        url.pathname === "/" ||
        (url.pathname === "/site" &&
            url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
        return NextResponse.rewrite(new URL("/site", req.url));
    }
}
