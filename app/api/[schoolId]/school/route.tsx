import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { School } from "@prisma/client";
import type { GenericApiParams } from "@/types/api";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: GenericApiParams }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, email, address, phone } = (await req.json()) as School;

        await genericValidator({
            session,
            schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                { value: phone, message: "Phone is required", status: 400 },
            ],
        });

        const data: School = await prisma.school.create({
            data: {
                name,
                address,
                email,
                phone,
                logo: "",
                slug: "",
                website: "",
                userId: "",
            },
        });

        return NextResponse.json({
            message: "Parent created successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
