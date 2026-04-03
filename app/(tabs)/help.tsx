import { Card, InfoCard, Page, SectionTitle } from '../../components/ui';
import { supportContacts } from '../../data/college-data';

export default function HelpScreen() {
  return (
    <Page
      eyebrow="GNDEC Support"
      title="Help Desk"
      subtitle="Admissions, grievance support, anti-ragging help, and student assistance collected into one mobile-first screen."
    >
      <SectionTitle title="Support Contacts" subtitle="Built from the website help desk and admissions blocks" />
      {supportContacts.map((contact) => (
        <Card
          key={contact.label}
          title={contact.label}
          meta={contact.note ? `${contact.value} • ${contact.note}` : contact.value}
        />
      ))}

      <InfoCard
        title="Why this matters on mobile"
        text="The website surfaces many support links, but mobile should reduce the search time by keeping the most urgent student help options on one screen."
      />
    </Page>
  );
}
