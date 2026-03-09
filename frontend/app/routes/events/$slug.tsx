import { useParams } from "react-router";
import { getEventBySlug } from "~/lib/events";
import { EventPage } from "~/components/event-page";
import { AppLayout } from "~/components/app-layout";

export default function EventSlugPage() {
  const { slug } = useParams();
  const event = getEventBySlug(slug || "");

  if (!event) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
              Event Not Found
            </h1>
            <p className="text-muted-foreground">
              The event you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <EventPage event={event} />
    </AppLayout>
  );
}
