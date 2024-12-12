import React from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { Button } from "../../../button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../../drawer";
import { OnboardingWizard } from "./onboarding-wizard";
import type { WizardProgressbarProps } from "@/types/forms/wizard";

type Props = {
    schoolId: string;
    forceOpen?: boolean;
};

export const AddSchoolDrawer = ({ schoolId, forceOpen }: Props) => {
    const title = clsx({
        "Add School": !!schoolId,
        "Edit School": !schoolId,
    });

    const progressStyle = "stepped" as WizardProgressbarProps["progressStyle"];

    return (
        <Drawer open={forceOpen ?? false}>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-auto w-full flex justify-start gap-2 p-1"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                        <Plus className="h-5 w-5" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                        Add school
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        Add a new school or branch to your account
                    </DrawerDescription>
                </DrawerHeader>

                <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                    <OnboardingWizard
                        schoolId={schoolId}
                        progressStyle={progressStyle}
                    />
                </div>

                <DrawerFooter className="flex flex-row justify-end">
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
