import { ArrowRight, BookOpen, CheckCircle2, Database, FileText, Gamepad2, MessageCircle, Printer, QrCode, Save, Search, Target, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Section } from '../App';
import { buildGameBrief } from '../lib/gameBriefs';
import { getGames } from '../lib/games';
import type { Language } from '../lib/i18n';
import { printPageStyles } from '../lib/printStyles';
import { saveSessionProgressRecord } from '../lib/sessionProgress';
import type { Game } from '../types/database';
import { briefings } from './Briefings';

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const normalizeTitle = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const englishGoals = [
  {
    id: 'predict',
    title: 'Predict And React',
    jaTitle: '予想して反応する',
    copy: 'Use when the game creates surprise, risk, betting, or changing plans.',
    jaCopy: '驚き、リスク、予想、作戦変更があるゲームで使います。',
    phrases: ["I'm thinking...", "I'm changing my mind because...", 'That surprised me.'],
  },
  {
    id: 'explain',
    title: 'Explain A Choice',
    jaTitle: '選択を説明する',
    copy: 'Use when you place, choose, bid, block, build, or take a card.',
    jaCopy: '置く、選ぶ、入札する、ブロックする、建てる、カードを取る時に使います。',
    phrases: ["I'm choosing this because...", 'My reason is...', 'This helps me because...'],
  },
  {
    id: 'ask',
    title: 'Ask A Useful Question',
    jaTitle: '役に立つ質問をする',
    copy: 'Use when you need a rule, advice, clarification, or table information.',
    jaCopy: 'ルール、アドバイス、確認、テーブルの情報が必要な時に使います。',
    phrases: ['Can I ask about...?', 'What happens if...?', 'Do you think I should...?'],
  },
  {
    id: 'suggest',
    title: 'Suggest Or Negotiate',
    jaTitle: '提案・相談する',
    copy: 'Use when the game includes teamwork, trades, shared plans, or persuasion.',
    jaCopy: '協力、交換、共同作戦、説得があるゲームで使います。',
    phrases: ['Maybe we should...', 'This is fair because...', 'One option is...'],
  },
  {
    id: 'review',
    title: 'Review What Happened',
    jaTitle: '起きたことをふり返る',
    copy: 'Use after a turn or session to make the learning visible.',
    jaCopy: 'ターン後やセッション後に、学びを見える形にするために使います。',
    phrases: ['That worked because...', 'Next time I want to...', 'I learned the phrase...'],
  },
];

const fallbackConversationCards = [
  'What are you trying to do this turn?',
  'Why is that a good choice?',
  'What changed after the last move?',
  'What should we watch next?',
];

type BriefingLevel = 'beginner' | 'someExperience' | 'experienced';

const briefingLevels: Array<{ id: BriefingLevel; label: string; jaLabel: string; helper: string; jaHelper: string }> = [
  { id: 'beginner', label: 'Beginner', jaLabel: '初心者', helper: 'Short, safe phrases for first use.', jaHelper: '最初に使いやすい短い表現です。' },
  { id: 'someExperience', label: 'Some Experience', jaLabel: '少し経験あり', helper: 'Longer phrases with a little reasoning.', jaHelper: '理由を少し加えた表現です。' },
  { id: 'experienced', label: 'Experienced', jaLabel: '経験あり', helper: 'Fuller strategic sentences.', jaHelper: '作戦をもう少し詳しく話す表現です。' },
];

const flowSteps = [
  { label: '01', title: 'Pick A Game', jaTitle: 'ゲームを選ぶ', icon: Gamepad2 },
  { label: '02', title: 'Briefing Auto-Matched', jaTitle: 'ブリーフィングを確認', icon: BookOpen },
  { label: '03', title: 'Choose English Goal', jaTitle: '英語目標を選ぶ', icon: Target },
  { label: '04', title: 'Choose Live Question', jaTitle: '質問を一つ選ぶ', icon: MessageCircle },
  { label: '05', title: 'Print And Record Progress', jaTitle: '印刷して進捗を記録する', icon: Printer },
];

