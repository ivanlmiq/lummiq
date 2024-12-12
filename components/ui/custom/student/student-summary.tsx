"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTrigger,
} from "../../drawer";
import { Button } from "../../button";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { cn, getInitials } from "@/lib/utils";
import type { Student } from "@/types/schemas/students";

type Props = {
    student: Student;
};

export const StudentSummary = ({ student }: Props) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant="link" className="px-0">
                    View profile
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerDescription className="flex flex-col gap-4 pt-8">
                        <section className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-20 px-0 xl:px-8 justify-center md:justify-start">
                            <figure className="relative flex justify-center items-center">
                                <Avatar className="size-52">
                                    <AvatarImage
                                        src={student.photo ?? ""}
                                        className="size-52"
                                    />
                                    <AvatarFallback>
                                        {getInitials(student?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </figure>

                            <div className="flex flex-col">
                                <span
                                    className={cn(
                                        "capitalize text-white px-2 py-1 rounded-full w-fit text-sm",
                                        {
                                            "bg-green-500":
                                                student.studentStatus ===
                                                "ACTIVE",
                                            "bg-yellow-500":
                                                student.studentStatus ===
                                                "SUSPENDED",
                                            "bg-red-500":
                                                student.studentStatus ===
                                                "INACTIVE",
                                            "bg-blue-500":
                                                student.studentStatus ===
                                                    "TRANSFERRED" ||
                                                student.studentStatus ===
                                                    "GRADUATED",
                                        }
                                    )}
                                >
                                    {student.studentStatus?.toLocaleLowerCase()}
                                </span>
                                <h2 className="text-lg text-zinc-950 font-semibold text-center md:text-start">
                                    {student.name} Summary
                                </h2>
                                <div>
                                    <ul className="flex items-center justify-center gap-x-8">
                                        <li className="text-sm text-gray-500 flex items-center gap-x-2">
                                            <Mail size={16} />
                                            <span>{student.email}</span>
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-center gap-x-2">
                                            <Phone size={16} />
                                            <span> {student.phone}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};
