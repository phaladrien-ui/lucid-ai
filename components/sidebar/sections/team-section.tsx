"use client";

import { CpuIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        router.push("/ceo");
      }
      if (e.ctrlKey && e.key === "2" && permissions.canSeeCto) {
        e.preventDefault();
        router.push("/cto");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, permissions.canSeeCto]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Team
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-9 w-full transition-colors cursor-pointer"
              onClick={() => router.push("/ceo")}
            >
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

          {permissions.canSeeCto && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-9 w-full transition-colors cursor-pointer"
                onClick={() => router.push("/cto")}
              >
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
