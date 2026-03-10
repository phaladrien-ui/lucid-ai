"use client"; // Déjà présent

import { CpuIcon, ShieldCheckIcon } from "lucide-react";
import { useEffect, useState } from "react"; // Ajoute ça
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface TeamSectionProps {
  permissions: {
    canSeeCto: boolean;
  };
}

export function TeamSection({ permissions }: TeamSectionProps) {
  // Solution temporaire : attendre le client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pendant le SSR, on ne rend que le CEO AI (toujours le même)
  if (!isClient) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Team
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-9 w-full transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon
                    className="text-muted-foreground/70"
                    size={16}
                  />
                  <span className="text-sm font-normal tracking-widest text-foreground/90">
                    CEO AI
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  // Sur le client, on rend la version complète avec conditions
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Team
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* CEO AI - toujours visible */}
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 w-full transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon
                  className="text-muted-foreground/70"
                  size={16}
                />
                <span className="text-sm font-normal tracking-widest text-foreground/90">
                  CEO AI
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* CTO AI - visible seulement si connecté */}
          {permissions.canSeeCto && (
            <SidebarMenuItem>
              <SidebarMenuButton className="h-9 w-full transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CpuIcon className="text-muted-foreground/70" size={16} />
                  <span className="text-sm font-normal tracking-widest text-foreground/90">
                    CTO AI
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
