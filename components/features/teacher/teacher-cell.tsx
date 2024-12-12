import React from "react";
import { useGlobalStore } from "@/store/global.store";
import { TeacherColumn } from "./columns";
import { Badge } from "@/components/ui/badge";

type Props = {
    data: TeacherColumn;
};

export const TeacherCell = ({ data }: Props) => {
    const { user } = useGlobalStore((state) => state);

    return (
        <div className="flex items-center gap-x-2">
            <span>{data.name}</span>
            {data.id === user?.id && <Badge variant="default">You</Badge>}
        </div>
    );
};
