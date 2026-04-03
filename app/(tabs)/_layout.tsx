import { Tabs } from 'expo-router';

import { colors } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="notices" options={{ title: 'Notices' }} />
      <Tabs.Screen name="academics" options={{ title: 'Academics' }} />
      <Tabs.Screen name="campus" options={{ title: 'Campus' }} />
      <Tabs.Screen name="help" options={{ title: 'Help' }} />
    </Tabs>
  );
}
