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
                    src="https://ui.shadcn.com/placeholder.svg"
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