const tablePlayTranslations = {
  en: {
    eyebrow: 'Choose And Play Process',
    title: 'Table Play Tool',
    intro: 'Pick a game and the matching briefing appears automatically. Then choose a level, choose one English goal, pick one live table question, print the table aid, and record what happened.',
    step: 'Step',
    pickGame: 'Pick A Game',
    searchGames: 'Search games...',
    briefingLinked: 'Briefing linked',
    noBriefingYet: 'No briefing yet',
    briefingAutoMatch: 'Briefing Card Auto-Match',
    briefingAutoCopy: 'When you pick a game, the matching briefing card is selected for you. You only choose the level you want to use at the table.',
    matched: 'Matched from selected game',
    noExactMatch: 'No exact match yet',
    genericBriefing: 'Generic Table Briefing',
    genericBriefingCopy: 'Use a generic conversation question until a dedicated briefing is created for this game.',
    viewFullBriefing: 'View Full Briefing',
    chooseLevel: 'Choose briefing card level',
    chooseGoal: 'Choose One English Goal',
    yourPlan: 'Your Table Play Plan',
    ready: 'Ready For The Table',
    readyCopy: 'This is the portable play plan. It tells the table what to play, what English to use, and what to notice afterwards.',
    chooseGame: 'Choose a game',
    chooseGameCopy: 'Choose a game from the list to begin.',
    players: 'players',
    minutes: 'min',
    weight: 'Weight',
    briefingCard: 'Briefing Card',
    noBriefingSelected: 'No briefing selected',
    simpleRules: 'Simple English Rules',
    englishGoal: 'English Goal',
    chooseQuestion: 'Step 4: Choose One Live Table Question',
    chooseQuestionCopy: 'Pick one question to use during play; the useful phrases already live in the briefing level above.',
    conversationCard: 'Conversation Card',
    liveQuestion: 'Live table question',
    recordProgress: 'Step 5: Print And Record Progress',
    usefulPhraseLabel: 'Useful phrase you actually said',
    whatHappenedLabel: 'What happened at the table?',
    nextTimeLabel: 'Next time',
    whatHappenedPlaceholder: 'Example: I explained my choice before taking the tile.',
    nextTimePlaceholder: 'Example: Try one longer sentence.',
    printTool: 'Print Table Play Tool',
    printBriefing: 'Print Briefing',
    saveProgress: 'Save To Progress',
    openProgress: 'Open Member Profile',
    saved: (gameTitle: string) => `${gameTitle} saved. Progress marks updated: +10 XP, +1 session, +1 useful phrase.`,
    defaultWhatHappened: (card: string) => `Used "${card}" during table play.`,
    defaultNextTime: 'Try one more sentence with the same focus next time.',
    qrTitle: 'QR Back To Member Profile',
    qrCopy: 'Print the table play tool, then scan this after play to return to your Member Profile and record the final notes.',
  },
  ja: {
    eyebrow: '選んで遊ぶ流れ',
    title: 'テーブル練習ツール',
    intro: 'ゲームを選ぶと、合うブリーフィングが自動で表示されます。レベル、英語目標、テーブル質問を一つずつ選び、印刷して、最後に記録します。',
    step: 'ステップ',
    pickGame: 'ゲームを選ぶ',
    searchGames: 'ゲームを検索...',
    briefingLinked: 'ブリーフィングあり',
    noBriefingYet: 'ブリーフィング準備中',
    briefingAutoMatch: 'ブリーフィングカード確認',
    briefingAutoCopy: 'ゲームを選ぶと、合うブリーフィングカードが選ばれます。テーブルで使うレベルだけ選びます。',
    matched: '選んだゲームに合うカード',
    noExactMatch: 'ぴったり合うカードは準備中',
    genericBriefing: '共通テーブルブリーフィング',
    genericBriefingCopy: '専用ブリーフィングができるまでは、共通の会話質問を使います。',
    viewFullBriefing: 'ブリーフィングを見る',
    chooseLevel: 'ブリーフィングのレベルを選ぶ',
    chooseGoal: '英語目標を一つ選ぶ',
    yourPlan: '今日のテーブル練習プラン',
    ready: 'テーブル準備完了',
    readyCopy: '今日遊ぶゲーム、使う英語、あとで気づくことをまとめたプランです。',
    chooseGame: 'ゲームを選んでください',
    chooseGameCopy: '左の一覧からゲームを選ぶと始められます。',
    players: '人',
    minutes: '分',
    weight: '重さ',
    briefingCard: 'ブリーフィングカード',
    noBriefingSelected: 'ブリーフィング未選択',
    simpleRules: 'やさしい英語ルール',
    englishGoal: '英語目標',
    chooseQuestion: 'ステップ4：テーブル質問を一つ選ぶ',
    chooseQuestionCopy: 'プレイ中に使う質問を一つ選びます。使えるフレーズは上のレベル内にあります。',
    conversationCard: '会話カード',
    liveQuestion: 'テーブル質問',
    recordProgress: 'ステップ5：印刷して進捗を記録する',
    usefulPhraseLabel: '実際に言えたフレーズ',
    whatHappenedLabel: 'テーブルで何が起きましたか？',
    nextTimeLabel: '次回',
    whatHappenedPlaceholder: '例：タイルを取る前に、自分の選択を説明しました。',
    nextTimePlaceholder: '例：次は少し長い文に挑戦する。',
    printTool: 'テーブル練習ツールを印刷',
    printBriefing: 'ブリーフィングを印刷',
    saveProgress: '進捗に保存',
    openProgress: 'メンバープロフィールを開く',
    saved: (gameTitle: string) => `${gameTitle} を保存しました。進捗に +10 XP、+1 セッション、+1 フレーズを記録しました。`,
    defaultWhatHappened: (card: string) => `テーブルで「${card}」を使いました。`,
    defaultNextTime: '次回も同じフォーカスで、もう一文言ってみます。',
    qrTitle: 'QRでメンバープロフィールへ戻る',
    qrCopy: 'テーブル練習ツールを印刷し、プレイ後にQRを読み取ると、メンバープロフィールに戻って記録できます。',
  },
} as const;

