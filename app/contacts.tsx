import * as Linking from "expo-linking";

import { Card, Page, SectionTitle } from "../components/ui";
import { contacts } from "../data/college-data";

export default function ContactsScreen() {
  return (
    <Page
      eyebrow="Quick Utility"
      title="Contacts"
      subtitle="Keep the important numbers and inboxes in one place, with direct actions later."
    >
      <SectionTitle
        title="Reach the Right Office Faster"
        subtitle="This screen stays lightweight because students only need concise contact details."
      />
      {contacts.map((contact) => (
        <Card
          key={contact.id}
          title={contact.name}
          meta={contact.phone}
          leading={contact.role}
          body={contact.email ? `Email: ${contact.email}` : undefined}
          onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\s+/g, "")}`)}
        />
      ))}
    </Page>
  );
}
