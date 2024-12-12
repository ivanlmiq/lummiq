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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { Card } from "@/components/ui/card";
import { WEEKDAYS } from "@/lib/constants";
import type { Lesson } from "@prisma/client";
import type { FormFields } from "@/types/forms/generic";

type Props = {
    initialData: Lesson | null;
};

export const LessonForm = ({ initialData }: Props) => {
    const { loading, open, setOpen, onSubmit, onDelete } = useModule({
        module: "lesson",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            day: "",
        },
    });

    const fields: FormFields[] = [
        { name: "name", label: "Name", placeholder: "Math 1" },
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
                            {fields.map(({ name, label, placeholder }) => (
                                <FormField
                                    key={`form-field-${name}`}
                                    control={form.control}
                                    name={name as keyof FormValues}
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
                                                    placeholder={placeholder}
                                                />
                                            </FormControl>

                                            <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <FormField
                                control={form.control}
                                name="day"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">
                                            Class day
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
                                                        placeholder="Select a day"
                                                    >
                                                        <span className="capitalize">
                                                            {field.value.toLowerCase()}
                                                        </span>
                                                    </SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {WEEKDAYS.map((day) => (
                                                    <SelectItem
                                                        key={`day-${day}`}
                                                        value={day}
                                                        className="capitalize"
                                                    >
                                                        {day.toLowerCase()}
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
