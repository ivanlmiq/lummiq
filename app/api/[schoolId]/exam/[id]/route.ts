import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Exam } from "@prisma/client";
import type { GenericApiParamsWithId } from "@/types/api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENV = process.env.NEXT_ENV || "development";

export async function GET(
    req: Request,
    { params: { id, schoolId } }: { params: GenericApiParamsWithId }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        if (!id)
            return new NextResponse("Exam id is required", {
                status: 400,
            });

        const data: Exam | null = await prisma.exam.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Exam fetched successfully",
            data,
        });
    } catch (error) {
        console.log("[EXAM_GET]", error);
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

        const { name, date, lessonId } = (await req.json()) as Exam;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                {
                    value: date.toLocaleDateString(),
                    message: "Date is required",
                    status: 400,
                },
                {
                    value: lessonId,
                    message: "Lesson is required",
                    status: 400,
                },
                {
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.exam.update({
            where: { id },
            data: { name, date, lessonId, schoolId },
        });

        return NextResponse.json({
            message: "Exam updated successfully",
            data,
        });
    } catch (error) {
        console.log("[EXAM_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
