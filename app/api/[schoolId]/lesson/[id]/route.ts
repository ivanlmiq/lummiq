import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { $Enums, Lesson } from "@prisma/client";
import type { GenericApiParamsWithId } from "@/types/api";

export async function GET(
    req: Request,
    { params: { id, schoolId } }: { params: GenericApiParamsWithId }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        if (!id)
            return new NextResponse("Lesson id is required", {
                status: 400,
            });

        const data: Lesson | null = await prisma.lesson.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Lesson fetched successfully",
            data,
        });
    } catch (error) {
        console.log("[LESSON_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params: { id, schoolId } }: { params: GenericApiParamsWithId }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        if (!id)
            return new NextResponse("Student id is required", {
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

        const data = await prisma.lesson.update({
            where: { id, schoolId },
            data: { status: "DELETE" },
        });

        return NextResponse.json({
            message: "Student deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[STUDENT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params: { id, schoolId } }: { params: GenericApiParamsWithId }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, day } = (await req.json()) as Lesson;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                {
                    value: day,
                    message: "Day is required",
                    status: 400,
                },
                {
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.lesson.update({
            where: { id },
            data: { name, day: day as $Enums.Day, schoolId },
        });

        return NextResponse.json({
            message: "Lesson updated successfully",
            data,
        });
    } catch (error) {
        console.log("[LESSON_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
