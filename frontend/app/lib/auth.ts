import { redirect } from "react-router";

export function requireAuth() {
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      throw redirect("/auth/login");
    }
  }
  return null;
}
