import { Briefcase, CalendarDays, Heart, Mail, MessageCircle, Sparkles, Users } from 'lucide-react';
import type { Language } from '../lib/i18n';

const themePlan = [
  ['Week 01', 'Predict And React', 'Handling surprise, uncertainty, and changing plans at the table.'],
  ['Week 02', 'Explain A Choice', 'Using “because” to make quiet decisions visible.'],
  ['Week 03', 'Ask A Useful Question', 'Turning confusion into a safe communication habit.'],
  ['Week 04', 'Small Talk With A Purpose', 'Using one table question to make conversation easier.'],
  ['Week 05', 'Ibasho And The Game Table', 'How a structured activity can help people feel they belong.'],
  ['Week 06', 'Turn-Taking As Team Culture', 'Why waiting, listening, and responding are real communication skills.'],
  ['Week 07', 'Memory Without Pressure', 'Using simple recall prompts after play without testing people.'],
  ['Week 08', 'Polite Disagreement', 'Practising “Maybe…” and “I see it differently…” through game choices.'],
  ['Week 09', 'Beginner Friendly Strategy Talk', 'How light strategy games give beginners a reason to speak.'],
  ['Week 10', 'After-Action Review', 'One useful phrase, one table moment, one next step.'],
  ['Week 11', 'Mixed-Age Tables', 'Why games can support intergenerational conversation in Japan.'],
  ['Week 12', 'From Play To Workshop', 'Turning a friendly table format into a corporate communication session.'],
];

const jaThemePlan = [
  ['第1週', '予想して反応する', '驚き、不確実さ、作戦変更を短い英語で扱う。'],
  ['第2週', '選択を説明する', '“because” を使い、静かな判断を見える形にする。'],
  ['第3週', '役に立つ質問をする', 'わからないことを安心して聞ける習慣に変える。'],
  ['第4週', '目的のあるスモールトーク', '一つの質問で会話を始めやすくする。'],
  ['第5週', '居場所とゲームテーブル', '構造のある活動が参加しやすさを作る理由。'],
  ['第6週', '順番を待つこととチーム文化', '待つ、聞く、反応する力を育てる。'],
  ['第7週', 'プレッシャーのない記憶', 'テストではなく、遊んだ後に自然に思い出す。'],
  ['第8週', 'やさしい意見の違い', '“Maybe…” や “I see it differently…” をゲームで練習する。'],
  ['第9週', '初心者向けの作戦英語', '軽い作戦ゲームが話す理由を作る。'],
  ['第10週', 'プレイ後のふり返り', '使えた表現、起きたこと、次の一歩を残す。'],
  ['第11週', '世代をこえるテーブル', '日本で多世代の会話を支えるゲームの使い方。'],
  ['第12週', '遊びから研修へ', '親しみやすいテーブル形式を企業コミュニケーションへ広げる。'],
];

