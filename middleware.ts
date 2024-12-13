import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { globalEnv } from "./config/global.env";
import { STATIC_ROUTES } from "./lib/routeConfig";
import { TeacherRole } from "@prisma/client";

const FORBIDDEN_ROUTES = new Map<TeacherRole, string[]>([
    ["PRINCIPAL", []],
    [
        "TEACHER",
        [
            STATIC_ROUTES.schools,
            STATIC_ROUTES.teams,
            STATIC_ROUTES.billing,
            STATIC_ROUTES.integrations,
        ],
    ],
    [
        "TEACHER_ASSISTANT",
        [
            STATIC_ROUTES.schools,
            STATIC_ROUTES.teams,
            STATIC_ROUTES.billing,
            STATIC_ROUTES.integrations,
        ],
    ],
]);

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const token = await getToken({
        req,
        secret: globalEnv.NextAuthSecret,
    });

    if (!token || url.pathname === "/sign-in" || url.pathname === "/sign-up")
        return NextResponse.redirect(new URL(`/sign-in`, req.url));

    if (
        url.pathname === "/" ||
        (url.pathname === "/site" && url.host === globalEnv.PublicDomain)
    )
        return NextResponse.rewrite(new URL("/site", req.url));

    const schoolId = token.schoolId;
    const defaultRoute = `${STATIC_ROUTES.dashboard}/${schoolId}`;

    const validRoutes =
        FORBIDDEN_ROUTES.get(token.role)?.map(
            (url) => `${defaultRoute}${url}`
        ) || [];

    if (validRoutes.some((validUrl) => url.pathname.startsWith(validUrl))) {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
