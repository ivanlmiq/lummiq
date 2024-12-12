import React from "react";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode;
    allowedToEdit: boolean;
};

export const PermissionFormProvider = ({ allowedToEdit, children }: Props) => {
    const router = useRouter();

    React.useEffect(() => {
        console.log("allowedToEdit", allowedToEdit);
        if (!allowedToEdit) {
            router.push("/404");
        }
    }, []);

    if (!allowedToEdit) return null;

    return <>{children}</>;
};
