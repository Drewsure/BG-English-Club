import { ArrowUpRight, Crown, Medal, Sparkles, Target, Trophy, Users, Zap } from 'lucide-react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { ui } from '../lib/i18n';

type Agent = {
  rank: number;
  callsign: string;
  jaCallsign: string;
  title: string;
  jaTitle: string;
  xp: number;
  wins: number;
  games: number;
  progress: number;
  specialty: string;
  jaSpecialty: string;
  trend: string;
};

const agents: Agent[] = [
  { rank: 1, callsign: 'Member A', jaCallsign: 'メンバーA', title: 'Community Helper', jaTitle: 'コミュニティヘルパー', xp: 860, wins: 11, games: 24, progress: 94, specialty: 'Explaining Choices', jaSpecialty: '選択を説明する', trend: '+120 XP' },
  { rank: 2, callsign: 'Member B', jaCallsign: 'メンバーB', title: 'Table Regular', jaTitle: 'テーブル常連', xp: 720, wins: 9, games: 21, progress: 88, specialty: 'Asking Questions', jaSpecialty: '質問する', trend: '+80 XP' },
  { rank: 3, callsign: 'Member C', jaCallsign: 'メンバーC', title: 'Briefing User', jaTitle: 'ブリーフィング活用中', xp: 645, wins: 8, games: 18, progress: 83, specialty: 'Session Notes', jaSpecialty: 'セッション記録', trend: '+65 XP' },
  { rank: 4, callsign: 'Member D', jaCallsign: 'メンバーD', title: 'Returning Player', jaTitle: '継続参加メンバー', xp: 510, wins: 6, games: 16, progress: 76, specialty: 'Planning Turns', jaSpecialty: 'ターンを考える', trend: '+40 XP' },
  { rank: 5, callsign: 'Member E', jaCallsign: 'メンバーE', title: 'Phrase Collector', jaTitle: 'フレーズ収集中', xp: 390, wins: 4, games: 13, progress: 69, specialty: 'Useful Phrases', jaSpecialty: '使える表現', trend: '+30 XP' },
  { rank: 6, callsign: 'Member F', jaCallsign: 'メンバーF', title: 'New Member', jaTitle: '新メンバー', xp: 220, wins: 2, games: 9, progress: 54, specialty: 'First Sessions', jaSpecialty: '最初のセッション', trend: '+20 XP' },
];

const rankTiers = [
  { title: 'New Table', range: '0-249 XP', copy: 'Starting to record sessions and useful phrases.' },
  { title: 'Returning Member', range: '250-499 XP', copy: 'Coming back, trying new games, and building confidence.' },
  { title: 'Table Helper', range: '500-749 XP', copy: 'Helping explain turns, questions, and session notes.' },
  { title: 'Community Regular', range: '750+ XP', copy: 'Using English naturally across many tables.' },
];

