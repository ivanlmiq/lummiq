"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { singular } from "pluralize";
import { Plus } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { UploadDrawer } from "../ui/custom/upload/upload-drawer";
import { MODULES } from "@/lib/constants";
import { useGlobalStore } from "@/store/global.store";

type Props = { module: string; lastAction?: string };

export const ListHeader = ({ module, lastAction }: Props) => {
    const params = useParams();
    const { checkPermission } = useGlobalStore((state) => state);
    const schoolId = String(params?.schoolId);

    const allowedToCreate = checkPermission("CREATE", module);

    return (
        <nav className="flex items-center justify-between">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href={`${STATIC_ROUTES.dashboard}/${schoolId}`}
                                className="text-zinc-500"
                            >
                                Dashboard
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href={
                                    lastAction
                                        ? `${STATIC_ROUTES.dashboard}/${schoolId}/${module}`
                                        : "#"
                                }
                                className={cn("capitalize", {
                                    "text-zinc-900": !lastAction,
                                    "text-zinc-500": lastAction,
                                })}
                            >
                                {module}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {lastAction && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    className={cn("capitalize", {
                                        "text-zinc-500": !lastAction,
                                        "text-zinc-900": lastAction,
                                    })}
                                >
                                    <span className="capitalize">
                                        {lastAction}
                                    </span>{" "}
                                    {singular(module)}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>

            {!params?.id && allowedToCreate && (
                <ul className="flex items-center justify-between gap-1">
                    <li>
                        <Link
                            href={`${STATIC_ROUTES.dashboard}/${schoolId}/${module}/new`}
                        >
                            <Button>
                                <Plus size={16} className="mr-2" />
                                Add {singular(module)}
                            </Button>
                        </Link>
                    </li>
                    {module === MODULES.STUDENTS && (
                        <li>
                            <UploadDrawer schoolId={schoolId} />
                        </li>
                    )}
                </ul>
            )}
        </nav>
    );
};
