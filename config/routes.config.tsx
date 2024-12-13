import { Settings2, Calendar, GraduationCap, School } from "lucide-react";
import type { TeacherRole } from "@prisma/client";
import type { SidebarItems } from "../components/sidebar/types/types";

export const getMainItems = (
    defaultRoute: string,
    role: TeacherRole
): SidebarItems[] => {
    const COMMON_ROUTES: SidebarItems[] = [
        {
            title: "Users",
            url: "#",
            icon: GraduationCap,
            isActive: true,
            items: [
                {
                    title: "Students",
                    url: `${defaultRoute}/students`,
                },
                {
                    title: "Parents",
                    url: `${defaultRoute}/parents`,
                },
                {
                    title: "Teachers",
                    url: `${defaultRoute}/teachers`,
                },
            ],
        },
        {
            title: "Academics",
            url: "#",
            icon: School,
            items: [
                {
                    title: "Subjects",
                    url: `${defaultRoute}/subjects`,
                },
                {
                    title: "Lessons",
                    url: `${defaultRoute}/lessons`,
                },
                {
                    title: "Grades",
                    url: `${defaultRoute}/grades`,
                },
                {
                    title: "Classes",
                    url: `${defaultRoute}/classes`,
                },
                {
                    title: "Assignments",
                    url: `${defaultRoute}/assignments`,
                },
                {
                    title: "Exams",
                    url: `${defaultRoute}/exams`,
                },
                {
                    title: "Results",
                    url: `${defaultRoute}/results`,
                },
                {
                    title: "Attendance",
                    url: `${defaultRoute}/attendance`,
                },
            ],
        },
        {
            title: "Communication",
            url: "#",
            icon: Calendar,
            items: [
                {
                    title: "Events",
                    url: `${defaultRoute}/events`,
                },
                {
                    title: "Announcements",
                    url: `${defaultRoute}/announcements`,
                },
            ],
        },
    ];

    const routes = new Map<TeacherRole, SidebarItems[]>([
        [
            "PRINCIPAL",
            [
                ...COMMON_ROUTES,
                {
                    title: "Settings",
                    url: "#",
                    icon: Settings2,
                    items: [
                        {
                            title: "General",
                            url: `${defaultRoute}/schools`,
                        },
                        {
                            title: "Team",
                            url: `${defaultRoute}/team`,
                        },
                        {
                            title: "Billing",
                            url: `${defaultRoute}/billing`,
                        },
                        {
                            title: "Security",
                            url: `${defaultRoute}/security`,
                        },
                        {
                            title: "Integrations",
                            url: `${defaultRoute}/integrations`,
                        },
                    ],
                },
            ],
        ],
        [
            "TEACHER",
            [
                ...COMMON_ROUTES,
                {
                    title: "Settings",
                    url: "#",
                    icon: Settings2,
                    items: [
                        {
                            title: "Profile",
                            url: `${defaultRoute}/profile`,
                        },
                        {
                            title: "Notifications",
                            url: `${defaultRoute}/notifications`,
                        },
                        {
                            title: "Security",
                            url: `${defaultRoute}/security`,
                        },
                    ],
                },
            ],
        ],
        [
            "TEACHER_ASSISTANT",
            [
                ...COMMON_ROUTES,
                {
                    title: "Settings",
                    url: "#",
                    icon: Settings2,
                    items: [
                        {
                            title: "Profile",
                            url: `${defaultRoute}/profile`,
                        },
                        {
                            title: "Notifications",
                            url: `${defaultRoute}/notifications`,
                        },
                        {
                            title: "Security",
                            url: `${defaultRoute}/security`,
                        },
                    ],
                },
            ],
        ],
    ]);

    return routes.get(role) || [];
};

export const extractUrls = (items: Omit<SidebarItems, "icon">[]): string[] => {
    return items.flatMap((item) => [
        item.url,
        ...(item.items ? extractUrls(item.items) : []),
    ]);
};
