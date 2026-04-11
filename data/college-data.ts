export type Notice = {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  pinned?: boolean;
  featured?: boolean;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
};

export type PlacementUpdate = {
  id: string;
  title: string;
  date: string;
  company: string;
  summary: string;
  pinned?: boolean;
};

export type PlacementForm = {
  id: string;
  title: string;
  deadline: string;
  href: string;
  note: string;
};

export type TpoContact = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type QuickAction = {
  label: string;
  icon: "calendar-outline" | "call-outline" | "person-circle-outline";
  href: "/timetable" | "/contacts" | "/profile";
};

export type TimetableClass = {
  time: string;
  subject: string;
  room: string;
};

export type TimetableDay = {
  day: string;
  classes: TimetableClass[];
};

export type TimetableGroup = {
  department: string;
  semester: string;
  days: TimetableDay[];
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
};

export const quickActions: QuickAction[] = [
  {
    label: "Timetable",
    icon: "calendar-outline",
    href: "/timetable",
  },
  {
    label: "Contacts",
    icon: "call-outline",
    href: "/contacts",
  },
  {
    label: "Login",
    icon: "person-circle-outline",
    href: "/profile",
  },
];

export const notices: Notice[] = [
  {
    id: "notice-exam-form",
    title: "Examination form submission window opens for May session",
    date: "April 10, 2026",
    category: "Academics",
    excerpt:
      "Students should complete the form submission and fee verification before the department deadline.",
  },
  {
    id: "notice-scholarship",
    title: "Merit scholarship document verification starts next week",
    date: "April 8, 2026",
    category: "Scholarship",
    excerpt:
      "Eligible students must carry their latest marksheet, ID card, and bank details for verification.",
    pinned: false,
    featured: true,
  },
  {
    id: "notice-holiday",
    title: "Revised holiday list published for April and May",
    date: "April 6, 2026",
    category: "Administration",
    excerpt:
      "The updated schedule includes festival holidays and one rescheduled working Saturday.",
  },
  {
    id: "notice-library",
    title: "Central library timing extended during internal assessment week",
    date: "April 4, 2026",
    category: "Facilities",
    excerpt:
      "The reading hall will remain open longer in the evening to support exam preparation.",
  },
];

export const events: Event[] = [
  {
    id: "event-tech-summit",
    title: "Innovation and Startup Summit",
    date: "April 18, 2026",
    venue: "Auditorium Block",
    description:
      "Student founders, alumni speakers, and project teams present ideas, demos, and startup journeys.",
  },
  {
    id: "event-career-fair",
    title: "Career Readiness and Placement Fair",
    date: "April 24, 2026",
    venue: "Seminar Hall Complex",
    description:
      "Placement cell sessions, resume reviews, and employer interaction counters for final-year students.",
  },
  {
    id: "event-cultural-night",
    title: "Spring Cultural Evening",
    date: "April 27, 2026",
    venue: "Main Campus Ground",
    description:
      "Music, performances, and society showcases with open entry for students across departments.",
  },
];

export const placementUpdates: PlacementUpdate[] = [
  {
    id: "placement-infosys",
    title: "Infosys campus drive registration opens for 2026 batch",
    date: "April 12, 2026",
    company: "Infosys",
    summary:
      "Eligible final-year students should complete registration, upload their resume, and confirm academic details before screening slots are assigned.",
    pinned: true,
  },
  {
    id: "placement-tcs",
    title: "TCS aptitude assessment scheduled for shortlisted students",
    date: "April 16, 2026",
    company: "TCS",
    summary:
      "The first round includes aptitude and verbal sections. Students should carry their college ID and reporting confirmation.",
  },
  {
    id: "placement-wipro",
    title: "Wipro pre-placement talk and application shortlist update",
    date: "April 20, 2026",
    company: "Wipro",
    summary:
      "The placement cell will share the final shortlist after the pre-placement talk in the seminar hall.",
  },
];

