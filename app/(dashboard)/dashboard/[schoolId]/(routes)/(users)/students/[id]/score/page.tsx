import React from "react";
import { School } from "lucide-react";
import { MODULES } from "@/lib/constants";
import { getStudentWithScores } from "@/service/schemas/get-students";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: Promise<PageParamsById>;
}) {
    const { id, schoolId } = await params;
    const student = await getStudentWithScores(id, schoolId);

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
