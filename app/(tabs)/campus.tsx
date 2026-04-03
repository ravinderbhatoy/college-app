import { View } from 'react-native';

import { Chip, InfoCard, Page, SectionTitle } from '../../components/ui';
import {
  departmentGroups,
  facilities,
  institutionalHighlights,
} from '../../data/college-data';

export default function CampusScreen() {
  return (
    <Page
      eyebrow="GNDEC Campus"
      title="Campus"
      subtitle="Departments, facilities, and the institutional highlights that shape GNDEC’s identity."
    >
      <SectionTitle title="Departments" />
      {departmentGroups.map((group) => (
        <View key={group.school} className="mb-[14px] rounded-[20px] border border-border bg-card p-4">
          <SectionTitle title={group.school} />
          <View className="flex-row flex-wrap gap-2.5">
            {group.items.map((department) => (
              <Chip key={department} label={department} />
            ))}
          </View>
        </View>
      ))}

      <SectionTitle title="Facilities" subtitle="Derived from the website’s facilities section" />
      {facilities.map((facility) => (
        <InfoCard key={facility.label} title={facility.label} text={facility.detail} />
      ))}

      <SectionTitle title="Why GNDEC Feels Distinct" subtitle="Institutional context that deserves a place in the app" />
      {institutionalHighlights.map((item) => (
        <InfoCard key={item.title} title={item.title} text={item.text} />
      ))}
    </Page>
  );
}
