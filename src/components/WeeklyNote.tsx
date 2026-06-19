import { Briefcase, CalendarDays, Download, Heart, Lock, Mail, MessageCircle, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import type { Language } from '../lib/i18n';
import { BrandLogo } from './BrandLogo';

const staffPassword = 'BGE2026';

const yearThemes = [
  ['Jan W1', 'New Year Table Reset', 'Set one phrase, one game, and one table habit for the year.'],
  ['Jan W2', 'First-Turn Confidence', 'Use easy openings for new members after the holiday break.'],
  ['Jan W3', 'Explaining Rules Simply', 'Prepare short rules for mixed-level tables.'],
  ['Jan W4', 'Winter Focus And Listening', 'Use slower games to practise careful listening.'],
  ['Feb W1', 'Setsubun: Predict And React', 'Use prediction language around risk, luck, and surprise.'],
  ['Feb W2', 'Kind Feedback At The Table', 'Practise “That helped because...” for corporate and senior groups.'],
  ['Feb W3', 'Team Pairing Practice', 'Use two-player explanations before group discussion.'],
  ['Feb W4', 'Polite Disagreement', 'Use “Maybe...” and “I see it differently...” in strategy talk.'],
  ['Mar W1', 'Graduation Season: Next Step English', 'Frame progress notes around moving to the next stage.'],
  ['Mar W2', 'Explaining A Choice', 'Make quiet decisions visible with one “because” sentence.'],
  ['Mar W3', 'Spring Trial Tables', 'Create easy first-session formats for new families and companies.'],
  ['Mar W4', 'Sakura Walk-In Conversation', 'Use seasonal prompts for gentle social conversation.'],
  ['Apr W1', 'New School And Work Year', 'Use introductions and role language for new groups.'],
  ['Apr W2', 'Meeting Warm-Ups With Games', 'Convert a game turn into a short business warm-up.'],
  ['Apr W3', 'Ask A Useful Question', 'Make clarification feel normal and safe.'],
  ['Apr W4', 'Golden Week Planning', 'Practise suggestions, invitations, and simple plans.'],
  ['May W1', 'Hakata Dontaku: Community Tables', 'Connect festival energy to friendly participation language.'],
  ['May W2', 'Family Tables After Golden Week', 'Use parent-child recap prompts and simple praise.'],
  ['May W3', 'Corporate Reset: What Changed?', 'Use post-holiday reflection for planning conversations.'],
  ['May W4', 'Small Talk With A Purpose', 'Use one table question to avoid forced free conversation.'],
  ['Jun W1', 'Rainy Season Focus', 'Use indoor table sessions for slow, clear turn-taking.'],
  ['Jun W2', 'Memory Without Pressure', 'Use recall prompts gently, never as a quiz.'],
  ['Jun W3', 'Listening Before Speaking', 'Practise “So you mean...” and confirmation phrases.'],
  ['Jun W4', 'Mid-Year Progress Notes', 'Review useful phrases from the first half of the year.'],
  ['Jul W1', 'Hakata Gion Yamakasa: Team Timing', 'Use timing, urgency, and role language around teamwork.'],
  ['Jul W2', 'Fast Turns, Clear Words', 'Practise short phrases in quicker games.'],
  ['Jul W3', 'Summer Workshop Format', 'Prepare company or community summer sessions.'],
  ['Jul W4', 'Heat-Friendly Gentle Tables', 'Design lower-energy activities for hot days.'],
  ['Aug W1', 'Obon: Family Conversation', 'Use memory, family, and travel prompts carefully.'],
  ['Aug W2', 'Intergenerational Tables', 'Support older and younger players sharing one activity.'],
  ['Aug W3', 'Travel And Direction Language', 'Use map and route games for practical English.'],
  ['Aug W4', 'End-Of-Summer Review', 'Choose one phrase to carry into autumn.'],
  ['Sep W1', 'Disaster Preparedness Day: Clear Instructions', 'Practise calm instruction language through cooperative games.'],
  ['Sep W2', 'Hojoya: Market And Choice Language', 'Use offers, preferences, and “I’ll take...” phrases.'],
  ['Sep W3', 'Respect For The Aged Day', 'Feature Silver Circle, belonging, and gentle participation.'],
  ['Sep W4', 'Asian Party Season: Cross-Cultural Tables', 'Use games to practise introductions and cultural curiosity.'],
  ['Oct W1', 'Sports Day: Fair Play English', 'Practise encouragement, rules, and good-humored competition.'],
  ['Oct W2', 'Autumn Strategy Talk', 'Use deeper games for planning and trade-off language.'],
  ['Oct W3', 'Psychological Safety At Work', 'Practise asking, correcting, and suggesting safely.'],
  ['Oct W4', 'Halloween: Guessing And Describing', 'Use light deduction games for description and prediction.'],
  ['Nov W1', 'Culture Day: Games As Culture', 'Connect go, shogi, karuta, and modern board games.'],
  ['Nov W2', 'Corporate Planning Season', 'Use game reviews as a model for meeting review.'],
  ['Nov W3', 'Labor Thanksgiving: Appreciation Phrases', 'Practise thanks, recognition, and contribution language.'],
  ['Nov W4', 'Year-End Workshop Offers', 'Promote team tables and sponsor-supported sessions.'],
  ['Dec W1', 'Bonenkai Without Pressure', 'Use games as a relaxed alternative to forced networking.'],
  ['Dec W2', 'Best Phrase Of The Year', 'Collect useful phrases from members and groups.'],
  ['Dec W3', 'Holiday Family Tables', 'Offer easy print-and-play English prompts.'],
  ['Dec W4', 'Year-End Reflection', 'One game, one phrase, one next table for the new year.'],
  ['Flex 01', 'New Game Briefing Release', 'Use when a new game card is added.'],
  ['Flex 02', 'Sponsor Spotlight', 'Use when a local partner supports a table.'],
  ['Flex 03', 'Weather Delay / Indoor Activity', 'Use during typhoon, heavy rain, or schedule changes.'],
  ['Flex 04', 'Member Story', 'Use when a learner or company has a good table moment.'],
];

const jaYearThemes = [
  ['1月 第1週', '新年のテーブルリセット', '今年の表現、ゲーム、テーブル習慣を一つずつ決める。'],
  ['1月 第2週', '最初の一手の安心感', '休み明けの新しい参加者に使いやすい始め方を用意する。'],
  ['1月 第3週', 'ルールを短く説明する', 'レベルが混ざるテーブルのために短い説明を準備する。'],
  ['1月 第4週', '冬の集中とリスニング', 'ゆっくりしたゲームで聞く力を練習する。'],
  ['2月 第1週', '節分：予想して反応する', 'リスク、運、驚きを予想する英語にする。'],
  ['2月 第2週', 'やさしいフィードバック', '企業やシニアの場で「助かりました」を自然に言う。'],
  ['2月 第3週', 'ペアで説明する練習', '全体で話す前に二人で説明を試す。'],
  ['2月 第4週', 'ていねいな意見の違い', '“Maybe...” や “I see it differently...” を作戦会話で使う。'],
  ['3月 第1週', '卒業シーズン：次の一歩', '進捗メモを次のステージにつなげる。'],
  ['3月 第2週', '選択を説明する', '静かな判断を “because” の一文で見える形にする。'],
  ['3月 第3週', '春の体験テーブル', '新しい家族や企業向けの初回形式を作る。'],
  ['3月 第4週', '桜の会話', '季節の話題でやさしい交流を始める。'],
  ['4月 第1週', '新年度の自己紹介', '新しいグループで自己紹介と役割の英語を使う。'],
  ['4月 第2週', '会議前のゲームウォームアップ', '一つの手番を短いビジネス会話に変える。'],
  ['4月 第3週', '役に立つ質問をする', '確認することを自然で安心な習慣にする。'],
  ['4月 第4週', 'ゴールデンウィーク計画', '提案、誘い、予定の英語を練習する。'],
  ['5月 第1週', '博多どんたく：地域テーブル', '祭りの参加感をやさしい英語につなげる。'],
  ['5月 第2週', '連休後のファミリーテーブル', '親子のふり返りと短いほめ言葉を使う。'],
  ['5月 第3週', '企業リセット：何が変わった？', '連休後のふり返りを計画会話にする。'],
  ['5月 第4週', '目的のあるスモールトーク', '一つの質問で自由会話の負担を下げる。'],
  ['6月 第1週', '梅雨の集中', '室内テーブルでゆっくり明確な順番練習をする。'],
  ['6月 第2週', 'プレッシャーのない記憶', 'クイズではなく、やさしく思い出す形にする。'],
  ['6月 第3週', '話す前に聞く', '“So you mean...” など確認表現を練習する。'],
  ['6月 第4週', '半年の進捗メモ', '半年で使えた表現をふり返る。'],
  ['7月 第1週', '博多祇園山笠：チームのタイミング', 'チームワークの役割、急ぎ、タイミングを英語にする。'],
  ['7月 第2週', '速い手番、短い英語', 'テンポの速いゲームで短い表現を使う。'],
  ['7月 第3週', '夏のワークショップ形式', '企業や地域向けの夏セッションを準備する。'],
  ['7月 第4週', '暑い日のやさしいテーブル', '暑さに合わせて低負担の活動にする。'],
  ['8月 第1週', 'お盆：家族の会話', '思い出、家族、移動の話題をていねいに扱う。'],
  ['8月 第2週', '世代をこえるテーブル', '年上と年下が一つの活動を共有できる形にする。'],
  ['8月 第3週', '旅行と道案内の英語', '地図や移動のゲームで実用英語を使う。'],
  ['8月 第4週', '夏の終わりのふり返り', '秋に持っていく一つの表現を選ぶ。'],
  ['9月 第1週', '防災の日：明確な指示', '協力ゲームで落ち着いた指示表現を練習する。'],
  ['9月 第2週', '放生会：市場と選択の英語', '好み、選択、買い物の表現を扱う。'],
  ['9月 第3週', '敬老の日', 'Silver Circle、居場所、やさしい参加を紹介する。'],
  ['9月 第4週', 'アジアンパーティーの季節', '自己紹介と文化への関心をゲームで練習する。'],
  ['10月 第1週', 'スポーツの日：フェアプレイ英語', '応援、ルール、気持ちよい競争の表現を使う。'],
  ['10月 第2週', '秋の作戦会話', '深めのゲームで計画と選択の理由を話す。'],
  ['10月 第3週', '職場の心理的安全性', '質問、訂正、提案を安心して言う練習をする。'],
  ['10月 第4週', 'ハロウィン：推測と描写', '軽い推理ゲームで説明と予想を使う。'],
  ['11月 第1週', '文化の日：ゲームと文化', '囲碁、将棋、かるた、現代ボードゲームをつなげる。'],
  ['11月 第2週', '企業の計画シーズン', 'ゲーム後レビューを会議後レビューの型にする。'],
  ['11月 第3週', '勤労感謝：感謝の表現', 'ありがとう、貢献、認める言葉を練習する。'],
  ['11月 第4週', '年末ワークショップ案内', 'チームテーブルとスポンサー支援セッションを案内する。'],
  ['12月 第1週', '忘年会を低プレッシャーに', '強制的な交流の代わりにゲームを使う。'],
  ['12月 第2週', '今年のベスト表現', 'メンバーやグループから使えた表現を集める。'],
  ['12月 第3週', '冬休みのファミリーテーブル', '印刷して使えるやさしい英語プロンプトを出す。'],
  ['12月 第4週', '年末のふり返り', '一つのゲーム、一つの表現、次のテーブルを選ぶ。'],
  ['予備 01', '新しいゲームブリーフィング', '新しいゲームカードを追加した時に使う。'],
  ['予備 02', 'スポンサー紹介', '地域パートナーがテーブルを支援した時に使う。'],
  ['予備 03', '天候変更・室内活動', '台風、大雨、予定変更の時に使う。'],
  ['予備 04', 'メンバーストーリー', '学習者や企業の良いテーブル場面を紹介する。'],
];

const maintenanceItems = [
  'Choose one focus: Corporate, Silver Circle, Family, or Briefing Card.',
  'Confirm timing: local event, national holiday, school/work season, or weather season.',
  'Update title, hero image, English phrase, corporate block, Silver Circle block, and sponsor slot.',
  'Create English email version, Japanese email version, English PDF, and Japanese PDF.',
  'Add one Table Play Tool call-to-action and one contact/sponsor call-to-action.',
  'Check mobile layout, print layout, links, and Japanese text before publishing.',
];

const automationSteps = [
  'Every Monday: draft Weekly Note topic from the yearly theme calendar.',
  'Every Tuesday: generate or select one feature image and sponsor placeholder.',
  'Every Wednesday: produce English/Japanese email copy and PDF downloads.',
  'Every Thursday: publish page update and check Table Play / sponsor links.',
  'Every Friday: post or send the Weekly Note and record sponsor/community follow-up.',
];

export function WeeklyNote({ language }: { language: Language }) {
  const isJa = language === 'ja';
  const [staffInput, setStaffInput] = useState('');
  const [staffOpen, setStaffOpen] = useState(false);
  const themes = isJa ? jaYearThemes : yearThemes;
  const mailSubject = isJa ? 'BG English Weekly Note 日本語版希望' : 'BG English Weekly Note email request';
  const mailBody = isJa
    ? 'BG English Weekly Note をメールで受け取りたいです。\n\nお名前：\n英語 / 日本語：\n企業 / Silver Circle / 個人：'
    : 'I would like to receive the BG English Weekly Note by email.\n\nName:\nEnglish / Japanese:\nCorporate / Silver Circle / Individual:';

  const unlockStaff = () => {
    if (staffInput.trim() === staffPassword) setStaffOpen(true);
  };

  return (
    <main className="page-shell">
      <section className="container-shell py-10">
        <div className="overflow-hidden rounded-[2rem] border border-[#efc779] bg-[#fffaf0] shadow-xl shadow-[#d87522]/10">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-4">
                <BrandLogo compact />
                <div>
                  <p className="eyebrow"><CalendarDays size={15} /> {isJa ? '週刊ニュースレター' : 'Weekly Newsletter'}</p>
                  <h1 className="mt-1 font-display text-4xl leading-tight tracking-wide text-[#2f2822] md:text-5xl">
                    BG English Weekly Table Note
                  </h1>
                </div>
              </div>
              <h2 className="mt-8 max-w-3xl font-display text-4xl leading-tight tracking-wide text-[#bd5c24] md:text-5xl">
                {isJa ? '予想して、反応する。' : 'Predict, React, And Keep Talking.'}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#62584f]">
                {isJa
                  ? '一つのゲーム、一つの英語スキル、一つの使い方。企業テーブルとシルバーサークルの両方で使える、週刊の読みものです。'
                  : 'One game idea, one English skill, and one practical use. A weekly note for corporate tables, Silver Circle sessions, and anyone building conversation through play.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#play" className="rule-button rule-button-primary px-5 py-3">
                  <MessageCircle size={15} /> {isJa ? 'Table Play Tool を開く' : 'Open Table Play Tool'}
                </a>
                <a href={`mailto:ministarenglish@mail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`} className="rule-button px-5 py-3">
                  <Mail size={15} /> {isJa ? 'メールで受け取る' : 'Get By Email'}
                </a>
                <a href="/downloads/bg-english-weekly-note-001-en.pdf" download className="rule-button px-5 py-3">
                  <Download size={15} /> English PDF
                </a>
                <a href="/downloads/bg-english-weekly-note-001-ja.pdf" download className="rule-button px-5 py-3">
                  <Download size={15} /> 日本語PDF
                </a>
              </div>
            </div>
            <div className="min-h-[360px] bg-[#f7efe3]">
              <img src="/images/weekly-note/table-note-001.png" alt="" className="h-full min-h-[360px] w-full object-cover" />
            </div>
          </div>
        </div>

        <section className="mt-8">
          <article className="reference-panel p-6">
            <p className="eyebrow">{isJa ? '今週の英語' : 'This Week’s English Expansion'}</p>
            <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">“I changed my mind.”</h2>
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
              Sponsor Logo / Message
            </div>
          </aside>
        </section>

        <section className="reference-panel mt-8 p-6">
          <p className="eyebrow"><Lock size={15} /> Staff Zone</p>
          <h2 className="font-display mt-2 text-3xl tracking-wide text-[#3d332b]">
            {isJa ? '年間テーマと運用メモ' : 'Year Themes And Production Notes'}
          </h2>
          {!staffOpen ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                value={staffInput}
                onChange={(event) => setStaffInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') unlockStaff();
                }}
                type="password"
                placeholder={isJa ? 'スタッフパスワード' : 'Staff password'}
                className="min-w-0 flex-1 rounded-xl border border-[#efd39d] bg-white px-4 py-3 text-sm outline-none focus:border-[#d87522]"
              />
              <button onClick={unlockStaff} className="rule-button rule-button-primary px-5 py-3">
                <Lock size={14} /> {isJa ? '開く' : 'Unlock'}
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4">
                  <p className="font-display text-2xl tracking-wide text-[#bd5c24]">{isJa ? '維持する要素' : 'Newsletter Elements To Maintain'}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#62584f]">
                    {maintenanceItems.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#b9d2fb] bg-[#f7fbff] p-4">
                  <p className="font-display text-2xl tracking-wide text-[#366eb4]">{isJa ? '自動化手順' : 'Procedural Automation Measures'}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4d5f75]">
                    {automationSteps.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div>
                <p className="font-display text-2xl tracking-wide text-[#bd5c24]">{isJa ? '年間テーマ' : 'One Year Of Themes'}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {themes.map(([week, title, detail]) => (
                    <div key={`${week}-${title}`} className="rounded-xl border border-[#efd39d] bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#d87522]">{week}</p>
                      <h3 className="mt-1 font-display text-xl tracking-wide text-[#3d332b]">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-[#62584f]">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
