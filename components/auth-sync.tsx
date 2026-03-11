"use client";

import { useAuthSync } from "@/hooks/use-auth-sync";

export function AuthSync() {
  useAuthSync();
  return null;
}
