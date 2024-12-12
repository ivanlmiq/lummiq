import React from "react";
import { useGlobalStore } from "@/store/global.store";
import { Badge } from "@/components/ui/badge";
import type { SearchStudent } from "@/types/schemas/students";

type Props = {
  data: SearchStudent;
};

export const StudentCell = ({ data }: Props) => {
  const { user } = useGlobalStore((state) => state);

  return (
    <div className="flex items-center gap-x-2">
      <span>{data.name}</span>
      {data.id === user?.id && <Badge variant="default">You</Badge>}
    </div>
  );
};
