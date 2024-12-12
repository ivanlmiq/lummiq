import { PrismaClient } from "@prisma/client";

const statusGlobalFilter = ["Teacher", "Student", "Parent", "Announcement", "Grade"];

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
prisma.$use(async (params, next) => {
    if (
        statusGlobalFilter.includes(params.model as string) &&
        params.action === "findMany"
    ) {
        if (!params.args) params.args = {};
        if (!params.args.where) params.args.where = {};

        params.args.where.status = params.args.where.status || "ACTIVE";
    }

    return next(params);
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
