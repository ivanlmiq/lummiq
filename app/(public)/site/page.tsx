import React from "react";
import Link from "next/link";
import Auth from "@/components/ui/custom/auth";
import { auth } from "@/auth";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { cn } from "@/lib/utils";

export default async function Page() {
    const session = await auth();

    const IS_LOGGED = session?.user;

    return (
        <>
            <main
                className={cn({
                    "flex items-center justify-center h-screen": IS_LOGGED,
                })}
            >
                {!IS_LOGGED ? (
                    <Auth />
                ) : (
                    <Link href={STATIC_ROUTES.dashboard}>Go to dashboard</Link>
                )}
            </main>
        </>
    );
}
