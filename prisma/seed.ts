import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { SUBJECTS } from "./../lib/constants";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await hash("demo00123", 10);

    await prisma.$transaction(async (tx) => {
        const school = await tx.school.create({
            data: {
                name: "Broward Plantation High School",
                address: "1234 NW 5th Ave, Plantation, FL 33317",
                email: "hello@bws.us",
                phone: "(954) 555-1234",
                logo: "",
                slug: "bphs",
                website: "https://bphs.us",
                userId: "",
            },
        });

        await tx.teacher.create({
            data: {
                name: "Mr. Larry Lenhardt",
                email: "lenhardt_larry@bws.us",
                role: "PRINCIPAL",
                password: hashedPassword,
                status: "ACTIVE",
                schoolId: school.id,
            },
        });

        await tx.customFields.createMany({
            data: [
                {
                    defaultValue: "",
                    isIndexable: true,
                    label: "Religion",
                    min: 1,
                    name: "religion",
                    required: true,
                    schemas: ["student"],
                    type: "string",
                    schoolId: school.id,
                },
                {
                    defaultValue: "",
                    isIndexable: true,
                    label: "Student Badge ID",
                    min: 1,
                    name: "badge",
                    required: true,
                    schemas: ["student"],
                    type: "string",
                    schoolId: school.id,
                },
                {
                    defaultValue: "",
                    isIndexable: true,
                    label: "Shirt Size",
                    min: 1,
                    name: "size",
                    required: true,
                    schemas: ["student", "teacher"],
                    type: "string",
                    schoolId: school.id,
                },
            ],
        });

        const data = SUBJECTS.map((subject) => ({
            name: subject.name,
            schoolId: school.id,
        }));

        await tx.subject.createMany({
            data,
        });
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
