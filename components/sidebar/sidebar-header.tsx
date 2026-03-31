"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { OrionLogo } from "@/components/icons/orion-logo";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarHeaderProps {
  user: User | undefined;
  onDeleteAll: () => void;
}

export function SidebarHeader({ user, onDeleteAll }: SidebarHeaderProps) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <div className="flex items-center justify-between px-2 pb-4">
      <Link
        className="flex items-center gap-3"
        href="/"
        onClick={() => {
          setOpenMobile(false);
        }}
      >
        <OrionLogo size={22} />
        <span className="font-semibold text-lg tracking-tight">Lucid Ai</span>
      </Link>

      <div className="flex items-center gap-1">
        {user && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push("/");
                    router.refresh();
                  }}
                  variant="ghost"
                >
                  <PlusIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Session (Ctrl+K)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-8 w-8 p-0"
                  onClick={onDeleteAll}
                  variant="ghost"
                >
                  <TrashIcon className="text-muted-foreground" size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete all chats</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
}
