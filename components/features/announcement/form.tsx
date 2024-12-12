"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "./schema";
import { useModule } from "@/hooks/use-module.hook";
import { AlertModal } from "@/components/ui/custom/alert-modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { Card } from "@/components/ui/card";
import type { AnnouncementColumn } from "./columns";
import type { FormFields } from "@/types/forms/generic";

type Props = {
    initialData: AnnouncementColumn | null;
};

export const AnnouncementForm = ({ initialData }: Props) => {
    const {
        // action,
        // title,
        // description,
        loading,
        open,
        setOpen,
        onSubmit,
        onDelete,
    } = useModule({
        module: "announcement",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            content: "",
            date: "",
        },
    });

    const fields: FormFields[] = [
        { name: "title", label: "Title", placeholder: "" },
        { name: "content", label: "Content", placeholder: "" },
    ];

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading === "loading"}
            />

            <Card className="p-4 md:p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {fields.map(({ name, label }) => (
                                <FormField
                                    key={`form-field-${name}`}
                                    control={form.control}
                                    name={`${name}` as keyof FormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={
                                                        loading === "loading"
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        <SubmitButton
                            state={loading}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {
                                {
                                    idle: "Save Changes",
                                    loading: "Saving...",
                                    error: "Oops! Something went wrong.",
                                    success: "Saved successfully!",
                                }[loading]
                            }
                        </SubmitButton>
                    </form>
                </Form>
            </Card>
        </>
    );
};
