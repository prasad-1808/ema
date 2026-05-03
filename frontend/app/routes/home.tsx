import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, Calendar, MapPin, ArrowRight } from "lucide-react";
import { FloralDecoration, FloralCorner } from "~/components/floral-decoration";
import { Button } from "~/components/ui/button";
import { AppLayout } from "~/components/app-layout";
import { getUserEvents } from "~/lib/api";
import { getStoredUser } from "~/lib/auth";
import type { UserEvent } from "~/lib/types";

export function meta() {
  return [
    { title: "Home - Event Memory App" },
    { name: "description", content: "Event Memory Management Application" },
  ];
}

function EventCard({ ue }: { ue: UserEvent }) {
  const { event } = ue;
  const ceremony =
    event.event_marriage ?? event.event_engagement ?? event.event_reception;
  const date =
    event.event_marriage?.marriage_date ??
    event.event_engagement?.engagement_date ??
    event.event_reception?.reception_date;
  const location =
    event.event_marriage?.marriage_location ??
    event.event_engagement?.engagement_location ??
    event.event_reception?.reception_location;

  return (
    <div className="bg-card rounded-2xl shadow border border-border p-6 flex flex-col gap-3">
      <h2 className="font-serif text-2xl font-semibold text-foreground">
        {event.event_name}
      </h2>
      {ceremony && (
        <p className="text-muted-foreground text-sm">
          {ceremony.groom_name} &amp; {ceremony.bride_name}
        </p>
      )}
      {date && (
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          {new Date(date).toLocaleDateString()}
        </div>
      )}
      {location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {location}
        </div>
      )}
      <div className="flex gap-2 mt-2 flex-wrap">
        {event.has_marriage && (
          <Link to={`/events/${event.event_id}/marriage`}>
            <Button size="sm" variant="outline">
              Marriage <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        )}
        {event.has_engagement && (
          <Link to={`/events/${event.event_id}/engagement`}>
            <Button size="sm" variant="outline">
              Engagement <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        )}
        {event.has_reception && (
          <Link to={`/events/${event.event_id}/reception`}>
            <Button size="sm" variant="outline">
              Reception <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    getUserEvents(user.user_id)
      .then(setUserEvents)
      .catch(() => setError("Failed to load events."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FloralCorner position="top-left" className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 text-primary" />
          <FloralCorner position="top-right" className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 text-primary" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <FloralDecoration className="w-48 h-24 mx-auto text-primary mb-2" />
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-2">
              {user ? `Welcome, ${user.user_name}` : "Event Memory App"}
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px w-16 bg-border" />
              <Heart className="h-4 w-4 text-primary fill-primary/20" />
              <div className="h-px w-16 bg-border" />
            </div>
            <p className="text-muted-foreground">Your upcoming events</p>
          </div>

          {loading && (
            <p className="text-center text-muted-foreground">Loading events…</p>
          )}
          {error && (
            <p className="text-center text-destructive">{error}</p>
          )}
          {!loading && !error && userEvents.length === 0 && (
            <p className="text-center text-muted-foreground">No events found.</p>
          )}
          {!loading && userEvents.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {userEvents.map((ue) => (
                <EventCard key={ue.user_event_id} ue={ue} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
