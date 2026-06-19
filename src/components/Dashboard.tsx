import { ArrowRight, Award, BookOpen, Crown, Gamepad2, Lightbulb, PlayCircle, Shield, Swords, Target, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Section } from '../App';
import { useAuth } from '../contexts/AuthContext';
import type { Language } from '../lib/i18n';
import { ui } from '../lib/i18n';
import { loadSessionProgress } from '../lib/sessionProgress';
import type { SessionProgressRecord } from '../lib/sessionProgress';

const badges = [
  { icon: Swords, name: 'First Session', detail: 'Saved your first table note' },
  { icon: TrendingUp, name: 'Returning Player', detail: 'Returned for several sessions' },
  { icon: Swords, name: 'Game Explorer', detail: 'Tried several different games' },
  { icon: Lightbulb, name: 'Phrase Collector', detail: 'Recorded useful English phrases' },
  { icon: Users, name: 'Helpful Speaker', detail: 'Used English to help the table' },
  { icon: Target, name: 'Clear Explainer', detail: 'Practised explaining choices' },
  { icon: Shield, name: 'Reflective Player', detail: 'Saved review notes after play' },
  { icon: Crown, name: 'Table Regular', detail: 'Built a steady session habit' },
];

const dashboardTranslations = {
  en: {
    introTitle: 'Your Member Profile',
    introCopy: 'This page keeps the small useful things from each table: the game you played, the English goal, one conversation question, one phrase you actually used, and what to try next.',
    nextStepsTitle: 'Use This Profile With The Process',
    nextSteps: [
      { title: 'Choose A Game', copy: 'Start in the game library and pick something that fits the table.', section: 'games' as Section, action: 'Open Game Library', icon: Gamepad2 },
      { title: 'Build A Table Play Tool', copy: 'Match the game to a briefing, choose one English goal, and prepare the session card.', section: 'play' as Section, action: 'Open Table Play', icon: PlayCircle },
      { title: 'Read A Briefing', copy: 'Use a printable briefing when you want simple rules, phrases, and table questions.', section: 'briefings' as Section, action: 'Open Briefings', icon: BookOpen },
      { title: 'See Member Progress', copy: 'Understand how session notes become gentle progress for the group.', section: 'ranking' as Section, action: 'Open Member Progress', icon: TrendingUp },
    ],
    stats: ['Challenges Done', 'Tips Submitted', 'Votes Earned', 'Badges Earned'],
    ranks: ['New Member', 'Returning Member', 'Table Helper', 'Community Regular', 'Table Mentor'],
    nextRank: 'Next: Returning Member (5 XP to go)',
    earned: 'earned',
    emptyProgress: 'Use How It Works to pick a focus, use a conversation card, and save one session note.',
    conversationCard: 'Conversation Card',
    badges,
  },
  ja: {
    introTitle: 'メンバープロフィール',
    introCopy: 'このページには、各テーブルで使えた小さな英語を残します。遊んだゲーム、英語の目標、会話の質問、実際に言えたフレーズ、次に試すことを記録します。',
    nextStepsTitle: 'プロフィールと流れをつなげる',
    nextSteps: [
      { title: 'ゲームを選ぶ', copy: 'ゲーム一覧から、今日のテーブルに合うものを選びます。', section: 'games' as Section, action: 'ゲーム一覧を開く', icon: Gamepad2 },
      { title: 'テーブル練習ツールを開く', copy: 'ゲームにブリーフィングを合わせ、英語目標を一つ選びます。', section: 'play' as Section, action: 'テーブル練習ツールを開く', icon: PlayCircle },
      { title: 'ブリーフィングを見る', copy: 'かんたんなルール、フレーズ、質問が必要な時に使います。', section: 'briefings' as Section, action: 'ブリーフィングを開く', icon: BookOpen },
      { title: 'メンバー進捗を見る', copy: 'セッション記録がグループの進捗につながる流れを確認します。', section: 'ranking' as Section, action: 'メンバー進捗を開く', icon: TrendingUp },
    ],
    stats: ['完了したチャレンジ', '投稿したヒント', '獲得した票', '獲得バッジ'],
    ranks: ['新メンバー', '継続メンバー', 'テーブルヘルパー', '地域レギュラー', 'テーブルメンター'],
    nextRank: '次: 継続メンバー（あと5 XP）',
    earned: '獲得',
    emptyProgress: '使い方ページでフォーカスを選び、会話カードを使い、セッション記録を一つ保存してください。',
    conversationCard: '会話カード',
    badges: [
      { name: '初回セッション', detail: '最初のテーブル記録を保存' },
      { name: '継続プレイヤー', detail: '複数回セッションに参加' },
      { name: 'ゲーム探索者', detail: 'いくつかのゲームを体験' },
      { name: 'フレーズコレクター', detail: '使える英語フレーズを記録' },
      { name: 'テーブルヘルパー', detail: '英語でテーブルを助けた' },
      { name: '説明上手', detail: '選択の説明を練習' },
      { name: 'ふり返り上手', detail: 'プレイ後のメモを保存' },
      { name: 'テーブルレギュラー', detail: '続ける習慣を作った' },
    ],
  },
} as const;

