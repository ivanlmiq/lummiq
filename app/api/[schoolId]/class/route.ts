import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Class } from "@prisma/client";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: { schoolId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, capacity, gradeId } = (await req.json()) as Class;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                {
                    value: `${capacity}`,
                    message: "Capacity is required",
                    status: 400,
                },
                {
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data: Class = await prisma.class.create({
            data: {
                name,
                capacity,
                gradeId,
                schoolId,
            },
        });

        return NextResponse.json({
            message: "Class created successfully",
            data,
        });
    } catch (error) {
        console.log("[CLASS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
