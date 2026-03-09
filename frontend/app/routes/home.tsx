import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Heart, Calendar, MapPin, ArrowRight } from "lucide-react";
import { FloralDecoration, FloralCorner } from "~/components/floral-decoration";
import { Button } from "~/components/ui/button";
import { AppLayout } from "~/components/app-layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Event Memory App" },
    { name: "description", content: "Event Memory Management Application" },
  ];
}

export default function Home() {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FloralCorner
            position="top-left"
            className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 text-primary"
          />
          <FloralCorner
            position="top-right"
            className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 text-primary"
          />
          <FloralCorner
            position="bottom-left"
            className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 text-primary"
          />
          <FloralCorner
            position="bottom-right"
            className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 text-primary"
          />
        </div>

        <div className="relative w-full max-w-2xl">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="relative z-10">
              <FloralDecoration className="w-48 h-24 mx-auto text-primary mb-2" />

              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
                Together with their families
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-2 text-balance">
                Sarah & Michael
              </h1>

              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px w-16 bg-border" />
                <Heart className="h-4 w-4 text-primary fill-primary/20" />
                <div className="h-px w-16 bg-border" />
              </div>

              <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
                Request the pleasure of your company at the celebration of their marriage
              </p>

              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-serif text-xl sm:text-2xl text-foreground">
                  June 15, 2026
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-8">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  The Grand Estate, Willow Creek
                </span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <p className="text-foreground text-sm sm:text-base leading-relaxed italic">
                  &ldquo;Two souls, one heart. We are so excited to share our special moments with you. 
                  Browse through our cherished memories and be part of our journey.&rdquo;
                </p>
              </div>

              <Link to="/events/engagement">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Event Memories
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <FloralDecoration className="w-48 h-24 mx-auto text-primary mt-8 rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
