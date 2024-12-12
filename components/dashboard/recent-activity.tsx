"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

export const RecentActivity = () => {
    const activity = [
        {
            event: "New student enrolled",
            grade: "Grade 1",
            date: "2021-09-01",
        },
        {
            event: "Faculty meeting",
            grade: "All",
            date: "2021-09-02",
        },
        {
            event: "Parent-teacher conference",
            grade: "Grade 1",
            date: "2021-09-03",
        },
        {
            event: "Last day of school",
            grade: "All",
            date: "2024-12-12",
        },
        {
            event: "Teacher training",
            grade: "All",
            date: "2025-01-11",
        },
    ];

    return (
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-col xl:flex-row justify-between items-center gap-y-4 lg:gap-y-0">
                <div className="grid gap-2">
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>
                        Latest announcements from the school
                    </CardDescription>
                </div>
                <Link href="#" className="w-full lg:w-auto">
                    <Button className="ml-auto gap-1 w-full lg:w-auto">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent className="grid gap-8">
                {activity.map((item, index) => (
                    <div
                        key={`dashbhoard-activity-${index}`}
                        className="flex flex-col lg:flex-row items-start lg:items-center gap-4"
                    >
                        {/* <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar> */}
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {item.event}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {item.grade}
                            </p>
                        </div>
                        <div className="lg:ml-auto font-medium text-sm text-muted-foreground capitalize">
                            {formatDistanceToNow(new Date(item.date), {
                                addSuffix: true,
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
