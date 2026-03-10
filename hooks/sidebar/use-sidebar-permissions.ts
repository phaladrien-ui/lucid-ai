import type { User } from "next-auth";

export function useSidebarPermissions(user: User | undefined) {
  const isConnected = !!user;

  return {
    // Team
    canSeeCto: isConnected,

    // Collective Suite
    canUseNewSession: isConnected,

    // Resources
    canUseWorkspace: isConnected,
    canUseDeployments: isConnected,
    canUseRecruitment: true, // TOUJOURS visible et cliquable !

    // Utils
    isConnected,
  };
}
