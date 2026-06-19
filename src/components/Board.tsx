import { Award, BookOpen, ChevronRight, Database, FileText, Image, Radio, Shield, Sparkles, Target, Trophy, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Section } from '../App';
import { getGames, getGamesNeedingImages } from '../lib/games';
import type { Language } from '../lib/i18n';
import { ui } from '../lib/i18n';
import { subscribeToPreviewGameUpdates } from '../lib/previewGameUpdates';
import type { Game } from '../types/database';

const commands: Array<{ icon: typeof Database; label: string; copy: string; section: Section; tone: string }> = [
  { icon: Database, label: 'Game Library', copy: 'Browse the collection and choose a table that fits the group.', section: 'games', tone: 'border-[#f0c978] bg-[#fff9ec]' },
  { icon: Trophy, label: 'Community Progress', copy: 'See how the group is growing over time.', section: 'ranking', tone: 'border-[#b9d2fb] bg-[#f7fbff]' },
  { icon: Award, label: 'My Progress', copy: 'Review phrases, badges, and session history when you are ready.', section: 'profile', tone: 'border-[#ead4fa] bg-[#fdf8ff]' },
];

const missionFlow: Array<{ label: string; title: string; verb: string; copy: string; section: Section; icon: typeof Database; visual: string; image: string }> = [
  { label: '01', title: 'Pick A Game', verb: 'Browse Games', copy: 'Choose one board game that fits the group: time, difficulty, theme, and player count.', section: 'games', icon: Database, visual: 'Game Choice', image: '/images/mission-route-pick-game.svg' },
  { label: '02', title: 'Briefing Auto-Matched', verb: 'Open Table Play Tool', copy: 'The Table Play Tool connects the game to the matching briefing card.', section: 'play', icon: BookOpen, visual: 'Briefing Match', image: '/images/mission-route-english-job.svg' },
  { label: '03', title: 'Choose English Goal', verb: 'Pick One Focus', copy: 'Choose one practical aim: predict, explain, ask, negotiate, or review.', section: 'play', icon: Target, visual: 'English Goal', image: '/images/mission-route-english-job.svg' },
  { label: '04', title: 'Choose Live Question', verb: 'Use One Prompt', copy: 'Pick one live table question so the game gives everyone a reason to speak.', section: 'play', icon: Shield, visual: 'Live Question', image: '/images/mission-route-live-challenge.svg' },
  { label: '05', title: 'Print And Record Progress', verb: 'Record Progress', copy: 'Print the table aid, then record one phrase, one table moment, and one next step.', section: 'profile', icon: Trophy, visual: 'Progress Record', image: '/images/mission-route-record-result.svg' },
];

type MissionLevel = 'Foundation' | 'Intermediate' | 'Advanced' | 'Master';
type LevelFilter = MissionLevel | 'All';

const missionLevels: LevelFilter[] = ['All', 'Foundation', 'Intermediate', 'Advanced', 'Master'];

const englishFocusGoals = [
  {
    title: 'Predict And React',
    jaTitle: '予想して反応する',
    copy: 'Use when the game creates surprise, risk, betting, or changing plans.',
    jaCopy: '驚き、リスク、予想、作戦変更があるゲームで使います。',
    examples: ["I'm thinking...", "I'm changing my mind because...", 'That surprised me.'],
  },
  {
    title: 'Explain A Choice',
    jaTitle: '選択を説明する',
    copy: 'Use when a player places a tile, chooses a card, bids, blocks, or builds.',
    jaCopy: 'タイルを置く、カードを選ぶ、入札する、ブロックする、建てる時に使います。',
    examples: ["I'm choosing this because...", 'My reason is...', 'This helps me because...'],
  },
  {
    title: 'Ask A Useful Question',
    jaTitle: '役に立つ質問をする',
    copy: 'Use when a player needs rules, advice, clarification, or table information.',
    jaCopy: 'ルール、アドバイス、確認、テーブル情報が必要な時に使います。',
    examples: ['Can I ask about...?', 'What happens if...?', 'Do you think I should...?'],
  },
  {
    title: 'Negotiate Or Suggest',
    jaTitle: '相談・提案する',
    copy: 'Use when the game includes trades, teamwork, shared plans, or persuasion.',
    jaCopy: '交換、協力、共同作戦、説得があるゲームで使います。',
    examples: ['Maybe we should...', 'This is fair because...', 'One option is...'],
  },
  {
    title: 'Review What Happened',
    jaTitle: '起きたことをふり返る',
    copy: 'Use at the end of a turn or session to make the learning visible.',
    jaCopy: 'ターン後やセッション後に、学びを見える形にするために使います。',
    examples: ['That worked because...', 'Next time I want to...', 'I learned the phrase...'],
  },
];

