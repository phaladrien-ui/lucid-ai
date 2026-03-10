"use client";

import { FolderRootIcon, RocketIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResourcesSectionProps {
  permissions: {
    canUseWorkspace: boolean;
    canUseDeployments: boolean;
    canUseRecruitment: boolean;
    isConnected: boolean;
  };
}

export function ResourcesSection({ permissions }: ResourcesSectionProps) {
  const router = useRouter();

  const handleRecruitmentClick = (e: React.MouseEvent) => {
    if (!permissions.isConnected) {
      e.preventDefault();
      // Rediriger vers la page de connexion avec retour
      router.push("/login?redirect=/recruitment");
    }
    // Si connecté, le Link gère la navigation normalement
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Resources
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* WORKSPACE - grisé si non connecté */}
          <SidebarMenuItem>
            {permissions.canUseWorkspace ? (
              <SidebarMenuButton asChild>
                <Link className="flex items-center gap-2" href="/projects">
                  <FolderRootIcon size={16} />
                  <span className="text-sm font-medium">Workspace</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    className="opacity-50 cursor-not-allowed text-muted-foreground"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FolderRootIcon size={16} />
                    <span className="text-sm font-medium">Workspace</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sign in to access your workspace
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>

          {/* DEPLOYMENTS - grisé si non connecté */}
          <SidebarMenuItem>
            {permissions.canUseDeployments ? (
              <SidebarMenuButton asChild>
                <Link className="flex items-center gap-2" href="/deployments">
                  <RocketIcon size={16} />
                  <span className="text-sm font-medium">Deployments</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    className="opacity-50 cursor-not-allowed text-muted-foreground"
                    onClick={(e) => e.preventDefault()}
                  >
                    <RocketIcon size={16} />
                    <span className="text-sm font-medium">Deployments</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sign in to deploy your project
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>

          {/* RECRUITMENT - toujours visible et cliquable */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                className="flex items-center gap-2"
                href="/recruitment"
                onClick={handleRecruitmentClick}
              >
                <UserPlusIcon size={16} />
                <span className="text-sm font-medium">Recruitment</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
