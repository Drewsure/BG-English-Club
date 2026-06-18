import { Award, Compass, Lightbulb, Users } from 'lucide-react';
import type { Language } from '../lib/i18n';
import { ui } from '../lib/i18n';

const copy = {
  en: {
    intro: 'Drew Smith is building a practical approach to language confidence: small tables, real decisions, useful phrases, and repeatable community sessions.',
    doctrine: [
      ['Philosophy', 'COMMUNITY and ENGLISH grow when people share a table: learning the rules, noticing each other, asking small questions, and building everyday confidence together.'],
      ['Vision', 'Create welcoming tables where adults, retirees, parents, and strategists can practise English through shared play.'],
      ['Method', 'The Board Game English Club approach turns board games into gentle language missions: choose a game, use one focus, play, and reflect.'],
    ],
    standards: ['Authentic Mastery', 'Cognitive Precision', 'Community Confidence', 'Gentle Progress'],
    standardCopy: [
      'Use English in a real situation, not only as a memorized classroom answer.',
      'Notice choices, rules, turns, and timing so the language has a clear purpose.',
      'Build comfort by speaking with people around a shared game.',
      'Record one small phrase or reflection, then return and try again.',
    ],
    quote: 'This is not about performing perfect English. It is about becoming comfortable enough to participate.',
    footer: 'Start small. Speak once. Build from there.',
  },
  ja: {
    intro: 'Drew Smith は、英語への自信を育てるために、小さなテーブル、実際の判断、使えるフレーズ、継続できる地域セッションを組み合わせています。',
    doctrine: [
      ['考え方', '同じテーブルでルールを確かめ、お互いの選択を見て、小さな質問を交わすことで、コミュニティと英語が一緒に育ちます。'],
      ['ビジョン', '大人、退職後の方、保護者、戦略ゲームが好きな人が、安心して英語を練習できるテーブルを作ります。'],
      ['方法', 'Board Game English Club の方法は、ボードゲームをやさしい英語ミッションに変えます。ゲームを選び、一つのフォーカスで遊び、ふり返ります。'],
    ],
    standards: ['本物の習得', '考える力', '地域の安心感', '小さな成長'],
    standardCopy: [
      '暗記した答えだけではなく、実際の場面で英語を使います。',
      '選択、ルール、順番、タイミングに気づき、英語に目的を持たせます。',
      '同じゲームを囲む人たちと話すことで、安心感を育てます。',
      '一つの表現やふり返りを残し、次のテーブルでもう一度試します。',
    ],
    quote: '完璧な英語を見せる場所ではありません。参加できる安心感を育てる場所です。',
    footer: '小さく始める。一度話す。そこから育てる。',
  },
} as const;

export function Dossier({ language }: { language: Language }) {
  const t = ui[language].dossier;
  const local = copy[language];
  const icons = [Lightbulb, Compass, Users];

  return (
    <main className="page-shell">
      <div className="tactical-banner h-32" />
      <div className="mx-auto max-w-5xl px-5 pb-16">
        <header className="-mt-10 text-center">
          <h1 className="compact-title">{t.title}</h1>
          <p className="mt-3 text-xs uppercase tracking-wide text-[#655b51]">{t.subtitle}</p>
        </header>
        <section className="reference-panel mt-10 grid gap-7 p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ea8a16] font-display text-2xl text-white">DS</span>
              <div>
                <h2 className="font-display text-2xl">Drew Smith</h2>
                <span className="rounded bg-[#fff0bc] px-2 py-1 text-[9px] font-bold text-[#bd6c17]">FOUNDER</span>
              </div>
            </div>
            <p className="mt-6 text-xs leading-6 text-[#61574d]">{local.intro}</p>
          </div>
          <div className="relative rounded-[2rem] border border-[#efc779] bg-[#fff8ea] p-3 shadow-2xl shadow-[#d87522]/10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f7c56d]/30 blur-2xl" />
            <div className="relative grid gap-3 sm:grid-cols-[1fr_0.52fr]">
              <figure className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-lg shadow-[#8c5c2a]/10 sm:row-span-2">
                <img
                  src="/images/drew-community-sakura.jpg"
                  alt={language === 'ja' ? '桜の下のDrew Smithのポートレート' : 'Drew Smith portrait under cherry blossoms'}
                  className="h-[26rem] w-full object-cover object-[48%_42%]"
                />
              </figure>
              <aside className="rounded-[1.4rem] border border-[#f2d7a4] bg-white/85 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d87522]">
                  {language === 'ja' ? 'Founder Note' : 'Founder Note'}
                </p>
                <p className="mt-3 font-display text-2xl leading-none tracking-wide text-[#3d332b]">
                  {language === 'ja' ? 'テーブルから始まる場所' : 'A Table First'}
                </p>
                <p className="mt-3 text-xs leading-6 text-[#62584f]">
                  {language === 'ja'
                    ? '完璧な英語を見せる場所ではありません。参加できる安心感を育てる場所です。'
                    : 'This is not about performing perfect English. It is about becoming comfortable enough to participate.'}
                </p>
              </aside>
              <aside className="rounded-[1.4rem] border border-[#f4c0cf] bg-[#fff8fb] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef3d66]">
                  {language === 'ja' ? 'Community' : 'Community'}
                </p>
                <p className="mt-3 text-xs font-bold leading-6 text-[#62584f]">
                  {language === 'ja'
                    ? 'ゲームを知ることは、コミュニティを知ることです。'
                    : 'Get to know a GAME, and you get to know a COMMUNITY.'}
                </p>
              </aside>
            </div>
          </div>
        </section>
        <div className="mt-6 space-y-5">
          {local.doctrine.map(([title, body], index) => {
            const Icon = icons[index];
            return (
              <section key={title}>
                <h2 className={`mb-2 flex items-center gap-2 font-display text-xl ${['text-[#eb8e1d]', 'text-[#3989ec]', 'text-[#24ac68]'][index]}`}><Icon size={18} />{title}</h2>
                <p className={`rounded-lg border bg-white/70 p-5 text-xs leading-6 text-[#61574d] ${['border-[#efc779]', 'border-[#b4d5fe]', 'border-[#9fe1bb]'][index]}`}>{body}</p>
              </section>
            );
          })}
        </div>
        <h2 className="mt-8 text-center font-display text-2xl text-[#b65923]">{t.standard}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {local.standards.map((title, index) => (
            <article key={title} className={`rounded border p-4 text-xs ${['border-[#efc779]', 'border-[#aed1ff]', 'border-[#dfc3fd]', 'border-[#a6e4c1]'][index]}`}>
              <strong className="block font-display text-base">{title}</strong>
              <span className="mt-2 block leading-5 text-[#62584f]">{local.standardCopy[index]}</span>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center font-display text-lg text-[#c86122]"><Award className="mr-2 inline" size={17} /> {local.footer}</p>
      </div>
    </main>
  );
}