const missionBuilder: Array<{
  title: string;
  level: MissionLevel;
  englishJob: string;
  missionStatement: string;
  challenge: string;
  tags: string[];
}> = [
  {
    title: 'Carcassonne',
    level: 'Foundation',
    englishJob: 'Explain placement decisions',
    missionStatement: 'Use every tile placement as a short reason-giving drill: "I am placing this here because..."',
    challenge: 'Before scoring a feature, describe the risk and the reward in one clear English sentence.',
    tags: ['reasoning', 'spatial language', 'turn explanation'],
  },
  {
    title: 'Sushi Go!',
    level: 'Foundation',
    englishJob: 'Read the table and predict choices',
    missionStatement: 'Players practise simple prediction language while choosing cards under friendly pressure.',
    challenge: 'Once per round, predict one opponent choice and explain the clue that made you think so.',
    tags: ['prediction', 'food vocabulary', 'quick turns'],
  },
  {
    title: 'Modern Art',
    level: 'Intermediate',
    englishJob: 'Persuade buyers and justify value',
    missionStatement: 'Turn auctions into negotiation practice where players defend value, timing, and confidence.',
    challenge: 'Before one bid, give a 20-second sales pitch explaining why the painting is worth the price.',
    tags: ['persuasion', 'money language', 'confidence'],
  },
  {
    title: 'Pandemic',
    level: 'Intermediate',
    englishJob: 'Coordinate urgent plans',
    missionStatement: 'Use the outbreak pressure to practise proposals, agreement, warning, and emergency teamwork.',
    challenge: 'On your turn, state the team priority, your action plan, and one risk if the plan fails.',
    tags: ['teamwork', 'planning', 'problem solving'],
  },
  {
    title: 'Power Grid',
    level: 'Advanced',
    englishJob: 'Explain trade-offs',
    missionStatement: 'Players compare cost, timing, scarcity, and future position while making economic decisions.',
    challenge: 'Before buying, explain the trade-off: what you gain now, what you lose later, and why it is acceptable.',
    tags: ['trade-offs', 'economics', 'future planning'],
  },
  {
    title: 'Brass: Birmingham',
    level: 'Advanced',
    englishJob: 'Negotiate networks and timing',
    missionStatement: 'Use industrial decisions to practise conditional language, opportunity cost, and long-term planning.',
    challenge: 'Describe your network plan using "if", "unless", and "because" before you build.',
    tags: ['conditions', 'industry', 'strategy'],
  },
  {
    title: 'Terraforming Mars',
    level: 'Master',
    englishJob: 'Defend a long-term strategy',
    missionStatement: 'Players connect engine-building choices to a future vision and explain why the plan is worth patience.',
    challenge: 'At the end of a generation, give an investor report: what improved, what is weak, and what comes next.',
    tags: ['presentation', 'science', 'long strategy'],
  },
  {
    title: 'Great Western Trail',
    level: 'Master',
    englishJob: 'Report route efficiency',
    missionStatement: 'Use route planning to practise sequencing, opportunity cost, and performance review language.',
    challenge: 'After each delivery, summarize whether your route was efficient and name one adjustment.',
    tags: ['sequencing', 'efficiency', 'self-review'],
  },
];

const challengeDeck = [
  {
    title: 'Power Grid',
    label: 'Auction Reason',
    prompt: 'After one bid, explain why you chose that price.',
    output: 'I bid because... / I stopped because...',
    tags: ['auction', 'economics', 'decision'],
  },
  {
    title: 'Pandemic',
    label: 'Team Plan',
    prompt: 'Before your turn, tell the table the next useful step.',
    output: 'The biggest danger is... My plan is...',
    tags: ['teamwork', 'urgency', 'clear instructions'],
  },
  {
    title: 'Brass: Birmingham',
    label: 'Network Deal',
    prompt: 'Explain one route choice and ask for one fair agreement.',
    output: 'If you take this route, then I can...',
    tags: ['negotiation', 'conditions', 'industry'],
  },
  {
    title: 'Catan',
    label: 'Fair Trade Offer',
    prompt: 'Offer a trade and explain why it helps both players.',
    output: 'This is fair because you get... and I get...',
    tags: ['trade', 'fairness', 'persuasion'],
  },
];

