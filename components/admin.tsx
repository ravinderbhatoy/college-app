import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Pressable, Text, TextInput, View } from "react-native";

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[13px] font-bold uppercase tracking-[0.4px] text-accent">
        {label}
      </Text>
      <TextInput
        className={
          multiline
            ? "min-h-[144px] rounded-[18px] border border-border bg-card px-4 py-3 text-[15px] leading-[22px] text-ink"
            : "rounded-[18px] border border-border bg-card px-4 py-3 text-[15px] text-ink"
        }
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor="#7b728f"
        secureTextEntry={secureTextEntry}
        textAlignVertical={multiline ? "top" : "center"}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function ActionButton({
  label,
  icon,
  onPress,
  tone = "primary",
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  tone?: "primary" | "muted";
}) {
  const classes =
    tone === "primary"
      ? "rounded-[18px] bg-primary px-4 py-4"
      : "rounded-[18px] border border-border bg-card px-4 py-4";
  const iconColor = tone === "primary" ? "#ffffff" : "#1e1a33";
  const textClass =
    tone === "primary"
      ? "text-[15px] font-bold text-white"
      : "text-[15px] font-bold text-ink";

  return (
    <Pressable className={classes} onPress={onPress}>
      <View className="flex-row items-center justify-center gap-2">
        {icon ? <Ionicons color={iconColor} name={icon} size={18} /> : null}
        <Text className={textClass}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function ToggleChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={
        selected
          ? "rounded-full bg-highlight px-4 py-2"
          : "rounded-full bg-surface px-4 py-2"
      }
      onPress={onPress}
    >
      <Text
        className={
          selected
            ? "text-[13px] font-semibold text-highlightText"
            : "text-[13px] font-semibold text-chipText"
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function EditorToolbar({
  onInsert,
}: {
  onInsert: (before: string, after?: string) => void;
}) {
  const actions = [
    { label: "H1", before: "# ", after: "" },
    { label: "H2", before: "## ", after: "" },
    { label: "Bold", before: "**", after: "**" },
    { label: "Bullet", before: "- ", after: "" },
    { label: "Link", before: "[Link text](", after: ")" },
  ];

  return (
    <View className="mb-3 flex-row flex-wrap gap-2">
      {actions.map((action) => (
        <Pressable
          key={action.label}
          className="rounded-full bg-surface px-4 py-2"
          onPress={() => onInsert(action.before, action.after)}
        >
          <Text className="text-[13px] font-semibold text-chipText">
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function normalizePreviewText(line: string) {
  return line
    .trim();
}

function renderInlineMarkdown(line: string, keyPrefix: string) {
  const parts: Array<{
    type: "text" | "bold" | "link";
    value: string;
    href?: string;
  }> = [];
  const pattern = /(\*\*([^*]+)\*\*|__([^_]+)__|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        value: line.slice(lastIndex, match.index),
      });
    }

    if (match[2] || match[3]) {
      parts.push({
        type: "bold",
        value: match[2] ?? match[3] ?? "",
      });
    } else if (match[4] && match[5]) {
      parts.push({
        type: "link",
        value: match[4],
        href: match[5],
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push({
      type: "text",
      value: line.slice(lastIndex),
    });
  }

  if (parts.length === 0) {
    parts.push({ type: "text", value: line });
  }

  return parts.map((part, index) => {
    if (part.type === "bold") {
      return (
        <Text
          key={`${keyPrefix}-bold-${index}`}
          className="font-extrabold text-ink"
        >
          {part.value}
        </Text>
      );
    }

    if (part.type === "link") {
      return (
        <Text
          key={`${keyPrefix}-link-${index}`}
          className="text-[14px] font-semibold text-accent underline"
          onPress={() => {
            if (part.href) {
              Linking.openURL(part.href);
            }
          }}
        >
          {part.value}
        </Text>
      );
    }

    return <Text key={`${keyPrefix}-text-${index}`}>{part.value}</Text>;
  });
}

export function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split("\n");
  const hasVisibleContent = lines.some((line) => line.trim().length > 0);

  if (!hasVisibleContent) {
    return (
      <View className="rounded-[22px] border border-dashed border-border bg-card px-4 py-5">
        <Text className="text-[14px] leading-[21px] text-muted">
          Preview appears here as staff type or use the helper buttons.
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded-[22px] border border-border bg-card px-4 py-5">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();

        if (!line) {
          return <View key={`space-${index}`} className="h-3" />;
        }

        if (line.startsWith("## ")) {
          return (
            <Text
              key={`h2-${index}`}
              className="mb-2 text-[19px] font-extrabold text-ink"
            >
              {renderInlineMarkdown(normalizePreviewText(line.slice(3)), `h2-${index}`)}
            </Text>
          );
        }

        if (line.startsWith("# ")) {
          return (
            <Text
              key={`h1-${index}`}
              className="mb-2 text-[22px] font-extrabold text-ink"
            >
              {renderInlineMarkdown(normalizePreviewText(line.slice(2)), `h1-${index}`)}
            </Text>
          );
        }

        if (line.startsWith("- ")) {
          return (
            <Text
              key={`bullet-${index}`}
              className="mb-2 text-[14px] leading-[21px] text-muted"
            >
              {"\u2022"}{" "}
              {renderInlineMarkdown(normalizePreviewText(line.slice(2)), `bullet-${index}`)}
            </Text>
          );
        }

        return (
          <Text
            key={`text-${index}`}
            className="mb-2 text-[14px] leading-[21px] text-muted"
          >
            {renderInlineMarkdown(normalizePreviewText(line), `text-${index}`)}
          </Text>
        );
      })}
    </View>
  );
}
