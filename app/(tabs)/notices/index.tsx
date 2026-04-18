import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { Card, EmptyState, Page } from "../../../components/ui";
import { StoredNotice, getPublishedNotices } from "../../../lib/content-store";

export default function NoticesScreen() {
  const router = useRouter();
  const [notices, setNotices] = useState<StoredNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadNotices() {
        const nextNotices = await getPublishedNotices();

        if (isActive) {
          setNotices(nextNotices);
          setLoading(false);
        }
      }

      loadNotices();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const orderedNotices = [...notices].sort((left, right) => {
    if (left.pinned !== right.pinned) {
      return left.pinned ? -1 : 1;
    }

    return right.createdAt.localeCompare(left.createdAt);
  });

  return (
    <Page eyebrow="Notice Board" title="Latest Notices">
      {loading ? (
        <EmptyState
          title="Loading notices"
          text="Fetching notices from the local content store."
        />
      ) : null}
      {orderedNotices.map((notice) => (
        <Card
          key={notice.id}
          title={notice.title}
          meta={notice.date}
          tag={notice.category}
          body={notice.excerpt}
          featured={notice.featured}
          pinned={notice.pinned}
          onPress={() => router.push(`/notices/${notice.id}`)}
        />
      ))}
    </Page>
  );
}
