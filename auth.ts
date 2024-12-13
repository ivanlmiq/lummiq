import { compare } from "bcrypt";
import { getServerSession, User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import type { Student, Teacher, TeacherRole } from "@prisma/client";

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: TeacherRole;
    }
}

declare module "next-auth" {
    interface Session {
        user: Teacher | (Student & { id: string; role: TeacherRole });
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize({
                email,
                password,
            }: (typeof CredentialsProvider.arguments)[0]["credentials"]) {
                if (!email || !password) return null;

                const user = await prisma.teacher.findUnique({
                    where: { email },
                });

                if (!user) return null;

                const isPasswordValid = await compare(password, user.password);

                if (!isPasswordValid) return null;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...rest } = user;

                return {
                    ...rest,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as TeacherRole;
                session.user.photo = token.image as string;
                session.user.schoolId = token.schoolId as string;
            }

            return session;
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as User;

                return { ...token, ...u };
            }

            return token;
        },
    },
};

export const auth = async () => await getServerSession(authOptions);
