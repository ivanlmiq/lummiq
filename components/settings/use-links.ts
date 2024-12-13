import { STATIC_ROUTES } from "@/lib/routeConfig";
import { useGlobalStore } from "@/store/global.store";
import { TeacherRole } from "@prisma/client";

type SettingsItems = {
    name: string;
    url: string;
};

export const useLinks = ({ schoolId }: { schoolId: string }) => {
    const { user } = useGlobalStore((state) => state);
    const defaultRoute = `${STATIC_ROUTES.dashboard}/${schoolId}`;

    const COMMON_ROUTES: SettingsItems[] = [
        {
            name: "Profile",
            url: `${defaultRoute}/profile`,
        },
        {
            name: "Notifications",
            url: `${defaultRoute}/notifications`,
        },
        {
            name: "Security",
            url: `${defaultRoute}/security`,
        },
    ];

    const routes =
        new Map<TeacherRole, SettingsItems[]>([
            [
                "PRINCIPAL",
                [
                    {
                        name: "General",
                        url: `${defaultRoute}/schools`,
                    },
                    ...COMMON_ROUTES,
                    {
                        name: "Team",
                        url: `${defaultRoute}/team`,
                    },
                    {
                        name: "Billing",
                        url: `${defaultRoute}/billing`,
                    },

                    {
                        name: "Integrations",
                        url: `${defaultRoute}/integrations`,
                    },
                ],
            ],
            ["TEACHER", COMMON_ROUTES],
            ["TEACHER_ASSISTANT", COMMON_ROUTES],
        ]).get(user?.role as TeacherRole) || [];

    return { routes };
};
