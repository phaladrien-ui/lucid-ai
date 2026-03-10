import type { User } from "next-auth";
import { SidebarUserNav } from "@/components/sidebar/sidebar-user-nav";
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar";

export function SidebarFooter({ user }: { user: User | undefined }) {
  return (
    <UISidebarFooter>{user && <SidebarUserNav user={user} />}</UISidebarFooter>
  );
}
