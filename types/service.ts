import { School, Teacher } from "@prisma/client";

export type AuthTeacher =
    | (Teacher & {
          schools: Pick<School, "id" | "name">[];
      })
    | null;
