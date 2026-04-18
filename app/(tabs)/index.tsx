import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

import { Card, Page, QuickActionCard, SectionTitle } from "../../components/ui";
import { quickActions } from "../../data/college-data";
import {
  StoredEvent,
  StoredNotice,
  getPublishedEvents,
  getPublishedNotices,
} from "../../lib/content-store";

export default function HomeScreen() {
  const router = useRouter();
  const [notices, setNotices] = useState<StoredNotice[]>([]);
  const [events, setEvents] = useState<StoredEvent[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadHomeFeed() {
        const [nextNotices, nextEvents] = await Promise.all([
          getPublishedNotices(),
          getPublishedEvents(),
        ]);

        if (isActive) {
          setNotices(nextNotices);
          setEvents(nextEvents);
        }
      }

      loadHomeFeed();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const featuredNotice =
    notices.find((notice) => notice.featured) ?? notices[0] ?? null;

  return (
    <Page
      headerAction={{
        icon: "person-circle-outline",
        label: "Open admin login",
        onPress: () => router.push("/admin"),
      }}
    >
      <SectionTitle title="Quick Actions" />
      <View className="mb-6 flex-row flex-wrap gap-3">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.label}
            icon={action.icon}
            label={action.label}
            onPress={() => router.push(action.href)}
          />
        ))}
      </View>

      {featuredNotice ? (
        <>
          <SectionTitle
            title="Featured"
            subtitle="Use this when one update needs stronger emphasis than the rest of the feed."
          />
          <Card
            title={featuredNotice.title}
            meta={featuredNotice.date}
            tag={featuredNotice.category}
            body={featuredNotice.excerpt}
            featured
            pinned={featuredNotice.pinned}
            onPress={() => router.push(`/notices/${featuredNotice.id}`)}
          />
        </>
      ) : null}

      <SectionTitle
        title="Upcoming Events"
        subtitle="Campus highlights students are likely to check before they happen."
        actionLabel="View all"
        onActionPress={() => router.push("/events")}
      />
      {events.slice(0, 2).map((event) => (
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
