import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="lg:grid lg:min-h-[600px] xl:min-h-[100dvh]">
            <div className="w-full lg:grid lg:grid-cols-2">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        {children}
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
        </main>
    );
}