const leaderboardTranslations = {
  en: {
    anonymousRank: 'How Progress Works',
    introTitle: 'Progress Is A Memory Of Participation',
    introCopy: 'This page explains how a table session becomes visible progress. You do not need perfect English. You only need one small record: what you played, what you tried, what you said, and what comes next.',
    process: [
      ['Pick', 'Choose a game or briefing before the session.'],
      ['Play', 'Use one English goal and one live table question.'],
      ['Record', 'Save one useful phrase and one short note.'],
      ['Return', 'Use your member profile to choose the next step.'],
    ],
    actions: [
      ['Open Table Play Tool', 'play' as Section],
      ['Open Member Profile', 'profile' as Section],
      ['Browse Briefings', 'briefings' as Section],
    ],
    rankTiers: 'Rank Tiers',
    rankTiersCopy: 'A simple ladder for noticing participation over time.',
    rankHeaders: ['Rank', 'Member', 'XP', 'Sessions', 'Games', 'Progress'],
    statLabels: {
      xp: 'Total XP',
      sessions: 'Sessions',
      progress: 'Average Progress',
      members: 'Example Members',
    },
    preview: 'Preview Example',
    exampleMember: 'Example Member',
    startTablePlay: 'Start Table Play',
    openTablePlay: 'Open Table Play',
    viewProfile: 'View Member Profile',
    startRecordTitle: 'Start With One Small Record',
    startRecordCopy: 'Use Table Play to choose the game, goal, and question, then save the final note to your Member Profile.',
    scoring: [
      ['Session Note', '+10 XP', 'Save one short record after play.'],
      ['Useful Phrase', '+15 XP', 'Record one phrase you actually used.'],
      ['Briefing Used', '+20 XP', 'Use a briefing card or Table Play Tool.'],
      ['Return Session', '+25 XP', 'Come back and try again with a new focus.'],
      ['Community Help', '+35 XP', 'Share a useful table tip with others.'],
    ],
    tiers: rankTiers,
  },
  ja: {
    anonymousRank: '進捗のしくみ',
    introTitle: '進捗は、参加の記録です',
    introCopy: 'このページでは、テーブルでの体験がどのように見える進捗になるかを説明します。完璧な英語は必要ありません。遊んだゲーム、試したこと、言えた表現、次にやることを一つ残します。',
    process: [
      ['選ぶ', 'セッション前にゲームやブリーフィングを選びます。'],
      ['遊ぶ', '英語目標を一つ、テーブル質問を一つ使います。'],
      ['記録する', '使えた表現と短いメモを保存します。'],
      ['続ける', 'プロフィールを見て、次の一歩を選びます。'],
    ],
    actions: [
      ['テーブル練習ツールを開く', 'play' as Section],
      ['メンバープロフィール', 'profile' as Section],
      ['ブリーフィングを見る', 'briefings' as Section],
    ],
    rankTiers: 'ランク段階',
    rankTiersCopy: '参加を少しずつ見える形にするステップです。',
    rankHeaders: ['順位', 'メンバー', 'XP', 'セッション', 'ゲーム', '進捗'],
    statLabels: {
      xp: '合計XP',
      sessions: 'セッション',
      progress: '平均進捗',
      members: '表示メンバー',
    },
    preview: '表示例',
    exampleMember: '参加例',
    startTablePlay: 'テーブル練習を始める',
    openTablePlay: 'テーブル練習ツールを開く',
    viewProfile: 'メンバープロフィールを見る',
    startRecordTitle: 'まずは一つの記録から',
    startRecordCopy: 'テーブル練習ツールでゲーム、目標、質問を選び、最後にメンバープロフィールへ保存します。',
    scoring: [
      ['セッション記録', '+10 XP', 'プレイ後に短い記録を一つ保存します。'],
      ['使えた表現', '+15 XP', '実際に言えたフレーズを一つ記録します。'],
      ['ブリーフィング活用', '+20 XP', 'ブリーフィングカードやテーブル練習ツールを使います。'],
      ['継続参加', '+25 XP', '新しいフォーカスで、もう一度参加します。'],
      ['テーブルで助ける', '+35 XP', '役に立つテーブルのコツを共有します。'],
    ],
    tiers: [
      { title: '新しいテーブル', range: '0-249 XP', copy: 'セッション記録や使えた表現を残し始める段階です。' },
      { title: '継続メンバー', range: '250-499 XP', copy: 'もう一度参加し、新しいゲームや表現に少しずつ慣れていきます。' },
      { title: 'テーブルヘルパー', range: '500-749 XP', copy: 'ターンの説明、質問、ふり返りを助けられる段階です。' },
      { title: 'コミュニティレギュラー', range: '750+ XP', copy: 'いろいろなテーブルで、自然に英語を使えるようになっています。' },
    ],
  },
} as const;

