import React from "react";
import { School } from "lucide-react";
import { MODULES } from "@/lib/constants";
import { getStudentWithScores } from "@/service/schemas/get-students";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: {
        id: string;
        schoolId: string;
    };
}) {
    const student = await getStudentWithScores(params.id, params.schoolId);

    if (!student) {
        return <p>Student not found</p>;
    }

    return (
        <>
            <div className="space-y-2">
                <figure className="rounded-lg bg-primary inline-flex p-2 text-white">
                    <School size={18} />
                </figure>
                <ListHeader
                    module={MODULES.STUDENTS}
                    lastAction={`${student.name}`}
                />
            </div>
        </>
    );
}
