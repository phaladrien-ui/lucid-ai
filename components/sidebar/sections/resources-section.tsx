import { FolderRootIcon, RocketIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
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
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Resources
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Workspace - grisé si non connecté */}
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
                  <SidebarMenuButton className="opacity-50 cursor-not-allowed text-muted-foreground">
                    <FolderRootIcon size={16} />
                    <span className="text-sm font-medium">Workspace</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent>
                  Connectez-vous pour accéder à votre workspace
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>

          {/* Deployments - grisé si non connecté */}
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
                  <SidebarMenuButton className="opacity-50 cursor-not-allowed text-muted-foreground">
                    <RocketIcon size={16} />
                    <span className="text-sm font-medium">Deployments</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent>
                  Connectez-vous pour déployer votre projet
                </TooltipContent>
              </Tooltip>
            )}
          </SidebarMenuItem>

          {/* Recruitment - TOUJOURS visible et cliquable */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                className="flex items-center gap-2"
                href="/recruitment"
                onClick={(e) => {
                  if (!permissions.isConnected) {
                    e.preventDefault();
                    // Rediriger vers login ou montrer un modal
                    window.location.href = "/login?redirect=/recruitment";
                  }
                }}
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