export function Leaderboard({ onNavigate, language }: { onNavigate: (section: Section) => void; language: Language }) {
  const t = ui[language].ranking;
  const local = leaderboardTranslations[language];
  const totals = {
    xp: agents.reduce((sum, agent) => sum + agent.xp, 0),
    victories: agents.reduce((sum, agent) => sum + agent.wins, 0),
    games: agents.reduce((sum, agent) => sum + agent.games, 0),
    progress: Math.round(agents.reduce((sum, agent) => sum + agent.progress, 0) / agents.length),
  };

  return (
    <main className="page-shell">
      <header className="tactical-banner py-11 text-center">
        <p className="eyebrow justify-center">{local.anonymousRank}</p>
        <h1 className="compact-title mt-2">{t.title}</h1>
        <p className="mt-4 text-xs text-[#71685d]">{t.subtitle}</p>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-9">
        <section className="reference-panel grid gap-6 p-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Sparkles className="text-[#d87522]" size={30} />
            <h2 className="font-display mt-4 text-4xl tracking-wide text-[#bd5c24]">{local.introTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#62584f]">{local.introCopy}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {local.actions.map(([label, section]) => (
                <button key={label} onClick={() => onNavigate(section)} className="rule-button px-4 py-3">
                  {label} <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {local.process.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-[#efd39d] bg-[#fffaf0] p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-display text-xl text-[#bd5c24]">{index + 1}</span>
                <h3 className="mt-4 font-display text-2xl tracking-wide text-[#3d332b]">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#62584f]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            { icon: Trophy, label: local.statLabels.xp, value: totals.xp.toLocaleString(), color: 'text-[#e88d15] border-[#efc779]' },
            { icon: Zap, label: local.statLabels.sessions, value: totals.victories.toString(), color: 'text-[#27b764] border-[#aae4c1]' },
            { icon: Target, label: local.statLabels.progress, value: `${totals.progress}%`, color: 'text-[#407fe7] border-[#accefc]' },
            { icon: Users, label: local.statLabels.members, value: agents.length.toString(), color: 'text-[#9a59df] border-[#dcc4fb]' },
          ].map(({ icon: Icon, label, value, color }) => (
            <article key={label} className={`rounded-lg border bg-white/80 p-7 text-center ${color.split(' ')[1]}`}>
              <Icon className={`mx-auto ${color.split(' ')[0]}`} />
              <p className="font-display mt-4 text-lg">{label}</p>
              <span className="font-display text-3xl text-[#3d332b]">{value}</span>
            </article>
          ))}
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="reference-panel overflow-hidden">
            <div className="grid grid-cols-[60px_1.4fr_0.7fr_0.6fr_0.6fr_0.8fr] bg-[#f9e4c8] px-5 py-3 font-display text-xs text-[#ab531c]">
              {local.rankHeaders.map((header) => <span key={header}>{header}</span>)}
            </div>
            <div className="divide-y divide-[#f1dec0]">
              {agents.map((agent) => {
                const displayName = language === 'ja' ? agent.jaCallsign : agent.callsign;
                const displayTitle = language === 'ja' ? agent.jaTitle : agent.title;
                const displaySpecialty = language === 'ja' ? agent.jaSpecialty : agent.specialty;
                return (
                <div key={agent.callsign} className="grid grid-cols-[60px_1.4fr_0.7fr_0.6fr_0.6fr_0.8fr] items-center px-5 py-4 text-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#edbd64] bg-[#fff5dc] font-display text-lg text-[#b85b20]">{agent.rank}</span>
                  <span>
                    <span className="block font-display text-lg tracking-wide text-[#3d332b]">{displayName}</span>
                    <span className="block text-[10px] uppercase tracking-wide text-[#81766b]">{displayTitle} - {displaySpecialty}</span>
                  </span>
                  <span className="font-display text-xl text-[#d06122]">{agent.xp}</span>
                  <span>{agent.wins}</span>
                  <span>{agent.games}</span>
                  <span>
                    <span className="font-bold text-[#407fe7]">{agent.progress}%</span>
                    <span className="mt-1 block text-[10px] text-[#2ca65d]">{agent.trend}</span>
                  </span>
                </div>
              );
              })}
            </div>
          </article>

          <article className="reference-panel overflow-hidden">
            <div className="border-b border-[#f1d8a5] bg-[#fff8ea] px-6 py-4">
              <p className="eyebrow">{local.preview}</p>
              <h2 className="font-display mt-2 text-3xl tracking-wide text-[#bd5c24]">{local.exampleMember}</h2>
            </div>
            <div className="p-6 text-center">
              <Crown className="mx-auto text-[#e5a51c]" size={48} />
              <p className="font-display mt-4 text-3xl tracking-wide text-[#3d332b]">{language === 'ja' ? agents[0].jaCallsign : agents[0].callsign}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#8b7d70]">{language === 'ja' ? agents[0].jaTitle : agents[0].title}</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#6f655a]">
                {language === 'ja'
                  ? 'これは表示例です。実際の記録は、セッションノートを保存したあとに置き換えられます。'
                  : 'This is a preview example. Real records can replace it after members save session notes.'}
              </p>
              <button onClick={() => onNavigate('play')} className="rule-button rule-button-primary mt-6 w-full justify-center py-3">
                <Sparkles size={14} /> {local.startTablePlay}
              </button>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-lg border border-[#edb444] bg-[#fff2cb] p-8">
            <h2 className="font-display text-2xl">{t.rise}</h2>
            <p className="mt-3 text-xs leading-5 text-[#766a5d]">{t.riseCopy}</p>
            <div className="mt-5 grid gap-2 text-[10px] sm:grid-cols-2">
              {local.scoring.map(([label, xp, copy]) => (
                <div key={label} className="rounded border border-[#edba55] bg-white/70 p-3">
                  <p className="font-bold uppercase tracking-wide text-[#955722]">{label}</p>
                  <p className="font-display text-xl text-[#d06122]">{xp}</p>
                  <p className="text-[#74685d]">{copy}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="reference-panel overflow-hidden">
            <div className="border-b border-[#f1d8a5] px-6 py-4">
              <p className="font-display text-2xl tracking-wide text-[#bd5c24]">{local.rankTiers}</p>
              <p className="mt-1 text-xs text-[#7a7065]">{local.rankTiersCopy}</p>
            </div>
            <div className="grid gap-3 p-5">
              {local.tiers.map(({ title, range, copy }, index) => (
                <div key={title} className="flex gap-4 rounded border border-[#efd39d] bg-white p-4">
                  <Medal className={`${index === local.tiers.length - 1 ? 'text-[#d06122]' : 'text-[#e5a51c]'}`} size={24} />
                  <span>
                    <span className="font-display text-lg tracking-wide text-[#3d332b]">{title}</span>
                    <span className="ml-2 text-[10px] font-bold uppercase text-[#a36b2c]">{range}</span>
                    <span className="mt-1 block text-xs leading-5 text-[#70665b]">{copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="reference-panel mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="font-display text-2xl tracking-wide text-[#bd5c24]">
              {local.startRecordTitle}
            </p>
            <p className="mt-1 text-xs text-[#70665b]">
              {local.startRecordCopy}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onNavigate('profile')} className="rounded border border-[#ebba63] bg-white px-4 py-3 text-[11px] font-bold uppercase text-[#b85d1f]">
              {local.viewProfile}
            </button>
            <button onClick={() => onNavigate('play')} className="rule-button rule-button-primary px-5 py-3">
              {local.openTablePlay} <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
