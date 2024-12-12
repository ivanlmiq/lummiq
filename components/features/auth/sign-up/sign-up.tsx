/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
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
import { formSchema, FormValues } from "./schema";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import type { LoadingState } from "@/types/state";

export const SignUp = () => {
    const router = useRouter();
    const [state, setState] = useState<LoadingState>("idle");
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const setErrorMessage = (error: string) => {
        setState("error");
        toast.error(error);

        setTimeout(() => {
            setState("idle");
        }, 2000);
    };

    const onSubmit = async ({
        name,
        email,
        password,
        confirmPassword,
    }: FormValues) => {
        try {
            setState("loading");

            if (password !== confirmPassword) {
                toast.error("Passwords do not match. Please try again.");
                return;
            }

            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const login = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (login?.error) {
                    setErrorMessage(login.error);
                    return;
                }

                setState("success");
                router.push(STATIC_ROUTES.dashboard);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <Form {...form}>
            <div className="grid gap-2 text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Enter your information below to create an account
                </p>
            </div>

            <form className="grid gap-2">
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex: John Doe"
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ex: John Doe"
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
                                <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                    Password
                                </FormLabel>
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

                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1 block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </FormLabel>
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
                            idle: "Sign Up",
                            loading: "Signing Up...",
                            error: "Oops! Something went wrong.",
                            success: "Signed Up!",
                        }[state]
                    }
                </SubmitButton>
            </form>

            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href={STATIC_ROUTES.signin} className="underline">
                    Sign in
                </Link>
            </div>
        </Form>
    );
};
