"use client";

import { UsersIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollectiveSectionProps {
  permissions: {
    canUseNewSession: boolean;
  };
}

export function CollectiveSection({ permissions }: CollectiveSectionProps) {
  const { setOpenMobile } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        if (permissions.canUseNewSession) {
          router.push("/");
          router.refresh();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, permissions.canUseNewSession]);

  const handleClick = () => {
    if (permissions.canUseNewSession) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Collective Suite
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {permissions.canUseNewSession ? (
              <SidebarMenuButton asChild onClick={handleClick}>
                <Link className="flex items-center gap-2" href="/">
                  <UsersIcon size={16} />
                  <span className="text-sm font-medium">New Session</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    className="opacity-50 cursor-not-allowed text-muted-foreground"
                    onClick={(e) => e.preventDefault()}
                  >
                    <UsersIcon size={16} />
                    <span className="text-sm font-medium">New Session</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sign in to create a new session
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
