import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GNE_LOGO = require("../gnelogo.png");

type PageProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  };
};

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

type CardProps = {
  title: string;
  meta?: string;
  tag?: string;
  body?: string;
  leading?: string;
  onPress?: () => void;
  featured?: boolean;
  pinned?: boolean;
};

type QuickActionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function Page({
  eyebrow,
  title,
  subtitle,
  children,
  headerAction,
}: PageProps) {
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === "web" && width >= 768;
  const hasIntro = Boolean(eyebrow || title || subtitle);

  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-4 pb-8">
        <View
          className="w-full self-center pt-2"
          style={isWideWeb ? { maxWidth: 560 } : undefined}
        >
          <View className="mb-4 flex-row items-center justify-between rounded-[22px] border border-border bg-card px-4 py-3">
            <View className="flex-row items-center gap-3">
              <Image
                source={GNE_LOGO}
                resizeMode="contain"
                style={{ height: 46, width: 46 }}
              />
              <View className="max-w-[220px]">
                <Text className="text-[12px] font-bold uppercase tracking-[0.6px] text-accent">
                  GNE College App
                </Text>
                <Text className="mt-1 text-[13px] leading-[18px] text-muted">
                  Minimal student utility for notices, events, and campus
                  essentials.
                </Text>
              </View>
            </View>
            {headerAction ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={headerAction.label}
                className="h-11 w-11 items-center justify-center rounded-full bg-surface"
                onPress={headerAction.onPress}
              >
                <Ionicons name={headerAction.icon} size={22} color="#1e1a33" />
              </Pressable>
            ) : null}
          </View>

          {hasIntro ? (
            <>
              {eyebrow ? (
                <Text className="text-[13px] font-bold uppercase tracking-[0.5px] text-accent">
                  {eyebrow}
                </Text>
              ) : null}
              {title ? (
                <Text className="mt-2 text-[31px] font-extrabold leading-[36px] text-ink">
                  {title}
                </Text>
              ) : null}
              {subtitle ? (
                <Text className="mt-2 text-[15px] leading-[22px] text-muted">
                  {subtitle}
                </Text>
              ) : null}
            </>
          ) : null}

          <View className={hasIntro ? "pt-5" : "pt-0"}>{children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function SectionTitle({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: SectionTitleProps) {
  return (
    <View className="mb-3 flex-row items-end justify-between gap-4">
      <View className="flex-1">
        <Text className="text-[20px] font-extrabold text-ink">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-[14px] leading-[20px] text-muted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onActionPress ? (
        <Pressable onPress={onActionPress}>
          <Text className="text-[13px] font-bold text-accent">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function HeroCard({
  tag,
  title,
  text,
}: {
  tag: string;
  title: string;
  text: string;
}) {
  return (
    <View className="mb-6 rounded-[28px] bg-primary px-5 py-5">
      <Text className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#f4e7d0]">
        {tag}
      </Text>
      <Text className="mt-2.5 text-[24px] font-extrabold leading-[30px] text-white">
        {title}
      </Text>
      <Text className="mt-2 text-[15px] leading-[22px] text-[#e7e1ff]">
        {text}
      </Text>
    </View>
  );
}

export function QuickActionCard({
  icon,
  label,
  onPress,
}: QuickActionCardProps) {
  return (
    <Pressable
      className="min-w-[100px] flex-1 rounded-[22px] border border-border bg-card px-4 py-4"
      onPress={onPress}
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-surface">
        <Ionicons name={icon} size={22} color="#1e1a33" />
      </View>
      <Text className="mt-3 text-[15px] font-bold text-ink">{label}</Text>
    </Pressable>
  );
}

export function Card({
  title,
  meta,
  tag,
  body,
  leading,
  onPress,
  featured,
  pinned,
}: CardProps) {
  const showLeadingInHeader = Boolean(meta && !tag && leading);

  const content = (
    <View
      className={
        featured
          ? "rounded-[28px] bg-primary px-5 py-5"
          : "rounded-[22px] border border-border bg-card p-4"
      }
    >
      {(tag || meta) && (
        <View className="mb-2.5 flex-row items-center justify-between gap-3">
          <View className="flex-row items-center gap-2">
            {pinned ? (
              <View className="items-center justify-center">
                <Ionicons
                  name="pin"
                  size={18}
                  color={featured ? "#f4e7d0" : "#7d5cff"}
                />
              </View>
            ) : null}
            {tag ? <Chip label={tag} active={featured} /> : null}
            {showLeadingInHeader ? (
              <Text
                className={
                  featured
                    ? "text-[13px] font-bold uppercase tracking-[0.4px] text-[#f4e7d0]"
                    : "text-[13px] font-bold uppercase tracking-[0.4px] text-accent"
                }
              >
                {leading}
              </Text>
            ) : null}
          </View>
          {meta ? (
            <Text
              className={
                featured
                  ? "text-right text-[12px] font-semibold text-[#f4e7d0]"
                  : "text-right text-[12px] font-semibold text-date"
              }
            >
              {meta}
            </Text>
          ) : null}
        </View>
      )}
      {leading && !showLeadingInHeader ? (
        <Text
          className={
            featured
              ? "mb-1.5 text-[13px] font-bold uppercase tracking-[0.4px] text-[#f4e7d0]"
              : "mb-1.5 text-[13px] font-bold uppercase tracking-[0.4px] text-accent"
          }
        >
          {leading}
        </Text>
      ) : null}
      <Text
        className={
          featured
            ? "text-[24px] font-extrabold leading-[30px] text-white"
            : "text-[17px] font-bold leading-6 text-ink"
        }
      >
        {title}
      </Text>
      {body ? (
        <Text
          className={
            featured
              ? "mt-2 text-[15px] leading-[22px] text-[#e7e1ff]"
              : "mt-2 text-[14px] leading-[21px] text-muted"
          }
        >
          {body}
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <View className="mb-[14px]">{content}</View>;
  }

  return (
    <Pressable className="mb-[14px]" onPress={onPress}>
      {content}
    </Pressable>
  );
}

export function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View
      className={
        active
          ? "rounded-full bg-highlight px-3 py-2"
          : "rounded-full bg-surface px-3 py-2"
      }
    >
      <Text
        className={
          active
            ? "text-[12px] font-semibold text-highlightText"
            : "text-[12px] font-semibold text-chipText"
        }
      >
        {label}
      </Text>
    </View>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View className="rounded-[22px] bg-info px-4 py-5">
      <Text className="text-[17px] font-extrabold text-infoTitle">{title}</Text>
      <Text className="mt-2 text-[14px] leading-[21px] text-infoText">
        {text}
      </Text>
    </View>
  );
}
