import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppLayout } from "~/components/app-layout";
import { EventPage } from "~/components/event-page";
import { getEvent } from "~/lib/api";
import type { Event } from "~/lib/types";

export default function EventSlugPage() {
  const { eventId, ceremony } = useParams<{ eventId: string; ceremony: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!eventId) { setNotFound(true); setLoading(false); return; }
    getEvent(eventId)
      .then(setEvent)
      .catch((err) => {
        if (err?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </AppLayout>
    );
  }

  if (notFound || !event) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Event Not Found</h1>
            <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <EventPage event={event} ceremony={ceremony ?? "marriage"} />
    </AppLayout>
  );
}
