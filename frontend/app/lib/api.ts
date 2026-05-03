import type { User, Event, UserEvent, PaginatedResponse } from "./types";

const DEFAULT_API_BASE_URL = "http://localhost:8000";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) return DEFAULT_API_BASE_URL;
  return trimTrailingSlash(configured);
}

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(buildApiUrl(path), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error("API error"), { status: res.status, data: err });
  }
  return res.json();
}

// Users
export const findUserByEmail = (email: string) =>
  apiFetch<PaginatedResponse<User>>(`/api/users/?user_email=${encodeURIComponent(email)}`);

export const createUser = (body: Omit<User, "user_id" | "created_at">) =>
  apiFetch<User>("/api/users/", { method: "POST", body: JSON.stringify(body) });

// User events (dashboard)
export const getUserEvents = (userId: string) =>
  apiFetch<UserEvent[]>(`/api/users/${userId}/events/`);

// Events
export const getEvent = (eventId: string) =>
  apiFetch<Event>(`/api/events/${eventId}/`);

export const listEvents = () =>
  apiFetch<PaginatedResponse<Event>>("/api/events/");
