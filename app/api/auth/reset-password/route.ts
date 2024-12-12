import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, newPassword, token } = body;

        const [verification, user] = await Promise.all([
            await prisma.resetToken.findFirst({ where: { email, token } }),
            await prisma.teacher.findFirst({ where: { email } }),
        ]);

        if (!user) return new NextResponse("User not found", { status: 404 });

        if (!verification)
            return new NextResponse("Invalid token", { status: 400 });

        const hashedPassword = await hash(newPassword, 10);
        await prisma.teacher.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        await prisma.resetToken.update({
            where: { id: verification.id },
            data: { isClaimed: true },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _pwd, ...rest } = user;

        return NextResponse.json(rest);
    } catch (error) {
        console.log("[RESET_PASSWORD_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
