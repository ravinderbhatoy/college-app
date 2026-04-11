import { Card, EmptyState, Page, SectionTitle } from "../components/ui";
import { authPlaceholder } from "../data/college-data";

export default function ProfileScreen() {
  return (
    <Page
      eyebrow="Account Area"
      title="Profile"
      subtitle="A placeholder shell for future authentication and student preferences."
    >
      <EmptyState
        title={authPlaceholder.title}
        text={authPlaceholder.message}
      />

      <SectionTitle
        title="Coming Later"
        subtitle="Keep the screen real enough to reserve the flow, but don’t fake backend features."
      />
      <Card
        title="Student login"
        body="This will eventually handle authenticated academic data and personalized notices."
      />
      <Card
        title="Notification preferences"
        body="Use this area later for notice subscriptions, saved departments, and event reminders."
      />
    </Page>
  );
}
