import { NextResponse } from "next/server";
import prisma from "../prisma";
import type { Session } from "next-auth";

type Props = {
    schoolId: string;
    session: Session;
    data: {
        value: string | null;
        message: string;
        status: number;
    }[];
};

export const genericValidator = async ({ session, schoolId, data }: Props) => {
    const check = data.find((validation) => !validation.value);

    if (check) return new NextResponse(check.message, { status: check.status });

    const schoolByUserId = await prisma.school.findFirst({
        where: { id: schoolId, userId: session.user.id },
    });

    if (!schoolByUserId)
        return new NextResponse("Unauthorized", { status: 405 });
};
