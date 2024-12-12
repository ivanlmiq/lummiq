import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { $Enums, Lesson } from "@prisma/client";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: { schoolId: string } }
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
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data: Lesson = await prisma.lesson.create({
            data: {
                name,
                day: day as $Enums.Day,
                startTime: "",
                endTime: "",
                schoolId,
            },
        });

        return NextResponse.json({
            message: "Lesson created successfully",
            data,
        });
    } catch (error) {
        console.log("[LESSON_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
