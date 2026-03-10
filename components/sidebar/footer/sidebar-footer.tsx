"use client";

import { KeyboardIcon } from "lucide-react";
import type { User } from "next-auth";
import { useState } from "react";
import { SidebarUserNav } from "@/components/sidebar/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarFooter({ user }: { user: User | undefined }) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <UISidebarFooter>
      <div className="flex items-center justify-between p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 w-8"
              onClick={() => setShowShortcuts(!showShortcuts)}
              size="icon"
              variant="ghost"
            >
              <KeyboardIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Keyboard shortcuts</TooltipContent>
        </Tooltip>

        {user && <SidebarUserNav user={user} />}
      </div>

      {showShortcuts && (
        <div className="p-2 text-xs border-t border-sidebar-border">
          <div className="font-medium mb-1">Keyboard shortcuts</div>
          <div className="grid grid-cols-2 gap-1 text-muted-foreground">
            <span>Ctrl+1</span> <span>CEO AI</span>
            <span>Ctrl+2</span> <span>CTO AI</span>
            <span>Ctrl+N</span> <span>New Session</span>
          </div>
        </div>
      )}
    </UISidebarFooter>
  );
}
