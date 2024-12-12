import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Student } from "@prisma/client";
import type { GenericApiParams } from "@/types/api";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: GenericApiParams }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, email, genre, pin, phone, password, classId, ...rest } =
            (await req.json()) as Student;

        const studentExists = await prisma.student.findFirst({
            where: { schoolId, OR: [{ email }, { pin }] },
        });

        if (studentExists) {
            return new NextResponse("Student already exists", {
                status: 500,
            });
        }

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

        const hashedPassword = await hash(password, 10);
        const data: Student = await prisma.student.create({
            data: {
                name,
                email,
                genre,
                pin,
                phone,
                password: hashedPassword,
                gradeId: _class?.gradeId,
                classId,
                schoolId,
                customFields: JSON.stringify(rest),
            },
        });

        return NextResponse.json({
            message: "Teacher created successfully",
            data,
        });
    } catch (error) {
        console.log("[STUDENT_POST]", error);
        return new NextResponse("Internal error", {
            status: 500,
        });
    }
}
