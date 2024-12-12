import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignIn } from "@/components/features/auth/sign-in/sign-in";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export default async function Page() {
    const session = await auth();
    if (session?.user) redirect(STATIC_ROUTES.dashboard);

    return <SignIn />;
}
