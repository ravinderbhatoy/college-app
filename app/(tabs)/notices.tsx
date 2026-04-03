import { Card, InfoCard, Page, SectionTitle } from '../../components/ui';
import { informationCorner, notices } from '../../data/college-data';

export default function NoticesScreen() {
  return (
    <Page
      eyebrow="GNDEC Updates"
      title="Notice Board"
      subtitle="Student corner, fee notices, scholarship updates, and public-facing institutional announcements."
    >
      <SectionTitle title="Latest Notices" subtitle="Organized around the sections visible on the official website" />
      {notices.map((notice) => (
        <Card
          key={notice.title}
          title={notice.title}
          meta={`${notice.tag} • ${notice.date}`}
        />
      ))}

      <SectionTitle title="Information Corner" subtitle="Secondary information students may still need nearby" />
      {informationCorner.map((item) => (
        <InfoCard key={item.label} title={item.label} text={item.detail} />
      ))}

      <InfoCard
        title="Backend-ready direction"
        text="This screen is now shaped to accept website-fed notices, ERP notices, and filtered student updates once a real content source is connected."
      />
    </Page>
  );
}