function findBriefingForGame(game?: Game) {
  if (!game) return undefined;
  const gameTitle = normalizeTitle(game.title);
  return briefings.find((briefing) => {
    const briefingTitle = normalizeTitle(briefing.gameTitle);
    return gameTitle === briefingTitle || gameTitle.includes(briefingTitle) || briefingTitle.includes(gameTitle);
  });
}

function hrefForBriefing(slug: string) {
  return `#briefings/${slug}`;
}

export function TablePlayDevice({ language, onNavigate }: { language: Language; onNavigate: (section: Section) => void }) {
  const [games, setGames] = useState<Game[]>([]);
  const [query, setQuery] = useState('');
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedBriefingSlug, setSelectedBriefingSlug] = useState(briefings[0]?.slug ?? '');
  const [selectedBriefingLevel, setSelectedBriefingLevel] = useState<BriefingLevel>('beginner');
  const [selectedGoalId, setSelectedGoalId] = useState(englishGoals[0].id);
  const [selectedPrompt, setSelectedPrompt] = useState(fallbackConversationCards[0]);
  const [usefulPhrase, setUsefulPhrase] = useState('');
  const [whatHappened, setWhatHappened] = useState('');
  const [nextTime, setNextTime] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const t = tablePlayTranslations[language];

  useEffect(() => {
    const hashQuery = window.location.hash.split('?')[1] ?? '';
    const requestedBriefingSlug = new URLSearchParams(hashQuery).get('briefing');
    getGames().then((items) => {
      setGames(items);
      const requestedBriefing = briefings.find((briefing) => briefing.slug === requestedBriefingSlug);
      if (requestedBriefing) {
        setSelectedBriefingSlug(requestedBriefing.slug);
        setSelectedPrompt(requestedBriefing.prompts[0] ?? fallbackConversationCards[0]);
        const matchingGame = items.find((game) => normalizeTitle(game.title) === normalizeTitle(requestedBriefing.gameTitle));
        if (matchingGame) {
          setSelectedGameId(matchingGame.id);
          return;
        }
      }
      const firstLinked = items.find((game) => findBriefingForGame(game));
      const firstGame = firstLinked ?? items[0];
      if (firstGame) {
        setSelectedGameId(firstGame.id);
        const linked = findBriefingForGame(firstGame);
        if (linked) {
          setSelectedBriefingSlug(linked.slug);
          setSelectedPrompt(linked.prompts[0] ?? fallbackConversationCards[0]);
        }
      }
    });
  }, []);

  const selectedGame = useMemo(() => games.find((game) => game.id === selectedGameId) ?? games[0], [games, selectedGameId]);
  const linkedBriefing = useMemo(() => findBriefingForGame(selectedGame), [selectedGame]);
  const selectedBriefing = briefings.find((briefing) => briefing.slug === selectedBriefingSlug) ?? linkedBriefing ?? briefings[0];
  const selectedGoal = englishGoals.find((goal) => goal.id === selectedGoalId) ?? englishGoals[0];
  const conversationPrompts = selectedBriefing?.prompts.length ? selectedBriefing.prompts : fallbackConversationCards;
  const liveTableQuestions = conversationPrompts.slice(0, 3);
  const selectedLevelPhrases = selectedBriefing?.phraseTiers[selectedBriefingLevel] ?? selectedGoal.phrases;
  const selectedLevel = briefingLevels.find((level) => level.id === selectedBriefingLevel) ?? briefingLevels[0];
  const selectedLevelLabel = language === 'ja' ? selectedLevel.jaLabel : selectedLevel.label;
  const selectedGoalTitle = language === 'ja' ? selectedGoal.jaTitle : selectedGoal.title;
  const selectedGoalCopy = language === 'ja' ? selectedGoal.jaCopy : selectedGoal.copy;
  const generatedConversationCard = `${selectedGoalTitle}: ${selectedPrompt}`;
  const progressUrl = typeof window === 'undefined' ? '#profile' : `${window.location.origin}${window.location.pathname}#profile`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=144x144&data=${encodeURIComponent(progressUrl)}`;
  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const candidates = normalizedQuery ? games.filter((game) => game.title.toLowerCase().includes(normalizedQuery)) : games;
    const linked = candidates.filter((game) => findBriefingForGame(game));
    const unlinked = candidates.filter((game) => !findBriefingForGame(game));
    return [...linked, ...unlinked].slice(0, 12);
  }, [games, query]);

  const selectGame = (game: Game) => {
    setSelectedGameId(game.id);
    const briefing = findBriefingForGame(game);
    if (briefing) {
      setSelectedBriefingSlug(briefing.slug);
      setSelectedPrompt(briefing.prompts[0] ?? fallbackConversationCards[0]);
    }
    setSaveMessage('');
  };

  const saveProgress = () => {
    const record = saveSessionProgressRecord({
      gameTitle: selectedGame?.title ?? selectedBriefing?.gameTitle ?? 'Table session',
      focusTitle: `${selectedGoalTitle} (${selectedLevelLabel})`,
      conversationCard: generatedConversationCard,
      usefulPhrase: usefulPhrase.trim() || selectedLevelPhrases[0] || selectedGoal.phrases[0],
      whatHappened: whatHappened.trim() || t.defaultWhatHappened(generatedConversationCard),
      nextTime: nextTime.trim() || t.defaultNextTime,
    });
    setSaveMessage(t.saved(record.gameTitle));
  };

  const printTableDevice = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=900');
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${escapeHtml(selectedGame?.title ?? 'Table Play Tool')}</title>
          <style>${printPageStyles}</style>
        </head>
        <body>
          <main class="sheet">
            <p class="label">Board Game English Club - Fukuoka Chapter</p>
            <h1>Table Play Tool</h1>
            <p class="small">A4 table aid. Use this page during play, then record progress after the game.</p>
            <div class="highlight-strip">
              <p class="label">Selected For This Session</p>
              <h2>${escapeHtml(selectedGame?.title ?? selectedBriefing?.gameTitle ?? 'Table session')}</h2>
              <p><strong>Briefing level:</strong> ${escapeHtml(selectedLevelLabel)}</p>
              <p><strong>English goal:</strong> ${escapeHtml(selectedGoal.title)}</p>
              <p><strong>Live table question:</strong> ${escapeHtml(selectedPrompt)}</p>
            </div>
            <div class="card"><p class="label">Game</p><h2>${escapeHtml(selectedGame?.title ?? selectedBriefing?.gameTitle ?? 'Table session')}</h2><p>${escapeHtml(selectedGame ? buildGameBrief(selectedGame) : selectedBriefing?.theme ?? '')}</p></div>
            <div class="card"><p class="label">Briefing</p><h2>${escapeHtml(selectedBriefing?.title ?? 'Briefing Card')}</h2><p>${escapeHtml(selectedBriefing?.mission ?? '')}</p></div>
            <div class="card selected"><p class="label">English Goal</p><h2>${escapeHtml(selectedGoal.title)}</h2><p>${escapeHtml(selectedGoal.copy)}</p></div>
            <div class="card selected"><p class="label">Conversation Card</p><h2>${escapeHtml(selectedPrompt)}</h2><p>${escapeHtml(selectedGoal.title)}. Use one phrase from your selected level only if the table needs help.</p></div>
            <div class="card"><p class="label">Record Progress</p><p>Useful phrase: ______________________________</p><p>What happened: ______________________________</p><p>Next time: ______________________________</p></div>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const printBriefing = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=900');
    if (!printWindow) {
      window.print();
      return;
    }
    const rules = (selectedBriefing?.simpleRules ?? []).map((rule, index) => `<li><strong>${index + 1}.</strong> ${escapeHtml(rule)}</li>`).join('');
    const beginner = (selectedBriefing?.phraseTiers.beginner ?? []).map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const someExperience = (selectedBriefing?.phraseTiers.someExperience ?? []).map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const experienced = (selectedBriefing?.phraseTiers.experienced ?? []).map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const prompts = liveTableQuestions.map((prompt) => `<li class="${prompt === selectedPrompt ? 'selected' : ''}">${escapeHtml(prompt)}</li>`).join('');
    printWindow.document.write(`
      <html>
        <head>
          <title>${escapeHtml(selectedBriefing?.title ?? 'Briefing Card')}</title>
          <style>${printPageStyles}</style>
        </head>
        <body>
          <main class="sheet">
            <p class="label">Board Game English Club - Fukuoka Chapter</p>
            <h1>${escapeHtml(selectedBriefing?.title ?? 'Briefing Card')}</h1>
            <p class="small">Full briefing print. The orange sections show the exact choices made in the Table Play Tool.</p>
            <div class="highlight-strip">
              <p class="label">Selected For This Session</p>
              <p><strong>Game:</strong> ${escapeHtml(selectedGame?.title ?? selectedBriefing?.gameTitle ?? 'Table session')}</p>
              <p><strong>Level:</strong> ${escapeHtml(selectedLevelLabel)}</p>
              <p><strong>English goal:</strong> ${escapeHtml(selectedGoal.title)} - ${escapeHtml(selectedGoal.copy)}</p>
              <p><strong>Live table question:</strong> ${escapeHtml(selectedPrompt)}</p>
            </div>
            <div class="card"><p class="label">Theme</p><p>${escapeHtml(selectedBriefing?.theme ?? '')}</p></div>
            <div class="card"><p class="label">Simple English Rules</p><ol>${rules}</ol></div>
            <div class="card"><p class="label">Table Mission</p><p>${escapeHtml(selectedBriefing?.mission ?? '')}</p></div>
            <div class="grid">
              <div class="card ${selectedBriefingLevel === 'beginner' ? 'selected' : ''}"><p class="label">Beginner Phrases</p><ul>${beginner}</ul></div>
              <div class="card ${selectedBriefingLevel === 'someExperience' ? 'selected' : ''}"><p class="label">Some Experience Phrases</p><ul>${someExperience}</ul></div>
            </div>
            <div class="card ${selectedBriefingLevel === 'experienced' ? 'selected' : ''}"><p class="label">Experienced Phrases</p><ul>${experienced}</ul></div>
            <div class="card selected"><p class="label">Conversation Prompts</p><ul>${prompts}</ul></div>
            <p class="print-note">Printed from the Table Play Tool. Keep margins enabled in the browser print dialog for clean A4 output.</p>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <main className="page-shell">
      <header className="tactical-banner py-11 text-center">
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="compact-title mt-2">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#71685d]">
          {t.intro}
        </p>
      </header>

      <div className="container-shell py-10">
        <section className="reference-panel overflow-hidden">
          <div className="grid gap-0 md:grid-cols-5">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative border-b border-[#f0d5a1] bg-[#fffaf0] p-4 text-center md:border-b-0 md:border-r last:md:border-r-0">
                  {index > 0 && <ArrowRight className="absolute -left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white text-[#d87522] md:block" size={22} />}
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#ed941d] font-display text-lg text-white">{step.label}</span>
                  <Icon className="mx-auto mt-3 text-[#d87522]" size={22} />
                  <p className="font-display mt-2 text-lg tracking-wide text-[#3d332b]">{language === 'ja' ? step.jaTitle : step.title}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <article className="reference-panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">{t.step} 1</p>
                  <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">{t.pickGame}</h2>
                </div>
                <Database className="text-[#d87522]" size={28} />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#efc779] bg-white px-3 py-2">
                <Search size={16} className="text-[#d87522]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.searchGames}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="mt-4 grid max-h-[520px] gap-3 overflow-auto pr-1">
                {filteredGames.map((game) => {
                  const active = game.id === selectedGame?.id;
                  const gameBriefing = findBriefingForGame(game);
                  return (
                    <button
                      key={game.id}
                      onClick={() => selectGame(game)}
                      className={`grid grid-cols-[72px_1fr] gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        active ? 'border-[#d87522] bg-[#fff7e7] shadow-md' : 'border-[#efd39d] bg-white'
                      }`}
                    >
                      <div className="h-20 overflow-hidden rounded-lg border border-[#efd39d] bg-[#fff0ce]">
                        {game.cover_image_url ? <img src={game.cover_image_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center px-2 text-center font-display text-xs text-[#ae6d3f]">{game.title}</div>}
                      </div>
                      <span>
                        <span className="font-display text-lg tracking-wide text-[#3d332b]">{game.title}</span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[#70665b]">{buildGameBrief(game)}</span>
                        <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[9px] font-bold uppercase ${gameBriefing ? 'bg-[#fff0f5] text-[#ef3d66]' : 'bg-[#f2eee8] text-[#8b8075]'}`}>
                          {gameBriefing ? t.briefingLinked : t.noBriefingYet}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="reference-panel p-5">
              <p className="eyebrow">{t.step} 2</p>
              <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">{t.briefingAutoMatch}</h2>
              <p className="mt-2 text-xs leading-5 text-[#70665b]">
                {t.briefingAutoCopy}
              </p>
              <div className="mt-4 rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#366eb4]">
                  {linkedBriefing ? t.matched : t.noExactMatch}
                </p>
                <h3 className="font-display mt-2 text-2xl tracking-wide text-[#3d332b]">{selectedBriefing?.title ?? t.genericBriefing}</h3>
                <p className="mt-2 text-xs leading-5 text-[#4d5f75]">
                  {selectedBriefing?.mission ?? t.genericBriefingCopy}
                </p>
                {selectedBriefing && (
                  <a href={hrefForBriefing(selectedBriefing.slug)} className="rule-button mt-4 w-full justify-center py-3">
                    <BookOpen size={14} /> {t.viewFullBriefing}
                  </a>
                )}
              </div>
              <div className="mt-5 rounded-2xl border border-[#efd39d] bg-[#fffaf0] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a7563]">{t.chooseLevel}</p>
                <div className="mt-3 grid gap-2">
                  {briefingLevels.map((level) => {
                    const active = level.id === selectedBriefingLevel;
                    return (
                      <button
                        key={level.id}
                        onClick={() => {
                          setSelectedBriefingLevel(level.id);
                          setUsefulPhrase('');
                          setSaveMessage('');
                        }}
                        className={`rounded-xl border p-3 text-left transition hover:bg-white ${active ? 'border-[#d87522] bg-white shadow-sm' : 'border-[#efd39d] bg-[#fffdf8]'}`}
                      >
                        <span className="font-display text-lg tracking-wide text-[#3d332b]">{language === 'ja' ? level.jaLabel : level.label}</span>
                        <span className="mt-1 block text-xs text-[#70665b]">{language === 'ja' ? level.jaHelper : level.helper}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>

            <article className="reference-panel p-5">
              <p className="eyebrow">{t.step} 3</p>
              <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">{t.chooseGoal}</h2>
              <div className="mt-4 grid gap-3">
                {englishGoals.map((goal) => {
                  const active = goal.id === selectedGoal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => {
                        setSelectedGoalId(goal.id);
                        setSaveMessage('');
                      }}
                      className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        active ? 'border-[#d87522] bg-[#fff7e7] shadow-md' : 'border-[#efd39d] bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-display text-xl tracking-wide text-[#3d332b]">
                        {active ? <CheckCircle2 size={18} className="text-[#49a65b]" /> : <Target size={18} className="text-[#d87522]" />}
                        {language === 'ja' ? goal.jaTitle : goal.title}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-[#70665b]">{language === 'ja' ? goal.jaCopy : goal.copy}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <article className="reference-panel overflow-hidden">
              <div className="border-b border-[#f1d8a5] bg-[#fff8ea] px-6 py-5">
                <p className="eyebrow">{t.yourPlan}</p>
                <h2 className="font-display mt-2 text-4xl tracking-wide text-[#3d332b]">{t.ready}</h2>
                <p className="mt-2 text-xs leading-5 text-[#70665b]">
                  {t.readyCopy}
                </p>
              </div>

              <div className="p-6">
                <div className="grid gap-5 md:grid-cols-[0.75fr_1.25fr]">
                  <div className="overflow-hidden rounded-2xl border border-[#efd39d] bg-[#fff0ce]">
                    {selectedGame?.cover_image_url ? (
                      <img src={selectedGame.cover_image_url} alt="" className="h-64 w-full object-cover" />
                    ) : (
                      <div className="flex h-64 items-center justify-center px-5 text-center font-display text-3xl text-[#ae6d3f]">{selectedGame?.title ?? t.chooseGame}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">Game</p>
                    <h3 className="font-display mt-1 text-4xl tracking-wide text-[#bd5c24]">{selectedGame?.title ?? t.chooseGame}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#62584f]">{selectedGame ? buildGameBrief(selectedGame) : t.chooseGameCopy}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase text-[#7a5a34]">
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">{selectedGame?.min_players ?? '-'}-{selectedGame?.max_players ?? '-'} {t.players}</span>
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">{selectedGame?.duration_minutes ?? '-'} {t.minutes}</span>
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">{t.weight} {selectedGame?.weight ?? '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-5">
                    <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#366eb4]"><FileText size={18} /> {t.briefingCard}</p>
                    <p className="mt-2 text-sm font-bold text-[#3d332b]">{selectedBriefing?.title ?? t.noBriefingSelected}</p>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{selectedBriefing?.mission ?? t.genericBriefingCopy}</p>
                    {selectedBriefing?.simpleRules?.length ? (
                      <div className="mt-4 rounded-xl border border-[#d7e5fb] bg-white p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#366eb4]">{t.simpleRules}</p>
                        <ol className="mt-2 space-y-1 text-xs leading-5 text-[#4d5f75]">
                          {selectedBriefing.simpleRules.slice(0, 3).map((rule, index) => (
                            <li key={rule}><span className="font-bold text-[#366eb4]">{index + 1}.</span> {rule}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </section>
                  <section className="rounded-2xl border border-[#d8ead3] bg-[#f7fff4] p-5">
                    <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#2e7c44]"><Target size={18} /> {t.englishGoal}</p>
                    <p className="mt-2 text-sm font-bold text-[#3d332b]">{selectedGoalTitle}</p>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{selectedGoalCopy}</p>
                  </section>
                </div>

                <section className="mt-5 rounded-2xl border border-[#efc779] bg-[#fffaf0] p-5">
                  <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#bd5c24]"><MessageCircle size={18} /> {t.chooseQuestion}</p>
                  <p className="mt-2 text-xs leading-5 text-[#70665b]">
                    {t.chooseQuestionCopy}
                  </p>
                  <div className="mt-4 rounded-2xl border border-[#d87522] bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">{t.conversationCard}</p>
                    <h3 className="font-display mt-2 text-3xl tracking-wide text-[#3d332b]">{selectedGoalTitle}</h3>
                    <div className="mt-4 rounded-xl border border-[#bde8c9] bg-[#f7fff8] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#2e7c44]">{t.liveQuestion}</p>
                      <p className="mt-1 text-sm leading-6 text-[#3d4e3f]">{selectedPrompt}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {liveTableQuestions.map((prompt) => {
                      const active = prompt === selectedPrompt;
                      return (
                        <button
                          key={prompt}
                          onClick={() => {
                            setSelectedPrompt(prompt);
                            setSaveMessage('');
                          }}
                          className={`rounded-xl border p-3 text-left text-xs leading-5 transition hover:bg-white ${
                            active ? 'border-[#d87522] bg-white text-[#3d332b] shadow-sm' : 'border-[#efd39d] bg-[#fffdf8] text-[#70665b]'
                          }`}
                        >
                          {prompt}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="mt-5 rounded-2xl border border-[#efc779] bg-white p-5">
                  <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#bd5c24]"><Save size={18} /> {t.recordProgress}</p>
                  <div className="mt-4 grid gap-4">
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      {t.usefulPhraseLabel}
                      <input value={usefulPhrase} onChange={(event) => setUsefulPhrase(event.target.value)} className="mt-2 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder={selectedLevelPhrases[0] ?? selectedGoal.phrases[0]} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      {t.whatHappenedLabel}
                      <textarea value={whatHappened} onChange={(event) => setWhatHappened(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder={t.whatHappenedPlaceholder} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      {t.nextTimeLabel}
                      <input value={nextTime} onChange={(event) => setNextTime(event.target.value)} className="mt-2 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder={t.nextTimePlaceholder} />
                    </label>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="flex flex-wrap gap-3 rounded-2xl border border-[#efd39d] bg-[#fffaf0] p-2">
                      <button onClick={printTableDevice} className="rule-button px-5 py-3">
                        <Printer size={14} /> {t.printTool}
                      </button>
                      <button onClick={printBriefing} className="rule-button px-5 py-3">
                        <Printer size={14} /> {t.printBriefing}
                      </button>
                    </div>
                    <button onClick={saveProgress} className="rule-button rule-button-primary px-5 py-3">
                      <Save size={14} /> {t.saveProgress}
                    </button>
                    <button onClick={() => onNavigate('profile')} className="rule-button px-5 py-3">
                      <Trophy size={14} /> {t.openProgress}
                    </button>
                  </div>
                  {saveMessage && <p className="mt-4 rounded-xl border border-[#bde8c9] bg-[#f7fff8] px-4 py-3 text-sm font-bold text-[#2e7c44]">{saveMessage}</p>}
                  <div className="mt-5 grid gap-4 rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-4 sm:grid-cols-[144px_1fr]">
                    <div className="rounded-xl border border-[#b9d2fb] bg-white p-2">
                      <img src={qrUrl} alt={t.qrTitle} className="h-36 w-36" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#366eb4]"><QrCode size={18} /> {t.qrTitle}</p>
                      <p className="mt-2 text-sm leading-6 text-[#62584f]">
                        {t.qrCopy}
                      </p>
                      <a href="#profile" className="mt-3 text-xs font-bold uppercase tracking-wide text-[#366eb4]">{progressUrl}</a>
                    </div>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
