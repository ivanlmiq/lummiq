import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Teacher } from "@prisma/client";
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
            return new NextResponse("Teacher id is required", {
                status: 400,
            });

        const teacher: Teacher | null = await prisma.teacher.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Teacher fetched successfully",
            data: teacher,
        });
    } catch (error) {
        console.log("[TEACHER_GET]", error);
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
            return new NextResponse("Teacher id is required", {
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

        const data = await prisma.teacher.update({
            where: { id, schoolId },
            data: { status: "DELETE" },
        });

        return NextResponse.json({
            message: "Parent deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[TEACHER_DELETE]", error);
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

        const { name, email, password, phone, ...rest } =
            (await req.json()) as Teacher;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                { value: phone, message: "Phone is required", status: 400 },
                {
                    value: password,
                    message: "Password is required",
                    status: 400,
                },
                {
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.teacher.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                schoolId,
                customFields: JSON.stringify(rest),
            },
        });

        return NextResponse.json({
            message: "Teacher updated successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
