import Image from "next/image";
import { SignIn } from "../../features/auth/sign-in/sign-in";

export default function Auth() {
    return (
        <div className="w-full lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <SignIn />
                </div>
            </div>

            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image"
                    width="1920"
                    height="1080"
                    draggable={false}
                    className="select-none h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
