"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "../input";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { useKeyDown } from "@/hooks/use-key-down";

type Props = {
    schoolId: string | undefined;
};

export const SearchBar = ({ schoolId }: Props) => {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const URL = `${STATIC_ROUTES.dashboard}/${schoolId}/search`;

    useKeyDown(["Enter"], () => {
        if (query) {
            router.push(`${URL}?${new URLSearchParams({ query })}`, {
                scroll: true,
            });
        }
    });

    return (
        <div className="space-y-2">
            <div className="relative">
                <Input
                    id="input-26"
                    className="peer pe-9 ps-9"
                    placeholder="Search students, parents or teachers..."
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    size={30}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Search size={16} strokeWidth={2} />
                </div>

                <Link
                    href={{
                        pathname: URL,
                        query: { query },
                    }}
                    scroll={true}
                >
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Submit search"
                        type="button"
                    >
                        <ArrowRight
                            size={16}
                            strokeWidth={2}
                            className="text-primary"
                            aria-hidden="true"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
};
