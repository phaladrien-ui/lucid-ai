"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useSidebarPreference(key: string, defaultValue: boolean) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Charger la préférence
  useEffect(() => {
    // Attendre que la session soit chargée
    if (status === "loading") {
      return;
    }

    const loadPreference = async () => {
      try {
        // 1. D'abord, essayer de charger depuis le localStorage (pour les invités)
        const localSaved = localStorage.getItem(`sidebar:${key}`);
        let loadedValue: boolean | null = null;

        // 2. Si utilisateur connecté, charger depuis l'API (ça écrase le localStorage)
        if (session?.user) {
          try {
            const response = await fetch(`/api/user/preferences?key=${key}`);
            if (response.ok) {
              const data = await response.json();
              loadedValue = data.value;

              // Sauvegarder aussi en localStorage pour le fallback
              if (loadedValue !== null && loadedValue !== undefined) {
                localStorage.setItem(
                  `sidebar:${key}`,
                  JSON.stringify(loadedValue)
                );
              }
            }
          } catch {
            console.error("Failed to load from API, using localStorage:");
          }
        }

        // 3. Si pas de valeur de l'API, utiliser localStorage ou defaultValue
        if (loadedValue === null || loadedValue === undefined) {
          if (localSaved !== null) {
            loadedValue = JSON.parse(localSaved) as boolean;
          } else {
            loadedValue = defaultValue;
          }
        }

        // 4. Mettre à jour l'état
        setIsOpen(loadedValue);
      } catch {
        console.error("Failed to load preference:");
        setIsOpen(defaultValue);
      } finally {
        setIsLoading(false);
        setHasLoaded(true);
      }
    };

    loadPreference();
  }, [key, session, status, defaultValue]);

  // Sauvegarder quand ça change
  const setPreference = async (newValue: boolean) => {
    setIsOpen(newValue);

    // Toujours sauvegarder en localStorage (pour les invités ET comme backup)
    localStorage.setItem(`sidebar:${key}`, JSON.stringify(newValue));

    // Si connecté, sauvegarder aussi en base
    if (session?.user) {
      try {
        await fetch("/api/user/preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value: newValue }),
        });
      } catch {
        console.error("Failed to save to API:");
      }
    }
  };

  return { isOpen, setPreference, isLoading, hasLoaded };
}
