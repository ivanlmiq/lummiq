import React from "react";
import { MODULES } from "@/lib/constants";
import { ClassView } from "@/components/features/class/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getClasses } from "@/service/schemas/get-classes";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = await getClasses(params.schoolId);

    return (
        <>
            <ListHeader module={MODULES.CLASSES} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.CLASSES} />
            ) : (
                <ClassView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
