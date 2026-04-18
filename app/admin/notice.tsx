import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import {
  ActionButton,
  EditorToolbar,
  FormField,
  MarkdownPreview,
  ToggleChip,
} from "../../components/admin";
import { Card, Page, SectionTitle } from "../../components/ui";
import { getTodayDisplayDate } from "../../lib/date";
import { publishNotice } from "../../lib/content-store";

export default function CreateNoticeScreen() {
  const router = useRouter();
  const today = getTodayDisplayDate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [featured, setFeatured] = useState(false);
  const [pinned, setPinned] = useState(false);
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

    if (
      !title.trim() ||
      !date.trim() ||
      !category.trim() ||
      !contentMarkdown.trim()
    ) {
      setErrorMessage(
        "Title, date, category, and notice details are required.",
      );
      return;
    }

    setSaving(true);

    try {
      const notice = await publishNotice({
        title,
        date,
        category,
        excerpt,
        contentMarkdown,
        featured,
        pinned,
      });

      setTitle("");
      setDate(getTodayDisplayDate());
      setCategory("");
      setExcerpt("");
      setContentMarkdown("");
      setFeatured(false);
      setPinned(false);
      setStatusMessage("Notice published. Opening the notice now.");
      router.push(`/notices/${notice.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to publish the notice.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page eyebrow="Admin Publisher">
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
        label="Notice title"
        placeholder="Examination schedule updated for Semester 6"
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
        label="Category"
        placeholder="Academics"
        value={category}
        onChangeText={setCategory}
      />
      <FormField
        label="Short summary"
        placeholder="Shown in the notice list. Leave blank to auto-generate from details."
        value={excerpt}
        onChangeText={setExcerpt}
      />

      <SectionTitle
        title="Flags"
        subtitle="Featured notices stand out on home. Pinned notices stay higher in the list."
      />
      <View className="mb-5 flex-row flex-wrap gap-2">
        <ToggleChip
          label={featured ? "Featured: On" : "Featured: Off"}
          selected={featured}
          onPress={() => setFeatured((currentValue) => !currentValue)}
        />
        <ToggleChip
          label={pinned ? "Pinned: On" : "Pinned: Off"}
          selected={pinned}
          onPress={() => setPinned((currentValue) => !currentValue)}
        />
      </View>

      <SectionTitle
        title="Notice details"
        subtitle="Use headings, bullets, and links with one tap instead of writing markdown manually."
      />
      <EditorToolbar onInsert={insertTemplate} />
      <FormField
        label="Markdown content"
        placeholder={
          "# Important update\n\n- Add key point\n- Add another key point"
        }
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
          label={saving ? "Publishing..." : "Publish Notice"}
          icon="send"
          onPress={handlePublish}
        />
      </View>
    </Page>
  );
}
