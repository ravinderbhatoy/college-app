import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Card, EmptyState, Page, SectionTitle } from "../components/ui";
import { timetableGroups } from "../data/college-data";

export default function TimetableScreen() {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = timetableGroups[selectedGroupIndex];
  const availableDays = selectedGroup?.days ?? [];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const selectedDay = useMemo(
    () => availableDays[selectedDayIndex] ?? availableDays[0],
    [availableDays, selectedDayIndex]
  );

  return (
    <Page
      eyebrow="Quick Utility"
      title="Timetable"
      subtitle="Keep this screen fast: choose a department, choose a semester, then scan the day."
    >
      <SectionTitle
        title="Department and Semester"
        subtitle="Use simple selectors until student-specific data is available."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2.5 pb-4"
      >
        {timetableGroups.map((group, index) => {
          const isActive = index === selectedGroupIndex;
          return (
            <Pressable
              key={`${group.department}-${group.semester}`}
              className={
                isActive
                  ? "rounded-full bg-primary px-4 py-3"
                  : "rounded-full bg-surface px-4 py-3"
              }
              onPress={() => {
                setSelectedGroupIndex(index);
                setSelectedDayIndex(0);
              }}
            >
              <Text
                className={
                  isActive ? "font-bold text-white" : "font-bold text-chipText"
                }
              >
                {group.department} • {group.semester}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <SectionTitle
        title="Day View"
        subtitle="A compact horizontal selector is enough for the first release."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2.5 pb-4"
      >
        {availableDays.map((day, index) => {
          const isActive = index === selectedDayIndex;
          return (
            <Pressable
              key={day.day}
              className={
                isActive
                  ? "rounded-full bg-highlight px-4 py-3"
                  : "rounded-full bg-card px-4 py-3"
              }
              onPress={() => setSelectedDayIndex(index)}
            >
              <Text
                className={
                  isActive
                    ? "font-bold text-highlightText"
                    : "font-bold text-ink"
                }
              >
                {day.day}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {selectedDay ? (
        <>
          <SectionTitle
            title={`${selectedGroup.department} ${selectedGroup.semester}`}
            subtitle={selectedDay.day}
          />
          {selectedDay.classes.map((item) => (
            <Card
              key={`${selectedDay.day}-${item.time}-${item.subject}`}
              title={item.subject}
              leading={item.time}
              body={item.room}
            />
          ))}
        </>
      ) : (
        <EmptyState
          title="No timetable data"
          text="Add a fallback empty state so this screen stays valid even before real data is connected."
        />
      )}
    </Page>
  );
}
