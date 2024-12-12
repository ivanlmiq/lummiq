import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const user = await prisma.teacher.findUnique({
            where: { email },
        });

        if (user) throw new Error("User already exists");

        const hashedPassword = await hash(password, 10);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [school, newTeacher] = await prisma.$transaction(async (tx) => {
            const school = await tx.school.create({
                data: {
                    name: "New School",
                    address: "",
                    email,
                    phone: "",
                    logo: "",
                    slug: "",
                    website: "",
                    userId: "",
                },
            });

            const teacher = await tx.teacher.create({
                data: {
                    name,
                    email,
                    // avatar: `https://api.multiavatar.com/${email}.png`,
                    role: "TEACHER",
                    password: hashedPassword,
                    schoolId: school.id,
                },
            });

            await tx.school.update({
                where: { id: school.id },
                data: {
                    ...school,
                    userId: teacher.id,
                },
            });

            return [school, teacher];
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _pwd, ...rest } = newTeacher;

        return NextResponse.json(rest);
    } catch (error) {
        console.log("[FORM_RESPONSES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
