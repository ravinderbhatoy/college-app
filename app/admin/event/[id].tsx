import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  ActionButton,
  EditorToolbar,
  FormField,
  MarkdownPreview,
} from "../../../components/admin";
import { EmptyState, Page, SectionTitle } from "../../../components/ui";
import {
  deleteEvent,
  getEventById,
  updateEvent,
} from "../../../lib/content-store";

export default function EditEventScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadEvent() {
      const event = id ? await getEventById(id) : null;

      if (!isActive) {
        return;
      }

      if (!event) {
        setMissing(true);
        setLoading(false);
        return;
      }

      setTitle(event.title);
      setDate(event.date);
      setVenue(event.venue);
      setDescription(event.description);
      setContentMarkdown(event.contentMarkdown);
      setLoading(false);
    }

    loadEvent();

    return () => {
      isActive = false;
    };
  }, [id]);

  function insertTemplate(before: string, after = "") {
    setContentMarkdown((currentValue) => {
      const separator = currentValue.trim().length > 0 ? "\n" : "";
      return `${currentValue}${separator}${before}${after}`;
    });
  }

  async function handleSave() {
    if (!id) {
      return;
    }

    setStatusMessage("");
    setErrorMessage("");

    if (!title.trim() || !date.trim() || !venue.trim() || !contentMarkdown.trim()) {
      setErrorMessage("Title, date, venue, and event details are required.");
      return;
    }

    setSaving(true);

    try {
      await updateEvent(id, {
        title,
        date,
        venue,
        description,
        contentMarkdown,
      });
      setStatusMessage("Event updated.");
      router.push(`/events/${id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update the event."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) {
      return;
    }

    setStatusMessage("");
    setErrorMessage("");
    setDeleting(true);

    try {
      await deleteEvent(id);
      router.replace("/admin");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to delete the event."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <Page eyebrow="Admin Publisher" title="Loading event">
        <EmptyState title="Loading" text="Fetching event details for editing." />
      </Page>
    );
  }

  if (missing) {
    return (
      <Page eyebrow="Admin Publisher" title="Event not found">
        <EmptyState title="Missing event" text="This event is no longer available." />
      </Page>
    );
  }

  return (
    <Page
      eyebrow="Admin Publisher"
      title="Edit Event"
      subtitle="Change event fields or remove the event from the local content store."
    >
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
        placeholder="April 24, 2026"
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

      <SectionTitle title="Live preview" subtitle="This updates as the staff member types." />
      <MarkdownPreview content={contentMarkdown} />

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <ActionButton
            label={saving ? "Saving..." : "Save Event"}
            icon="save-outline"
            onPress={handleSave}
          />
        </View>
        <View className="flex-1">
          <ActionButton
            label={deleting ? "Deleting..." : "Delete Event"}
            icon="trash-outline"
            tone="muted"
            onPress={handleDelete}
          />
        </View>
      </View>
    </Page>
  );
}
