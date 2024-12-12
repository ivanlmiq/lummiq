export type FieldProps = {
    name: string;
    label: string;
    type: string;
    required: boolean;
    validation: {
        required?: string;
        pattern?: {
            value: RegExp;
            message: string;
        };
        validate?: (value: unknown) => boolean | string;
    };
    options?: string[];
};
