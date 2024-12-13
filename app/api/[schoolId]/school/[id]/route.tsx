import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { School } from "@prisma/client";
import type { GenericApiParamsWithId } from "@/types/api";

export async function GET(
    req: Request,
    { params: { id } }: { params: GenericApiParamsWithId }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        if (!id)
            return new NextResponse("School id is required", {
                status: 400,
            });

        const data: School | null = await prisma.school.findUnique({
            where: { id },
            include: {},
        });

        return NextResponse.json({
            message: "School fetched successfully",
            data,
        });
    } catch (error) {
        console.log("[SCHOOL_GET]", error);
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
            return new NextResponse("School id is required", {
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

        const data = await prisma.school.update({
            where: { id },
            data: {}
            // data: { status: "DELETE" },
        });

        return NextResponse.json({
            message: "School deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_DELETE]", error);
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

        const { name, email, address, phone, } =
            (await req.json()) as School;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                { value: phone, message: "Phone is required", status: 400 },
                {
                    value: id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const data = await prisma.school.update({
            where: { id },
            data: {
                name,
                email,
                address,
                phone,
            },
        });

        return NextResponse.json({
            message: "School updated successfully",
            data,
        });
    } catch (error) {
        console.log("[SCHOOL_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
