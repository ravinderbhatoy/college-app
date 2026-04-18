import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  ActionButton,
  EditorToolbar,
  FormField,
  MarkdownPreview,
  ToggleChip,
} from "../../../components/admin";
import { EmptyState, Page, SectionTitle } from "../../../components/ui";
import {
  deleteNotice,
  getNoticeById,
  updateNotice,
} from "../../../lib/content-store";

export default function EditNoticeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [featured, setFeatured] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadNotice() {
      const notice = id ? await getNoticeById(id) : null;

      if (!isActive) {
        return;
      }

      if (!notice) {
        setMissing(true);
        setLoading(false);
        return;
      }

      setTitle(notice.title);
      setDate(notice.date);
      setCategory(notice.category);
      setExcerpt(notice.excerpt);
      setContentMarkdown(notice.contentMarkdown);
      setFeatured(Boolean(notice.featured));
      setPinned(Boolean(notice.pinned));
      setLoading(false);
    }

    loadNotice();

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

    if (!title.trim() || !date.trim() || !category.trim() || !contentMarkdown.trim()) {
      setErrorMessage("Title, date, category, and notice details are required.");
      return;
    }

    setSaving(true);

    try {
      await updateNotice(id, {
        title,
        date,
        category,
        excerpt,
        contentMarkdown,
        featured,
        pinned,
      });
      setStatusMessage("Notice updated.");
      router.push(`/notices/${id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update the notice."
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
      await deleteNotice(id);
      router.replace("/admin");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to delete the notice."
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <Page eyebrow="Admin Publisher" title="Loading notice">
        <EmptyState title="Loading" text="Fetching notice details for editing." />
      </Page>
    );
  }

  if (missing) {
    return (
      <Page eyebrow="Admin Publisher" title="Notice not found">
        <EmptyState title="Missing notice" text="This notice is no longer available." />
      </Page>
    );
  }

  return (
    <Page
      eyebrow="Admin Publisher"
      title="Edit Notice"
      subtitle="Change notice fields or remove the notice from the local content store."
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
        label="Notice title"
        placeholder="Examination schedule updated for Semester 6"
        value={title}
        onChangeText={setTitle}
      />
      <FormField
        label="Display date"
        placeholder="April 18, 2026"
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

      <SectionTitle title="Flags" subtitle="Change whether this notice is featured or pinned." />
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
        placeholder={"# Important update\n\n- Add key point\n- Add another key point"}
        value={contentMarkdown}
        onChangeText={setContentMarkdown}
        multiline
      />

      <SectionTitle title="Live preview" subtitle="This updates as the staff member types." />
      <MarkdownPreview content={contentMarkdown} />

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <ActionButton
            label={saving ? "Saving..." : "Save Notice"}
            icon="save-outline"
            onPress={handleSave}
          />
        </View>
        <View className="flex-1">
          <ActionButton
            label={deleting ? "Deleting..." : "Delete Notice"}
            icon="trash-outline"
            tone="muted"
            onPress={handleDelete}
          />
        </View>
      </View>
    </Page>
  );
}
