import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { render } from "@react-email/render";
// import { sender } from "@/lib/email-sender";
// import { ForgotPasswordEmailTemplate } from "@sasshboard/ui/components/core/email-templates";
// import { PUBLIC_CONSTANTS } from "@/config/constants";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        const user = await prisma.teacher.findFirst({
            where: { email },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const token = crypto.randomUUID().toString();

        const verification = await prisma.resetToken.create({
            data: {
                userId: user.id,
                email: user.email,
                oldPassword: user.password,
                isClaimed: false,
                token,
            },
        });

        if (!verification) {
            return new NextResponse("Internal error", { status: 500 });
        }

        // await sender.send({
        //     from: PUBLIC_CONSTANTS.email.appointment.from,
        //     to: email,
        //     subject: `${PUBLIC_CONSTANTS.email.appointment.subject}`,
        //     html: render(
        //         ForgotPasswordEmailTemplate({
        //             name: user?.name,
        //             email,
        //             link: `https://www.booqself.com/store/forgot-password?verification_token=${token}`,
        //         })
        //     ),
        // });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[FORGOT_PASSWORD_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
