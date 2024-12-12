"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultValues, getTeacherSchema, type FormValues } from "./schema";
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
import { PasswordInput } from "@/components/form/password-input";
import { PhoneInput } from "@/components/form/phone-input";
import type { CustomFields, Teacher } from "@prisma/client";
import type { FormFields } from "@/types/forms/generic";

type Props = {
    initialData: Teacher | null;
    customFields: CustomFields[];
};

const ROLES = ["TEACHER", "TEACHER_ASSISTANT"] as const;

export const TeacherForm = ({ initialData, customFields }: Props) => {
    const { loading, open, setOpen, onSubmit, onDelete } = useModule({
        module: "teacher",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(getTeacherSchema(customFields)),
        defaultValues: initialData
            ? {
                  ...initialData,
                  ...(initialData?.customFields
                      ? JSON.parse(initialData.customFields as string)
                      : {}),
              }
            : getDefaultValues(customFields),
    });

    const fields: FormFields[] = [
        { name: "name", label: "Name", placeholder: "John Doe" },
        { name: "email", label: "Email", placeholder: "jdoe@email.com" },
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

                            <PhoneInput loading={loading} />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">
                                            Type
                                        </FormLabel>
                                        <Select
                                            disabled={loading === "loading"}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="capitalize">
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="capitalize"
                                                        placeholder="Select a role"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {ROLES.map((role) => (
                                                    <SelectItem
                                                        key={role}
                                                        value={role}
                                                        className="capitalize"
                                                    >
                                                        {role}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {customFields.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <h2 className="text-xl font-medium text-zinc-800 col-span-1 md:col-span-3 border-b pb-4 mt-4">
                                    Other information
                                </h2>

                                {customFields.map(
                                    ({ id, name, type, label, required }) => (
                                        <FormField
                                            key={`custom-field-${id}`}
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
                                                            type={type}
                                                            required={required}
                                                            disabled={
                                                                loading ===
                                                                "loading"
                                                            }
                                                            placeholder={label}
                                                        />
                                                    </FormControl>

                                                    <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <h2 className="text-xl font-medium text-zinc-800 col-span-1 md:col-span-3 border-b pb-4 mt-4">
                                Auth Configuration
                            </h2>

                            <PasswordInput loading={loading} />
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
