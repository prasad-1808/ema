import { useLocation, NavLink } from "react-router";
import { useState, useEffect } from "react";
import { Home, ChevronDown, Heart, Camera, LogOut } from "lucide-react";
import { cn } from "~/lib/utils";
import { getUserEvents } from "~/lib/api";
import { getStoredUser, clearAuth } from "~/lib/auth";
import type { UserEvent } from "~/lib/types";

export function AppSidebar() {
  const location = useLocation();
  const [eventsExpanded, setEventsExpanded] = useState(true);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) return;
    getUserEvents(user.user_id).then(setUserEvents).catch(() => {});
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <NavLink to="/home" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary/20" />
          <span className="font-serif text-xl font-semibold text-sidebar-foreground">
            Wedding Memories
          </span>
        </NavLink>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )
              }
            >
              <Home className="h-4 w-4" />
              Home
            </NavLink>
          </li>

          {userEvents.length > 0 && (
            <li>
              <button
                onClick={() => setEventsExpanded(!eventsExpanded)}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname.startsWith("/events")
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <span className="flex items-center gap-3">
                  <Camera className="h-4 w-4" />
                  Events
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    eventsExpanded && "rotate-180"
                  )}
                />
              </button>

              {eventsExpanded && (
                <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-border space-y-1">
                  {userEvents.flatMap(({ event }) => {
                    const links: { label: string; path: string }[] = [];
                    if (event.has_marriage)
                      links.push({ label: `${event.event_name} · Marriage`, path: `/events/${event.event_id}/marriage` });
                    if (event.has_engagement)
                      links.push({ label: `${event.event_name} · Engagement`, path: `/events/${event.event_id}/engagement` });
                    if (event.has_reception)
                      links.push({ label: `${event.event_name} · Reception`, path: `/events/${event.event_id}/reception` });
                    return links;
                  }).map(({ label, path }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-primary font-medium"
                              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        <p className="text-xs text-muted-foreground text-center">Made with love</p>
      </div>
    </aside>
  );
}
