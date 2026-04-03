export type Notice = {
  title: string;
  date: string;
  tag: string;
};

export type ScheduleItem = {
  time: string;
  subject: string;
  room: string;
};

export type LinkItem = {
  label: string;
  detail: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type Highlight = {
  title: string;
  text: string;
};

export type DepartmentGroup = {
  school: string;
  items: string[];
};

export type Contact = {
  label: string;
  value: string;
  note?: string;
};

export const quickActions = [
  'Student Corner',
  'Notice Board',
  'Academic Calendar',
  'Admission Helpline',
];

export const gndecMetrics: Metric[] = [
  { label: 'Established', value: '1956' },
  { label: 'Status', value: 'Autonomous' },
  { label: 'Focus', value: 'Student-first' },
];

export const homeHighlights: Highlight[] = [
  {
    title: 'Student corner first',
    text: 'The app should put exam notices, fee notices, scholarships, and quick student links on the first screen.',
  },
  {
    title: 'Formal institutional identity',
    text: 'GNDEC should feel credible and service-oriented, with history, accreditation, and departments presented clearly but compactly.',
  },
  {
    title: 'Support in one tap',
    text: 'Helplines, grievance support, anti-ragging resources, and admissions contacts should be faster to reach than on the desktop site.',
  },
];

export const notices: Notice[] = [
  {
    title: 'Notice regarding Special Chance Examination',
    date: 'April 3, 2026',
    tag: 'Student Corner',
  },
  {
    title: 'Alumni scholarship for needy and academically sound students',
    date: 'April 2, 2026',
    tag: 'Scholarship',
  },
  {
    title: 'Fee Notice Jan to June 2026 for all branches',
    date: 'April 1, 2026',
    tag: 'Fees',
  },
  {
    title: 'Academic calendar and holiday list updated for the new session',
    date: 'March 30, 2026',
    tag: 'Academics',
  },
  {
    title: 'Call for quotations and conference announcements published in public corner',
    date: 'March 28, 2026',
    tag: 'Public Corner',
  },
];

export const scheduleByDay: Record<string, ScheduleItem[]> = {
  Monday: [
    { time: '9:00 AM', subject: 'Applied Mathematics', room: 'Block A-203' },
    { time: '10:00 AM', subject: 'Programming Lab', room: 'Lab C-12' },
    { time: '1:00 PM', subject: 'Engineering Mechanics', room: 'Block B-104' },
  ],
  Tuesday: [
    { time: '9:00 AM', subject: 'Electrical Sciences', room: 'Block E-105' },
    { time: '11:00 AM', subject: 'Communication Skills', room: 'Block D-204' },
    { time: '2:00 PM', subject: 'Workshop Practice', room: 'Workshop-2' },
  ],
  Wednesday: [
    { time: '10:00 AM', subject: 'Data Structures', room: 'Block C-301' },
    { time: '12:00 PM', subject: 'Environmental Studies', room: 'Block A-109' },
    { time: '2:00 PM', subject: 'Tutorial Hour', room: 'Block B-211' },
  ],
  Thursday: [
    { time: '9:00 AM', subject: 'Digital Electronics', room: 'Block E-208' },
    { time: '11:00 AM', subject: 'Programming Lab', room: 'Lab C-12' },
    { time: '1:00 PM', subject: 'Mentor Meeting', room: 'Seminar Hall 1' },
  ],
  Friday: [
    { time: '10:00 AM', subject: 'Project Discussion', room: 'Innovation Cell' },
    { time: '12:00 PM', subject: 'Soft Skills', room: 'Block D-201' },
    { time: '2:00 PM', subject: 'Sports Hour', room: 'Main Ground' },
  ],
};

export const academicLinks: LinkItem[] = [
  { label: 'Programs Offered', detail: 'UG, PG, Architecture, MCA, MBA and vocational pathways' },
  { label: 'Academic Calendar', detail: 'Session milestones, registration windows and teaching schedule' },
  { label: 'List of Holidays', detail: 'College holiday planning and campus closure dates' },
  { label: 'Examination Portal', detail: 'Student exam links, results flow and circulars' },
];

export const informationCorner: LinkItem[] = [
  { label: 'Notice Board', detail: 'Primary institutional updates surfaced from the website' },
  { label: 'Accreditation Status', detail: 'Autonomy, NAAC, NBA and institutional trust signals' },
  { label: 'AICTE Fellowship / Scholarship', detail: 'Scholarship discovery for eligible students' },
  { label: 'Higher Education Initiatives', detail: 'External initiatives and central education resources' },
];

export const departmentGroups: DepartmentGroup[] = [
  {
    school: 'Engineering',
    items: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical and Production Engineering',
      'Civil Engineering',
    ],
  },
  {
    school: 'Applied and Professional Studies',
    items: [
      'Applied Sciences',
      'Business Administration',
      'Computer Applications',
      'School of Architecture',
    ],
  },
];

export const facilities: LinkItem[] = [
  { label: 'Central Library', detail: 'Reading spaces, reference support and study access' },
  { label: 'Hostels', detail: 'Residential support and student stay information' },
  { label: 'Computer Center', detail: 'Shared computing infrastructure and labs' },
  { label: 'Sports', detail: 'Grounds, athletics and student fitness spaces' },
  { label: 'Workshops', detail: 'Hands-on engineering practice and production spaces' },
  { label: 'NCC / NSS / Cultural', detail: 'Leadership, service and campus life participation' },
];

export const institutionalHighlights: Highlight[] = [
  {
    title: 'Historic identity',
    text: 'GNDEC was established in 1956 and is positioned by the college as one of the oldest engineering institutions in Northern India.',
  },
  {
    title: 'Academic credibility',
    text: 'The website emphasizes autonomy, accreditation, NAAC grade, and repeated program quality recognition as core trust markers.',
  },
  {
    title: 'Career outcomes',
    text: 'Training and placement, alumni visibility, and industry-facing credibility are presented as recurring strengths.',
  },
];

export const supportContacts: Contact[] = [
  {
    label: 'B.Tech. and M.Tech. Admission Helpline',
    value: '9041495448, 8968553073, 7696771769, 7710610448',
    note: 'Website-listed admission support numbers',
  },
  {
    label: 'BBA, B.Com and MBA Admission Helpline',
    value: '9876156364, 9417992553',
  },
  {
    label: 'BCA and MCA Admission Helpline',
    value: '9876700810, 9417271184',
  },
  {
    label: 'Anti-Ragging Helpline',
    value: '24-hour helpline available on GNDEC help desk',
  },
  {
    label: 'Grievance Redressal Committee',
    value: 'Student and staff grievance support',
  },
  {
    label: 'Disability Resource Centre',
    value: 'Accessibility and inclusion support',
  },
  {
    label: 'Student Verification by Employer',
    value: 'Verification workflow listed on help desk',
  },
];
