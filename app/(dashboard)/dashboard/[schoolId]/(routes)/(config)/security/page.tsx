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
    params: {
        schoolId: string;
    };
}) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                        Manage your security settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>{params.schoolId}</CardContent>
            </Card>
        </>
    );
}
