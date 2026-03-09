
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { cn } from "~/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <span className="font-serif text-lg font-semibold text-sidebar-foreground">
            Wedding Memories
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AppSidebar />
      </div>

      <div className="flex">
        <div className="hidden lg:block fixed top-0 left-0 h-full">
          <AppSidebar />
        </div>

        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
