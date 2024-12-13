import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Parent } from "@prisma/client";

export async function POST(
    req: Request,
    { params }: { params: Promise<PageParams> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { schoolId } = await params;
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
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const hashedPassword = await hash(password, 10);
        const data: Parent = await prisma.parent.create({
            data: {
                name,
                email,
                address,
                phone,
                password: hashedPassword,
                schoolId,
                customFields: JSON.stringify(rest),
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
