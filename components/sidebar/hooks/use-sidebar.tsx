import {
    LifeBuoy,
    Send,
    Settings2,
    Calendar,
    GraduationCap,
    School,
    BadgeCheck,
    CreditCard,
    Bell,
} from "lucide-react";
import {
    SidebarItems,
    SidebarItemsWithIcon,
    SidebarProjectItems,
    SidebarTeams,
} from "../types/types";
import { useGlobalStore } from "@/store/global.store";

export const useSidebar = ({ schoolId }: { schoolId: string }) => {
    const { user } = useGlobalStore((state) => state);
    const defaultRoute = `/dashboard/${schoolId}`;

    const NAV_MAIN_ITEMS: SidebarItems[] = [
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
    ];

    const NAV_QUICK_ACTIONS_ITEMS: SidebarProjectItems[] = [
        {
            name: "Add Student",
            url: `${defaultRoute}/students/new`,
        },
        {
            name: "Add Teacher",
            url: `${defaultRoute}/teachers/new`,
        },
        {
            name: "Transfer Student",
            url: `${defaultRoute}/students/new`,
        },
    ];

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
            ? user.schools.map((school) => ({
                  id: school.id,
                  name: school.name,
                  logo: School,
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
