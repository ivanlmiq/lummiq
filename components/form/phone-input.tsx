import React from "react";
import { IMaskInput } from "react-imask";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { phoneMasks } from "@/lib/constants";
import type { LoadingState } from "@/types/state";

import "react-international-phone/style.css";

type Props = {
    loading: LoadingState;
};

export const PhoneInput = ({ loading }: Props) => {
    const form = useFormContext();

    const defaultCountry = "US";

    return (
        <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">Phone Number</FormLabel>
                    <FormControl>
                        <IMaskInput
                            {...field}
                            alt="phone"
                            disabled={loading === "loading"}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            mask={phoneMasks[defaultCountry]}
                            placeholder="Phone number"
                        />
                    </FormControl>

                    <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                </FormItem>
            )}
        />
    );
};
