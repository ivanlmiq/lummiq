import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user) redirect(STATIC_ROUTES.signin);

    const user = await prisma.teacher.findUnique({
        where: { id: session.user.id },
        select: { schoolId: true },
    })!;
    const school = await prisma.school.findFirst({
        where: { id: user?.schoolId },
    });

    if (school) return redirect(`/dashboard/${school.id}`);

    return <>{children}</>;
}
