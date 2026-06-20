import {
  ArrowRight,
  Briefcase,
  Compass,
  Flame,
  Gamepad2,
  Heart,
  Languages,
  MessageCircle,
  MousePointer2,
  Printer,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { BrandLogo } from './BrandLogo';

const beats = [
  { icon: Gamepad2, label: '01', title: 'Choose A Mission', copy: 'The visitor sees a game, a route, and a reason to speak before the lesson is explained.' },
  { icon: Target, label: '02', title: 'Make One English Move', copy: 'Predict, react, ask, negotiate, or review. One confident action at a time.' },
  { icon: MessageCircle, label: '03', title: 'Talk Because Play Demands It', copy: 'The board creates the situation. The prompt card gives the words. The table does the rest.' },
  { icon: Trophy, label: '04', title: 'Take Proof Home', copy: 'A phrase, a moment, a printed note, a next step. Progress becomes visible.' },
];

const entryPaths: Array<{ icon: typeof Briefcase; title: string; audience: string; copy: string; action: string; section: Section; tone: string }> = [
  {
    icon: Briefcase,
    title: 'For Teams',
    audience: 'Corporate workshops',
    copy: 'Turn soft skills into a playable challenge: listen, decide, explain, adapt.',
    action: 'Build a workshop',
    section: 'partnerships',
    tone: 'from-[#ffcf3f] to-[#ff8d3f]',
  },
  {
    icon: Heart,
    title: 'For Silver Circle',
    audience: 'Older learners',
    copy: 'A warm reason to go out, meet people, remember phrases, and laugh at the table.',
    action: 'See Silver Circle',
    section: 'silver-circle',
    tone: 'from-[#ff6fa1] to-[#ffd1df]',
  },
  {
    icon: Printer,
    title: 'For Teachers',
    audience: 'Briefing cards',
    copy: 'One game becomes a printable lesson: rules, phrases, prompts, and progress.',
    action: 'Open briefings',
    section: 'briefings',
    tone: 'from-[#65f4e7] to-[#8fb7ff]',
  },
  {
    icon: MousePointer2,
    title: 'For Players',
    audience: 'Table Play Tool',
    copy: 'Pick a game, match a briefing, choose a prompt, and play in English now.',
    action: 'Try the tool',
    section: 'play',
    tone: 'from-[#b8ff72] to-[#65f4e7]',
  },
];

const tableCards = [
  ['Predict', 'What do you think will happen?'],
  ['React', 'That surprised me.'],
  ['Explain', 'I chose this because...'],
  ['Record', 'Next time I want to try...'],
];

const magneticMoments = [
  ['The Hook', 'A glowing route across the board says: this is not a class, it is a table adventure.'],
  ['The Choice', 'Four clear paths let visitors identify themselves immediately: team, senior, teacher, player.'],
  ['The Tension', 'Cards ask real questions during play. English appears because the game needs it.'],
  ['The Reward', 'Printed notes and progress records make the experience feel useful after the session ends.'],
  ['The Range', 'Silver Circle and corporate users share one system, showing unusual range and originality.'],
  ['The Next Click', 'Every section invites one action: enter, book, print, or continue.'],
];

const designPrinciples = [
  ['Gaming Impact', 'A bold first screen, route-map energy, visible goals, motion, and reward cues.'],
  ['Education Trust', 'Plain promise, readable steps, low pressure, Japanese support, and clear outcomes.'],
  ['Human Warmth', 'Silver Circle and corporate users appear in the same living table, not as separate brochures.'],
  ['Technical Depth', 'The briefing system, Table Play Tool, PDFs, and progress records become the story, not hidden machinery.'],
];

const requirements = [
  ['Visual System', 'Hero-grade art direction, custom assets, richer section layouts, and fewer plain card grids.'],
  ['Motion Rules', 'Purposeful animation, hover states, step reveals, and reduced-motion support for accessibility.'],
  ['Content Design', 'One promise per screen, fewer labels, more emotional copy, and clear user journeys.'],
  ['Program Management', 'Design sprint, asset pipeline, component backlog, weekly review, and launch QA checklist.'],
];

const buildRoadmap = [
  ['Sprint 1', 'Hero Identity', 'Create three hero-grade scenes: table adventure, Silver Circle warmth, corporate challenge.'],
  ['Sprint 2', 'Interactive Flow', 'Turn the five-step process into animated cards, progress route, and Table Play entry.'],
  ['Sprint 3', 'Audience Pages', 'Rebuild Silver Circle, Corporate, and Briefings with distinct visual lanes.'],
  ['Sprint 4', 'Launch Polish', 'Compress assets, test mobile, tune copy, add analytics goals, and prepare Netlify release.'],
];

export function ImpactHero({ language, onNavigate }: { language: Language; onNavigate: (section: Section) => void }) {
  const isJa = language === 'ja';

  return (
    <main className="min-h-screen overflow-hidden bg-[#081f2f] text-white">
      <style>{`
        @keyframes impactFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--tilt, 0deg)); }
          50% { transform: translate3d(0, -14px, 0) rotate(calc(var(--tilt, 0deg) + 1.5deg)); }
        }
        @keyframes routePulse {
          0%, 100% { opacity: .55; transform: scaleX(.82); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes tokenStep {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(42px) translateY(-16px); }
          100% { transform: translateX(84px) translateY(0); }
        }
        @keyframes glowSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          35% { opacity: .65; }
          100% { transform: translateX(140%); opacity: 0; }
        }
        .impact-float { animation: impactFloat 5.5s ease-in-out infinite; }
        .route-pulse { animation: routePulse 2.4s ease-in-out infinite; transform-origin: left center; }
        .token-step { animation: tokenStep 3.4s ease-in-out infinite; }
        .glow-sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.42) 45%, transparent 62%);
          animation: glowSweep 5.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .impact-float, .route-pulse, .token-step, .glow-sweep::after { animation: none; }
        }
      `}</style>

      <section className="relative min-h-[calc(100vh-66px)] pt-[66px]">
        <img src="/images/impact/bge-impact-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,21,32,.97)_0%,rgba(5,21,32,.84)_34%,rgba(5,21,32,.34)_64%,rgba(5,21,32,.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081f2f] to-transparent" />

        <div className="container-shell relative z-10 grid min-h-[calc(100vh-66px)] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <BrandLogo compact />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffe17a]">Creative Hero Experiment</span>
            </div>

            <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[0.86] tracking-wide md:text-8xl lg:text-9xl">
              English Becomes A Game
              <span className="mt-3 block text-[#65f4e7]">You Can Enter.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              {isJa
                ? '説明を読む前に、参加したくなる。ゲームの高揚感、英語の安心感、地域のつながりを一つのテーブル体験にします。'
                : 'Before visitors read the explanation, they should feel the invitation: choose a game, make a move, say something useful, and leave with proof.'}
            </p>

            <div className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-4">
              {['Choose', 'Speak', 'Laugh', 'Leave With English'].map((word) => (
                <span key={word} className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-center text-[11px] font-black uppercase tracking-[0.16em] text-white/82 backdrop-blur-md">
                  {word}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('play')} className="inline-flex items-center gap-2 rounded-full bg-[#ffcf3f] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#17212b] shadow-xl shadow-[#ffcf3f]/25 transition hover:-translate-y-1 hover:bg-[#ffe36f]">
                {isJa ? '体験を始める' : 'Enter The Table'} <ArrowRight size={17} />
              </button>
              <button onClick={() => onNavigate('briefings')} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/18">
                {isJa ? 'ブリーフィングを見る' : 'See Briefings'} <Sparkles size={17} />
              </button>
            </div>
          </div>

          <div className="relative hidden min-h-[560px] lg:block">
            <div className="impact-float absolute right-[8%] top-[6%] w-72 rounded-[1.8rem] border border-white/20 bg-white/14 p-5 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl [--tilt:4deg]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">Live Prompt</p>
              <p className="mt-3 font-display text-3xl leading-none">Where will you place it?</p>
              <div className="route-pulse mt-5 h-1 rounded-full bg-[#65f4e7]" />
            </div>

            <div className="impact-float absolute bottom-[20%] left-[4%] w-80 rounded-[1.8rem] border border-white/20 bg-[#fffaf0] p-5 text-[#17212b] shadow-2xl shadow-pink-500/25 [--tilt:-5deg]" style={{ animationDelay: '0.8s' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef3d66]">Silver Circle + Corporate</p>
              <p className="mt-3 text-sm font-bold leading-6">One table can hold confidence, soft skills, memory, laughter, and a real reason to speak.</p>
            </div>

            <div className="absolute bottom-[8%] right-[14%] rounded-[2rem] border border-white/15 bg-[#081f2f]/72 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-[#ffcf3f] token-step shadow-lg shadow-[#ffcf3f]/40" />
                <span className="h-1 w-40 rounded-full bg-white/20" />
              </div>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Progress Route</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {beats.map(({ icon: Icon, label, title, copy }) => (
            <article key={title} className="group rounded-[1.6rem] border border-white/12 bg-white/[0.06] p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:bg-white/[0.1]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffcf3f]">{label}</span>
                <Icon className="text-[#65f4e7]" size={24} />
              </div>
              <h2 className="mt-5 font-display text-3xl leading-none">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/68">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffcf3f]">Choose Your Door</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">Every visitor needs a way in.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/68">
            Gaming sites create choice. Education sites create confidence. This page should do both in the first minute.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {entryPaths.map(({ icon: Icon, title, audience, copy, action, section, tone }) => (
            <button
              key={title}
              onClick={() => onNavigate(section)}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/14 bg-white/[0.07] p-5 text-left shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:border-white/35"
            >
              <span className={`glow-sweep absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
              <span className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-[#081f2f] shadow-lg`}>
                <Icon size={24} />
              </span>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#65f4e7]">{audience}</p>
              <h3 className="mt-2 font-display text-4xl leading-none">{title}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/68">{copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#ffcf3f]">
                {action} <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffcf3f]">Magnetic Language</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            Do not explain the machine first. Let people feel the table.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            The technical system is valuable, but it should arrive as a promise: a game gives you a situation, a card gives you words, and the table gives you confidence.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tableCards.map(([label, phrase], index) => (
            <div key={label} className="rounded-[1.4rem] border border-white/12 bg-white/[0.07] p-5 shadow-xl shadow-black/10" style={{ transform: `rotate(${[-2, 1.5, -1, 2][index]}deg)` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">{label}</p>
              <p className="mt-4 font-display text-3xl leading-none">{phrase}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/15">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">Magnetic Moments</p>
              <h2 className="mt-3 font-display text-5xl leading-none">What should the page make people feel?</h2>
            </div>
            <div className="rounded-full border border-[#ffcf3f]/35 bg-[#ffcf3f]/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffcf3f]">
              Agency + Clarity + Reward
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {magneticMoments.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-white/12 bg-[#081f2f]/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/38">Moment {index + 1}</span>
                  {index % 3 === 0 ? <Flame size={18} className="text-[#ffcf3f]" /> : index % 3 === 1 ? <Compass size={18} className="text-[#65f4e7]" /> : <Zap size={18} className="text-[#ff6fa1]" />}
                </div>
                <h3 className="mt-4 font-display text-3xl leading-none">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-5 py-12 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/12 bg-[#fffaf0] p-7 text-[#17212b]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d87522]">Design Blend</p>
          <div className="mt-6 grid gap-4">
            {designPrinciples.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-[#efd39d] bg-white p-5">
                <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62584f]">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">Build Requirements</p>
          <div className="mt-6 grid gap-4">
            {requirements.map(([title, copy], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-white/12 bg-black/16 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffcf3f] text-sm font-black text-[#17212b]">{index + 1}</span>
                <span>
                  <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{copy}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="rounded-[2rem] border border-[#ffcf3f]/25 bg-[#fffaf0] p-7 text-[#17212b] shadow-2xl shadow-[#ffcf3f]/10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d87522]">Program Management</p>
              <h2 className="mt-3 font-display text-5xl leading-none">How we make this real without losing control.</h2>
              <p className="mt-5 text-sm leading-7 text-[#62584f]">
                The creative page needs a production rhythm: decide the audience, create the asset, build the component, test the phone view, then measure the action.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {buildRoadmap.map(([sprint, title, copy]) => (
                <article key={sprint} className="rounded-2xl border border-[#efd39d] bg-white p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d87522]">{sprint}</p>
                  <h3 className="mt-2 font-display text-3xl leading-none">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#62584f]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="grid gap-4 rounded-[2rem] border border-white/12 bg-white/[0.08] p-6 backdrop-blur-md md:grid-cols-4">
          {[
            [Briefcase, 'Corporate', 'Soft skills without role-play stiffness'],
            [Heart, 'Silver Circle', 'Gentle participation and real connection'],
            [Languages, 'English', 'Useful phrases born from the game state'],
            [Printer, 'Printable', 'PDFs and progress notes that leave the table'],
          ].map(([Icon, title, copy]) => {
            const RealIcon = Icon as typeof Briefcase;
            return (
              <div key={title as string} className="rounded-2xl bg-[#081f2f]/50 p-5">
                <RealIcon className="text-[#ffcf3f]" size={26} />
                <p className="mt-4 font-display text-2xl tracking-wide">{title as string}</p>
                <p className="mt-2 text-xs leading-5 text-white/62">{copy as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
