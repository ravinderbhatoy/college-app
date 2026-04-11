import { Linking, Pressable, Text, View } from "react-native";

import { Card, Chip, Page, SectionTitle } from "../../components/ui";
import {
  placementEligibilityNotes,
  placementForms,
  placementUpdates,
  tpoContacts,
} from "../../data/college-data";

export default function PlacementScreen() {
  const pinnedUpdate = placementUpdates.find((update) => update.pinned);
  const remainingUpdates = placementUpdates.filter((update) => !update.pinned);

  return (
    <Page
      eyebrow="Training & Placement"
      subtitle="Check regularly for latest updates regarding Traning and Placement"
    >
      {pinnedUpdate ? (
        <>
          <SectionTitle title="Priority Update" />
          <Card
            title={pinnedUpdate.title}
            meta={pinnedUpdate.date}
            tag="Priority"
            leading={pinnedUpdate.company}
            body={pinnedUpdate.summary}
          />
        </>
      ) : null}

      <SectionTitle title="Upcoming Placements" />
      {remainingUpdates.map((update) => (
        <Card
          key={update.id}
          title={update.title}
          meta={update.date}
          tag="Update"
          leading={update.company}
          body={update.summary}
        />
      ))}

      <SectionTitle
        title="Form Submissions"
        subtitle="Important application and resume links should stay one tap away."
      />
      {placementForms.map((form) => (
        <Pressable
          key={form.id}
          className="mb-[14px] rounded-[22px] border border-border bg-card p-4"
          onPress={() => Linking.openURL(form.href)}
        >
          <View className="mb-2.5 flex-row items-center justify-between gap-3">
            <Chip label="Form Link" />
            <Text className="text-right text-[12px] font-semibold text-date">
              Due {form.deadline}
            </Text>
          </View>
          <Text className="text-[17px] font-bold leading-6 text-ink">
            {form.title}
          </Text>
          <Text className="mt-2 text-[14px] leading-[21px] text-muted">
            {form.note}
          </Text>
          <Text className="mt-3 text-[13px] font-bold text-accent">
            Open submission link
          </Text>
        </Pressable>
      ))}

      <SectionTitle
        title="Eligibility Notes"
        subtitle="Short reminders reduce common placement-day mistakes."
      />
      <View className="mb-6 gap-3">
        {placementEligibilityNotes.map((note) => (
          <View
            key={note}
            className="rounded-[22px] border border-border bg-card px-4 py-4"
          >
            <Text className="text-[14px] leading-[21px] text-muted">
              {note}
            </Text>
          </View>
        ))}
      </View>

      <SectionTitle
        title="TPO Contacts"
        subtitle="Students need a direct escalation path when forms or shortlists change."
      />
      {tpoContacts.map((contact) => (
        <Card
          key={contact.id}
          title={contact.name}
          leading={contact.role}
          body={`${contact.phone}\n${contact.email}`}
        />
      ))}
    </Page>
  );
}
