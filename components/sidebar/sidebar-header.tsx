"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { SidebarTrigger } from "../ui/sidebar";
import { useGlobalStore } from "@/store/global.store";
import { SearchBar } from "../ui/custom/search-bar";

export const SidebarHeader = () => {
    const t = useTranslations("sidebar-header");
    const { user, school } = useGlobalStore((state) => state);

    return (
        <header className="flex justify-between items-center gap-x-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center gap-x-4">
                <SidebarTrigger className="bg-zinc-200 hover:bg-slate-900 hover:text-zinc-100" />

                <div className="flex flex-col gap-y-0">
                    <span className="text-xs mb-[-2px]">{school?.name}</span>
                    <h1 className="text-xl font-medium">
                        {t("welcome")},{" "}
                        <span className="text-primary">{user?.name}</span>
                    </h1>
                </div>

                <>
                    <span>School lang: {school?.language}</span>
                    <span>User lang: {useLocale()}</span>
                </>
            </div>

            <SearchBar schoolId={school?.id}></SearchBar>
        </header>
    );
};
