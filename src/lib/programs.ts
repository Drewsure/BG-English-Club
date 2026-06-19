export type ProgramId = 'trial-table' | 'kids-families' | 'silver-circle' | 'strategy-coaching' | 'corporate-workshops' | 'briefing';

export type Program = {
  id: ProgramId;
  name: string;
  shortName: string;
  answer: string;
  audience: string;
  outcome: string;
  price: string;
  location: string;
  schedule: string;
  bookingAction: string;
  subject: string;
  body: string;
  proof: string;
  faq: Array<{ question: string; answer: string }>;
};

export const contactEmail = 'ministarenglish@mail.com';

export const brandPromise = 'Choose, speak, laugh, and leave with some useful English. Each time.';

export const sessionProcess = 'Pick a game -> briefing auto-matches -> choose one English goal -> choose one live table question -> record progress.';

export const programs: Program[] = [
  {
    id: 'trial-table',
    name: 'Trial Table',
    shortName: 'Trial Table',
    answer: 'A first, low-pressure English board game table for people who want to try the method before joining a regular program.',
    audience: 'Beginners, hesitant speakers, parents, adult learners, and curious first-time visitors.',
    outcome: 'You leave with one or two useful phrases you actually used during play.',
    price: 'Introductory / by inquiry',
    location: 'Nishi-ku, Fukuoka. Nearby community halls or partner tables by arrangement.',
    schedule: 'Flexible first sessions by inquiry.',
    bookingAction: 'Ask for a trial table',
    subject: 'Trial Table inquiry',
    body: 'I would like to ask about a Board Game English Club trial table.\n\nName:\nNumber of people:\nPreferred area/day:\nEnglish level:\nQuestions:',
    proof: 'Designed as the softest entry point: Japanese support, no test, no board game experience needed.',
    faq: [
      { question: 'Do I need to be good at English?', answer: 'No. The trial table is for people who want a gentle first try.' },
      { question: 'Do I need to know board games?', answer: 'No. The table starts with simple rules and supported turns.' },
    ],
  },
  {
    id: 'kids-families',
    name: 'BG English Club: Kids & Families',
    shortName: 'Kids & Families',
    answer: 'A family-friendly English game table where children, parents, and beginners practise simple useful English through play.',
    audience: 'Kids, parents, beginner learners, and family groups.',
    outcome: 'Families practise short phrases for asking, choosing, explaining, helping, and celebrating turns.',
    price: '¥2,000 / session / person',
    location: 'Nishi-ku, Fukuoka. Community spaces, family tables, and partner venues by arrangement.',
    schedule: 'Weekends, school holidays, or small-group sessions by inquiry.',
    bookingAction: 'Book a family table',
    subject: 'Kids & Families table inquiry',
    body: 'I would like to ask about BG English Club: Kids & Families.\n\nName:\nNumber and ages of children:\nPreferred day:\nQuestions:',
    proof: 'Simple games make speaking feel like part of the turn, not a test.',
    faq: [
      { question: 'Can parents join?', answer: 'Yes. Parent-child participation is welcome.' },
      { question: 'Is Japanese support available?', answer: 'Yes. Japanese support can be used so children and parents feel safe.' },
    ],
  },
  {
    id: 'silver-circle',
    name: 'BG English Club: Silver Circle',
    shortName: 'Silver Circle',
    answer: 'A softer senior community table using English board games for conversation, gentle cognitive activity, and social connection.',
    audience: 'Seniors, retired adults, and community groups.',
    outcome: 'Participants enjoy conversation, simple English phrases, laughter, and recurring local participation.',
    price: '¥3,000 / month (2 sessions)',
    location: 'Nishi-ku, Fukuoka. Nearby community hall or local partner venue.',
    schedule: '1st and 3rd Thursday, 2pm-4pm. Capacity 6.',
    bookingAction: 'Ask about Silver Circle',
    subject: 'Silver Circle inquiry',
    body: 'I would like to ask about BG English Club: Silver Circle.\n\nName:\nPreferred area:\nQuestions:',
    proof: 'Built around emotional safety, Japanese support, and no medical claims.',
    faq: [
      { question: 'Is Silver Circle medical care?', answer: 'No. It is a social participation and conversation program, not medical care.' },
      { question: 'Can beginners join?', answer: 'Yes. English beginners are welcome.' },
    ],
  },
  {
    id: 'strategy-coaching',
    name: 'BG English Club: Strategy Coaching',
    shortName: 'Strategy Coaching',
    answer: 'A focused private or small-group session for adults who want stronger English through strategic board games and guided review.',
    audience: 'Adults, executives, advanced learners, and serious returners who want deeper speaking practice.',
    outcome: 'You practise explaining decisions, asking sharper questions, reviewing strategy, and leaving with usable phrases from one focused session.',
    price: 'From ¥12,000 / session (+ per-person pricing)',
    location: 'Fukuoka area, online planning, or partner venue by arrangement.',
    schedule: 'Private, pair, or small-group sessions by inquiry.',
    bookingAction: 'Request strategy coaching',
    subject: 'Strategy Coaching inquiry',
    body: 'I would like to ask about BG English Club: Strategy Coaching.\n\nName:\nNumber of people:\nEnglish goal:\nPreferred game or theme:\nPreferred date:\nQuestions:',
    proof: 'Built for people who want more depth than a casual table, while still keeping the session practical and human.',
    faq: [
      { question: 'Is this only for advanced players?', answer: 'No. It can be adjusted, but it is best for adults who want a more focused session.' },
      { question: 'Can more than one person join?', answer: 'Yes. Pricing starts from the base session fee, with per-person pricing for added participants.' },
    ],
  },
  {
    id: 'corporate-workshops',
    name: 'BG English Club: Corporate Workshops',
    shortName: 'Corporate Workshops',
    answer: 'A board-game-based soft-skill workshop for communication, teamwork, facilitation, decision-making, and practical English.',
    audience: 'Companies, schools, libraries, community organizations, cafes, and teams.',
    outcome: 'Teams practise explaining choices, listening, negotiating, planning, and reviewing decisions.',
    price: 'From ¥20,000 (+ per-person pricing)',
    location: 'Fukuoka area, on-site or partner venue by arrangement.',
    schedule: '90-minute, half-day, or recurring workshop formats by inquiry.',
    bookingAction: 'Request workshop proposal',
    subject: 'Corporate workshop inquiry',
    body: 'I would like to discuss a BG English Club corporate workshop.\n\nOrganization:\nTeam size:\nPreferred theme:\nPossible date:\nBudget range:\nQuestions:',
    proof: 'Warmer than a lecture and more structured than a casual game night.',
    faq: [
      { question: 'Can the workshop be bilingual?', answer: 'Yes. Japanese support can keep the session clear and welcoming.' },
      { question: 'What skills are practised?', answer: 'Communication, planning, negotiation, listening, facilitation, and reflective English.' },
    ],
  },
  {
    id: 'briefing',
    name: 'BG English Club Briefing',
    shortName: 'Briefing Cards',
    answer: 'A weekly briefing-card group for people who want ready-made English table materials for board games.',
    audience: 'Teachers, parents, and game groups.',
    outcome: 'Download one free sample PDF, then join the briefing group for current cards and new cards as they become available.',
    price: 'One free sample PDF. Full briefing group: ¥500 / month.',
    location: 'Online, printable, and usable at Board Game English Club tables.',
    schedule: 'Updated weekly with currently available and future briefing releases.',
    bookingAction: 'Join briefing group',
    subject: 'Join BG English Club Briefing',
    body: 'I would like to join BG English Club Briefing for ¥500 / month.\n\nName:\nI am a teacher / parent / game group:\nHow I plan to use the briefings:',
    proof: 'One free sample lowers friction; the monthly group creates a simple path for receiving new guides.',
    faq: [
      { question: 'Is a briefing card the same as a conversation card?', answer: 'No. A briefing card is the larger game prep sheet; a conversation card is one prompt used during play.' },
      { question: 'Can I print them?', answer: 'Yes. Briefing cards are designed to become printable table aids.' },
      { question: 'What do I get for ¥500 / month?', answer: 'Access to currently available briefing cards plus new cards as they become available.' },
    ],
  },
];

export function mailtoForProgram(program: Program) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(program.subject)}&body=${encodeURIComponent(program.body)}`;
}
