"use client";

import { useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { plural } from "pluralize";
import { useModuleStore } from "@/store/module.store";
import { STATIC_API_AREA, STATIC_ROUTES } from "@/lib/routeConfig";
import { useGlobalStore } from "@/store/global.store";
import type { TeacherRole } from "@prisma/client";

type Props = {
    module: string;
    isEdit: boolean;
    avoidRedirect?: boolean;
    avoidRefresh?: boolean;
    refreshToId?: boolean;
    id?: string;
};

export const useModule = ({
    module,
    isEdit = false,
    avoidRedirect = false,
    avoidRefresh = false,
    refreshToId = false,
    id,
}: Props) => {
    const [isPending, startTransition] = useTransition();
    const { user, checkPermission } = useGlobalStore((state) => state);
    const router = useRouter();
    const params = useParams();

    const pluralModuleName = plural(module);
    const moduleName = module.charAt(0).toUpperCase() + module.slice(1);

    const title = isEdit ? `Edit ${module}` : `Create ${module}`;
    const description = isEdit ? `Edit a ${module}.` : `Add a new ${module}`;
    const toastMessage = isEdit
        ? `${moduleName} updated.`
        : `${moduleName} created.`;
    const action = isEdit ? "Save changes" : "Create";
    const state = useModuleStore((state) => state);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async <T extends Record<string, any>>(data: T) => {
        try {
            state.setLoading("loading");

            if (isEdit) {
                await axios.patch(
                    `${STATIC_API_AREA.api}/${params.schoolId}/${module}/${params.id}`,
                    data
                );
            } else {
                const response = await axios.post(
                    `${STATIC_API_AREA.api}/${params.schoolId}/${module}`,
                    data
                );

                if (refreshToId) {
                    router.push(
                        `${STATIC_ROUTES.dashboard}/${params.schoolId}/${pluralModuleName}/${response.data?.id}`
                    );
                    return;
                }
            }

            startTransition(() => {
                if (!avoidRedirect)
                    router.push(
                        `${STATIC_ROUTES.dashboard}/${params.schoolId}/${pluralModuleName}`
                    );

                toast.success(toastMessage);
            });
            startTransition(() => {
                if (!avoidRefresh) router.refresh();
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            if (
                axios.isAxiosError(error) &&
                typeof error.response?.data === "string"
            )
                toast.error(error.response.data as string);
            else toast.error("Something went wrong.");

            setTimeout(() => {
                state.setLoading("idle");
            }, 3000);
        } finally {
            state.setLoading("idle");
        }
    };

    const onDelete = async () => {
        try {
            state.setLoading("loading");

            await axios.delete(
                `${STATIC_API_AREA.api}/${params.schoolId}/${module}/${
                    id ?? params.id
                }`
            );

            startTransition(() => {
                if (!avoidRedirect)
                    router.push(
                        `${STATIC_ROUTES.dashboard}/${params.schoolId}/${pluralModuleName}`
                    );

                toast.success(`${moduleName} deleted.`);
            });

            startTransition(() => {
                if (!avoidRefresh) router.refresh();
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Something went wrong.");
            state.setLoading("error");

            setTimeout(() => {
                state.setLoading("idle");
            }, 3000);
        } finally {
            state.setLoading("idle");
            state.setOpen(false);
        }
    };

    const allowedToEdit = isEdit
        ? checkPermission("UPDATE", pluralModuleName)
        : checkPermission("CREATE", pluralModuleName);

    const allowToDelete = checkPermission("DELETE", module);

    return {
        ...state,
        allowedToEdit,
        allowToDelete,
        isPending,
        title,
        description,
        toastMessage,
        action,
        router,
        params,
        pluralModuleName,
        onSubmit,
        onDelete,
    };
};
