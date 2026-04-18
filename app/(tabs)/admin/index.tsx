import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { ActionButton, FormField } from "../../../components/admin";
import { Card, EmptyState, Page, SectionTitle } from "../../../components/ui";
import {
  AdminSession,
  StoredEvent,
  StoredNotice,
  getAdminSession,
  getPublishedEvents,
  getPublishedNotices,
  signInAdmin,
  signOutAdmin,
} from "../../../lib/content-store";

export default function AdminScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [session, setSession] = useState<AdminSession | null>(null);
  const [noticeCount, setNoticeCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [notices, setNotices] = useState<StoredNotice[]>([]);
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadScreenState() {
        const [nextSession, notices, events] = await Promise.all([
          getAdminSession(),
          getPublishedNotices(),
          getPublishedEvents(),
        ]);

        if (isActive) {
          setSession(nextSession);
          setNoticeCount(notices.length);
          setEventCount(events.length);
          setNotices(notices);
          setEvents(events);
        }
      }

      loadScreenState();

      return () => {
        isActive = false;
      };
    }, [])
  );

  async function handleLogin() {
    setSubmitting(true);
    setErrorMessage("");

    try {
      const result = await signInAdmin(username, password);

      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      setSession(result.session);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await signOutAdmin();
    setSession(null);
  }

  return (
    <Page
      eyebrow="Account Area"
      title="Admin Login"
      subtitle="This is a local demo-only staff flow for publishing notices and events from the device."
    >
      {!session ? (
        <>
          <EmptyState
            title="Local staff demo account"
            text="Use username admin and password admin123. This session is stored locally on the device only."
          />
          <View className="mt-5">
            <FormField
              label="Username"
              placeholder="admin"
              value={username}
              onChangeText={setUsername}
            />
            <FormField
              label="Password"
              placeholder="admin123"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errorMessage ? (
              <Text className="mb-3 text-[14px] leading-[20px] text-[#a13333]">
                {errorMessage}
              </Text>
            ) : null}
            <ActionButton
              label={submitting ? "Signing in..." : "Sign In as Admin"}
              icon="log-in-outline"
              onPress={handleLogin}
            />
          </View>
        </>
      ) : (
        <>
          <SectionTitle
            title={`Welcome, ${session.name}`}
            subtitle="Create new notices and events, then review them inside the app feed."
          />
          <View className="mb-3 flex-row gap-3">
            <View className="flex-1">
              <ActionButton
                label="Create Notice"
                icon="notifications-outline"
                onPress={() => router.push("/admin/notice")}
              />
            </View>
            <View className="flex-1">
              <ActionButton
                label="Create Event"
                icon="calendar-outline"
                onPress={() => router.push("/admin/event")}
              />
            </View>
          </View>
          <View className="mb-6">
            <ActionButton
              label="Sign Out"
              icon="log-out-outline"
              tone="muted"
              onPress={handleLogout}
            />
          </View>

          <SectionTitle
            title="Manage Notices"
            subtitle="Open any notice to edit or delete it."
          />
          {notices.map((notice) => (
            <Card
              key={notice.id}
              title={notice.title}
              meta={notice.date}
              tag={notice.category}
              body={
                notice.source === "admin"
                  ? "Admin-created notice"
                  : "Seed notice"
              }
              onPress={() => router.push(`/admin/notice/${notice.id}`)}
            />
          ))}

          <SectionTitle
            title="Manage Events"
            subtitle="Open any event to edit or delete it."
          />
          {events.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              meta={event.date}
              leading={event.venue}
              body={
                event.source === "admin" ? "Admin-created event" : "Seed event"
              }
              onPress={() => router.push(`/admin/event/${event.id}`)}
            />
          ))}
        </>
      )}
    </Page>
  );
}
