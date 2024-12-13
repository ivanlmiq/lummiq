import React from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getDashboardCounts } from "@/service/dashboard-metrics";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function Page({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { schoolId } = await params;
    const [teachers, students, announcements, events] =
        await getDashboardCounts(schoolId);

    return (
        <>
            <DashboardHeader
                teachers={teachers}
                students={students}
                announcements={announcements}
                events={events}
            />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="col-span-1 md:col-span-4">
                    {/* <Charts /> */}
                </div>
                <div className="col-span-1 md:col-span-2">
                    <RecentActivity />
                </div>
            </div>
        </>
    );
}
