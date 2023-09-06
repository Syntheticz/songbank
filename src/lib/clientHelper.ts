"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (session.status === "unauthenticated") router.push("/login");
  }
}
