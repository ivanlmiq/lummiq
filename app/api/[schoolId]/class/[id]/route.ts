import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Class } from "@prisma/client";

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
            return new NextResponse("Class id is required", {
                status: 400,
            });

        const data: Class | null = await prisma.class.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Class fetched successfully",
            data,
        });
    } catch (error) {
        console.log("[CLASS_GET]", error);
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
            return new NextResponse("Class id is required", {
                status: 400,
            });

        const schoolByUserId = await prisma.school.findFirst({
            where: {
                id,
                userId: session?.user.id,
            },
        });

        if (!schoolByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const data = await prisma.class.delete({
            where: { id, schoolId },
        });

        return NextResponse.json({
            message: "Class deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[CLASS_DELETE]", error);
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
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.class.update({
            where: { id, schoolId },
            data: { name, capacity, gradeId },
        });

        return NextResponse.json({
            message: "Parent updated successfully",
            data,
        });
    } catch (error) {
        console.log("[CLASS_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
