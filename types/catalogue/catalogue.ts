import type { Class, Grade } from "@prisma/client";

export type CommonCatalogue = { id: string; name: string };

export type GradeCatalogue = Pick<Grade, "id" | "level">;

export type ClassCatalogue = Pick<Class, "id" | "name">;

