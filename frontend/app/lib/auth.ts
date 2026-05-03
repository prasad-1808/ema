import { redirect } from "react-router";
import type { User } from "./types";

export function requireAuth() {
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      throw redirect("/auth/login");
    }
  }
  return null;
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: User) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
}
