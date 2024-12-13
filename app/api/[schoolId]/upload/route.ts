import { Workbook } from "exceljs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hash } from "bcrypt";
import { Genre } from "@prisma/client";
import { generateWordBasedPassword } from "@/lib/utils";

export type StudentUpload = {
    name: string;
    email: string;
    genre: Genre;
    pin: string;
    phone: string;
    password: string;
    schoolId: string;
};

export async function POST(
    req: Request,
    { params }: { params: Promise<PageParams> }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { schoolId } = await params;

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const providedSchoolId =
            formData.get("schoolId")?.toString() || schoolId;

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        if (!providedSchoolId) {
            return new NextResponse("Missing schoolId", { status: 400 });
        }

        if (!file.type.includes("excel") && !file.name.endsWith(".xlsx")) {
            return new NextResponse(
                "Invalid file type. Please upload an Excel file.",
                { status: 400 }
            );
        }

        const workbook = new Workbook();
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        /* eslint-disable @typescript-eslint/no-explicit-any */
        await workbook.xlsx.load(fileBuffer as any);
        const worksheet = workbook.getWorksheet(1);

        if (!worksheet) {
            return new NextResponse("Invalid Excel file. No worksheet found.", {
                status: 400,
            });
        }

        const studentsUpload: StudentUpload[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;

            const name = row.getCell(1).value?.toString()?.trim();
            const email = row.getCell(2).value?.toString()?.trim();
            const pin = row.getCell(3).value?.toString()?.trim();
            const phone = row.getCell(4).value?.toString()?.trim();
            const genreValue = row.getCell(5).value?.toString()?.trim();

            if (!name || !email || !pin || !phone || !genreValue) {
                throw new NextResponse(`Missing data in row ${rowNumber}`, {
                    status: 400,
                });
            }

            if (!Object.values(Genre).includes(genreValue as Genre)) {
                throw new NextResponse(
                    `Invalid genre in row ${rowNumber}. Must be "Male" or "Female".`,
                    { status: 400 }
                );
            }

            const genre = genreValue as Genre;

            const password = generateWordBasedPassword(2, {
                separator: "_",
                randomCase: true,
            });

            studentsUpload.push({
                name,
                email,
                genre,
                pin,
                phone,
                password,
                schoolId: providedSchoolId,
            });
        });

        for (const student of studentsUpload) {
            student.password = await hash(student.password, 10);
        }

        const result = await prisma.student.createMany({
            data: studentsUpload,
            skipDuplicates: true,
        });

        return NextResponse.json({
            message: `${result.count} students uploaded successfully.`,
        });
    } catch (error) {
        console.error("[STUDENTS_UPLOAD_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
