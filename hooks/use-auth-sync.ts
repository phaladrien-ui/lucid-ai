"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useAuthSync() {
  const { update } = useSession();

  useEffect(() => {
    // Vérifier qu'on est bien côté client
    if (typeof window === "undefined") {
      return; // ← Bloc if avec accolades
    }

    // Créer un canal de communication entre onglets
    const channel = new BroadcastChannel("auth_sync");

    // Écouter les messages des autres onglets
    channel.onmessage = (event) => {
      if (event.data.type === "AUTH_CHANGED") {
        // Forcer la mise à jour de la session
        update();
        // Recharger la page pour être sûr
        window.location.reload();
      }
    };

    // Nettoyer
    return () => channel.close();
  }, [update]);
}
