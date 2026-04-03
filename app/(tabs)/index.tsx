import { View } from "react-native";
import { Card, Chip, HeroCard, Page, SectionTitle } from "../../components/ui";
import {
  gndecMetrics,
  homeHighlights,
  notices,
  quickActions,
} from "../../data/college-data";

export default function HomeScreen() {
  return (
    <Page
      eyebrow="Guru Nanak Dev Engineering College"
      title="Student Dashboard"
      subtitle="A GNDEC-first mobile home focused on notices, student services, academics, and campus access."
    >
      <HeroCard
        tag="Inspired by gndec.ac.in"
        title="Important student information should be faster here than on the website."
        text="The app now follows the site’s strongest sections: student corner, information corner, departments, facilities, and helplines."
      />

      <SectionTitle
        title="Quick Access"
        subtitle="The homepage priorities students are most likely to need daily"
      />
      <View className="mb-5 flex-row flex-wrap gap-2.5">
        {quickActions.map((item) => (
          <Chip key={item} label={item} active />
        ))}
      </View>

      <SectionTitle
        title="GNDEC At A Glance"
        subtitle="Institutional identity condensed for mobile"
      />
      <View className="mb-2 flex-row flex-wrap gap-3">
        {gndecMetrics.map((metric) => (
          <View
            key={metric.label}
            className="min-w-[100px] flex-1 rounded-[20px] border border-border bg-card p-4"
          >
            <Chip label={metric.label} />
            <Card title={metric.value} />
          </View>
        ))}
      </View>

      <SectionTitle
        title="Student Priorities"
        subtitle="What the website suggests should be prominent in the app"
      />
      {homeHighlights.map((item) => (
        <Card key={item.title} title={item.title} meta={item.text} />
      ))}

      <SectionTitle
        title="Latest Notices"
        subtitle="Student corner and public corner style updates"
      />
      {notices.slice(0, 3).map((notice) => (
        <Card
          key={notice.title}
          title={notice.title}
          meta={notice.date}
          tag={notice.tag}
          showTagRow
        />
      ))}
    </Page>
  );
}
