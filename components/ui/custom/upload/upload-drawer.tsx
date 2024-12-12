"use client";

import React, { useState } from "react";
import { Upload, Download } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTrigger,
} from "../../drawer";
import { Button } from "../../button";
import { Input } from "../../input";
import { Label } from "../../label";
import { downloadExcelTemplate } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
    schoolId: string;
};

export const UploadDrawer = ({ schoolId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("schoolId", schoolId);

        try {
            const response = await fetch(`/api/${schoolId}/upload`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();

                router.refresh();
                setIsOpen(false);

                console.log("Upload successful:", result);
            } else {
                const errorText = await response.text();
                setIsOpen(false);
                console.error("Error:", errorText);
            }
        } catch (error) {
            setIsOpen(false);
            console.error("Upload error:", error);
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <Button variant="secondary" onClick={() => setIsOpen(true)}>
                    <Upload size={16} className="mr-2" />
                    Upload students
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Upload Students
                    </h2>
                    <DrawerDescription className="grid gap-8 pt-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <Button
                                onClick={downloadExcelTemplate}
                                className="flex items-center gap-2 w-full md:w-auto"
                            >
                                <Download size={16} />
                                Download Template
                            </Button>
                            <p className="text-sm text-gray-600">
                                Use this template to organize your student data
                                for upload.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="upload-file"
                                    className="text-sm font-medium text-gray-800"
                                >
                                    Upload Excel File
                                </Label>
                                <Input
                                    id="upload-file"
                                    type="file"
                                    accept=".xlsx"
                                    onChange={handleFileUpload}
                                    className="h-auto mt-2 file:mr-4 file:rounded-md file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-500"
                                />
                            </div>
                            <p className="text-sm text-gray-600">
                                Select an Excel file to upload student
                                information.
                            </p>
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};
