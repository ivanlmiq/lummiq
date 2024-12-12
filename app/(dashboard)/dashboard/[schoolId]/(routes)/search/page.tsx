import React from "react";
import prisma from "@/lib/prisma";
import { StudentView } from "@/components/features/search/students/view";
import { ParentOrTeacherView } from "@/components/features/search/view";
import type { SearchStudent } from "@/types/schemas/students";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    schoolId: string;
  };
  searchParams: {
    query?: string;
  };
}) {
  const { schoolId } = params;
  const { query } = searchParams;

  const data = schoolId
    ? (
      await Promise.all([
        prisma.student.findMany({
          where: {
            schoolId: schoolId,
            ...(query && {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { pin: { contains: query, mode: "insensitive" } },
              ],
            }),
          },
          include: { grade: { select: { level: true } } },
          orderBy: { createdAt: "desc" },
        }).then(res =>
          res.map((student) => ({
            ...student,
            source: "students",
          }))
        ),
        prisma.parent.findMany({
          where: {
            schoolId: schoolId,
            ...(query && {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            }),
          },
        }).then(res =>
          res.map(parent => ({
            ...parent,
            source: "parents",
          }))
        ),
        prisma.teacher.findMany({
          where: {
            schoolId: schoolId,
            ...(query && {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            }),
          },
        }).then(res =>
          res.map(teacher => ({
            ...teacher,
            source: "teachers",
          }))
        ),
      ])
    ).flat()
    : [];


  const students = data.filter(item => item.source === "students");
  const teachersOrParents = data.filter((item) => item.source === "teachers" || item.source === "parents");

  return (
    <>
      {students.length > 0 && <StudentView data={students as SearchStudent[]} />}
      {teachersOrParents.length > 0 && <ParentOrTeacherView data={teachersOrParents} />}
    </>
  );

}
