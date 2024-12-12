"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { formSchema, FormValues } from "./schema";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import type { LoadingState } from "@/types/state";

export const SignIn = () => {
    const router = useRouter();
    const [state, setState] = useState<LoadingState>("idle");
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    const setErrorMessage = (error: string) => {
        setState("error");
        toast.error(error);

        setTimeout(() => {
            setState("idle");
        }, 2000);
    };

    const onSubmit = async ({ email, password }: FormValues) => {
        try {
            setState("loading");

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setErrorMessage("Invalid email or password. Please try again.");
                return;
            }

            setState("success");
            router.push(STATIC_ROUTES.dashboard);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <Form {...form}>
            <div className="grid gap-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <form className="grid gap-4">
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex: johndoe@mail.com"
                                        className="form-input w-full !px-4"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                        Password
                                    </FormLabel>
                                    <Link
                                        href="/store/forgot-password"
                                        className="text-blue-600 text-sm lg:text-sm"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="form-input w-full !px-4"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <SubmitButton
                    state={state}
                    onClick={form.handleSubmit(onSubmit)}
                >
                    {
                        {
                            idle: "Sign In",
                            loading: "Signing In...",
                            error: "Oops! Something went wrong.",
                            success: "Signed In!",
                        }[state]
                    }
                </SubmitButton>
            </form>

            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={STATIC_ROUTES.signup} className="underline">
                    Sign up
                </Link>
            </div>
        </Form>
    );
};
