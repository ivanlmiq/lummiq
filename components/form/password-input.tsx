import React from "react";
import { useFormContext } from "react-hook-form";
import { RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { generateWordBasedPassword } from "@/lib/utils";
import { HintTooltip } from "./hint-tooltip";
import type { LoadingState } from "@/types/state";

type Props = {
    loading: LoadingState;
};

export const PasswordInput = ({ loading }: Props) => {
    const form = useFormContext();

    const handleGeneratePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const password = generateWordBasedPassword(2, {
            separator: "_",
            randomCase: true,
        });

        form.setValue("password", password);

        navigator.clipboard.writeText(password);
        toast.success("Password copied to clipboard.");
    };

    return (
        <div className="grid grid-cols-3 gap-2 items-end">
            <FormField
                key={`form-field-password`}
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className="col-span-2">
                        <div className="flex items-center gap-2">
                            <FormLabel className="capitalize">
                                Password
                            </FormLabel>

                            <HintTooltip>
                                <p className="text-xs text-gray-500">
                                    <b>Hint:</b> Save this password somewhere
                                    safe. You won&apos;t be able to see it
                                    again.
                                </p>
                            </HintTooltip>
                        </div>
                        <FormControl>
                            <Input
                                {...field}
                                className="disabled:opacity-100"
                                disabled
                            />
                        </FormControl>

                        <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                    </FormItem>
                )}
            />

            <Button
                disabled={loading === "loading"}
                onClick={handleGeneratePassword}
            >
                <RefreshCcw size={18} className="mr-2" />
                Generate
            </Button>
        </div>
    );
};