export const placementForms: PlacementForm[] = [
  {
    id: "placement-form-resume-bank",
    title: "Final-year resume bank submission",
    deadline: "April 14, 2026",
    href: "https://example.com/forms/resume-bank",
    note: "Upload the latest one-page resume so the placement cell can circulate profiles to recruiters.",
  },
  {
    id: "placement-form-infosys",
    title: "Infosys drive application form",
    deadline: "April 15, 2026",
    href: "https://example.com/forms/infosys-drive",
    note: "Students must verify CGPA, backlog status, and contact details before submitting the company form.",
  },
];

export const placementEligibilityNotes = [
  "Keep CGPA, active backlog status, and passing year clearly visible on every application.",
  "Use the same phone number and email across the app, resume, and company forms to avoid mismatch.",
  "Carry two printed resumes and your college ID on assessment and interview days.",
];

export const tpoContacts: TpoContact[] = [
  {
    id: "tpo-main",
    name: "Training and Placement Office",
    role: "Drive coordination and employer communication",
    phone: "+91 161 506 4440",
    email: "tpo@gne.edu.in",
  },
  {
    id: "tpo-student",
    name: "Placement Student Desk",
    role: "Form submission help and shortlist query support",
    phone: "+91 89685 53081",
    email: "placementsupport@gne.edu.in",
  },
];

export const timetableGroups: TimetableGroup[] = [
  {
    department: "CSE",
    semester: "Semester 6",
    days: [
      {
        day: "Monday",
        classes: [
          { time: "9:00 AM", subject: "Compiler Design", room: "C-204" },
          { time: "10:00 AM", subject: "Machine Learning", room: "Lab 5" },
          { time: "1:00 PM", subject: "Web Engineering", room: "C-208" },
        ],
      },
      {
        day: "Tuesday",
        classes: [
          { time: "9:00 AM", subject: "Machine Learning", room: "C-202" },
          { time: "11:00 AM", subject: "Computer Networks", room: "C-204" },
          { time: "2:00 PM", subject: "Aptitude Training", room: "Seminar 2" },
        ],
      },
      {
        day: "Wednesday",
        classes: [
          { time: "10:00 AM", subject: "Web Engineering Lab", room: "Lab 3" },
          { time: "12:00 PM", subject: "Compiler Design", room: "C-205" },
        ],
      },
    ],
  },
  {
    department: "ECE",
    semester: "Semester 4",
    days: [
      {
        day: "Monday",
        classes: [
          { time: "9:00 AM", subject: "Signals and Systems", room: "E-102" },
          { time: "11:00 AM", subject: "Analog Circuits", room: "E-104" },
          { time: "2:00 PM", subject: "Network Theory", room: "E-101" },
        ],
      },
      {
        day: "Tuesday",
        classes: [
          { time: "10:00 AM", subject: "Digital Systems Lab", room: "ECE Lab" },
          { time: "1:00 PM", subject: "Microprocessors", room: "E-103" },
        ],
      },
      {
        day: "Wednesday",
        classes: [
          { time: "9:00 AM", subject: "Analog Circuits", room: "E-104" },
          { time: "12:00 PM", subject: "Signals Tutorial", room: "E-105" },
        ],
      },
    ],
  },
];

export const contacts: Contact[] = [
  {
    id: "contact-office",
    name: "College Office",
    role: "Main reception and campus administration",
    phone: "+91 161 250 2700",
    email: "office@gne.edu.in",
  },
  {
    id: "contact-admission",
    name: "Admission Help Desk",
    role: "Admission and counseling queries",
    phone: "+91 90414 95448",
    email: "admissions@gne.edu.in",
  },
  {
    id: "contact-cse",
    name: "CSE Department Office",
    role: "Department timetable and academic coordination",
    phone: "+91 161 506 4501",
    email: "cse@gne.edu.in",
  },
  {
    id: "contact-student",
    name: "Student Support Cell",
    role: "General student assistance and grievance routing",
    phone: "+91 89685 53073",
  },
];

export const authPlaceholder = {
  title: "Student login is not active yet",
  message:
    "This screen reserves the account area for later. For now, keep the UI light and use it as a placeholder for profile, notifications, and saved preferences.",
};
