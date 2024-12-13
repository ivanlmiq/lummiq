import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Student } from "@prisma/client";

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
            return new NextResponse("Student id is required", {
                status: 400,
            });

        const student: Student | null = await prisma.student.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Student fetched successfully",
            data: student,
        });
    } catch (error) {
        console.log("[STUDENT_GET]", error);
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

        const data = await prisma.student.update({
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
    { params }: { params: Promise<PageParamsById> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { id, schoolId } = await params;
        const { name, email, genre, pin, phone, password, classId, ...rest } =
            (await req.json()) as Student;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                { value: classId, message: "Class is required", status: 400 },
                {
                    value: password,
                    message: "Password is required",
                    status: 400,
                },
                { value: genre, message: "Genre is required", status: 400 },
                {
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const _class = await prisma.class.findUnique({
            where: { id: `${classId}` },
        });

        const data = await prisma.student.update({
            where: { id },
            data: {
                name,
                email,
                genre,
                pin,
                phone,
                schoolId,
                gradeId: _class?.gradeId,
                classId,
                customFields: JSON.stringify(rest),
            },
        });

        return NextResponse.json({
            message: "Student updated successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
