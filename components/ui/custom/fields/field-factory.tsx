import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Checkbox } from "../../checkbox";
import { Label } from "../../label";
import { RadioGroup, RadioGroupItem } from "../../radio-group";
import { Switch } from "../../switch";
import type { StepField } from "@/types/forms/wizard";

type Props = { field: StepField };

export const FieldFactory = ({ field }: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const renderField = () => {
        switch (field.type) {
            case "text":
            case "email":
            case "password":
                return (
                    <Input
                        type={field.type}
                        id={field.name}
                        {...register(field.name, field.validation)}
                        className={errors[field.name] ? "border-red-500" : ""}
                    />
                );
            case "textarea":
                return (
                    <Textarea
                        id={field.name}
                        {...register(field.name, field.validation)}
                        className={errors[field.name] ? "border-red-500" : ""}
                    />
                );
            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={field.name}
                            {...register(field.name, field.validation)}
                        />
                        <Label htmlFor={field.name}>{field.label}</Label>
                    </div>
                );
            case "radio":
                return (
                    <RadioGroup
                        onValueChange={(value) =>
                            register(field.name).onChange({
                                target: { name: field.name, value },
                            })
                        }
                        defaultValue={field.options?.[0]}
                    >
                        {field.options?.map((option) => (
                            <div
                                className="flex items-center space-x-2"
                                key={option}
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={`${field.name}-${option}`}
                                />
                                <Label htmlFor={`${field.name}-${option}`}>
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            case "switch":
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id={field.name}
                            {...register(field.name, field.validation)}
                        />
                        <Label htmlFor={field.name}>{field.label}</Label>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {field.type !== "checkbox" && field.type !== "switch" && (
                <Label htmlFor={field.name}>{field.label}</Label>
            )}
            {renderField()}
            {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                    {errors[field.name]?.message as string}
                </p>
            )}
        </div>
    );
};
