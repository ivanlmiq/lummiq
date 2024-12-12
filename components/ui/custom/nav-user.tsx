import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { SidebarItemsWithIcon } from "../../sidebar/types/types";
import type { Session } from "next-auth";

type Props = {
    user: Session["user"];
    links: SidebarItemsWithIcon[];
};

export function NavUser({ links, user }: Props) {
    const avatar = "https://avatars.githubusercontent.com/u/69819367?v=4";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
                <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
                    <Avatar className="h-7 w-7 rounded-md border">
                        <AvatarImage
                            src={avatar}
                            alt={user.name}
                            className="animate-in fade-in-50 zoom-in-90"
                        />
                        <AvatarFallback className="rounded-md">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 leading-none">
                        <div className="font-medium">{user.name}</div>
                        <div className="overflow-hidden text-xs text-muted-foreground">
                            <div className="line-clamp-1">{user.email}</div>
                            <div className="line-clamp-1 capitalize">
                                {user?.role?.toLowerCase()}
                            </div>
                        </div>
                    </div>
                    <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                side="right"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
                        <Avatar className="h-7 w-7 rounded-md">
                            <AvatarImage src={avatar} alt={user.name} />
                            <AvatarFallback>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1">
                            <div className="font-medium">{user.name}</div>
                            <div className="overflow-hidden text-xs text-muted-foreground">
                                <div className="line-clamp-1">{user.email}</div>
                                <div className="line-clamp-1 capitalize">
                                    {user?.role?.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {links.map(({ name, url, icon: Icon }, index) => (
                        <DropdownMenuItem key={`user-link-${index}`}>
                            <Link
                                href={url}
                                className="w-full flex items-center gap-2"
                            >
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                {name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="gap-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
