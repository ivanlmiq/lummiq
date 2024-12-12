import React from "react";
import prisma from "@/lib/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SchoolForm } from "@/components/features/school/form";

export default async function page({
    params: { schoolId },
}: {
    params: PageParams;
}) {
    const data = await prisma.school.findUnique({
        where: { id: schoolId },
    });

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>School</CardTitle>
                    <CardDescription>
                        Manage your school settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SchoolForm initialData={data} schoolId={schoolId} />
                </CardContent>
            </Card>
        </>
    );
}
