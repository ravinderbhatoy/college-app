import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Event,
  Notice,
  events as seedEvents,
  notices as seedNotices,
} from "../data/college-data";

const STORAGE_KEYS = {
  adminUsers: "gndec.admin.users",
  adminSession: "gndec.admin.session",
  notices: "gndec.content.notices",
  events: "gndec.content.events",
} as const;

const DEFAULT_ADMIN = {
  id: "admin-staff",
  username: "admin",
  password: "admin123",
  name: "Admin Staff",
};

export type StoredNotice = Notice & {
  contentMarkdown: string;
  createdAt: string;
  author: string;
  source: "seed" | "admin";
};

export type StoredEvent = Event & {
  contentMarkdown: string;
  createdAt: string;
  author: string;
  source: "seed" | "admin";
};

export type AdminSession = {
  username: string;
  name: string;
  loggedInAt: string;
};

export type PublishNoticeInput = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  contentMarkdown: string;
  pinned?: boolean;
  featured?: boolean;
};

export type PublishEventInput = {
  title: string;
  date: string;
  venue: string;
  description: string;
  contentMarkdown: string;
};

export type UpdateNoticeInput = PublishNoticeInput;

export type UpdateEventInput = PublishEventInput;

function normalizeText(value: string) {
  return value.trim();
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

function summarize(markdown: string) {
  const plainText = stripMarkdown(markdown);
  if (plainText.length <= 140) {
    return plainText;
  }

  return `${plainText.slice(0, 137).trimEnd()}...`;
}

function seedNoticeContent(notice: Notice) {
  return `# ${notice.title}\n\n${notice.excerpt}`;
}

function seedEventContent(event: Event) {
  return `# ${event.title}\n\n${event.description}`;
}

function defaultNoticeFeed(): StoredNotice[] {
  return seedNotices.map((notice, index) => ({
    ...notice,
    contentMarkdown: seedNoticeContent(notice),
    createdAt: `2026-04-01T0${index}:00:00.000Z`,
    author: "Seed Data",
    source: "seed" as const,
  }));
}

function defaultEventFeed(): StoredEvent[] {
  return seedEvents.map((event, index) => ({
    ...event,
    contentMarkdown: seedEventContent(event),
    createdAt: `2026-04-01T1${index}:00:00.000Z`,
    author: "Seed Data",
    source: "seed" as const,
  }));
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const rawValue = await AsyncStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function initializeContentStore() {
  const [storedUsers, storedSession, storedNotices, storedEvents] =
    await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.adminUsers),
      AsyncStorage.getItem(STORAGE_KEYS.adminSession),
      AsyncStorage.getItem(STORAGE_KEYS.notices),
      AsyncStorage.getItem(STORAGE_KEYS.events),
    ]);

  const writes: Promise<void>[] = [];

  if (!storedUsers) {
    writes.push(writeJson(STORAGE_KEYS.adminUsers, [DEFAULT_ADMIN]));
  }

  if (!storedSession) {
    writes.push(AsyncStorage.removeItem(STORAGE_KEYS.adminSession));
  }

  if (!storedNotices) {
    writes.push(writeJson(STORAGE_KEYS.notices, defaultNoticeFeed()));
  }

  if (!storedEvents) {
    writes.push(writeJson(STORAGE_KEYS.events, defaultEventFeed()));
  }

  if (writes.length > 0) {
    await Promise.all(writes);
  }
}

export async function getAdminSession() {
  await initializeContentStore();
  return readJson<AdminSession | null>(STORAGE_KEYS.adminSession, null);
}

export async function signInAdmin(username: string, password: string) {
  await initializeContentStore();

  const users = await readJson<typeof DEFAULT_ADMIN[]>(STORAGE_KEYS.adminUsers, [
    DEFAULT_ADMIN,
  ]);
  const matchedUser = users.find(
    (user) =>
      user.username.toLowerCase() === normalizeText(username).toLowerCase() &&
      user.password === password
  );

  if (!matchedUser) {
    return {
      ok: false as const,
      message: "Invalid admin username or password.",
    };
  }

  const session: AdminSession = {
    username: matchedUser.username,
    name: matchedUser.name,
    loggedInAt: new Date().toISOString(),
  };

  await writeJson(STORAGE_KEYS.adminSession, session);

  return { ok: true as const, session };
}

export async function signOutAdmin() {
  await AsyncStorage.removeItem(STORAGE_KEYS.adminSession);
}

export async function getPublishedNotices() {
  await initializeContentStore();
  return readJson<StoredNotice[]>(STORAGE_KEYS.notices, defaultNoticeFeed());
}

