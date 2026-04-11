import { useRouter } from "expo-router";
import { View } from "react-native";

import {
  Card,
  HeroCard,
  Page,
  QuickActionCard,
  SectionTitle,
} from "../../components/ui";
import { events, notices, quickActions } from "../../data/college-data";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Page
      eyebrow="Student Home"
      title="Everything important in a few taps."
      subtitle="Keep the app centered on notices and events, then surface timetable, contacts, and login as quick utilities."
      headerAction={{
        icon: "person-circle-outline",
        label: "Open profile placeholder",
        onPress: () => router.push("/profile"),
      }}
    >
      <HeroCard
        tag="V1 Focus"
        title="A smaller app is easier to navigate and easier to maintain."
        text="This version keeps only the student flows that matter right now instead of recreating the full college website."
      />

      <SectionTitle
        title="Quick Actions"
        subtitle="Low-frequency utilities belong here, not in the tab bar."
      />
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

      <SectionTitle
        title="Latest Notices"
        subtitle="A short preview from the main notices feed."
        actionLabel="View all"
        onActionPress={() => router.push("/notices")}
      />
      {notices.slice(0, 3).map((notice) => (
        <Card
          key={notice.id}
          title={notice.title}
          meta={notice.date}
          tag={notice.pinned ? "Pinned" : notice.category}
          body={notice.excerpt}
          onPress={() => router.push("/notices")}
        />
      ))}

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
          onPress={() => router.push("/events")}
        />
      ))}
    </Page>
  );
}
