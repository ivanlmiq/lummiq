import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignUp } from "@/components/features/auth/sign-up/sign-up";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export default async function Page() {
    const session = await auth();
    if (session?.user) redirect(STATIC_ROUTES.dashboard);

    return <SignUp />;
}