export function Dashboard({ onJoin, language, onNavigate }: { onJoin: () => void; language: Language; onNavigate: (section: Section) => void }) {
  const { profile, user } = useAuth();
  const [sessionRecords, setSessionRecords] = useState<SessionProgressRecord[]>([]);
  const name = profile?.display_name || (user ? 'Member' : 'Preview Member');
  const email = user?.email || 'Sign in to view member details';
  const t = ui[language].profile;
  const common = ui[language].common;
  const local = dashboardTranslations[language];
  const sessionsCompleted = sessionRecords.length;
  const uniqueGames = new Set(sessionRecords.map((record) => record.gameTitle)).size;
  const usefulPhrases = sessionRecords.filter((record) => record.usefulPhrase.trim()).length;
  const calculatedXp = sessionsCompleted * 10 + usefulPhrases * 5 + uniqueGames * 5;
  const xp = Math.max(profile?.xp_points || 0, calculatedXp);
  const nextRankTarget = xp >= 100 ? 200 : xp >= 50 ? 100 : 50;
  const rankIndex = xp >= 200 ? 4 : xp >= 100 ? 3 : xp >= 50 ? 2 : xp >= 20 ? 1 : 0;
  const progressPercent = Math.min(100, Math.round((xp / nextRankTarget) * 100));
  const earnedBadgeCount = [
    sessionsCompleted >= 1,
    sessionsCompleted >= 3,
    uniqueGames >= 3,
    usefulPhrases >= 5,
    sessionRecords.some((record) => record.focusTitle.toLowerCase().includes('suggest') || record.focusTitle.toLowerCase().includes('negotiate')),
    sessionRecords.some((record) => record.focusTitle.toLowerCase().includes('explain')),
    sessionRecords.some((record) => record.focusTitle.toLowerCase().includes('review')),
    sessionsCompleted >= 10,
  ].filter(Boolean).length;

  useEffect(() => {
    setSessionRecords(loadSessionProgress());
  }, []);

  return (
    <main className="page-shell bg-[radial-gradient(circle_at_center,#fff7e7,#fbf7ef)]">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <section className="reference-panel p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="eyebrow">{t.title}</p>
              <h1 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">{name}</h1>
              <p className="mt-1 text-xs text-[#71675c]">{email}</p>
              <span className="mt-3 inline-flex rounded border border-[#ebbd66] bg-[#fff4d5] px-2 py-1 text-[10px] font-bold text-[#d16a21]">{user ? 'Member' : 'Preview'}</span>
              {!user && (
                <button onClick={onJoin} className="rule-button rule-button-primary mt-4 px-5 py-3">
                  {language === 'ja' ? 'メンバー登録 / ログイン' : 'Join Or Sign In'}
                </button>
              )}
            </div>
            <div className="max-w-lg">
              <h2 className="font-display text-3xl tracking-wide text-[#3d332b]">{local.introTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#62584f]">{local.introCopy}</p>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="font-display text-3xl tracking-wide text-[#bd5c24]">{local.nextStepsTitle}</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            {local.nextSteps.map(({ title, copy, section, action, icon: Icon }) => (
              <article key={title} className="reference-panel flex flex-col p-5">
                <Icon className="text-[#d46a20]" size={24} />
                <h3 className="mt-4 font-display text-2xl tracking-wide text-[#3d332b]">{title}</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-[#62584f]">{copy}</p>
                <button onClick={() => onNavigate(section)} className="rule-button mt-5 justify-center px-4 py-3">
                  {action} <ArrowRight size={13} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-9 grid gap-4 sm:grid-cols-4">
          {[Swords, Lightbulb, TrendingUp, Target].map((Icon, index) => {
            const label = local.stats[index];
            const values = [sessionsCompleted, usefulPhrases, uniqueGames, earnedBadgeCount];
            return (
            <article key={label} className="reference-panel py-6 text-center"><Icon className="mx-auto text-[#d46a20]" size={21} /><p className="font-display mt-2 text-2xl">{values[index]}</p><p className="text-[10px] text-[#746b61]">{label}</p></article>
            );
          })}
        </div>
        <h2 className="font-display mt-10 text-2xl tracking-wide">{t.growth}</h2>
        <section className="reference-panel mt-4 p-7">
          <div className="flex justify-between"><div><p className="text-[10px] text-[#82766b]">{t.currentRank}</p><p className="font-display text-3xl text-[#d06122]">{local.ranks[rankIndex]}</p></div><div className="text-right"><p className="text-[10px] text-[#82766b]">{t.totalPoints}</p><p className="font-display text-3xl">{xp} XP</p></div></div>
          <div className="mt-6 h-4 rounded-full border border-[#dedad4] bg-white"><div className="h-full rounded-full bg-[#d56a22]" style={{ width: `${progressPercent}%` }} /></div>
          <p className="mt-3 text-right text-[10px] font-bold text-[#e07521]">{xp >= 200 ? 'Table Mentor progress is active' : `${Math.max(nextRankTarget - xp, 0)} XP to next rank`}</p>
          <div className="mt-5 grid grid-cols-5 gap-2 text-center font-display text-[10px] text-[#a29a91]">{local.ranks.map((rank, index) => <span key={rank} className={`border-t-4 pt-2 ${index <= rankIndex ? 'border-[#d56a22] text-[#554b42]' : 'border-[#dedad5]'}`}>{rank}</span>)}</div>
        </section>
        <div className="mt-10 flex justify-between"><h2 className="font-display text-2xl tracking-wide">{t.badges}</h2><span className="text-xs text-[#776e63]">{earnedBadgeCount} / 8 {local.earned}</span></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-4">
          {badges.map(({ icon: Icon }, index) => {
            const earned = index < earnedBadgeCount;
            return (
              <article key={local.badges[index].name} className={`rounded-xl border p-5 text-center ${earned ? 'border-[#efc779] bg-[#fff7e7] text-[#d46a20]' : 'border-[#e1ded7] bg-[#f8f7f4] text-[#989997]'}`}><Icon className="mx-auto" size={30} /><h3 className="font-display mt-4 text-sm text-[#36312d]">{local.badges[index].name}</h3><p className="mt-2 text-[10px] leading-4">{local.badges[index].detail}</p></article>
            );
          })}
        </div>
        <h2 className="font-display mt-10 text-2xl tracking-wide">{common.profileProgress}</h2>
        <section className="reference-panel mt-4 overflow-hidden">
          {sessionRecords.length === 0 ? (
            <div className="py-12 text-center">
              <Award className="mx-auto text-[#f0c457]" size={42} />
              <h3 className="font-display mt-4 text-lg text-[#71685e]">{common.noSessionNotes}</h3>
              <p className="mt-2 text-xs text-[#92897f]">{local.emptyProgress}</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f3dfba]">
              {sessionRecords.map((record) => (
                <article key={record.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl tracking-wide text-[#bd5c24]">{record.gameTitle}</p>
                      <p className="mt-1 text-xs text-[#776d62]">{new Date(record.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="rounded-full border border-[#bde8c9] bg-[#f7fff8] px-3 py-1 text-[10px] font-bold uppercase text-[#2e7c44]">{record.focusTitle}</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded border border-[#efd39d] bg-[#fffaf0] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a7563]">{local.conversationCard}</p>
                      <p className="mt-1 text-sm text-[#453b34]">{record.conversationCard}</p>
                    </div>
                    <div className="rounded border border-[#b9d2fb] bg-[#f7fbff] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#506d9a]">{common.usefulPhrase}</p>
                      <p className="mt-1 text-sm text-[#453b34]">{record.usefulPhrase}</p>
                    </div>
                    <div className="rounded border border-[#ead4fa] bg-[#fdf8ff] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#75518e]">{common.nextTime}</p>
                      <p className="mt-1 text-sm text-[#453b34]">{record.nextTime}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#62584f]">{record.whatHappened}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
