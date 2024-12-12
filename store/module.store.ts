import { create } from "zustand";
import type { LoadingState } from "@/types/state";

export type ModuleStore = {
    open: boolean;
    loading: LoadingState;
    setOpen: (open: boolean) => void;
    setLoading: (loading: LoadingState) => void;
};

export const useModuleStore = create<ModuleStore>((set) => ({
    open: false,
    loading: "idle",
    setOpen: (open) => set(() => ({ open })),
    setLoading: (loading: LoadingState) => set(() => ({ loading })),
}));
