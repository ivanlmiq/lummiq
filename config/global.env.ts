import { z } from "zod";

const {
    NEXTAUTH_SECRET: NextAuthSecret,
    NEXT_PUBLIC_DOMAIN: PublicDomain,
    NEXT_ENV: Environment,
} = process.env;

export const globalEnvSchema = z.object({
    NextAuthSecret: z.string(),
    PublicDomain: z.string(),
    Environment: z.string(),
});

export const globalEnv = {
    NextAuthSecret,
    PublicDomain,
    Environment,
} as z.infer<typeof globalEnvSchema>;
