import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Parent } from "@prisma/client";

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
            return new NextResponse("Parent id is required", {
                status: 400,
            });

        const data: Parent | null = await prisma.parent.findUnique({
            where: { id, schoolId },
            include: {},
        });

        return NextResponse.json({
            message: "Parent fetched successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_GET]", error);
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
            return new NextResponse("Parent id is required", {
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

        const data = await prisma.parent.update({
            where: { id, schoolId },
            data: { status: "DELETE" },
        });

        return NextResponse.json({
            message: "Parent deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_DELETE]", error);
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
        const { name, email, address, phone, password, ...rest } =
            (await req.json()) as Parent;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                {
                    value: password,
                    message: "Password is required",
                    status: 400,
                },
                { value: phone, message: "Phone is required", status: 400 },
                {
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.parent.update({
            where: { id },
            data: {
                name,
                email,
                address,
                phone,
                schoolId,
                customFields: JSON.stringify(rest),
            },
        });

        return NextResponse.json({
            message: "Parent updated successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
