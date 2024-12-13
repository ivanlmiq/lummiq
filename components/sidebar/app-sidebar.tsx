"use client";

import { useEffect } from "react";
import { NavMain } from "@/components/ui/custom/nav-main";
import { NavProjects } from "@/components/ui/custom/nav-projects";
import { NavSecondary } from "@/components/ui/custom/nav-secondary";
import { NavUser } from "@/components/ui/custom/nav-user";
import { TeamSwitcher } from "@/components/ui/custom/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
} from "@/components/ui/sidebar";
import { useSidebar } from "./hooks/use-sidebar";
import { useGlobalStore } from "@/store/global.store";
import type { Session } from "next-auth";
import type { AuthTeacher } from "@/types/service";
import type { PermissionColumn } from "../features/permissions/column";

type Props = {
    user: Session["user"];
    authUser: AuthTeacher;
    permissions: PermissionColumn[];
    schoolId: string;
};

export function AppSidebar({ user, authUser, permissions, schoolId }: Props) {
    const { data, ...state } = useSidebar({ schoolId });

    useEffect(() => {
        const school = authUser?.schools.find(
            (school) => school.id === schoolId
        );

        useGlobalStore.setState({
            user: authUser,
            permissions,
            schoolId,
            school,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Sidebar>
            <SidebarHeader>
                <TeamSwitcher
                    teams={data.teams}
                    user={state.user}
                    schoolId={schoolId}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarItem>
                    <SidebarLabel>Platform</SidebarLabel>
                    <NavMain
                        items={data.navMain}
                        searchResults={data.searchResults}
                        schoolId={schoolId}
                    />
                </SidebarItem>

                {data.projects?.length > 0 && (
                    <SidebarItem>
                        <SidebarLabel>Quick Actions</SidebarLabel>
                        <NavProjects projects={data.projects} />
                    </SidebarItem>
                )}

                <SidebarItem className="mt-auto">
                    <SidebarLabel>Help</SidebarLabel>
                    <NavSecondary items={data.navSecondary} />
                </SidebarItem>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} links={data.user.links} />
            </SidebarFooter>
        </Sidebar>
    );
}
