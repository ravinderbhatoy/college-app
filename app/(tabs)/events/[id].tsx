import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { ActionButton, MarkdownPreview } from "../../../components/admin";
import { EmptyState, Page, SectionTitle } from "../../../components/ui";
import {
  AdminSession,
  StoredEvent,
  getAdminSession,
  getEventById,
} from "../../../lib/content-store";

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<StoredEvent | null>(null);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadEvent() {
      const [nextEvent, nextSession] = await Promise.all([
        id ? getEventById(id) : Promise.resolve(null),
        getAdminSession(),
      ]);

      if (isActive) {
        setEvent(nextEvent);
        setSession(nextSession);
        setLoading(false);
      }
    }

    loadEvent();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Page eyebrow="Campus Calendar" title="Loading event">
        <EmptyState
          title="Loading"
          text="Fetching the event details from local app storage."
        />
      </Page>
    );
  }

  if (!event) {
    return (
      <Page eyebrow="Campus Calendar" title="Event not found">
        <EmptyState
          title="Missing event"
          text="The requested event does not exist in the local content store."
        />
      </Page>
    );
  }

  return (
    <Page
      eyebrow={event.venue}
      title={event.title}
      subtitle={`${event.date} • ${event.author}`}
    >
      <SectionTitle
        title="Event details"
        subtitle="This screen renders the stored markdown-like event content."
      />
      <MarkdownPreview content={event.contentMarkdown} />
      {session ? (
        <View className="mt-4">
          <ActionButton
            label="Edit Event"
            icon="create-outline"
            onPress={() => router.push(`/admin/event/${event.id}`)}
          />
        </View>
      ) : null}
    </Page>
  );
}
