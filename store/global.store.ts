import { create } from "zustand";
import { AuthTeacher } from "@/types/service";
import type { Action, School, TeacherRole } from "@prisma/client";
import type { PermissionColumn } from "@/components/features/permissions/column";

export type GlobalStoreState = {
    schoolId: School["id"];
    school: Pick<School, "id" | "name"> | null;
    user: AuthTeacher | null;
    theme: string;
    permissions: PermissionColumn[];
    setTheme: (theme: string) => void;
    setSchool: (
        schoolId: School["id"],
        school: Pick<School, "id" | "name">
    ) => void;
    checkPermission: (
        action: Action,
        schema: string,
        role: TeacherRole
    ) => boolean;
};

export const useGlobalStore = create<GlobalStoreState>((set, get) => ({
    schoolId: "",
    school: null,
    theme: "light",
    user: null,
    permissions: [],
    setTheme: (theme) => set({ theme }),
    setSchool: (schoolId, school) => set({ schoolId, school }),
    checkPermission: (action, schema, role) => {
        const permissions = get().permissions;

        console.log("permissions", permissions);

        if (!permissions.length) return false;

        // Validate if role has ALL permission
        const hasAllPermission = permissions.some(
            (p: PermissionColumn) => p.action === "ALL" && p.role === role
        );

        if (hasAllPermission) return true;

        // Validate if role has permission for specific action and schema
        const foundPermission: boolean = permissions.some(
            (p: PermissionColumn) =>
                p.action === action && p.schema === schema && p.role === role
        );

        return foundPermission;
    },
}));
