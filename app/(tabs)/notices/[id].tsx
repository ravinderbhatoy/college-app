import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { ActionButton, MarkdownPreview } from "../../../components/admin";
import { EmptyState, Page, SectionTitle } from "../../../components/ui";
import {
  AdminSession,
  StoredNotice,
  getAdminSession,
  getNoticeById,
} from "../../../lib/content-store";

export default function NoticeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [notice, setNotice] = useState<StoredNotice | null>(null);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadNotice() {
      const [nextNotice, nextSession] = await Promise.all([
        id ? getNoticeById(id) : Promise.resolve(null),
        getAdminSession(),
      ]);

      if (isActive) {
        setNotice(nextNotice);
        setSession(nextSession);
        setLoading(false);
      }
    }

    loadNotice();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Page eyebrow="Notice Board" title="Loading notice">
        <EmptyState
          title="Loading"
          text="Fetching the notice details from local app storage."
        />
      </Page>
    );
  }

  if (!notice) {
    return (
      <Page eyebrow="Notice Board" title="Notice not found">
        <EmptyState
          title="Missing notice"
          text="The requested notice does not exist in the local content store."
        />
      </Page>
    );
  }

  return (
    <Page
      eyebrow={notice.category}
      title={notice.title}
      subtitle={`${notice.date} • ${notice.author}`}
    >
      <SectionTitle
        title="Details"
        subtitle="This screen renders the stored markdown-like notice content."
      />
      <MarkdownPreview content={notice.contentMarkdown} />
      {session ? (
        <View className="mt-4">
          <ActionButton
            label="Edit Notice"
            icon="create-outline"
            onPress={() => router.push(`/admin/notice/${notice.id}`)}
          />
        </View>
      ) : null}
    </Page>
  );
}
