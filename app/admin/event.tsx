import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import {
  ActionButton,
  EditorToolbar,
  FormField,
  MarkdownPreview,
} from "../../components/admin";
import { Card, Page, SectionTitle } from "../../components/ui";
import { getTodayDisplayDate } from "../../lib/date";
import { publishEvent } from "../../lib/content-store";

export default function CreateEventScreen() {
  const router = useRouter();
  const today = getTodayDisplayDate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function insertTemplate(before: string, after = "") {
    setContentMarkdown((currentValue) => {
      const separator = currentValue.trim().length > 0 ? "\n" : "";
      return `${currentValue}${separator}${before}${after}`;
    });
  }

  async function handlePublish() {
    setStatusMessage("");
    setErrorMessage("");

    if (!title.trim() || !date.trim() || !venue.trim() || !contentMarkdown.trim()) {
      setErrorMessage("Title, date, venue, and event details are required.");
      return;
    }

    setSaving(true);

    try {
      const event = await publishEvent({
        title,
        date,
        venue,
        description,
        contentMarkdown,
      });

      setTitle("");
      setDate(getTodayDisplayDate());
      setVenue("");
      setDescription("");
      setContentMarkdown("");
      setStatusMessage("Event published. Opening the event now.");
      router.push(`/events/${event.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to publish the event."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page
      eyebrow="Admin Publisher"
      title="Create Event"
      subtitle="Staff can write event details in plain text, then use helper buttons for structure where needed."
    >
      <Card
        title="Designed for non-technical staff"
        body="The content is stored as markdown, but the editing flow stays button-first."
      />
      {errorMessage ? (
        <Text className="mb-4 text-[14px] leading-[20px] text-[#a13333]">
          {errorMessage}
        </Text>
      ) : null}
      {statusMessage ? (
        <Text className="mb-4 text-[14px] leading-[20px] text-accent">
          {statusMessage}
        </Text>
      ) : null}

      <FormField
        label="Event title"
        placeholder="Annual alumni interaction session"
        value={title}
        onChangeText={setTitle}
      />
      <FormField
        label="Display date"
        placeholder={today}
        value={date}
        onChangeText={setDate}
      />
      <FormField
        label="Venue"
        placeholder="Seminar Hall Complex"
        value={venue}
        onChangeText={setVenue}
      />
      <FormField
        label="Short summary"
        placeholder="Shown in the event list. Leave blank to auto-generate from details."
        value={description}
        onChangeText={setDescription}
      />

      <SectionTitle
        title="Event details"
        subtitle="Use the helper buttons when you need structure. Staff can still type normally."
      />
      <EditorToolbar onInsert={insertTemplate} />
      <FormField
        label="Markdown content"
        placeholder={"# Event flow\n\n- Opening address\n- Main session\n- Q&A"}
        value={contentMarkdown}
        onChangeText={setContentMarkdown}
        multiline
      />

      <SectionTitle
        title="Live preview"
        subtitle="This updates as the staff member types."
      />
      <MarkdownPreview content={contentMarkdown} />

      <View className="mt-4">
        <ActionButton
          label={saving ? "Publishing..." : "Publish Event"}
          icon="send"
          onPress={handlePublish}
        />
      </View>
    </Page>
  );
}
