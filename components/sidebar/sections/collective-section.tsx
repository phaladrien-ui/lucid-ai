"use client";

import { UsersIcon } from "lucide-react";
import Link from "next/link";
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
              // Version normale (connecté)
              <SidebarMenuButton asChild onClick={handleClick}>
                <Link className="flex items-center gap-2" href="/">
                  <UsersIcon size={16} />
                  <span className="text-sm font-medium">New Session</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              // Version grisée avec tooltip (non connecté)
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
                  Connectez-vous pour créer une nouvelle session
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
