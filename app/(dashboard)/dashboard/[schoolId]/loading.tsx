import { DotLoader } from "@/components/ui/dot-loader";

export default function Loading() {
    return (
        <section className="w-full flex items-center justify-center py-40">
            <DotLoader />
        </section>
    );
}
