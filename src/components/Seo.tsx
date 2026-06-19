import { useEffect } from 'react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { brandPromise, contactEmail, programs, sessionProcess } from '../lib/programs';

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://bg-english-club.netlify.app';
const imageUrl = `${siteUrl}/images/board-english-logo.jpeg`;

const pageMeta: Record<Section, { title: string; description: string; keywords: string }> = {
  home: {
    title: '福岡市西区 英語ボードゲームサークル | Board Game English Club',
    description: 'Board Game English Club 福岡チャプターは、福岡市西区で英語をボードゲームで楽しく使う少人数サークルです。初心者、親子、シニア、大人、企業・団体向けに日本語サポートつきで参加できます。',
    keywords: '福岡市西区 英語 サークル, 福岡 英会話 初心者, 福岡 ボードゲーム 英語, 西区 親子 英語, 福岡 シニア 英語, 福岡 企業研修 英語',
  },
  situation: {
    title: 'Why Board Games Help English Conversation | Board Game English Club',
    description: 'Learn how board games create natural reasons to speak English through choices, questions, planning, and reflection.',
    keywords: 'English conversation practice, board games language learning, Fukuoka English practice',
  },
  board: {
    title: 'How It Works | From Game To Conversation',
    description: 'See the Board Game English Club session flow: choose a game, choose one English focus, use a conversation card, and record progress.',
    keywords: 'English session flow, conversation cards, board game English activities, English learning system',
  },
  armory: {
    title: 'How It Works | From Game To Conversation',
    description: 'Choose one English focus, use a conversation card, and turn a board game into supported English practice.',
    keywords: 'English focus cards, board game conversation prompts, English table activity',
  },
  challenges: {
    title: 'Conversation Cards | Board Game English Club',
    description: 'Gentle table prompts that help players explain choices, ask questions, suggest plans, and review useful English.',
    keywords: 'conversation cards, English prompts, board game English',
  },
  games: {
    title: 'Game Library | Board Game English Club',
    description: 'Browse a board game library used for English conversation sessions in Fukuoka, from relaxed beginner tables to deeper strategy games.',
    keywords: 'board game library Fukuoka, English board game collection, beginner board games English',
  },
  briefings: {
    title: '英語ボードゲーム教材 PDF ブリーフィングカード | BG English Club',
    description: '先生、保護者、ゲーム会向けの英語ボードゲームPDF教材。簡単ルール、使える英語、日本語訳、会話質問、印刷用プレイヤーエイドを毎週更新します。',
    keywords: '英語 ボードゲーム 教材, 英語 ゲーム PDF, ボードゲーム 英語 フレーズ, 親子 英語 教材, 英語 教師 ボードゲーム',
  },
  offers: {
    title: '参加・料金 | 福岡の英語ボードゲームプログラム',
    description: '福岡市西区周辺で、親子英語、Silver Circle、大人向けStrategy Coaching、企業研修、週刊ブリーフィング教材を選べます。',
    keywords: '福岡 英語 サークル 料金, 福岡 親子 英語, 福岡 シニア サークル, 福岡 企業研修 英語, 英語 ボードゲーム 教材',
  },
  partnerships: {
    title: '福岡 企業向け英語コミュニケーション研修 | BG English Club',
    description: '福岡の企業・団体向けに、ボードゲームを使った英語コミュニケーション、チームビルディング、ソフトスキル研修を提供します。',
    keywords: '福岡 企業研修 英語, 福岡 チームビルディング, 英語 コミュニケーション研修, 企業向け ボードゲーム研修',
  },
  play: {
    title: 'Table Play Tool | Choose A Game And Play In English',
    description: 'Build a table-ready English play plan: choose a game, let the briefing auto-match, select one English goal, choose one live table question, and record progress.',
    keywords: 'table play tool, board game English process, conversation card, briefing card, English board games Fukuoka',
  },
  'briefing-detail': {
    title: 'English Board Game Briefing Cards | Board Game English Club',
    description: 'Standalone board game briefing cards for English conversation practice, with simple rules, useful phrases, prompts, table missions, and Japanese support.',
    keywords: 'board game English briefing cards, Blokus English phrases, Camel Up English phrases, Azul English conversation, Fukuoka English board games',
  },
  dossier: {
    title: 'Board Game English Club について | 福岡チャプター',
    description: 'ゲームを知ると、コミュニティが見えてくる。福岡で英語、会話、参加、友情を育てる小さなテーブル活動です。',
    keywords: 'Board Game English Club, 福岡 英語 コミュニティ, 福岡 ボードゲーム 英語, 西区 英語 サークル',
  },
  ranking: {
    title: 'Community Progress | Board Game English Club',
    description: 'A gentle progress area for session notes, table participation, and community growth.',
    keywords: 'English learning progress, community progress, board game English',
  },
  profile: {
    title: 'My Progress | Board Game English Club',
    description: 'Track session notes, useful phrases, conversation cards, and next steps from English board game sessions.',
    keywords: 'English progress tracker, session notes, language learning reflection',
  },
  'silver-circle': {
    title: '福岡市西区 シニア向け英語ボードゲームサークル | Silver Circle',
    description: 'Silver Circle は福岡市西区のシニア向け少人数英語ボードゲームサークルです。退職後の趣味、外出のきっかけ、会話、地域交流を日本語サポートつきで始められます。',
    keywords: '福岡市西区 高齢者 趣味, 福岡市西区 シニア サークル, 西区 高齢者 交流, シルバーサークル, 高齢者 ボードゲーム 福岡, 英語 初心者 シニア 福岡, senior activity Nishi-ku Fukuoka',
  },
  'admin-images': {
    title: 'Image Maintenance | Board Game English Club',
    description: 'Private maintenance tools for game image repair and library updates.',
    keywords: 'admin, image maintenance',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Board Game English Club?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Board Game English Club is a small English-through-board-games community in Nishi-ku, Fukuoka. The Fukuoka Chapter uses board games to create natural reasons to speak English.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do beginners need board game experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Beginners are welcome, Japanese support is available, and sessions can begin with simple games and short phrases.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a session work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A session follows four steps: choose a game, choose one English focus, use a conversation card during play, and record one useful phrase or next step. The plain promise is: choose, speak, laugh, and leave with some useful English each time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What useful English will I leave with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Players leave with small useful phrases from the game situation, such as explaining a choice, asking a question, making a suggestion, negotiating, or reviewing what happened.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Silver Circle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Silver Circle is a friendly Japanese community program for seniors in Fukuoka that uses English board games to support conversation, social participation, and enjoyable cognitive stimulation. It is not medical care.',
      },
    },
    {
      '@type': 'Question',
      name: '福岡市西区で高齢者が参加できる趣味活動ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。Silver Circle は福岡市西区周辺でシニア・退職後の方が参加しやすい少人数の英語ボードゲーム活動です。日本語サポートがあり、英語やゲームが初めてでも参加できます。',
      },
    },
    {
      '@type': 'Question',
      name: '認知症予防になりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Silver Circle は医療行為や治療ではありません。会話、社会参加、考える遊びを通じて、楽しく頭を使う地域活動です。',
      },
    },
    {
      '@type': 'Question',
      name: '家族が先に問い合わせてもよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。親御さんやご家族の外出機会、会話の場、退職後の居場所を探している方からの問い合わせも歓迎しています。',
      },
    },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'Board Game English Club',
  alternateName: ['Board Game English Fukuoka', 'BG English Club', 'BGE Fukuoka Chapter', 'Silver Circle'],
  url: siteUrl,
  image: imageUrl,
  email: 'ministarenglish@mail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nishi-ku, Fukuoka',
    addressRegion: 'Fukuoka',
    addressCountry: 'JP',
  },
  areaServed: ['Nishi-ku, Fukuoka', 'Fukuoka City', 'Japan'],
  description: 'Board Game English Club - Fukuoka Chapter offers English-through-board-games sessions and senior community participation programs in Nishi-ku, Fukuoka.',
  knowsAbout: ['English conversation', 'Board games', 'Community participation', 'Senior social participation', 'Language learning'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'Board Game English Club',
  url: siteUrl,
  inLanguage: ['en', 'ja'],
  publisher: {
    '@id': `${siteUrl}/#localbusiness`,
  },
};

const programsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/#programs`,
  name: 'Board Game English Club Programs',
  description: `${brandPromise} ${sessionProcess}`,
  itemListElement: programs.map((program, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      '@id': `${siteUrl}/#program-${program.id}`,
      name: program.name,
      serviceType: program.shortName,
      description: program.answer,
      provider: {
        '@id': `${siteUrl}/#localbusiness`,
      },
      audience: {
        '@type': 'Audience',
        audienceType: program.audience,
      },
      areaServed: program.location,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'JPY',
        description: program.price,
        url: `${siteUrl}/#offers`,
        availability: 'https://schema.org/InStock',
      },
      potentialAction: {
        '@type': 'CommunicateAction',
        name: program.bookingAction,
        target: `mailto:${contactEmail}?subject=${encodeURIComponent(program.subject)}`,
      },
      mainEntity: program.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  })),
};

const silverCircleScheduleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  '@id': `${siteUrl}/#silver-circle-schedule`,
  name: 'BG English Club: Silver Circle Schedule',
  description: 'A recurring senior community table in Nishi-ku, Fukuoka using English board games for conversation, social connection, and enjoyable cognitive engagement. Not medical care.',
  organizer: {
    '@id': `${siteUrl}/#localbusiness`,
  },
  location: {
    '@type': 'Place',
    name: 'Nearby community hall or local partner venue',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nishi-ku, Fukuoka',
      addressRegion: 'Fukuoka',
      addressCountry: 'JP',
    },
  },
  eventSchedule: {
    '@type': 'Schedule',
    repeatFrequency: 'P2W',
    byDay: 'https://schema.org/Thursday',
    startTime: '14:00',
    endTime: '16:00',
    scheduleTimezone: 'Asia/Tokyo',
  },
  maximumAttendeeCapacity: 6,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'JPY',
    description: '¥3,000 / month (2 sessions)',
    url: `${siteUrl}/#silver-circle`,
  },
};

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function Seo({ section, language }: { section: Section; language: Language }) {
  useEffect(() => {
    const meta = pageMeta[section] ?? pageMeta.home;
    const canonical = section === 'home' ? siteUrl : `${siteUrl}/#${section}`;

    document.documentElement.lang = language;
    document.title = language === 'ja' ? `${meta.title} | 日本語` : meta.title;
    upsertMeta('meta[name="description"]', () => {
      const tag = document.createElement('meta');
      tag.name = 'description';
      return tag;
    }, meta.description);
    upsertMeta('meta[name="keywords"]', () => {
      const tag = document.createElement('meta');
      tag.name = 'keywords';
      return tag;
    }, meta.keywords);
    upsertMeta('meta[property="og:title"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:title');
      return tag;
    }, meta.title);
    upsertMeta('meta[property="og:description"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:description');
      return tag;
    }, meta.description);
    upsertMeta('meta[property="og:url"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:url');
      return tag;
    }, canonical);
    upsertMeta('meta[property="og:image"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:image');
      return tag;
    }, imageUrl);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    setJsonLd('schema-local-business', localBusinessSchema);
    setJsonLd('schema-website', websiteSchema);
    setJsonLd('schema-faq', faqSchema);
    setJsonLd('schema-programs', programsSchema);
    setJsonLd('schema-silver-circle-schedule', silverCircleScheduleSchema);
  }, [section, language]);

  return null;
}
