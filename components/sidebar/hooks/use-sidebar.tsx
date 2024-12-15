import {
    LifeBuoy,
    Send,
    School,
    BadgeCheck,
    CreditCard,
    Bell,
} from "lucide-react";
import { useGlobalStore } from "@/store/global.store";
import { TeacherRole } from "@prisma/client";
import { getMainItems } from "@/config/routes.config";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import type {
    SidebarItems,
    SidebarItemsWithIcon,
    SidebarProjectItems,
    SidebarTeams,
} from "../types/types";

export const useSidebar = ({ schoolId }: { schoolId: string }) => {
    const { user, school, checkPermission } = useGlobalStore((state) => state);
    const defaultRoute = `${STATIC_ROUTES.dashboard}/${schoolId}`;

    const allowedToCreateStudents = checkPermission("CREATE", "students");
    const allowedToUpdateStudents = checkPermission("UPDATE", "students");
    const allowedToCreateTeachers = checkPermission("CREATE", "teachers");

    const NAV_MAIN_ITEMS: SidebarItems[] = getMainItems(
        defaultRoute,
        user?.role as TeacherRole
    );

    const NAV_QUICK_ACTIONS_ITEMS: SidebarProjectItems[] = [
        allowedToCreateStudents && {
            name: "Add Student",
            url: `${defaultRoute}/students/new`,
        },
        allowedToCreateTeachers && {
            name: "Add Teacher",
            url: `${defaultRoute}/teachers/new`,
        },
        allowedToUpdateStudents && {
            name: "Transfer Student",
            url: `${defaultRoute}/students/transfer`,
        },
    ].filter(Boolean) as SidebarProjectItems[];

    const NAV_USER_LINKS: SidebarItemsWithIcon[] = [
        {
            name: "Account",
            url: `${defaultRoute}/profile`,
            icon: BadgeCheck,
        },
        {
            name: "Billing",
            url: `${defaultRoute}/billing`,
            icon: CreditCard,
        },
        {
            name: "Notifications",
            url: `${defaultRoute}/notifications`,
            icon: Bell,
        },
    ];

    const NAV_TEAMS: SidebarTeams[] =
        user?.schools && user.schools.length > 0
            ? user.schools.map(({ id, name }) => ({
                  id,
                  name,
                  logo: School,
                  language: school?.language ?? "en",
                  plan: "",
              }))
            : [];

    const data = {
        teams: NAV_TEAMS,
        user: {
            name: "Ivan Lara",
            email: "ivanlara@booqself.com",
            avatar: "https://avatars.githubusercontent.com/u/69819367?v=4",
            links: NAV_USER_LINKS,
        },
        navMain: NAV_MAIN_ITEMS,
        navSecondary: [
            {
                title: "Support",
                url: "#",
                icon: LifeBuoy,
            },
            {
                title: "Feedback",
                url: "#",
                icon: Send,
            },
        ],
        projects: NAV_QUICK_ACTIONS_ITEMS,
        searchResults: [
            {
                title: "Routing Fundamentals",
                teaser: "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
                url: "#",
            },
            {
                title: "Layouts and Templates",
                teaser: "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
                url: "#",
            },
            {
                title: "Data Fetching, Caching, and Revalidating",
                teaser: "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
                url: "#",
            },
            {
                title: "Server and Client Composition Patterns",
                teaser: "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
                url: "#",
            },
            {
                title: "Server Actions and Mutations",
                teaser: "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
                url: "#",
            },
        ],
    };

    return { data, user };
};
