import { Page, Card, SectionTitle } from "../../components/ui";
import { notices } from "../../data/college-data";

export default function NoticesScreen() {
  const pinnedNotice = notices.find((notice) => notice.pinned);
  const regularNotices = notices.filter((notice) => !notice.pinned);

  return (
    <Page
      eyebrow="Notice Board"
      title="Latest Notices"
      subtitle="A clean notice feed with the most urgent update kept on top."
    >
      {pinnedNotice ? (
        <>
          <SectionTitle
            title="Pinned Notice"
            subtitle="Keep only one urgent item highlighted at a time."
          />
          <Card
            title={pinnedNotice.title}
            meta={pinnedNotice.date}
            tag={pinnedNotice.category}
            body={pinnedNotice.excerpt}
          />
        </>
      ) : null}

      <SectionTitle
        title="All Notices"
        subtitle="The rest of the feed stays simple and easy to scan."
      />
      {regularNotices.map((notice) => (
        <Card
          key={notice.id}
          title={notice.title}
          meta={notice.date}
          tag={notice.category}
          body={notice.excerpt}
        />
      ))}
    </Page>
  );
}
