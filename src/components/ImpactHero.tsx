import { ArrowRight, Briefcase, Gamepad2, Heart, Languages, MessageCircle, Printer, Sparkles, Target, Trophy } from 'lucide-react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { BrandLogo } from './BrandLogo';

const beats = [
  { icon: Gamepad2, label: '01', title: 'Pick The Game', copy: 'The table has a visible mission before anyone has to perform English.' },
  { icon: Target, label: '02', title: 'Choose The English Move', copy: 'Predict, explain, ask, negotiate, or review. One focus only.' },
  { icon: MessageCircle, label: '03', title: 'Play Into Conversation', copy: 'The game creates the reason to speak. The card gives the words.' },
  { icon: Trophy, label: '04', title: 'Leave With Proof', copy: 'One phrase, one table moment, one next step. Real progress, not a test.' },
];

const tableCards = [
  ['Predict', 'What do you think will happen?'],
  ['React', 'That surprised me.'],
  ['Explain', 'I chose this because...'],
  ['Record', 'Next time I want to try...'],
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
        .impact-float { animation: impactFloat 5.5s ease-in-out infinite; }
        .route-pulse { animation: routePulse 2.4s ease-in-out infinite; transform-origin: left center; }
        .token-step { animation: tokenStep 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .impact-float, .route-pulse, .token-step { animation: none; }
        }
      `}</style>

      <section className="relative min-h-[calc(100vh-66px)] pt-[66px]">
        <img
          src="/images/impact/bge-impact-hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,21,32,.96)_0%,rgba(5,21,32,.82)_34%,rgba(5,21,32,.36)_62%,rgba(5,21,32,.1)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081f2f] to-transparent" />

        <div className="container-shell relative z-10 grid min-h-[calc(100vh-66px)] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <BrandLogo compact />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffe17a]">
                {isJa ? 'Creative Hero Experiment' : 'Creative Hero Experiment'}
              </span>
            </div>

            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3.6rem,8vw,8.8rem)] leading-[0.82] tracking-wide">
              Board Game English
              <span className="mt-3 block text-[#65f4e7]">Should Feel Playable.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              {isJa
                ? '英語を説明するサイトではなく、テーブルに入りたくなる体験へ。ゲームの高揚感と教育の安心感を一つにします。'
                : 'Not a page that explains English lessons. A page that makes people want to sit at the table. Game energy, education clarity, and real community in one first impression.'}
            </p>

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

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffcf3f]">Out Of The Box Direction</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            Make the technical system feel like a game people can enter.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            The current site has powerful mechanics: briefing cards, Table Play, PDF notes, progress records, Silver Circle, corporate sessions. The design job is to turn those mechanics into a visible journey with momentum.
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
