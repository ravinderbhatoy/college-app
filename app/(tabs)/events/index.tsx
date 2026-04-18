import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { Card, EmptyState, Page } from "../../../components/ui";
import { StoredEvent, getPublishedEvents } from "../../../lib/content-store";

export default function EventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadEvents() {
        const nextEvents = await getPublishedEvents();

        if (isActive) {
          setEvents(nextEvents);
          setLoading(false);
        }
      }

      loadEvents();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <Page
      eyebrow="Campus Calendar"
      title="Upcoming Events"
      subtitle="A dedicated stream for upcoming campus activity without mixing it into utility screens."
    >
      {loading ? (
        <EmptyState
          title="Loading events"
          text="Fetching events from the local content store."
        />
      ) : null}
      {events.map((event) => (
        <Card
          key={event.id}
          title={event.title}
          meta={event.date}
          leading={event.venue}
          body={event.description}
          onPress={() => router.push(`/events/${event.id}`)}
        />
      ))}
    </Page>
  );
}
