import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Card, InfoCard, Page, SectionTitle } from '../../components/ui';
import { academicLinks, informationCorner, scheduleByDay } from '../../data/college-data';

const days = Object.keys(scheduleByDay);

export default function AcademicsScreen() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const classes = useMemo(() => scheduleByDay[selectedDay] ?? [], [selectedDay]);

  return (
    <Page
      eyebrow="GNDEC Academics"
      title="Academics"
      subtitle="Timetable, academic links, and the information students repeatedly check during the session."
    >
      <SectionTitle title="Academic Essentials" subtitle="Shaped around the official site structure" />
      {academicLinks.map((item) => (
        <Card key={item.label} title={item.label} meta={item.detail} />
      ))}

      <SectionTitle title="Weekly Timetable" subtitle="Current static demo data for a student schedule" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2.5 pb-[14px]"
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            className={
              selectedDay === day
                ? 'rounded-[14px] bg-primary px-[14px] py-[10px]'
                : 'rounded-[14px] bg-[#eadfce] px-[14px] py-[10px]'
            }
          >
            <Text
              className={
                selectedDay === day ? 'font-bold text-[#ecfff7]' : 'font-bold text-[#665a4a]'
              }
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {classes.map((item) => (
        <Card
          key={`${selectedDay}-${item.time}-${item.subject}`}
          title={item.subject}
          meta={item.room}
          leading={item.time}
        />
      ))}

      <SectionTitle title="Information Corner" subtitle="Useful institutional links surfaced for students" />
      <View className="mb-2">
        {informationCorner.map((item) => (
          <InfoCard key={item.label} title={item.label} text={item.detail} />
        ))}
      </View>
    </Page>
  );
}
