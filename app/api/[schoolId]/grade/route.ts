import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Grade } from "@prisma/client";
import type { GenericApiParams } from "@/types/api";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: GenericApiParams }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { level, gradeCategoryId } = (await req.json()) as Grade;

        const gradeExists = await prisma.grade.findFirst({
            where: { schoolId, OR: [{ level }] },
        });

        if (gradeExists) {
            return new NextResponse("Grade already exists", {
                status: 500,
            });
        }

        await genericValidator({
            session,
            schoolId,
            data: [
                {
                    value: level,
                    message: "Level name is required",
                    status: 400,
                },
                {
                    value: gradeCategoryId,
                    message: "Category is required",
                    status: 400,
                },
                {
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data: Grade = await prisma.grade.create({
            data: {
                level,
                gradeCategoryId,
                schoolId,
            },
        });

        return NextResponse.json({
            message: "Grade created successfully",
            data,
        });
    } catch (error) {
        console.log("[GRADE_POST]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
