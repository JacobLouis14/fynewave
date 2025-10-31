"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { hasAccessToPath } from "@/utils/hasAccess";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // Check if token is expired
  const isTokenExpired = (token?: string): boolean => {
    if (!token) return true;

    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token", error);
      return true;
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const token = session?.user?.token;
      const expired = isTokenExpired(token);

      if (expired) {
        signOut({ callbackUrl: "/", redirect: true });
      }
    }
  }, [session, status]);

  // Still loading session
  if (status === "loading") {
    return null;
  }

  // Not authenticated
  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  // Access control check
  const userRole = session?.user?.role || "";

  if (!hasAccessToPath(pathname, userRole)) {
    router.replace("/unauthorized");
    return null;
  }

  // All good
  return <>{children}</>;
};

export default AuthGuard;
