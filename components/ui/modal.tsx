"use client";

import React, { ComponentProps, type PropsWithChildren } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./dialog";

type Props = PropsWithChildren &
    ComponentProps<typeof DialogContent> & {
        title: string;
        description: string;
        isOpen: boolean;
        onClose: () => void;
    };

export const Modal = ({
    children,
    className,
    description,
    isOpen,
    title,
    onClose,
}: Props) => {
    const onChange = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className={className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <>{children}</>
            </DialogContent>
        </Dialog>
    );
};
