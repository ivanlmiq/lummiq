import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Grade } from "@prisma/client";

export async function GET(
    req: Request,
    { params }: { params: Promise<PageParamsById> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { id, schoolId } = await params;

        if (!id)
            return new NextResponse("Grade id is required", {
                status: 400,
            });

        const grade: Grade | null = await prisma.grade.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Grade fetched successfully",
            data: grade,
        });
    } catch (error) {
        console.log("[GRADE_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<PageParamsById> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { id, schoolId } = await params;

        if (!id)
            return new NextResponse("Grade id is required", {
                status: 400,
            });

        const schoolByUserId = await prisma.school.findFirst({
            where: {
                id: schoolId,
                userId: session?.user.id,
            },
        });

        if (!schoolByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const data: Grade = await prisma.grade.update({
            where: { id, schoolId },
            data: { status: "DELETE" },
        });

        return NextResponse.json({
            message: "Grade deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[GRADE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<PageParamsById> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { id, schoolId } = await params;
        const { level, gradeCategoryId } = (await req.json()) as Grade;

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

        const data: Grade = await prisma.grade.update({
            where: { id },
            data: {
                level,
                gradeCategoryId,
                schoolId,
            },
        });

        return NextResponse.json({
            message: "Grade updated successfully",
            data,
        });
    } catch (error) {
        console.log("[GRADE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
