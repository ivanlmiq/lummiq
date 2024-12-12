import React from "react";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";
import { useOnboarding } from "./hooks/useOnboarding";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldFactory } from "../../fields/field-factory";
import type { WizardProgressbarProps } from "@/types/forms/wizard";
import { cn } from "@/lib/utils";

const progressBarComponents = {
    default: dynamic(() =>
        import("../../custom-progress-bar").then(
            (mod) => mod.DefaultProgressBar
        )
    ),
    stepped: dynamic(() =>
        import("../../custom-progress-bar").then(
            (mod) => mod.SteppedProgressBar
        )
    ),
    numbered: dynamic(() =>
        import("../../custom-progress-bar").then(
            (mod) => mod.NumberedProgressBar
        )
    ),
};

export const OnboardingWizard = ({
    schoolId,
    progressStyle = "default",
}: WizardProgressbarProps) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const { steps } = useOnboarding(schoolId);
    const stepKeys = Object.keys(steps);
    const methods = useForm<FieldValues>({
        mode: "onBlur",
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: FieldValues) => {
        if (currentStep < stepKeys.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Form submitted:", data);
            // Here you would typically send the data to your backend
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentStepData = steps[currentStep];

    const ProgressBar = progressBarComponents[progressStyle];

    return (
        <Card className="w-3/6">
            <CardHeader>
                <CardTitle>{currentStepData.title}</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <ProgressBar
                            currentStep={currentStep}
                            totalSteps={stepKeys.length}
                        />
                        <section
                            className={cn("grid gap-2 grid-cols-1", {
                                "md:grid-cols-2": currentStepData.columns === 2,
                                "md:grid-cols-3": currentStepData.columns === 3,
                                "md:grid-cols-4": currentStepData.columns === 4,
                            })}
                        >
                            {currentStepData.fields.map((field) => (
                                <FieldFactory key={field.name} field={field} />
                            ))}
                        </section>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button type="submit">
                            {currentStep === stepKeys.length - 1
                                ? "Submit"
                                : "Next"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};
