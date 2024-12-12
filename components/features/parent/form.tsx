"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultValues, getParentSchema, type FormValues } from "./schema";
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
import { PasswordInput } from "@/components/form/password-input";
import { PhoneInput } from "@/components/form/phone-input";
import type { CustomFields, Parent } from "@prisma/client";
import type { FormFields } from "@/types/forms/generic";

type Props = {
    initialData: Parent | null;
    customFields: CustomFields[];
};

export const ParentForm = ({ initialData, customFields }: Props) => {
    const { loading, open, setOpen, onSubmit, onDelete } = useModule({
        module: "parent",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(getParentSchema(customFields)),
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
        { name: "address", label: "Address", placeholder: "123 Main St" },
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
                    <form className="space-y-8 w-full">
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
