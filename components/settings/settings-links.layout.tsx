"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLinks } from "./use-links";

export const SettingsLinksLayout = ({ schoolId }: { schoolId: string }) => {
    const pathname = usePathname();
    const { routes } = useLinks({ schoolId });

    return (
        <nav className="grid gap-4 text-sm text-muted-foreground">
            {routes.map(({ name, url }, index) => (
                <Link
                    key={`setting-link-${index}`}
                    href={url}
                    className={cn("capitalize", {
                        "font-semibold text-primary": url === pathname,
                    })}
                >
                    {name}
                </Link>
            ))}
            {/* <Link href="#">Security</Link>
                <Link href="#">Integrations</Link>
                <Link href="#">Support</Link>
                <Link href="#">Organizations</Link>
                <Link href="#">Advanced</Link> */}
        </nav>
    );
};
