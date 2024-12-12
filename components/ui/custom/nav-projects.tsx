import Link from "next/link";
import { PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SidebarProjectItems } from "../../sidebar/types/types";

export function NavProjects({
    projects,
    className,
}: {
    projects: SidebarProjectItems[];
} & React.ComponentProps<"ul">) {
    return (
        <ul className={cn("grid gap-0.5", className)}>
            {projects.map((item) => (
                <li
                    key={item.name}
                    className="has-[[data-state=open]]:bg-accent has-[[data-state=open]]:text-accent-foreground group relative rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                    <Link
                        href={item.url}
                        className="flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                    >
                        <PlusSquare className="h-4 w-4 shrink-0 translate-x-0.5 text-muted-foreground" />
                        <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium">
                            {item.name}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
