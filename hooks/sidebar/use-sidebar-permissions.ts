import type { User } from "next-auth";
import { guestRegex } from "@/lib/constants";

export function useSidebarPermissions(user: User | undefined) {
  // Si pas de user du tout (cas extrême)
  if (!user) {
    return {
      isConnected: false,
      isGuest: false,
      canSeeCto: false,
      canUseNewSession: false,
      canUseWorkspace: false,
      canUseDeployments: false,
      canUseRecruitment: true, // Toujours visible
    };
  }

  // Détection invité via l'email
  const isGuest = guestRegex.test(user.email ?? "");
  const isConnected = !isGuest; // Connecté = tout sauf invité

  return {
    isConnected,
    isGuest,

    // Team
    canSeeCto: isConnected, // CTO seulement pour connectés

    // Collective Suite
    canUseNewSession: isConnected, // New Session seulement pour connectés

    // Resources
    canUseWorkspace: isConnected,
    canUseDeployments: isConnected,
    canUseRecruitment: true, // TOUJOURS visible pour tous
  };
}