const boardTranslations = {
  en: {
    missionFlow,
    sessionBuilder: 'Session Builder',
    sessionBuilderTitle: 'Game + English Focus + Conversation Card',
    sessionBuilderCopy: 'Pick a level, choose a game, and give the table one small English focus. The aim is confidence, not performance.',
    sampleGamesCopy: 'The cards below are sample games. Choose one to see how a focus, prompt, and review note fit together.',
    sampleGame: 'Sample game',
    sampleCard: 'Sample card',
    briefingGoals: 'Briefing Card Goals',
    chooseEnglishJob: 'Choose The English Job After You Pick The Game',
    chooseEnglishJobCopy: 'A briefing card is the larger prep sheet for a game. Its English goal tells the table what kind of speaking to practise today.',
    buildTablePlay: 'Open Table Play Tool',
    levelLabels: {
      All: 'All',
      Foundation: 'Foundation',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced',
      Master: 'Master',
    },
    operationStats: [
      ['Available Titles', 'Reserve base'],
      ['Ready Covers', 'Visual readiness'],
      ['Strategic Titles', 'Advanced candidates'],
      ['Gateway Tables', 'Fast onboarding'],
    ],
    commands,
    missionContent: missionBuilder,
    challengeContent: challengeDeck,
    activeSession: 'Active Session Card',
    tableFocus: 'Table Focus',
    conversationCard: 'Conversation Card',
    successLooksLike: 'Success Looks Like',
    successCopy: 'Someone says a useful sentence because the game made it natural, then notices it after play.',
    reviewTemplate: [
      ['01 Pick A Game', 'Which game did the table choose, and why did it fit this group?'],
      ['02 Briefing Auto-Matched', 'Which briefing card appeared, and what simple rule or theme helped the table?'],
      ['03 Choose English Goal', 'Which goal did you use: predict, explain, ask, negotiate, or review?'],
      ['04 Choose Live Question', 'Which one table question helped people speak during play?'],
      ['05 Print And Record Progress', 'What useful phrase was said, what happened, and what should be tried next time?'],
    ],
  },
  ja: {
    missionFlow: [
      { title: 'ゲームを選ぶ', verb: 'ゲームを見る', copy: '時間、難しさ、テーマ、人数に合うボードゲームを一つ選びます。', visual: 'ゲーム選び' },
      { title: 'ブリーフィング自動表示', verb: 'Table Play Tool を開く', copy: 'ゲームに合うブリーフィングカードが自動でつながります。', visual: 'ブリーフィング' },
      { title: '英語目標を選ぶ', verb: 'フォーカスを選ぶ', copy: '説明する、質問する、提案する、報告する、ふり返るなど、一つだけ選びます。', visual: '英語目標' },
      { title: 'ライブ質問を選ぶ', verb: '質問を一つ使う', copy: 'プレイ中に使う質問を一つ選び、話す理由を作ります。', visual: 'ライブ質問' },
      { title: '印刷して進捗を記録する', verb: '進捗を記録する', copy: 'テーブル用紙を印刷し、使えた表現、起きたこと、次回の一歩を記録します。', visual: '進捗記録' },
    ],
    sessionBuilder: 'セッションビルダー',
    sessionBuilderTitle: 'ゲーム + 英語フォーカス + 会話カード',
    sessionBuilderCopy: 'レベルを選び、ゲームを選び、テーブルに一つだけ英語フォーカスを置きます。目的は完璧さではなく、自信です。',
    sampleGamesCopy: '下のカードはサンプルゲームです。一つ選ぶと、フォーカス、会話プロンプト、ふり返りメモの組み合わせが見えます。',
    sampleGame: 'サンプルゲーム',
    sampleCard: 'サンプルカード',
    briefingGoals: 'ブリーフィングカードの目標',
    chooseEnglishJob: 'ゲームを選んだあと、今日の英語目標を選ぶ',
    chooseEnglishJobCopy: 'ブリーフィングカードは、ゲーム用の準備シートです。英語目標があると、今日どんな話し方を練習するかがはっきりします。',
    buildTablePlay: 'テーブル練習ツールを開く',
    levelLabels: {
      All: 'すべて',
      Foundation: 'はじめて',
      Intermediate: '少し経験あり',
      Advanced: 'じっくり',
      Master: '深い戦略',
    },
    operationStats: [
      ['登録ゲーム', 'ゲーム一覧'],
      ['画像準備済み', '見やすさ'],
      ['じっくりゲーム', '経験者向け'],
      ['始めやすいゲーム', '初回参加向け'],
    ],
    commands: [
      { label: 'ゲーム一覧', copy: 'グループに合うゲームを選びます。' },
      { label: 'メンバー進捗', copy: 'セッション記録が少しずつ進捗になる流れを見ます。' },
      { label: '自分の進捗', copy: 'フレーズ、バッジ、セッション履歴を確認します。' },
    ],
    missionContent: [
      {
        title: 'Carcassonne',
        englishJob: '置く理由を説明する',
        missionStatement: 'タイルを置くたびに、「ここに置く理由」を短く言う練習をします。',
        challenge: '得点前に、リスクと良い点を一文で説明します。',
        tags: ['理由づけ', '場所の言葉', 'ターン説明'],
      },
      {
        title: 'Sushi Go!',
        englishJob: '場を見て予想する',
        missionStatement: 'カードを選びながら、やさしい予想表現を練習します。',
        challenge: '各ラウンドで一度、相手の選択を予想し、そう思ったヒントを説明します。',
        tags: ['予想', '食べ物の語彙', '短いターン'],
      },
      {
        title: 'Modern Art',
        englishJob: '価値を説明してすすめる',
        missionStatement: 'オークションを使って、価値、タイミング、自信を説明する練習をします。',
        challenge: '一度だけ、入札前に20秒で「なぜこの絵に価値があるか」を説明します。',
        tags: ['説得', 'お金の表現', '自信'],
      },
      {
        title: 'Pandemic',
        englishJob: '急ぎの作戦を相談する',
        missionStatement: '提案、賛成、注意、チームワークの英語を練習します。',
        challenge: '自分の番に、優先すること、行動計画、失敗した時のリスクを言います。',
        tags: ['チームワーク', '計画', '問題解決'],
      },
      {
        title: 'Power Grid',
        englishJob: '得るもの・失うものを説明する',
        missionStatement: 'コスト、タイミング、資源、将来の位置を比べる練習をします。',
        challenge: '買う前に、今得るもの、あとで失うもの、なぜ大丈夫かを説明します。',
        tags: ['比較', '経済', '将来計画'],
      },
      {
        title: 'Brass: Birmingham',
        englishJob: 'ネットワークとタイミングを相談する',
        missionStatement: '条件、機会損失、長期計画の英語を練習します。',
        challenge: '建てる前に、if / unless / because を使って計画を説明します。',
        tags: ['条件', '産業', '戦略'],
      },
      {
        title: 'Terraforming Mars',
        englishJob: '長期作戦を説明する',
        missionStatement: 'エンジン作りの選択を、将来の計画につなげて説明します。',
        challenge: '世代の終わりに、良くなった点、弱い点、次にすることを報告します。',
        tags: ['発表', '科学', '長期戦略'],
      },
      {
        title: 'Great Western Trail',
        englishJob: 'ルートの効率を報告する',
        missionStatement: '順番、機会損失、ふり返りの英語を練習します。',
        challenge: '配達後に、ルートが効率的だったかを言い、調整を一つ挙げます。',
        tags: ['順番', '効率', 'ふり返り'],
      },
    ],
    challengeContent: [
      { title: 'Power Grid', label: '入札の理由', prompt: '一度入札したあと、なぜその価格にしたか説明します。', output: 'I bid because... / I stopped because...', tags: ['入札', '経済', '判断'] },
      { title: 'Pandemic', label: 'チーム作戦', prompt: '自分の番の前に、次に役立つ一手を伝えます。', output: 'The biggest danger is... My plan is...', tags: ['協力', '急ぎ', 'わかりやすい指示'] },
      { title: 'Brass: Birmingham', label: 'ネットワーク相談', prompt: 'ルート選択を一つ説明し、公平な相談を一つします。', output: 'If you take this route, then I can...', tags: ['相談', '条件', '産業'] },
      { title: 'Catan', label: '公平な交換', prompt: '交換を提案し、なぜ両方に良いか説明します。', output: 'This is fair because you get... and I get...', tags: ['交換', '公平', '説得'] },
    ],
    activeSession: '現在のセッションカード',
    tableFocus: 'テーブルのフォーカス',
    conversationCard: '会話カード',
    successLooksLike: '成功の形',
    successCopy: 'ゲームの流れの中で誰かが使える一文を言い、プレイ後にそれに気づけることです。',
    reviewTemplate: [
      ['01 ゲームを選ぶ', 'どのゲームを選びましたか？そのグループに合った理由は？'],
      ['02 ブリーフィング自動表示', 'どのブリーフィングが出ましたか？役立ったルールやテーマは？'],
      ['03 英語目標を選ぶ', '予想、説明、質問、相談、ふり返りのどれを使いましたか？'],
      ['04 ライブ質問を選ぶ', 'どの質問がプレイ中の会話を助けましたか？'],
      ['05 印刷して進捗を記録する', '言えた表現、起きたこと、次回試すことは何ですか？'],
    ],
  },
} as const;

