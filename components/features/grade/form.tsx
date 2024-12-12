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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Grade, GradeCategory } from "@prisma/client";
import type { FormFields } from "@/types/forms/generic";

type Props = {
    initialData: Grade | null;
    categories: GradeCategory[];
};

export const GradeForm = ({ initialData, categories }: Props) => {
    const { loading, open, setOpen, onSubmit, onDelete } = useModule({
        module: "grade",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            level: "",
            gradeCategoryId: "",
        },
    });

    const fields: FormFields[] = [
        { name: "level", label: "Level name", placeholder: "1N" },
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

                            <FormField
                                control={form.control}
                                name="gradeCategoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">
                                            Grade category
                                        </FormLabel>
                                        <Select
                                            disabled={loading === "loading"}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="capitalize"
                                                        placeholder="Select a category"
                                                    >
                                                        {categories.find(
                                                            (c) =>
                                                                c.id ===
                                                                field.value
                                                        )?.name ||
                                                            "Select category"}
                                                    </SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                        className="capitalize"
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                    </FormItem>
                                )}
                            />
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
