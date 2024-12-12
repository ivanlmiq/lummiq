import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Exam } from "@prisma/client";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: { schoolId: string } }
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
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data: Exam = await prisma.exam.create({
            data: {
                name,
                date,
                lessonId,
                schoolId,
            },
        });

        return NextResponse.json({
            message: "Exam created successfully",
            data,
        });
    } catch (error) {
        console.log("[EXAM_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