export function Board({ onNavigate, language }: { onNavigate: (section: Section) => void; language: Language }) {
  const [games, setGames] = useState<Game[]>([]);
  const [missingImages, setMissingImages] = useState<Game[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('All');
  const [selectedMissionTitle, setSelectedMissionTitle] = useState(missionBuilder[0].title);
  const t = ui[language].board;
  const common = ui[language].common;
  const local = boardTranslations[language];

  useEffect(() => {
    const load = () => {
      Promise.all([getGames(), getGamesNeedingImages()]).then(([allGames, needsImages]) => {
        setGames(allGames);
        setMissingImages(needsImages);
      });
    };
    load();
    return subscribeToPreviewGameUpdates(load);
  }, []);

  const catalogueByTitle = useMemo(() => new Map(games.map((game) => [game.title.toLowerCase(), game])), [games]);
  const filteredMissions = useMemo(() => missionBuilder.filter((mission) => selectedLevel === 'All' || mission.level === selectedLevel), [selectedLevel]);
  const selectedMission = missionBuilder.find((mission) => mission.title === selectedMissionTitle) ?? missionBuilder[0];
  const readyImages = Math.max(games.length - missingImages.length, 0);
  const strategicTitles = games.filter((game) => (game.weight ?? 0) >= 2.5).length;
  const gatewayTitles = games.filter((game) => (game.weight ?? 99) <= 1.8 && (game.duration_minutes ?? 999) <= 45).length;
  const missionCopyByTitle = new Map(local.missionContent.map((mission) => [mission.title, mission]));
  const challengeCopyByTitle = new Map(local.challengeContent.map((challenge) => [challenge.title, challenge]));
  const selectedMissionCopy = missionCopyByTitle.get(selectedMission.title) ?? selectedMission;
  const scrollToPanel = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const operationStats: Array<[string, string, typeof Database, string]> = [
    [local.operationStats[0][0], games.length ? games.length.toString() : '...', Database, local.operationStats[0][1]],
    [local.operationStats[1][0], games.length ? `${readyImages}/${games.length}` : '...', Image, local.operationStats[1][1]],
    [local.operationStats[2][0], games.length ? strategicTitles.toString() : '...', Target, local.operationStats[2][1]],
    [local.operationStats[3][0], games.length ? gatewayTitles.toString() : '...', Users, local.operationStats[3][1]],
  ];

  return (
    <main className="page-shell">
      <header className="tactical-banner py-11 text-center">
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="compact-title mt-2">{t.title}</h1>
        <p className="mt-4 text-xs text-[#71685d]">{t.subtitle}</p>
      </header>

      <div className="container-shell py-10">
        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="reference-panel overflow-hidden">
            <div className="grid min-h-80 gap-6 bg-[#fff8ea] p-7 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col justify-center">
                <p className="eyebrow text-[#bd5c24]">{t.sessionFlow}</p>
                <h2 className="font-display mt-3 text-5xl tracking-wide text-[#2f251e]">{t.gameBecomesEnglish}</h2>
                <p className="mt-5 text-sm leading-7 text-[#6b5f54]">{t.flowCopy}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => onNavigate('games')} className="rule-button rule-button-primary px-5 py-3"><Database size={14} /> {t.browseGames}</button>
                  <button type="button" onClick={() => scrollToPanel('briefing-focus-goals')} className="rounded border border-[#d78a2b] bg-white px-5 py-3 text-xs font-bold uppercase text-[#a9541f] shadow-sm hover:bg-[#fff2d8]">{t.chooseFocus}</button>
                </div>
              </div>

              <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-[#efc978] bg-[#fffdf8] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffe0a3,transparent_32%),radial-gradient(circle_at_bottom_right,#f7b466,transparent_28%)] opacity-80" />
                <svg viewBox="0 0 520 300" className="relative z-10 h-full w-full" role="img" aria-label="Operational process graphic showing board game input turning into language output">
                  <defs>
                    <linearGradient id="pipelineOrange" x1="0" x2="1">
                      <stop offset="0%" stopColor="#ed941d" />
                      <stop offset="100%" stopColor="#c95d24" />
                    </linearGradient>
                  </defs>
                  <rect x="28" y="58" width="132" height="132" rx="18" fill="#fff7e6" stroke="#d8892a" strokeWidth="3" />
                  <path d="M55 96h78M55 125h78M55 154h78" stroke="#c95d24" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="55" cy="96" r="8" fill="#ed941d" />
                  <circle cx="94" cy="125" r="8" fill="#ed941d" />
                  <circle cx="133" cy="154" r="8" fill="#ed941d" />
                  <text x="94" y="218" textAnchor="middle" fill="#6b3a1d" fontSize="20" fontWeight="700">BOARD</text>

                  <path d="M176 124 C220 84, 252 84, 296 124" fill="none" stroke="url(#pipelineOrange)" strokeWidth="10" strokeLinecap="round" />
                  <path d="M282 96l26 28-36 10" fill="none" stroke="#c95d24" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="236" cy="92" r="22" fill="#fff7e6" stroke="#ed941d" strokeWidth="3" />
                  <text x="236" y="101" textAnchor="middle" fill="#c95d24" fontSize="28" fontWeight="800">?</text>

                  <rect x="330" y="58" width="150" height="132" rx="18" fill="#2f251e" stroke="#d8892a" strokeWidth="3" />
                  <path d="M363 96h84M363 126h63M363 156h96" stroke="#ffe3ad" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="447" cy="96" r="8" fill="#49d178" />
                  <circle cx="426" cy="126" r="8" fill="#4b86d9" />
                  <circle cx="459" cy="156" r="8" fill="#ed941d" />
                  <text x="405" y="218" textAnchor="middle" fill="#6b3a1d" fontSize="20" fontWeight="700">LANGUAGE</text>

                  <path d="M102 252h310" stroke="#efc978" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" />
                  <text x="258" y="276" textAnchor="middle" fill="#7a6554" fontSize="18" fontWeight="700">CHOOSE  FOCUS  PLAY  REVIEW</text>
                </svg>
              </div>
            </div>
          </article>

          <article className="reference-panel overflow-hidden">
            <div className="border-b border-[#f1d8a5] bg-[#fff8ea] px-6 py-4">
              <p className="eyebrow">{t.sessionGuide}</p>
              <h2 className="font-display mt-2 text-3xl tracking-wide text-[#bd5c24]">{t.whatHappens}</h2>
            </div>
            <div className="space-y-4 p-5 text-sm leading-7 text-[#6f655a]">
              <p><Radio className="mr-2 inline text-[#d87522]" size={16} />{t.guide1}</p>
              <p><BookOpen className="mr-2 inline text-[#4c89d8]" size={16} />{t.guide2}</p>
              <p><Sparkles className="mr-2 inline text-[#d87522]" size={16} />{t.guide3}</p>
              <button type="button" onClick={() => scrollToPanel('conversation-cards')} className="rule-button rule-button-primary mt-2 w-full justify-center py-3">
                <Sparkles size={14} /> {t.seeCards}
              </button>
            </div>
          </article>
        </section>

        <section className="reference-panel mt-8 p-5">
          <div className="mb-4 text-center">
            <p className="eyebrow justify-center">{t.plain}</p>
            <h2 className="font-display mt-2 text-3xl tracking-wide text-[#bd5c24]">{t.usePage}</h2>
            <p className="mt-2 text-xs text-[#746b60]">{t.route}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ['1', t.step1, t.step1Copy],
              ['2', t.step2, t.step2Copy],
              ['3', t.step3, t.step3Copy],
              ['4', t.step4, t.step4Copy],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-xl border border-[#efd39d] bg-white p-4 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#ed941d] font-display text-xl text-white">{number}</span>
                <p className="font-display mt-3 text-lg tracking-wide text-[#3d332b]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#70665b]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {operationStats.map(([label, value, Icon, note]) => (
            <article key={String(label)} className="reference-panel p-5 text-center">
              <Icon className="mx-auto text-[#d56d22]" size={23} />
              <p className="font-display mt-3 text-3xl text-[#d06122]">{value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#776d62]">{label}</p>
              <p className="mt-1 text-[10px] text-[#948a7e]">{note}</p>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5 text-center">
            <p className="eyebrow justify-center">{t.sessionMap}</p>
            <h2 className="compact-title mt-2 text-3xl">{t.tableRoute}</h2>
            <p className="mt-2 text-xs text-[#746b60]">{t.routeCopy}</p>
          </div>
          <div className="relative grid gap-4 lg:grid-cols-4">
            <div className="absolute left-8 right-8 top-20 hidden h-1 bg-gradient-to-r from-[#ed941d] via-[#f4c16d] to-[#d06122] lg:block" />
            {missionFlow.map((step, index) => {
              const translatedStep = local.missionFlow[index];
              const Icon = step.icon;
              return (
                <button key={step.label} onClick={() => onNavigate(step.section)} className="reference-panel relative overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden bg-[#fff4dd]">
                    <img src={step.image} alt="" className="h-full w-full object-cover" />
                    <div className={`absolute inset-0 ${step.label === '01' ? 'bg-gradient-to-br from-[#2f251e]/5 via-transparent to-[#2f251e]/35' : step.label === '02' ? 'bg-gradient-to-br from-[#1e386b]/5 via-transparent to-[#1e386b]/35' : step.label === '03' ? 'bg-gradient-to-br from-[#1f5b35]/5 via-transparent to-[#1f5b35]/35' : 'bg-gradient-to-br from-[#6b2d1e]/5 via-transparent to-[#6b2d1e]/35'}`} />
                    <Icon className="absolute right-7 top-8 text-white drop-shadow" size={42} />
                    <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#ed941d] font-display text-xl text-white shadow-lg">{step.label}</span>
                    <span className="absolute bottom-3 left-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase text-[#a75b1d]">{translatedStep.visual}</span>
                  </div>
                  <div className="p-5">
                    <Icon className="text-[#dc791d]" size={24} />
                    <h3 className="font-display mt-3 text-xl tracking-wide text-[#3d332b]">{translatedStep.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{translatedStep.copy}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#c86123]">{translatedStep.verb} <ChevronRight size={12} /></span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="briefing-focus-goals" className="mt-12">
          <div className="mb-5 text-center">
            <p className="eyebrow justify-center">{local.briefingGoals}</p>
            <h2 className="compact-title mt-2 text-3xl">{local.chooseEnglishJob}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#746b60]">{local.chooseEnglishJobCopy}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {englishFocusGoals.map((goal) => (
              <article key={goal.title} className="reference-panel p-5">
                <Target className="text-[#d87522]" size={23} />
                <h3 className="font-display mt-3 text-xl tracking-wide text-[#3d332b]">{language === 'ja' ? goal.jaTitle : goal.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#70665b]">{language === 'ja' ? goal.jaCopy : goal.copy}</p>
                <div className="mt-4 space-y-2">
                  {goal.examples.map((example) => (
                    <p key={example} className="rounded border border-[#efd39d] bg-[#fffaf0] px-3 py-2 text-[10px] font-bold text-[#7a5a34]">{example}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button onClick={() => onNavigate('play')} className="rule-button rule-button-primary px-5 py-3">
              <BookOpen size={14} /> {local.buildTablePlay}
            </button>
          </div>
        </section>

        <section id="session-builder" className="reference-panel mt-12 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-[#f1d8a5] p-5 lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">{local.sessionBuilder}</p>
                  <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">{t.workspaceTitle}</h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[#c86123]">{local.sessionBuilderTitle}</p>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-[#746b60]">{local.sessionBuilderCopy}</p>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-[#746b60]">
                    {local.sampleGamesCopy}
                  </p>
                </div>
                <button onClick={() => onNavigate('games')} className="rule-button px-4 py-2">
                  <Database size={13} /> {t.browseGames}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {missionLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition ${
                      selectedLevel === level
                        ? 'border-[#dc791d] bg-[#ed941d] text-white shadow-sm'
                        : 'border-[#efc779] bg-white text-[#9a5a25] hover:bg-[#fff4dd]'
                    }`}
                  >
                    {local.levelLabels[level]}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[[t.pickFocus, t.pickFocusCopy], [t.useCard, t.useCardCopy], [t.recordProgress, t.recordProgressCopy]].map(([title, copy]) => (
                  <div key={title} className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c86123]">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{copy}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {filteredMissions.map((mission) => {
                  const game = catalogueByTitle.get(mission.title.toLowerCase());
                  const active = mission.title === selectedMission.title;
                  const missionText = missionCopyByTitle.get(mission.title) ?? mission;
                  return (
                    <button
                      key={mission.title}
                      onClick={() => setSelectedMissionTitle(mission.title)}
                      className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        active ? 'border-[#d87522] bg-[#fff7e7] shadow-md' : 'border-[#efd39d] bg-white'
                      }`}
                    >
                      <div className="relative h-32 bg-[#fff1d4]">
                        {game?.cover_image_url ? <img src={game.cover_image_url} alt="" className="h-full w-full object-cover" /> : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2f251e]/70 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold uppercase text-[#c86123]">{local.sampleGame}</span>
                        <span className="absolute right-3 top-3 rounded-full bg-[#2f251e]/80 px-2 py-1 text-[9px] font-bold uppercase text-white">{local.levelLabels[mission.level]}</span>
                        <span className="absolute bottom-3 left-3 font-display text-2xl tracking-wide text-white drop-shadow">{mission.title}</span>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">{missionText.englishJob}</p>
                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#70665b]">{missionText.missionStatement}</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {missionText.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded border border-[#d8ead3] bg-[#f7fff4] px-2 py-1 text-[9px] font-bold text-[#4a8f56]">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="bg-[#fff8ea] p-6">
              <p className="eyebrow">{local.activeSession}</p>
              <h3 className="font-display mt-2 text-4xl tracking-wide text-[#3d332b]">{selectedMission.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#d87522]">{local.levelLabels[selectedMission.level]}</p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-[#efc779] bg-white p-4">
                  <p className="font-display text-xl tracking-wide text-[#bd5c24]">{local.tableFocus}</p>
                  <p className="mt-2 text-sm leading-6 text-[#62584f]">{selectedMissionCopy.missionStatement}</p>
                </div>
                <div className="rounded-xl border border-[#bde8c9] bg-[#f7fff8] p-4">
                  <p className="font-display text-xl tracking-wide text-[#2e7c44]">{local.conversationCard}</p>
                  <p className="mt-2 text-sm leading-6 text-[#62584f]">{selectedMissionCopy.challenge}</p>
                </div>
                <div className="rounded-xl border border-[#b9d2fb] bg-[#f7fbff] p-4">
                  <p className="font-display text-xl tracking-wide text-[#366eb4]">{local.successLooksLike}</p>
                  <p className="mt-2 text-sm leading-6 text-[#62584f]">{local.successCopy}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="conversation-cards" className="mt-12">
          <div className="mb-5 text-center">
            <p className="eyebrow justify-center">{t.conversationCards}</p>
            <h2 className="compact-title mt-2 text-3xl">{t.gentlePrompts}</h2>
            <p className="mt-2 text-xs text-[#746b60]">{t.cardsCopy}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {challengeDeck.map((challenge) => {
              const game = catalogueByTitle.get(challenge.title.toLowerCase());
              const challengeText = challengeCopyByTitle.get(challenge.title) ?? challenge;
              return (
                <article key={challenge.label} className="reference-panel overflow-hidden">
                  <div className="relative h-36 bg-[#fff1d4]">
                    {game?.cover_image_url ? <img src={game.cover_image_url} alt="" className="h-full w-full object-cover" /> : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f251e]/75 via-[#2f251e]/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded bg-white/95 px-2 py-1 text-[9px] font-bold uppercase text-[#d87522]">{local.sampleCard}</span>
                    <span className="absolute right-3 top-3 rounded bg-[#2f251e]/80 px-2 py-1 text-[9px] font-bold uppercase text-white">{challenge.title}</span>
                    <span className="absolute bottom-3 left-3 right-3 font-display text-xl tracking-wide text-white drop-shadow">{challengeText.label}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs leading-5 text-[#70665b]">{challengeText.prompt}</p>
                    <div className="mt-3 rounded border border-[#efd39d] bg-[#fffaf0] p-3 text-[11px] font-bold text-[#7a5a34]">{challengeText.output}</div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {challengeText.tags.map((tag) => (
                        <span key={tag} className="rounded border border-[#d9d9d9] bg-white px-2 py-1 text-[9px] font-bold uppercase text-[#70665b]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <h2 className="compact-title mt-12 text-center text-3xl">{t.helpfulPlaces}</h2>
        <section className="mx-auto mt-7 grid max-w-5xl gap-4 md:grid-cols-3">
          {commands.map(({ icon: Icon, label, copy, section, tone }, index) => {
            const commandText = local.commands[index] ?? { label, copy };
            return (
            <button key={label} onClick={() => onNavigate(section)} className={`rounded-xl border p-6 text-left transition-transform hover:-translate-y-0.5 hover:shadow-md ${tone}`}>
              <Icon className="text-[#dc791d]" size={28} />
              <span className="mt-5 block font-display text-xl tracking-wide text-[#4c4036]">{commandText.label}</span>
              <span className="mt-2 block text-xs leading-5 text-[#70665b]">{commandText.copy}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#c86123]">{common.open} <ChevronRight size={12} /></span>
            </button>
          );
          })}
        </section>

        <section className="mt-12">
          <article className="reference-panel overflow-hidden">
            <div className="border-b border-[#f1d8a5] px-6 py-4">
              <p className="font-display text-2xl tracking-wide text-[#bd5c24]">{t.sessionReview}</p>
              <p className="mt-1 text-xs text-[#7a7065]">{t.reviewCopy}</p>
            </div>
            <div className="grid gap-3 p-5">
              {local.reviewTemplate.map(([label, copy]) => (
                <div key={label} className="rounded border border-[#efd39d] bg-white p-4">
                  <p className="flex items-center gap-2 font-display text-lg tracking-wide text-[#3d332b]"><FileText size={15} className="text-[#d87522]" /> {label}</p>
                  <p className="mt-1 text-xs text-[#70665b]">{copy}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {missingImages.length > 0 && (
          <section className="reference-panel mt-10 p-5 text-center">
            <p className="font-display text-2xl tracking-wide text-[#bd5c24]">{t.libraryNote}</p>
            <p className="mt-1 text-xs text-[#70665b]">{t.libraryNoteCopy}</p>
          </section>
        )}
      </div>
    </main>
  );
}
