import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import type { LoadingState } from "@/types/state";

type Props = ComponentProps<"button"> & {
    children: React.ReactNode;
    state: LoadingState;
    onClick: () => void;
};

export const SubmitButton = ({
    className,
    children,
    state,
    onClick,
}: Props) => {
    return (
        <Button
            className={cn(
                className,
                {
                    idle: "bg-primary",
                    loading: "bg-yellow-500",
                    error: "bg-red-500",
                    success: "bg-green-500",
                }[state] as ButtonProps["variant"]
            )}
            type="submit"
            disabled={state !== "idle"}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
