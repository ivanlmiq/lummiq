import type { Class, Grade, Student as PrismaStudent } from "@prisma/client";

export type Student = Pick<
    PrismaStudent,
    "id" | "status" | "studentStatus" | "name" | "email" | "phone" | "photo"
> & {
    parents: string;
};

export type StudentByGrade = Pick<Grade, "id" | "level"> & {
    students: Student[];
};

export type StudentByClass = Pick<Class, "id" | "name"> & {
    students: Student[];
};

export type SearchStudent = PrismaStudent & {
    grade: Pick<Grade, "level"> | null;
};

export type StudentWithScore = PrismaStudent;