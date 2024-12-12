import { STATIC_ROUTES } from "@/lib/routeConfig";

export const useLinks = ({ schoolId }: { schoolId: string }) => {
    const routes = [
        {
            name: "General",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/schools`,
        },
        {
            name: "Profile",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/profile`,
        },
        { name: "Team", url: `${STATIC_ROUTES.dashboard}/${schoolId}/team` },
        {
            name: "Billing",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/billing`,
        },
        {
            name: "Security",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/security`,
        },
        {
            name: "Integrations",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/integrations`,
        },
        {
            name: "Notifications",
            url: `${STATIC_ROUTES.dashboard}/${schoolId}/notifications`,
        },
    ];

    return { routes };
};
