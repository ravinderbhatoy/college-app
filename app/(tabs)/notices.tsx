import { Page, Card, SectionTitle } from "../../components/ui";
import { notices } from "../../data/college-data";

export default function NoticesScreen() {
  const orderedNotices = [...notices].sort((left, right) => {
    if (left.pinned === right.pinned) {
      return 0;
    }

    return left.pinned ? -1 : 1;
  });

  return (
    <Page eyebrow="Notice Board" title="Latest Notices">
      {orderedNotices.map((notice) => (
        <Card
          key={notice.id}
          title={notice.title}
          meta={notice.date}
          tag={notice.category}
          body={notice.excerpt}
          featured={notice.featured}
          pinned={notice.pinned}
        />
      ))}
    </Page>
  );
}
