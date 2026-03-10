import type { User } from "next-auth";
import { SidebarHistory } from "@/components/sidebar/sidebar-history";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export function OperationsSection({ user }: { user: User | undefined }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Operations
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarHistory user={user} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
