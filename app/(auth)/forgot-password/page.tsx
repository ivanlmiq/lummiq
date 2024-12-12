import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { STATIC_ROUTES } from "@/lib/routeConfig";

export default async function Page() {
    const session = await auth();
    if (session?.user) redirect(STATIC_ROUTES.dashboard);

    return (
        <div>
            <h1>Forgot Password</h1>
        </div>
    );
}
