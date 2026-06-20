import {
  ArrowRight,
  Briefcase,
  Compass,
  Flame,
  Gamepad2,
  Heart,
  Languages,
  MessageCircle,
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
  { icon: Gamepad2, label: '01', title: 'Choose A Game', copy: 'Start with a real board game that gives everyone something to look at, touch, and talk about.' },
  { icon: Target, label: '02', title: 'Use One English Move', copy: 'Pick one simple focus: predict, react, explain, ask, negotiate, or review.' },
  { icon: MessageCircle, label: '03', title: 'Speak During Play', copy: 'You do not have to invent conversation. The game creates the moment and the card gives you useful words.' },
  { icon: Trophy, label: '04', title: 'Leave With Progress', copy: 'Take away one phrase you actually used, one table moment, and one next step for next time.' },
];

const entryPaths: Array<{ icon: typeof Briefcase; title: string; audience: string; copy: string; action: string; section: Section; tone: string; mascot: string; tag: string }> = [
  {
    icon: Briefcase,
    title: 'For Teams',
    audience: 'Corporate workshops',
    copy: 'Turn soft skills into a playable challenge: listen, decide, explain, adapt.',
    action: 'Build a workshop',
    section: 'partnerships',
    tone: 'from-[#ffcf3f] to-[#ff8d3f]',
    mascot: '/images/impact/meeples/corporate-teams.png',
    tag: 'Strategy',
  },
  {
    icon: Heart,
    title: 'For Silver Circle',
    audience: 'Older learners',
    copy: 'A warm reason to go out, meet people, remember phrases, and laugh at the table.',
    action: 'See Silver Circle',
    section: 'silver-circle',
    tone: 'from-[#ff6fa1] to-[#ffd1df]',
    mascot: '/images/impact/meeples/silver-circle.png',
    tag: 'Community',
  },
  {
    icon: Gamepad2,
    title: 'For Families',
    audience: 'Family game tables',
    copy: 'Parents and children share useful English through playful choices, turns, and table moments.',
    action: 'Explore options',
    section: 'offers',
    tone: 'from-[#ffcf3f] to-[#65f4e7]',
    mascot: '/images/impact/meeples/families.png',
    tag: 'Play Together',
  },
  {
    icon: Printer,
    title: 'For Teachers',
    audience: 'Briefing cards',
    copy: 'One game becomes a printable lesson: rules, phrases, prompts, and progress.',
    action: 'Open briefings',
    section: 'briefings',
    tone: 'from-[#65f4e7] to-[#8fb7ff]',
    mascot: '/images/impact/meeples/teachers.png',
    tag: 'Table Host',
  },
];

const tableCards = [
  ['Predict', 'What do you think will happen?'],
  ['React', 'That surprised me.'],
  ['Explain', 'I chose this because...'],
  ['Record', 'Next time I want to try...'],
];

const promiseTiles = [
  ['Learn English', 'Useful phrases appear while you choose, explain, ask, and react.'],
  ['Keep Your Mind Active', 'Games give memory, planning, attention, and decision-making a friendly workout.'],
  ['Build Community', 'A shared table makes conversation easier, warmer, and more natural.'],
  ['Use Board Games', 'The game is not decoration. It is the engine that creates the English moment.'],
];

const magneticMoments = [
  ['You Relax Faster', 'The table gives your hands and eyes something to do, so speaking English feels less exposed.'],
  ['You Have A Reason To Speak', 'Each turn creates a small decision, question, surprise, or explanation.'],
  ['You Use Real Phrases', 'The English comes from the game situation, not from memorising a script.'],
  ['You Notice Progress', 'After play, one useful phrase becomes something you can remember and use again.'],
  ['You Belong At The Table', 'Silver Circle, corporate teams, families, teachers, and beginners can all enter at the right level.'],
  ['You Know What To Do Next', 'Try a table, print a briefing, book a workshop, or continue into regular sessions.'],
];

