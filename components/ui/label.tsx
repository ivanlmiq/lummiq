"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            textColor: {
                black: "text-black",
                muted: "text-muted-foreground",
            },
        },
        defaultVariants: {
            textColor: "black",
        },
    }
);

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants>
>(({ className, textColor, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        {...props}
        className={cn(labelVariants({ textColor }), className)}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
