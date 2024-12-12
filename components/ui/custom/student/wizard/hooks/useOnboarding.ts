import type { Step } from "@/types/forms/wizard";

export const useOnboarding = (schoolId: string) => {
    const isBranchField: Step["fields"] = schoolId
        ? [
              {
                  name: "isBranch",
                  label: "Is this a branch?",
                  type: "switch",
                  required: false,
                  validation: {},
              },
          ]
        : [];

    const steps: Step[] = [
        {
            id: "school-information",
            title: "School Information",
            columns: 2,
            fields: [
                // {
                //     name: "fullName",
                //     label: "Full Name",
                //     type: "text",
                //     required: true,
                //     validation: {
                //         required: "Full name is required",
                //         validate: (value: string) =>
                //             value.trim().split(" ").length > 1 ||
                //             "Please enter both first and last name",
                //     },
                // },
                {
                    name: "name",
                    label: "School name",
                    type: "text",
                    required: false,
                    validation: {
                        required: "School name is required",
                        validate: (value: string) =>
                            value.trim().length >= 2 ||
                            "School name must be at least 2 characters long",
                    },
                },
                {
                    name: "email",
                    label: "Contact Email",
                    type: "email",
                    required: true,
                    validation: {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    },
                },

                {
                    name: "phone",
                    label: "Phone Number",
                    type: "text",
                    required: false,
                    validation: {
                        validate: (value: string) =>
                            value.trim().length >= 10 ||
                            "Phone number must be at least 10 characters long",
                    },
                },
                {
                    name: "address",
                    label: "Address",
                    type: "textarea",
                    required: false,
                    validation: {},
                },
                ...isBranchField,
            ],
        },
        {
            id: "school-config",
            title: "School Configuration",
            columns: 2,
            fields: [
                {
                    name: "schoolType",
                    label: "School Type",
                    type: "radio",
                    options: ["Primary", "Secondary", "Tertiary"],
                    required: true,
                    validation: {
                        required: "School type is required",
                    },
                },
                {
                    name: "schoolCategory",
                    label: "School Category",
                    type: "radio",
                    options: ["Public", "Private"],
                    required: true,
                    validation: {
                        required: "School category is required",
                    },
                },
                {
                    name: "schoolSystem",
                    label: "School System",
                    type: "radio",
                    options: ["British", "American", "Nigerian"],
                    required: true,
                    validation: {
                        required: "School system is required",
                    },
                },
                {
                    name: "schoolLanguage",
                    label: "School Language",
                    type: "radio",
                    options: ["English", "French", "Spanish"],
                    required: true,
                    validation: {
                        required: "School language is required",
                    },
                },
                {
                    name: "schoolCurriculum",
                    label: "School Curriculum",
                    type: "radio",
                    options: ["CBSE", "ICSE", "IGCSE", "IB", "Nigerian"],
                    required: true,
                    validation: {
                        required: "School curriculum is required",
                    },
                },
            ],
        },
        {
            id: "preferences",
            title: "Preferences",
            columns: 3,
            fields: [
                {
                    name: "notifications",
                    label: "Receive Notifications",
                    type: "checkbox",
                    required: false,
                    validation: {},
                },
                {
                    name: "newsletter",
                    label: "Subscribe to Newsletter",
                    type: "checkbox",
                    required: false,
                    validation: {},
                },
            ],
        },
    ];

    return { steps };
};
