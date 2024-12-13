import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { globalEnv } from "./config/global.env";
import { STATIC_ROUTES } from "./lib/routeConfig";
import { TeacherRole } from "@prisma/client";
import { notFound } from "next/navigation";

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

    if (
        url.pathname === STATIC_ROUTES.login ||
        url.pathname === STATIC_ROUTES.register
    )
        return NextResponse.redirect(new URL(STATIC_ROUTES.login, req.url));

    if (
        url.pathname === "/" ||
        (url.pathname === STATIC_ROUTES.public &&
            url.host === globalEnv.PublicDomain)
    )
        return NextResponse.rewrite(new URL(STATIC_ROUTES.public, req.url));

    if (token) {
        const { role, schoolId } = token;
        const defaultRoute = `${STATIC_ROUTES.dashboard}/${schoolId}`;

        const validRoutes =
            FORBIDDEN_ROUTES.get(role)?.map((url) => `${defaultRoute}${url}`) ||
            [];

        if (validRoutes.some((validUrl) => url.pathname.startsWith(validUrl))) {
            url.pathname = "/404";
            return NextResponse.redirect(url);
        }
    }
}