export function WeeklyNote({ language }: { language: Language }) {
  const isJa = language === 'ja';
  const themes = isJa ? jaThemePlan : themePlan;

  return (
    <main className="page-shell">
      <section className="container-shell py-10">
        <div className="overflow-hidden rounded-[2rem] border border-[#efc779] bg-[#fffaf0] shadow-xl shadow-[#d87522]/10">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 md:p-9">
              <p className="eyebrow"><CalendarDays size={15} /> BG English Weekly Note</p>
              <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight tracking-wide text-[#2f2822] md:text-6xl">
                {isJa ? '予想して、反応する。' : 'Predict, React, And Keep Talking.'}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#62584f]">
                {isJa
                  ? '一つのゲーム、一つの英語スキル、一つの使い方。企業テーブルとシルバーサークルの両方で使える、週刊の読みものです。'
                  : 'One game idea, one English skill, and one practical use. A weekly page for corporate tables, Silver Circle sessions, and anyone building conversation through play.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#play" className="rule-button rule-button-primary px-5 py-3">
                  <MessageCircle size={15} /> {isJa ? 'Table Play Tool を開く' : 'Open Table Play Tool'}
                </a>
                <a href="mailto:ministarenglish@mail.com?subject=BG%20English%20Weekly%20Note%20Sponsorship" className="rule-button px-5 py-3">
                  <Mail size={15} /> {isJa ? 'スポンサー相談' : 'Sponsor This Note'}
                </a>
              </div>
            </div>
            <div className="min-h-[360px] bg-[#f7efe3]">
              <img src="/images/weekly-note/table-note-001.png" alt="" className="h-full min-h-[360px] w-full object-cover" />
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="reference-panel p-6">
            <p className="eyebrow">{isJa ? '今週の英語' : 'This Week’s English Expansion'}</p>
            <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">
              {isJa ? '“I changed my mind.”' : '“I changed my mind.”'}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#62584f]">
              {isJa
                ? 'この表現は、ゲーム中の小さな作戦変更を自然な英語に変えます。完璧な理由を言う必要はありません。「考えが変わりました」と言えるだけで、会話が続きます。'
                : 'This phrase turns a small strategy change into natural English. The learner does not need a perfect explanation. Saying “I changed my mind” keeps the conversation moving and makes thinking visible.'}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['First step', 'I think this will happen.'],
                ['Reaction', 'That surprised me.'],
                ['Change', 'I changed my mind.'],
              ].map(([label, phrase]) => (
                <div key={phrase} className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">{label}</p>
                  <p className="mt-2 font-display text-xl tracking-wide text-[#3d332b]">{phrase}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-dashed border-[#d8b676] bg-white p-6">
            <p className="eyebrow"><Sparkles size={15} /> {isJa ? 'スポンサー枠' : 'Sponsorship Space'}</p>
            <h2 className="font-display mt-2 text-3xl tracking-wide text-[#3d332b]">
              {isJa ? '地域のテーブルを支える場所' : 'A Place To Support Local Tables'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#62584f]">
              {isJa
                ? 'カフェ、企業、教育団体、地域活動の紹介枠として使えます。英語、交流、学びに合うスポンサーだけを掲載します。'
                : 'Reserved for a cafe, company, education partner, or community sponsor aligned with language learning, local connection, and thoughtful participation.'}
            </p>
            <div className="mt-5 rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#9a7560]">
              {isJa ? 'Sponsor Logo / Message' : 'Sponsor Logo / Message'}
            </div>
          </aside>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="reference-panel border-[#d8ead3] bg-[#f8fff5] p-6">
            <p className="eyebrow"><Briefcase size={15} /> {isJa ? '企業での使い方' : 'Application For Corporate Users'}</p>
            <h2 className="font-display mt-2 text-3xl tracking-wide text-[#2e7c44]">
              {isJa ? '変化に反応する練習' : 'Practise Response To Changing Information'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#4f6354]">
              {isJa
                ? '会議では、計画が変わることがあります。ゲームでは、その変化を安全に練習できます。「予想した」「驚いた」「考えが変わった」を短く言うことで、チーム内の発言がしやすくなります。'
                : 'Meetings often change direction. A game table gives teams a safe rehearsal space for saying what they expected, what surprised them, and why they changed direction. This supports clearer discussion without making the exercise feel like a test.'}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4f6354]">
              <li>Use before a planning meeting as a low-pressure warm-up.</li>
              <li>Ask each person for one prediction before a move.</li>
              <li>After the move, ask what changed and what they would try next.</li>
            </ul>
          </article>

          <article className="reference-panel border-[#ffbdce] bg-[#fff7fa] p-6">
            <p className="eyebrow"><Heart size={15} /> {isJa ? 'シルバーサークルでの使い方' : 'Application For Silver Circle Users'}</p>
            <h2 className="font-display mt-2 text-3xl tracking-wide text-[#ef3d66]">
              {isJa ? '安心して思い出し、話す' : 'Gentle Recall And Conversation'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#6b5960]">
              {isJa
                ? 'シニア向けのテーブルでは、正解を急がないことが大切です。予想して、結果を見て、少し反応するだけで、自然な会話になります。医療ではなく、楽しい参加と交流のための活動です。'
                : 'For older learners, the aim is not speed or correctness. Predicting, seeing what happens, and giving a small reaction creates gentle conversation. This is not medical care; it is a friendly structure for participation, memory, and social contact.'}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#6b5960]">
              <li>Use one phrase only, repeated several times.</li>
              <li>Let players point, smile, or answer in Japanese first if needed.</li>
              <li>Finish with one remembered phrase, not a quiz.</li>
            </ul>
          </article>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="reference-panel p-6">
            <p className="eyebrow"><Users size={15} /> {isJa ? '日本の活動視点' : 'Japanese Social Context'}</p>
            <h2 className="font-display mt-2 text-3xl tracking-wide text-[#bd5c24]">
              {isJa ? '構造があると参加しやすい' : 'Structure Makes Participation Easier'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#62584f]">
              {isJa
                ? '日本の場では、自由会話よりも「何をするか」が決まっている方が参加しやすいことがあります。ボードゲームは順番、役割、目的が見えるため、英語初心者にも入り口を作ります。'
                : 'In many Japanese community and workplace settings, open conversation can feel too vague. A board game gives the table visible structure: turns, roles, choices, and a shared object of attention. That structure lowers the pressure to “perform English.”'}
            </p>
          </article>

          <article className="reference-panel p-6">
            <p className="eyebrow"><CalendarDays size={15} /> {isJa ? '今後3か月のテーマ' : 'Next Three Months Of Themes'}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {themes.map(([week, title, detail]) => (
                <div key={`${week}-${title}`} className="rounded-xl border border-[#efd39d] bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">{week}</p>
                  <h3 className="mt-1 font-display text-xl tracking-wide text-[#3d332b]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#62584f]">{detail}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
