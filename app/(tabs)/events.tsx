import { Card, Page, SectionTitle } from "../../components/ui";
import { events } from "../../data/college-data";

export default function EventsScreen() {
  return (
    <Page
      eyebrow="Campus Calendar"
      title="Upcoming Events"
      subtitle="A dedicated stream for upcoming campus activity without mixing it into utility screens."
    >
      {events.map((event) => (
        <Card
          key={event.id}
          title={event.title}
          meta={event.date}
          leading={event.venue}
          body={event.description}
        />
      ))}
    </Page>
  );
}
