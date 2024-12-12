import React from "react";
import { SettingsLinksLayout } from "@/components/settings/settings-links.layout";

export default async function SettingsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        schoolId: string;
    };
}) {
    return (
        <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <SettingsLinksLayout schoolId={params.schoolId} />

                <div className="grid gap-6">{children}</div>
            </div>
        </>
    );
}