const whyItWorks = [
  ['A Game Gives Structure', 'You always know whose turn it is, what choice matters, and why the next sentence is useful.'],
  ['English Has A Purpose', 'You speak to place a piece, explain a choice, ask for help, or react to what happened.'],
  ['Support Is Built In', 'Briefing cards, live questions, Japanese support, and printable notes keep the table calm.'],
  ['Progress Feels Human', 'The goal is not perfect grammar. The goal is to say something useful and notice it afterwards.'],
];

const bookableWays = [
  ['Trial Table', 'Try one friendly session before choosing a program.'],
  ['Silver Circle', 'Gentle English board games for older learners and community connection.'],
  ['Corporate Workshop', 'A lively communication session for teams, meetings, and soft skills.'],
  ['Briefing Cards', 'Printable game guides for teachers, parents, and game groups.'],
];

const sessionPath = [
  ['Arrive', 'Meet the table, choose a suitable game, and warm up with one easy phrase.'],
  ['Play', 'Use a live question or phrase card while the game gives you natural reasons to speak.'],
  ['Notice', 'Pause after play and collect the English that actually appeared.'],
  ['Continue', 'Take a printed note, join a regular table, or book the next session for your group.'],
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

        <div className="container-shell relative z-10 grid min-h-[calc(100vh-66px)] items-center gap-8 py-10 md:grid-cols-[0.88fr_1.12fr] lg:py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <BrandLogo compact />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffe17a]">Board Game English Club Fukuoka</span>
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.92] tracking-wide md:text-6xl xl:text-8xl">
              Learn English Through Board Games
              <span className="mt-3 block text-[#65f4e7]">Think. Speak. Connect.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/82 md:text-lg md:leading-8">
              {isJa
                ? '英語を学び、頭を使い、人とつながるためのボードゲーム英会話です。ゲームが会話の理由を作り、英語が自然に出てきます。'
                : 'For adults, seniors, teams, teachers, and beginners who want English practice that feels social, active, and real.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('play')} className="inline-flex items-center gap-2 rounded-full bg-[#ffcf3f] px-5 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#17212b] shadow-xl shadow-[#ffcf3f]/25 transition hover:-translate-y-1 hover:bg-[#ffe36f]">
                {isJa ? '体験を始める' : 'Enter The Table'} <ArrowRight size={17} />
              </button>
              <button onClick={() => onNavigate('briefings')} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/18">
                {isJa ? 'ブリーフィングを見る' : 'See Briefings'} <Sparkles size={17} />
              </button>
            </div>

            <div className="mt-4 grid max-w-xl gap-2 pb-6 sm:grid-cols-4 md:pb-0">
              {['Learn English', 'Stay Sharp', 'Meet People', 'Play Games'].map((word) => (
                <span key={word} className="rounded-full border border-white/18 bg-white/10 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white/82 backdrop-blur-md">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[520px] md:block xl:min-h-[560px]">
            <div className="impact-float absolute right-[8%] top-[6%] w-72 rounded-[1.8rem] border border-white/20 bg-white/14 p-5 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl [--tilt:4deg]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">Board Game English</p>
              <p className="mt-3 font-display text-3xl leading-none">Learn English through real games.</p>
              <div className="route-pulse mt-5 h-1 rounded-full bg-[#65f4e7]" />
            </div>

            <div className="impact-float absolute bottom-[20%] left-[4%] w-80 rounded-[1.8rem] border border-white/20 bg-[#fffaf0] p-5 text-[#17212b] shadow-2xl shadow-pink-500/25 [--tilt:-5deg]" style={{ animationDelay: '0.8s' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef3d66]">Silver Circle + Corporate</p>
              <p className="mt-3 text-sm font-bold leading-6">Think, speak, connect, and build confidence around one shared table.</p>
            </div>

            <div className="absolute bottom-[1%] right-[2%] rounded-[2rem] border border-white/15 bg-[#081f2f]/72 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-[#ffcf3f] token-step shadow-lg shadow-[#ffcf3f]/40" />
                <span className="h-1 w-32 rounded-full bg-white/20" />
              </div>
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Play. Speak. Remember.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell -mt-4 pb-8 md:-mt-6">
        <div className="relative z-20 overflow-hidden rounded-[2rem] border border-white/16 bg-[#081f2f]/90 p-3 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,207,63,.20),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(101,244,231,.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_42%)]" />
          <div className="relative grid gap-3 lg:grid-cols-[1.35fr_1fr]">
            <article className="group relative min-h-[190px] overflow-hidden rounded-[1.55rem] border border-[#ffcf3f]/30 bg-gradient-to-br from-[#fff0b8] via-[#ffcf3f] to-[#ff8d3f] p-5 text-[#17212b] shadow-xl shadow-[#ffcf3f]/15">
              <div className="absolute right-[-28px] top-[-28px] h-32 w-32 rounded-full border border-white/35 bg-white/18" />
              <div className="absolute bottom-5 right-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#081f2f]/75 shadow-lg" />
                <span className="h-1.5 w-24 rounded-full bg-[#081f2f]/20" />
                <span className="h-5 w-5 rounded-full bg-[#65f4e7] shadow-lg shadow-[#65f4e7]/40 transition group-hover:translate-x-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7d4418]">First promise</p>
              <h2 className="mt-4 max-w-sm font-display text-5xl leading-none tracking-wide">Learn English</h2>
              <p className="mt-4 max-w-md text-sm font-bold leading-7 text-[#3c2b1e]/78">
                Useful phrases appear while you choose, explain, ask, and react.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Choose', 'Explain', 'Ask', 'React'].map((word) => (
                  <span key={word} className="rounded-full border border-[#17212b]/15 bg-white/38 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]">
                    {word}
                  </span>
                ))}
              </div>
            </article>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {promiseTiles.slice(1).map(([title, copy], index) => {
                const tones = [
                  'from-[#65f4e7]/18 to-[#8fb7ff]/12 border-[#65f4e7]/22 text-[#65f4e7]',
                  'from-[#ff6fa1]/18 to-[#ffd1df]/12 border-[#ff6fa1]/22 text-[#ff9bbc]',
                  'from-[#b8ff72]/18 to-[#65f4e7]/12 border-[#b8ff72]/22 text-[#b8ff72]',
                ];
                return (
                  <article key={title} className={`relative min-h-[112px] overflow-hidden rounded-[1.35rem] border bg-gradient-to-br p-4 ${tones[index]}`}>
                    <span className="absolute right-4 top-4 h-12 w-12 rounded-full border border-current/25 opacity-60" />
                    <span className="absolute bottom-4 left-4 h-1.5 w-16 rounded-full bg-current/35" />
                    <p className="font-display text-2xl leading-none tracking-wide text-white">{title}</p>
                    <p className="mt-3 max-w-md text-xs font-semibold leading-5 text-white/66">{copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] p-4 shadow-2xl shadow-black/15">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,207,63,.10),transparent_36%,rgba(101,244,231,.10)_76%,transparent)]" />
          <div className="relative mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">How You Start</p>
              <h2 className="mt-2 font-display text-4xl leading-none md:text-5xl">A simple route into English.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/64">The game carries the session, so visitors always know what to do next.</p>
          </div>

          <div className="relative grid gap-3 md:grid-cols-4">
            <span className="absolute left-8 right-8 top-9 hidden h-1 rounded-full bg-white/10 md:block" />
          {beats.map(({ icon: Icon, label, title, copy }) => (
            <article key={title} className="group relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-[#081f2f]/64 p-4 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:bg-white/[0.1]">
              <span className="absolute right-[-20px] top-[-20px] h-20 w-20 rounded-full border border-white/10" />
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ffcf3f] text-xs font-black text-[#17212b] shadow-lg shadow-[#ffcf3f]/20">{label}</span>
                <Icon className="text-[#65f4e7]" size={22} />
              </div>
              <h3 className="mt-4 font-display text-3xl leading-none">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/66">{copy}</p>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffcf3f]">Choose Your Door</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">Every visitor needs a way in.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/68">Choose the doorway that fits you today. Each path leads to the same promise: useful English, real play, and a table that helps you speak.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {entryPaths.map(({ icon: Icon, title, audience, copy, action, section, tone, mascot, tag }) => (
            <button
              key={title}
              onClick={() => onNavigate(section)}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/14 bg-white/[0.07] p-4 text-left shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:border-white/35"
            >
              <span className={`glow-sweep absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
              <div className={`relative h-44 overflow-hidden rounded-[1.35rem] border border-white/12 bg-gradient-to-br ${tone} shadow-xl shadow-black/20`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,.65),transparent_28%),linear-gradient(145deg,rgba(8,31,47,.05),rgba(8,31,47,.72))]" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-[#081f2f]/36 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <Icon size={14} /> {tag}
                </div>
                <span className="absolute bottom-5 left-5 h-2 w-24 rounded-full bg-white/30" />
                <span className="token-step absolute bottom-8 left-8 h-5 w-5 rounded-full bg-[#fffaf0] shadow-lg shadow-white/35" />
                <img
                  src={mascot}
                  alt=""
                  className="absolute bottom-[-30px] right-[-26px] h-60 w-60 object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,.38)] transition duration-500 group-hover:-translate-y-3 group-hover:rotate-2 group-hover:scale-110"
                />
              </div>
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

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffcf3f]">Why It Feels Different</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            You are not practising English in the air. You are using it at the table.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            A board game gives the room a shared focus. You can point, choose, laugh, think, and try again. The English grows from what is happening in front of you.
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

      <section className="container-shell py-10">
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/15">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">What You Will Notice</p>
              <h2 className="mt-3 font-display text-5xl leading-none">The room changes when English has a job.</h2>
            </div>
            <div className="rounded-full border border-[#ffcf3f]/35 bg-[#ffcf3f]/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffcf3f]">
              Calm + Choice + Progress
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {magneticMoments.map(([title, copy], index) => (
              <article key={title} className="rounded-2xl border border-white/12 bg-[#081f2f]/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/38">Table moment {index + 1}</span>
                  {index % 3 === 0 ? <Flame size={18} className="text-[#ffcf3f]" /> : index % 3 === 1 ? <Compass size={18} className="text-[#65f4e7]" /> : <Zap size={18} className="text-[#ff6fa1]" />}
                </div>
                <h3 className="mt-4 font-display text-3xl leading-none">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-5 py-7 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/12 bg-[#fffaf0] p-7 text-[#17212b]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d87522]">Why It Works</p>
          <div className="mt-6 grid gap-4">
            {whyItWorks.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-[#efd39d] bg-white p-5">
                <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62584f]">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#65f4e7]">Ways To Join</p>
          <div className="mt-6 grid gap-4">
            {bookableWays.map(([title, copy], index) => (
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

      <section className="container-shell py-7">
        <div className="rounded-[2rem] border border-[#ffcf3f]/25 bg-[#fffaf0] p-7 text-[#17212b] shadow-2xl shadow-[#ffcf3f]/10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#d87522]">Your Session Path</p>
              <h2 className="mt-3 font-display text-5xl leading-none">From first hello to useful English you remember.</h2>
              <p className="mt-5 text-sm leading-7 text-[#62584f]">
                A session is designed to feel friendly, clear, and active. You do not need to be good at games or confident in English before you begin.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {sessionPath.map(([step, title, copy]) => (
                <article key={step} className="rounded-2xl border border-[#efd39d] bg-white p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d87522]">{step}</p>
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
