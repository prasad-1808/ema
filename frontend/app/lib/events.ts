export interface EventType {
  id: string;
  name: string;
  slug: string;
}

export const events: EventType[] = [
  { id: "1", name: "Engagement", slug: "engagement" },
  { id: "2", name: "Reception", slug: "reception" },
  { id: "3", name: "Marriage", slug: "marriage" },
];

export function getEventBySlug(slug: string): EventType | undefined {
  return events.find((event) => event.slug === slug);
}
