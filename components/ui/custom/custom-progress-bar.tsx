import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const DefaultProgressBar: React.FC<ProgressBarProps> = ({
    currentStep,
    totalSteps,
}) => (
    <Progress
        value={((currentStep + 1) / totalSteps) * 100}
        className="mb-4"
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
    />
);

export const SteppedProgressBar: React.FC<ProgressBarProps> = ({
    currentStep,
    totalSteps,
}) => (
    <div
        className="flex justify-between gap-1 mb-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep + 1}
    >
        {Array.from({ length: totalSteps }, (_, i) => (
            <div
                key={i}
                className={`w-full h-2 rounded ${
                    i <= currentStep ? "bg-primary" : "bg-gray-200"
                }`}
                aria-hidden="true"
            />
        ))}
    </div>
);

export const NumberedProgressBar: React.FC<ProgressBarProps> = ({
    currentStep,
    totalSteps,
}) => (
    <div
        className="flex justify-between mb-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep + 1}
    >
        {Array.from({ length: totalSteps }, (_, i) => (
            <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-600"
                }`}
                aria-label={`Step ${i + 1} ${
                    i < currentStep
                        ? "completed"
                        : i === currentStep
                        ? "current"
                        : ""
                }`}
            >
                {i + 1}
            </div>
        ))}
    </div>
);
