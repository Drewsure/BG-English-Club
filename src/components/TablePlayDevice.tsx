import { ArrowRight, BookOpen, CheckCircle2, Database, FileText, Gamepad2, MessageCircle, Printer, QrCode, Save, Search, Target, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Section } from '../App';
import { buildGameBrief } from '../lib/gameBriefs';
import { getGames } from '../lib/games';
import type { Language } from '../lib/i18n';
import { ui } from '../lib/i18n';
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
    copy: 'Use when the game creates surprise, risk, betting, or changing plans.',
    phrases: ["I'm thinking...", "I'm changing my mind because...", 'That surprised me.'],
  },
  {
    id: 'explain',
    title: 'Explain A Choice',
    copy: 'Use when you place, choose, bid, block, build, or take a card.',
    phrases: ["I'm choosing this because...", 'My reason is...', 'This helps me because...'],
  },
  {
    id: 'ask',
    title: 'Ask A Useful Question',
    copy: 'Use when you need a rule, advice, clarification, or table information.',
    phrases: ['Can I ask about...?', 'What happens if...?', 'Do you think I should...?'],
  },
  {
    id: 'suggest',
    title: 'Suggest Or Negotiate',
    copy: 'Use when the game includes teamwork, trades, shared plans, or persuasion.',
    phrases: ['Maybe we should...', 'This is fair because...', 'One option is...'],
  },
  {
    id: 'review',
    title: 'Review What Happened',
    copy: 'Use after a turn or session to make the learning visible.',
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

const briefingLevels: Array<{ id: BriefingLevel; label: string; helper: string }> = [
  { id: 'beginner', label: 'Beginner', helper: 'Short, safe phrases for first use.' },
  { id: 'someExperience', label: 'Some Experience', helper: 'Longer phrases with a little reasoning.' },
  { id: 'experienced', label: 'Experienced', helper: 'Fuller strategic sentences.' },
];

const flowSteps = [
  { label: '01', title: 'Pick A Game', icon: Gamepad2 },
  { label: '02', title: 'Briefing Auto-Matched', icon: BookOpen },
  { label: '03', title: 'Choose English Goal', icon: Target },
  { label: '04', title: 'Choose Live Question', icon: MessageCircle },
  { label: '05', title: 'Record Progress', icon: Trophy },
];

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
  const common = ui[language].common;

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
  const selectedLevelLabel = briefingLevels.find((level) => level.id === selectedBriefingLevel)?.label ?? 'Beginner';
  const generatedConversationCard = `${selectedGoal.title}: ${selectedPrompt}`;
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
      focusTitle: `${selectedGoal.title} (${briefingLevels.find((level) => level.id === selectedBriefingLevel)?.label})`,
      conversationCard: generatedConversationCard,
      usefulPhrase: usefulPhrase.trim() || selectedLevelPhrases[0] || selectedGoal.phrases[0],
      whatHappened: whatHappened.trim() || `Used "${generatedConversationCard}" during table play.`,
      nextTime: nextTime.trim() || 'Try one more sentence with the same focus next time.',
    });
    setSaveMessage(`${record.gameTitle} saved. Progress marks updated: +10 XP, +1 session, +1 useful phrase.`);
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
          <title>${escapeHtml(selectedGame?.title ?? 'Table Play Device')}</title>
          <style>${printPageStyles}</style>
        </head>
        <body>
          <main class="sheet">
            <p class="label">Board Game English Club - Fukuoka Chapter</p>
            <h1>Table Play Device</h1>
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
            <p class="small">Full briefing print. The orange sections show the exact choices made in Table Play Device.</p>
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
            <p class="print-note">Printed from Table Play Device. Keep margins enabled in the browser print dialog for clean A4 output.</p>
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
        <p className="eyebrow justify-center">Choose And Play Process</p>
        <h1 className="compact-title mt-2">Table Play Device</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#71685d]">
          Pick a game and the matching briefing appears automatically. Then choose a level, choose one English goal, pick one live table question, and record what happened.
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
                  <p className="font-display mt-2 text-lg tracking-wide text-[#3d332b]">{step.title}</p>
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
                  <p className="eyebrow">Step 1</p>
                  <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">Pick A Game</h2>
                </div>
                <Database className="text-[#d87522]" size={28} />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#efc779] bg-white px-3 py-2">
                <Search size={16} className="text-[#d87522]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search games..."
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
                          {gameBriefing ? 'Briefing linked' : 'No briefing yet'}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="reference-panel p-5">
              <p className="eyebrow">Step 2</p>
              <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">Briefing Card Auto-Match</h2>
              <p className="mt-2 text-xs leading-5 text-[#70665b]">
                When you pick a game, the matching briefing card is selected for you. You only choose the level you want to use at the table.
              </p>
              <div className="mt-4 rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#366eb4]">
                  {linkedBriefing ? 'Matched from selected game' : 'No exact match yet'}
                </p>
                <h3 className="font-display mt-2 text-2xl tracking-wide text-[#3d332b]">{selectedBriefing?.title ?? 'Generic Table Briefing'}</h3>
                <p className="mt-2 text-xs leading-5 text-[#4d5f75]">
                  {selectedBriefing?.mission ?? 'Use a generic conversation question until a dedicated briefing is created for this game.'}
                </p>
                {selectedBriefing && (
                  <a href={hrefForBriefing(selectedBriefing.slug)} className="rule-button mt-4 w-full justify-center py-3">
                    <BookOpen size={14} /> View Full Briefing
                  </a>
                )}
              </div>
              <div className="mt-5 rounded-2xl border border-[#efd39d] bg-[#fffaf0] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a7563]">Choose briefing card level</p>
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
                        <span className="font-display text-lg tracking-wide text-[#3d332b]">{level.label}</span>
                        <span className="mt-1 block text-xs text-[#70665b]">{level.helper}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>

            <article className="reference-panel p-5">
              <p className="eyebrow">Step 3</p>
              <h2 className="font-display mt-1 text-3xl tracking-wide text-[#bd5c24]">Choose One English Goal</h2>
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
                        {goal.title}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-[#70665b]">{goal.copy}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <article className="reference-panel overflow-hidden">
              <div className="border-b border-[#f1d8a5] bg-[#fff8ea] px-6 py-5">
                <p className="eyebrow">Your Assembled Device</p>
                <h2 className="font-display mt-2 text-4xl tracking-wide text-[#3d332b]">Ready For The Table</h2>
                <p className="mt-2 text-xs leading-5 text-[#70665b]">
                  This is the portable play plan. It tells the table what to play, what English to use, and what to notice afterwards.
                </p>
              </div>

              <div className="p-6">
                <div className="grid gap-5 md:grid-cols-[0.75fr_1.25fr]">
                  <div className="overflow-hidden rounded-2xl border border-[#efd39d] bg-[#fff0ce]">
                    {selectedGame?.cover_image_url ? (
                      <img src={selectedGame.cover_image_url} alt="" className="h-64 w-full object-cover" />
                    ) : (
                      <div className="flex h-64 items-center justify-center px-5 text-center font-display text-3xl text-[#ae6d3f]">{selectedGame?.title ?? 'Choose a game'}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">Game</p>
                    <h3 className="font-display mt-1 text-4xl tracking-wide text-[#bd5c24]">{selectedGame?.title ?? 'Choose a game'}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#62584f]">{selectedGame ? buildGameBrief(selectedGame) : 'Choose a game from the list to begin.'}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase text-[#7a5a34]">
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">{selectedGame?.min_players ?? '-'}-{selectedGame?.max_players ?? '-'} players</span>
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">{selectedGame?.duration_minutes ?? '-'} min</span>
                      <span className="rounded border border-[#efd39d] bg-[#fffaf0] px-2 py-1">Weight {selectedGame?.weight ?? '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-5">
                    <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#366eb4]"><FileText size={18} /> Briefing Card</p>
                    <p className="mt-2 text-sm font-bold text-[#3d332b]">{selectedBriefing?.title ?? 'No briefing selected'}</p>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{selectedBriefing?.mission ?? 'Use a generic conversation prompt until a dedicated briefing is created.'}</p>
                    {selectedBriefing?.simpleRules?.length ? (
                      <div className="mt-4 rounded-xl border border-[#d7e5fb] bg-white p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#366eb4]">Simple English Rules</p>
                        <ol className="mt-2 space-y-1 text-xs leading-5 text-[#4d5f75]">
                          {selectedBriefing.simpleRules.slice(0, 3).map((rule, index) => (
                            <li key={rule}><span className="font-bold text-[#366eb4]">{index + 1}.</span> {rule}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </section>
                  <section className="rounded-2xl border border-[#d8ead3] bg-[#f7fff4] p-5">
                    <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#2e7c44]"><Target size={18} /> English Goal</p>
                    <p className="mt-2 text-sm font-bold text-[#3d332b]">{selectedGoal.title}</p>
                    <p className="mt-2 text-xs leading-5 text-[#70665b]">{selectedGoal.copy}</p>
                  </section>
                </div>

                <section className="mt-5 rounded-2xl border border-[#efc779] bg-[#fffaf0] p-5">
                  <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#bd5c24]"><MessageCircle size={18} /> Step 4: Choose One Live Table Question</p>
                  <p className="mt-2 text-xs leading-5 text-[#70665b]">
                    This replaces the old extra phrase card. Pick one question to use during play; the useful phrases already live in the briefing level above.
                  </p>
                  <div className="mt-4 rounded-2xl border border-[#d87522] bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">Conversation Card</p>
                    <h3 className="font-display mt-2 text-3xl tracking-wide text-[#3d332b]">{selectedGoal.title}</h3>
                    <div className="mt-4 rounded-xl border border-[#bde8c9] bg-[#f7fff8] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#2e7c44]">Live table question</p>
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
                  <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#bd5c24]"><Save size={18} /> Step 5: Record Progress</p>
                  <div className="mt-4 grid gap-4">
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      Useful phrase you actually said
                      <input value={usefulPhrase} onChange={(event) => setUsefulPhrase(event.target.value)} className="mt-2 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder={selectedLevelPhrases[0] ?? selectedGoal.phrases[0]} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      What happened at the table?
                      <textarea value={whatHappened} onChange={(event) => setWhatHappened(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder="Example: I explained my choice before taking the tile." />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wide text-[#7a7065]">
                      Next time
                      <input value={nextTime} onChange={(event) => setNextTime(event.target.value)} className="mt-2 w-full rounded-xl border border-[#efc779] px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#d87522]" placeholder="Example: Try one longer sentence." />
                    </label>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="flex flex-wrap gap-3 rounded-2xl border border-[#efd39d] bg-[#fffaf0] p-2">
                      <button onClick={printTableDevice} className="rule-button px-5 py-3">
                        <Printer size={14} /> Print Table Device
                      </button>
                      <button onClick={printBriefing} className="rule-button px-5 py-3">
                        <Printer size={14} /> Print Briefing
                      </button>
                    </div>
                    <button onClick={saveProgress} className="rule-button rule-button-primary px-5 py-3">
                      <Save size={14} /> Save To Progress
                    </button>
                    <button onClick={() => onNavigate('profile')} className="rule-button px-5 py-3">
                      <Trophy size={14} /> {common.open} Progress
                    </button>
                  </div>
                  {saveMessage && <p className="mt-4 rounded-xl border border-[#bde8c9] bg-[#f7fff8] px-4 py-3 text-sm font-bold text-[#2e7c44]">{saveMessage}</p>}
                  <div className="mt-5 grid gap-4 rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-4 sm:grid-cols-[144px_1fr]">
                    <div className="rounded-xl border border-[#b9d2fb] bg-white p-2">
                      <img src={qrUrl} alt="QR code to progress page" className="h-36 w-36" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="flex items-center gap-2 font-display text-xl tracking-wide text-[#366eb4]"><QrCode size={18} /> QR Back To Progress</p>
                      <p className="mt-2 text-sm leading-6 text-[#62584f]">
                        Print the table device, then scan this after play to return to Progress and record the final notes.
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
