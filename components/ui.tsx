import { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

type CardProps = {
  title: string;
  meta?: string;
  tag?: string;
  leading?: string;
  showTagRow?: boolean;
};

export function Page({ eyebrow, title, subtitle, children }: PageProps) {
  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-4 pb-8">
        <View className="pb-4 pt-2.5">
          <Text className="text-[13px] font-bold uppercase tracking-[0.4px] text-accent">
            {eyebrow}
          </Text>
          <Text className="mt-1.5 text-[30px] font-extrabold text-ink">
            {title}
          </Text>
          <Text className="mt-2 text-[15px] leading-[22px] text-muted">
            {subtitle}
          </Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="mb-3">
      <Text className="text-[20px] font-extrabold text-ink">{title}</Text>
      {subtitle ? (
        <Text className="mt-1 text-[14px] text-muted">{subtitle}</Text>
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
    <View className="mb-[22px] rounded-3xl bg-primary p-5">
      <Text className="text-[13px] font-bold uppercase tracking-[0.4px] text-[#b8f1db]">
        {tag}
      </Text>
      <Text className="mt-2.5 text-[24px] font-extrabold leading-[30px] text-[#ecfff7]">
        {title}
      </Text>
      <Text className="mt-2.5 text-[15px] leading-[22px] text-[#d7ebe3]">
        {text}
      </Text>
    </View>
  );
}

export function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View
      className={
        active
          ? "rounded-full bg-highlight px-3 py-2"
          : "rounded-full bg-[#eadfce] px-3 py-2"
      }
    >
      <Text
        className={
          active
            ? "text-[13px] font-semibold text-[#49300f]"
            : "text-[13px] font-semibold text-[#6e5439]"
        }
      >
        {label}
      </Text>
    </View>
  );
}

export function Card({ title, meta, tag, leading, showTagRow }: CardProps) {
  return (
    <View className="mb-[14px] rounded-[20px] border border-border bg-card p-4">
      {showTagRow ? (
        <View className="mb-2.5 flex-row items-center justify-between gap-3">
          {tag ? <Chip label={tag} /> : <View />}
          {meta ? (
            <Text className="text-[12px] font-semibold text-[#8a7b65]">
              {meta}
            </Text>
          ) : null}
        </View>
      ) : null}
      {leading ? (
        <Text className="mb-1.5 text-[13px] font-bold text-accent">
          {leading}
        </Text>
      ) : null}
      <Text className="text-[17px] font-bold leading-6 text-ink">{title}</Text>
      {!showTagRow && meta ? (
        <Text className="mt-1.5 text-[14px] text-muted">{meta}</Text>
      ) : null}
    </View>
  );
}

export function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <View className="mb-[14px] rounded-[20px] bg-info p-4">
      <Text className="mb-2 text-[16px] font-extrabold text-[#183630]">
        {title}
      </Text>
      <Text className="text-[15px] leading-[22px] text-[#31514a]">{text}</Text>
    </View>
  );
}