export async function getPublishedEvents() {
  await initializeContentStore();
  return readJson<StoredEvent[]>(STORAGE_KEYS.events, defaultEventFeed());
}

export async function getNoticeById(id: string) {
  const noticeFeed = await getPublishedNotices();
  return noticeFeed.find((notice) => notice.id === id) ?? null;
}

export async function getEventById(id: string) {
  const eventFeed = await getPublishedEvents();
  return eventFeed.find((event) => event.id === id) ?? null;
}

export async function publishNotice(input: PublishNoticeInput) {
  const noticeFeed = await getPublishedNotices();
  const session = await getAdminSession();
  const notice: StoredNotice = {
    id: `notice-${Date.now()}`,
    title: normalizeText(input.title),
    date: normalizeText(input.date),
    category: normalizeText(input.category),
    excerpt:
      normalizeText(input.excerpt) || summarize(normalizeText(input.contentMarkdown)),
    contentMarkdown: normalizeText(input.contentMarkdown),
    pinned: input.pinned,
    featured: input.featured,
    createdAt: new Date().toISOString(),
    author: session?.name ?? "Admin Staff",
    source: "admin",
  };

  const nextFeed = [notice, ...noticeFeed];
  await writeJson(STORAGE_KEYS.notices, nextFeed);
  return notice;
}

export async function publishEvent(input: PublishEventInput) {
  const eventFeed = await getPublishedEvents();
  const session = await getAdminSession();
  const event: StoredEvent = {
    id: `event-${Date.now()}`,
    title: normalizeText(input.title),
    date: normalizeText(input.date),
    venue: normalizeText(input.venue),
    description:
      normalizeText(input.description) ||
      summarize(normalizeText(input.contentMarkdown)),
    contentMarkdown: normalizeText(input.contentMarkdown),
    createdAt: new Date().toISOString(),
    author: session?.name ?? "Admin Staff",
    source: "admin",
  };

  const nextFeed = [event, ...eventFeed];
  await writeJson(STORAGE_KEYS.events, nextFeed);
  return event;
}

export async function updateNotice(id: string, input: UpdateNoticeInput) {
  const noticeFeed = await getPublishedNotices();
  const session = await getAdminSession();
  const existingNotice = noticeFeed.find((notice) => notice.id === id);

  if (!existingNotice) {
    throw new Error("Notice not found.");
  }

  const updatedNotice: StoredNotice = {
    ...existingNotice,
    title: normalizeText(input.title),
    date: normalizeText(input.date),
    category: normalizeText(input.category),
    excerpt:
      normalizeText(input.excerpt) || summarize(normalizeText(input.contentMarkdown)),
    contentMarkdown: normalizeText(input.contentMarkdown),
    pinned: input.pinned,
    featured: input.featured,
    author: session?.name ?? existingNotice.author,
  };

  const nextFeed = noticeFeed.map((notice) =>
    notice.id === id ? updatedNotice : notice
  );
  await writeJson(STORAGE_KEYS.notices, nextFeed);
  return updatedNotice;
}

export async function updateEvent(id: string, input: UpdateEventInput) {
  const eventFeed = await getPublishedEvents();
  const session = await getAdminSession();
  const existingEvent = eventFeed.find((event) => event.id === id);

  if (!existingEvent) {
    throw new Error("Event not found.");
  }

  const updatedEvent: StoredEvent = {
    ...existingEvent,
    title: normalizeText(input.title),
    date: normalizeText(input.date),
    venue: normalizeText(input.venue),
    description:
      normalizeText(input.description) ||
      summarize(normalizeText(input.contentMarkdown)),
    contentMarkdown: normalizeText(input.contentMarkdown),
    author: session?.name ?? existingEvent.author,
  };

  const nextFeed = eventFeed.map((event) => (event.id === id ? updatedEvent : event));
  await writeJson(STORAGE_KEYS.events, nextFeed);
  return updatedEvent;
}

export async function deleteNotice(id: string) {
  const noticeFeed = await getPublishedNotices();
  const nextFeed = noticeFeed.filter((notice) => notice.id !== id);

  if (nextFeed.length === noticeFeed.length) {
    throw new Error("Notice not found.");
  }

  await writeJson(STORAGE_KEYS.notices, nextFeed);
}

export async function deleteEvent(id: string) {
  const eventFeed = await getPublishedEvents();
  const nextFeed = eventFeed.filter((event) => event.id !== id);

  if (nextFeed.length === eventFeed.length) {
    throw new Error("Event not found.");
  }

  await writeJson(STORAGE_KEYS.events, nextFeed);
}
