import React from "react";
import { BadgeInfo } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

type Props = {
    children: React.ReactNode;
};

export const HintTooltip = ({ children }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    className="flex items-center"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <BadgeInfo className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>{children}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
