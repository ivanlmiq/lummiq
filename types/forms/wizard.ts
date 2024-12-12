export type StepField = {
    name: string;
    label: string;
    type:
        | "text"
        | "email"
        | "password"
        | "textarea"
        | "checkbox"
        | "radio"
        | "switch";
    required: boolean;
    options?: string[];
    validation: {
        required?: string;
        minLength?: { value: number; message: string };
        maxLength?: { value: number; message: string };
        pattern?: { value: RegExp; message: string };
        validate?: (value: string) => boolean | string;
    };
};

export type Step = {
    id: string;
    title: string;
    columns?: number;
    fields: StepField[];
};

export type WizardProgressbarProps = {
    schoolId: string;
    progressStyle?: "default" | "stepped" | "numbered";
};
