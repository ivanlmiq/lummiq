import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Team</CardTitle>
                    <CardDescription>
                        Manage your team members and their permissions.
                    </CardDescription>
                </CardHeader>
                <CardContent>{schoolId}</CardContent>
            </Card>
        </>
    );
}
