import type { LucideIcon } from "lucide-react";

export type SidebarProjectItems = {
    name: string;
    url: string;
};

export type SidebarItemsWithIcon = SidebarProjectItems & {
    icon: LucideIcon;
};

export type SidebarTeams = {
    id: string;
    name: string;
    logo: LucideIcon;
};

export type SidebarItems = {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
};
