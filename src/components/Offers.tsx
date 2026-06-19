import { ArrowRight, BookOpen, Briefcase, CalendarDays, CheckCircle2, Crown, Download, FileText, Heart, Mail, Sparkles, Users } from 'lucide-react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { mailtoForProgram, programs } from '../lib/programs';

const contactEmail = 'ministarenglish@mail.com';

function mailto(subject: string, body: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const copy = {
  en: {
    eyebrow: 'Choose Your Table',
    title: 'Find The Right Board Game English Session',
    subtitle: 'Choose a friendly table for your age, group, goal, or organization. Every option is built around simple English, real play, and a clear next step.',
    primary: 'Ask About A Session',
    emailFallback: 'This opens your email app. If nothing opens, email:',
    secondary: 'See Weekly Briefings',
    partnersCta: 'Corporate + Sponsor Offers',
    best: 'Not sure where to start?',
    bestCopy: 'Start with a trial table if you are new, Kids & Families for a relaxed family session, Silver Circle for a gentle senior group, Strategy Coaching for deeper adult practice, or Corporate Workshops for teams and organizations.',
    productsTitle: 'Programs You Can Book',
    briefingOnboardingTitle: 'BG English Club Briefing Onboarding',
    briefingOnboardingCopy: 'A simple path for teachers, parents, and game groups: try one sample first, then join the monthly briefing group for the current guide library and new cards as they become available.',
    briefingDownload: 'Download Free Sample PDF',
    briefingJoin: 'Join Briefing Group - ¥500 / month',
    briefingSteps: [
      ['1', 'Download one free PDF', 'Try a complete BG English Club Briefing before joining.'],
      ['2', 'Join the briefing group', 'Get access to currently available cards for ¥500 / month.'],
      ['3', 'Receive new cards', 'New game briefing cards are added regularly.'],
      ['4', 'Use them at the table', 'Print, teach, play, and build practical English around each game.'],
    ],
    funnelTitle: 'How Participation Can Grow',
    funnelCopy: 'Begin with one friendly table. If it fits, continue into regular sessions, a family group, Silver Circle, private coaching, or a workshop for your organization.',
    partnerTitle: 'Good Fits For Groups',
    partnerCopy: 'Board Game English Club can work well for community halls, senior groups, schools, family programs, cafes, libraries, and English teachers who want a ready-made table activity.',
    products: [
      {
        icon: Heart,
        name: 'BG English Club: Silver Circle',
        price: '¥3,000 / month (2 sessions)',
        audience: 'Seniors, retired adults',
        value: 'Gentle English board game sessions for conversation, confidence, and community participation.',
        cta: 'Ask about Silver Circle',
        subject: 'Silver Circle membership',
        body: 'I am interested in Silver Circle membership.\n\nName:\nPreferred area/day:\nQuestions:',
        bullets: ['Gentle pace', 'Japanese support available', 'Small recurring group'],
      },
      {
        icon: Users,
        name: 'BG English Club: Kids & Families',
        price: '¥2,000 / session / person',
        audience: 'Beginners, parents, casual learners',
        value: 'A friendly family table where children, parents, and beginners learn practical English while playing simple games.',
        cta: 'Book a trial table',
        subject: 'English game table trial',
        body: 'I would like to try an English game table.\n\nName:\nNumber of people:\nPreferred date:',
        bullets: ['Beginner friendly', 'Parent-child welcome', 'Simple games first'],
      },
      {
        icon: Crown,
        name: 'BG English Club: Strategy Coaching',
        price: 'From ¥12,000 / session (+ per-person pricing)',
        audience: 'Adults, executives, advanced learners',
        value: 'One-to-one or small-group English practice using strategic games, briefing cards, and review notes.',
        cta: 'Request coaching',
        subject: 'Private strategy English coaching',
        body: 'I am interested in private strategy English coaching.\n\nName:\nGoal:\nPreferred time:',
        bullets: ['Focused adult practice', 'Strategy-based English', 'Clear review notes'],
      },
      {
        icon: Briefcase,
        name: 'BG English Club: Corporate Workshops',
        price: 'From ¥20,000 (+ per-person pricing)',
        audience: 'Companies, schools, community halls, libraries, cafes',
        value: 'A prepared English-through-games workshop for communication, teamwork, facilitation, phrase practice, and a simple session flow.',
        cta: 'Plan a workshop',
        subject: 'Workshop booking inquiry',
        body: 'I would like to discuss a BG English Club corporate or community workshop.\n\nOrganization:\nAudience:\nPossible date:\nBudget:',
        bullets: ['Team communication', 'Soft-skill practice', 'Bilingual facilitation available'],
      },
      {
        icon: BookOpen,
        name: 'BG English Club Briefing',
        price: '¥500 / month',
        audience: 'Teachers, parents, game groups',
        value: 'Download one free sample PDF, then join the briefing group for current cards and new cards as they become available.',
        cta: 'Join briefing group',
        subject: 'Join BG English Club Briefing',
        body: 'I would like to join BG English Club Briefing for ¥500 / month.\n\nName:\nI am a teacher / parent / game group:\nHow I plan to use the briefings:',
        bullets: ['One free sample PDF', 'Updated weekly', 'Printable table aids'],
      },
      {
        icon: CalendarDays,
        name: 'Seasonal Event Table',
        price: 'From ¥2,000 / person',
        audience: 'Families, groups, local events',
        value: 'A themed event such as beginner game night, parent-child English game day, or Silver Circle open table.',
        cta: 'Discuss an event',
        subject: 'Seasonal event table',
        body: 'I would like to discuss a seasonal event table.\n\nGroup size:\nTheme:\nPreferred date:',
        bullets: ['Good for groups', 'Seasonal themes', 'Easy first event'],
      },
    ],
    ladder: [
      ['Try', 'Join a trial table or read a free briefing card first'],
      ['Play', 'Choose a family, adult, Silver Circle, or group session'],
      ['Continue', 'Return for regular sessions or a monthly Silver Circle rhythm'],
      ['Deepen', 'Use Strategy Coaching or a team workshop for focused goals'],
      ['Bring It Home', 'Use printable briefing cards between sessions'],
    ],
    partners: ['Community halls', 'Senior groups', 'Libraries', 'Schools', 'Cafes', 'English teachers', 'Family programs', 'Local wellness groups'],
    programDetailsTitle: 'Program Details',
    programDetailsCopy: 'Compare the options clearly: who each session is for, what you will do, where it can happen, what it costs, and how to ask about booking.',
    detailLabels: {
      audience: 'Audience',
      outcome: 'Outcome',
      price: 'Price',
      location: 'Location',
      schedule: 'Schedule',
      proof: 'Proof',
      faq: 'Quick FAQ',
    },
  },
  ja: {
    eyebrow: 'あなたに合うテーブルを選ぶ',
    title: '目的に合う英語ボードゲームセッション',
    subtitle: '年齢、グループ、目的、団体に合わせて選べます。どのプログラムも、やさしい英語・実際の遊び・明確な次の一歩を大切にしています。',
    primary: 'セッションについて相談する',
    emailFallback: 'メールアプリが開きます。開かない場合はこちらへ：',
    secondary: '週刊ブリーフィングを見る',
    partnersCta: '企業・スポンサー提案',
    best: 'どこから始める？',
    bestCopy: '初めてなら体験テーブル、家族なら Kids & Families、シニア向けなら Silver Circle、大人の深い練習なら Strategy Coaching、団体なら Corporate Workshops がおすすめです。',
    productsTitle: '予約できるプログラム',
    briefingOnboardingTitle: 'BG English Club Briefing の始め方',
    briefingOnboardingCopy: '英語講師、保護者、ゲーム会向けのシンプルな流れです。まず無料サンプルを試し、その後は月 ¥500 のグループで現在のカードと追加される新しいカードを受け取れます。',
    briefingDownload: '無料サンプルPDFをダウンロード',
    briefingJoin: 'ブリーフィンググループに参加 - 月 ¥500',
    briefingSteps: [
      ['1', '無料PDFを1つ試す', '参加前に BG English Club Briefing の形を確認できます。'],
      ['2', 'グループに参加する', '月 ¥500 で現在公開中のカードにアクセスできます。'],
      ['3', '新しいカードを受け取る', '新しいゲーム別ブリーフィングが定期的に追加されます。'],
      ['4', 'テーブルで使う', '印刷して、教えて、遊んで、実用的な英語につなげます。'],
    ],
    funnelTitle: '参加の広がり方',
    funnelCopy: 'まずは一つのやさしいテーブルから。合えば、定期セッション、親子グループ、Silver Circle、個別コーチング、団体ワークショップへ進めます。',
    partnerTitle: '団体にも合います',
    partnerCopy: '公民館、シニア団体、学校、親子プログラム、カフェ、図書館、英語講師など、すぐ使えるテーブル活動を探している場所に向いています。',
    products: [
      {
        icon: Heart,
        name: 'BG English Club: Silver Circle',
        price: '月 ¥3,000（2回）',
        audience: 'シニア、退職後の方',
        value: '英語ボードゲームを通じて、会話・自信・地域参加を支えるやさしいセッションです。',
        cta: 'Silver Circle を相談する',
        subject: 'Silver Circle 月会費について',
        body: 'Silver Circle に興味があります。\n\nお名前：\n希望地域・曜日：\n質問：',
        bullets: ['やさしいペース', '日本語サポート可', '少人数の定期グループ'],
      },
      {
        icon: Users,
        name: 'BG English Club: Kids & Families',
        price: '1回 1人 ¥2,000',
        audience: '初心者、保護者、気軽に学びたい方',
        value: 'シンプルなゲームを遊びながら、実用的な英語を少しずつ使う参加しやすいテーブルです。',
        cta: '体験を予約する',
        subject: '英語ゲームテーブル体験',
        body: '英語ゲームテーブルを体験したいです。\n\nお名前：\n人数：\n希望日：',
        bullets: ['初心者歓迎', '親子参加歓迎', 'シンプルなゲームから'],
      },
      {
        icon: Crown,
        name: 'BG English Club: Strategy Coaching',
        price: '1回 ¥12,000 から（人数追加料金あり）',
        audience: '大人、経営者、中上級者',
        value: '戦略ゲーム、ブリーフィングカード、振り返りを使った個別または少人数の英語練習です。',
        cta: '個別相談する',
        subject: '個別ストラテジー英語について',
        body: '個別ストラテジー英語に興味があります。\n\nお名前：\n目標：\n希望時間：',
        bullets: ['大人向け集中練習', '戦略ゲームで英語', '振り返りメモ付き'],
      },
      {
        icon: Briefcase,
        name: 'BG English Club: Corporate Workshops',
        price: '¥20,000 から（人数追加料金あり）',
        audience: '企業、学校、公民館、図書館、カフェ',
        value: 'コミュニケーション、チームワーク、英語フレーズ、進行表を含む英語ボードゲームのワークショップです。',
        cta: 'ワークショップ相談',
        subject: 'ワークショップ相談',
        body: 'BG English Club の企業・地域ワークショップについて相談したいです。\n\n団体名：\n対象者：\n希望日：\n予算：',
        bullets: ['チーム会話', 'ソフトスキル練習', '日本語サポート可'],
      },
      {
        icon: BookOpen,
        name: 'BG English Club Briefing',
        price: '月 ¥500',
        audience: '英語講師、保護者、ゲーム会',
        value: '無料サンプルPDFを1つ試し、その後は現在のカードと毎週の新作を受け取れるグループに参加できます。',
        cta: 'グループに参加する',
        subject: 'BG English Club Briefing 参加希望',
        body: '月 ¥500 の BG English Club Briefing に参加したいです。\n\nお名前：\n英語講師 / 保護者 / ゲーム会：\n使い方：',
        bullets: ['無料サンプルPDFあり', '毎週更新', '印刷用テーブル教材'],
      },
      {
        icon: CalendarDays,
        name: '季節イベントテーブル',
        price: '1人 ¥2,000 から',
        audience: '家族、グループ、地域イベント',
        value: '初心者ゲーム会、親子英語ゲームデー、Silver Circle 体験会などのテーマ型イベントです。',
        cta: 'イベント相談',
        subject: '季節イベントテーブルについて',
        body: '季節イベントテーブルについて相談したいです。\n\n人数：\nテーマ：\n希望日：',
        bullets: ['グループ向き', '季節テーマ可', '初回イベントに使いやすい'],
      },
    ],
    ladder: [
      ['試す', '体験テーブルや無料ブリーフィングから始める'],
      ['遊ぶ', '親子、大人、Silver Circle、団体セッションを選ぶ'],
      ['続ける', '定期セッションや月2回の Silver Circle へ'],
      ['深める', 'Strategy Coaching や団体ワークショップで目的に集中する'],
      ['持ち帰る', '印刷用ブリーフィングカードで復習する'],
    ],
    partners: ['公民館', 'シニア団体', '図書館', '学校', 'カフェ', '英語講師', '親子プログラム', '地域ウェルネス団体'],
    programDetailsTitle: 'プログラム詳細',
    programDetailsCopy: '対象者、内容、場所、料金、日程、予約方法を比べやすくまとめています。自分やグループに合うテーブルを選んでください。',
    detailLabels: {
      audience: '対象者',
      outcome: '得られること',
      price: '料金',
      location: '場所',
      schedule: '日程',
      proof: '安心材料',
      faq: 'よくある質問',
    },
  },
} as const;

export function Offers({ language, onNavigate }: { language: Language; onNavigate: (section: Section) => void }) {
  const t = copy[language];
  const detailPrograms = programs.map((program, index) => {
    const product = t.products[index];
    if (language !== 'ja' || !product) return program;
    return {
      ...program,
      name: product.name,
      shortName: product.name,
      answer: product.value,
      audience: product.audience,
      outcome: product.value,
      price: product.price,
      location: '福岡市内・オンライン相談可',
      schedule: 'お問い合わせ後に調整します。',
      bookingAction: product.cta,
      subject: product.subject,
      body: product.body,
      proof: product.bullets.join(' / '),
      faq: [
        { question: '初心者でも大丈夫ですか？', answer: 'はい。日本語サポートと、短い英語から始める進行があります。' },
        { question: 'どうやって予約しますか？', answer: 'ボタンからメールで希望内容を送ってください。日程と人数を相談します。' },
      ],
    };
  });
  const generalLink = mailto(
    language === 'ja' ? 'Board Game English Club セッション相談' : 'Board Game English Club session inquiry',
    language === 'ja' ? 'Board Game English Club のセッションについて相談したいです。\n\nお名前：\n興味のある内容：\n希望日：' : 'I would like to ask about a Board Game English Club session.\n\nName:\nOffer I am interested in:\nPreferred date:'
  );

  return (
    <main className="page-shell">
      <header className="tactical-banner py-14 text-center">
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="compact-title mt-2">{t.title}</h1>
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#71685d]">{t.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={generalLink} className="rule-button rule-button-primary px-7 py-3"><Mail size={14} /> {t.primary}</a>
          <button onClick={() => onNavigate('briefings')} className="rule-button px-7 py-3"><BookOpen size={14} /> {t.secondary}</button>
          <button onClick={() => onNavigate('partnerships')} className="rule-button px-7 py-3"><Briefcase size={14} /> {t.partnersCta}</button>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#62584f]">
          {t.emailFallback} <a href={`mailto:${contactEmail}`} className="text-[#bd5c24] underline decoration-[#efc779] underline-offset-4">{contactEmail}</a>
        </p>
      </header>

      <section className="container-shell py-10">
        <article className="reference-panel grid gap-5 p-6 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <Sparkles className="text-[#d87522]" size={30} />
            <h2 className="font-display mt-4 text-3xl tracking-wide text-[#bd5c24]">{t.best}</h2>
          </div>
          <p className="text-sm leading-7 text-[#62584f]">{t.bestCopy}</p>
        </article>

        <h2 className="font-display mt-12 text-center text-4xl tracking-wide text-[#bd5c24]">{t.productsTitle}</h2>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {t.products.map((product) => {
            const Icon = product.icon;
            const link = mailto(product.subject, product.body);
            return (
              <article key={product.name} className="reference-panel flex flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="text-[#d87522]" size={27} />
                  <span className="rounded-full border border-[#efd39d] bg-[#fff8ea] px-3 py-1 text-xs font-bold text-[#bd5c24]">{product.price}</span>
                </div>
                <h3 className="font-display mt-5 text-2xl tracking-wide text-[#3d332b]">{product.name}</h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#9a7560]">{product.audience}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#62584f]">{product.value}</p>
                <div className="mt-5 grid gap-2">
                  {product.bullets.map((bullet) => (
                    <p key={bullet} className="text-xs leading-5 text-[#5f675c]"><CheckCircle2 className="mr-2 inline text-[#35a765]" size={14} />{bullet}</p>
                  ))}
                </div>
                <a href={link} className="rule-button rule-button-primary mt-6 justify-center py-3">
                  {product.cta} <ArrowRight size={13} />
                </a>
              </article>
            );
          })}
        </div>

        <section id="briefing-onboarding" className="mt-10 overflow-hidden rounded-[2rem] border border-[#f2c987] bg-gradient-to-br from-[#fff8ea] via-white to-[#fff3f7] shadow-xl shadow-[#d87522]/10">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-[#f2c987] p-7 lg:border-b-0 lg:border-r">
              <p className="eyebrow"><BookOpen size={15} /> BG English Club Briefing</p>
              <h2 className="font-display mt-3 text-4xl tracking-wide text-[#bd5c24]">{t.briefingOnboardingTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-[#62584f]">{t.briefingOnboardingCopy}</p>
              <div className="mt-6 grid gap-3">
                <a
                  href="/downloads/bg-english-club-briefing-sample.pdf"
                  download
                  className="rule-button rule-button-primary justify-center py-3"
                >
                  <Download size={14} /> {language === 'ja' ? '英語PDFをダウンロード' : 'Download English PDF'}
                </a>
                <a
                  href="/downloads/bg-english-club-briefing-sample-ja.pdf"
                  download
                  className="rule-button justify-center py-3"
                >
                  <Download size={14} /> {language === 'ja' ? '日本語PDFをダウンロード' : 'Download Japanese PDF'}
                </a>
                <a
                  href={mailto(
                    language === 'ja' ? 'BG English Club Briefing 参加希望' : 'Join BG English Club Briefing',
                    language === 'ja'
                      ? '月 ¥500 の BG English Club Briefing に参加したいです。\n\nお名前：\n英語講師 / 保護者 / ゲーム会：\n使い方：'
                      : 'I would like to join BG English Club Briefing for ¥500 / month.\n\nName:\nI am a teacher / parent / game group:\nHow I plan to use the briefings:'
                  )}
                  className="rule-button justify-center py-3"
                >
                  <Mail size={14} /> {t.briefingJoin}
                </a>
              </div>
            </div>
            <div className="grid gap-4 p-7 sm:grid-cols-2">
              {t.briefingSteps.map(([step, title, detail]) => (
                <article key={title} className="rounded-2xl border border-[#efd39d] bg-white/85 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0ce] font-display text-xl text-[#bd5c24]">{step}</span>
                  <h3 className="mt-4 font-display text-2xl tracking-wide text-[#3d332b]">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#62584f]">{detail}</p>
                </article>
              ))}
              <article className="rounded-2xl border border-[#f4c0cf] bg-[#fff8fb] p-5 sm:col-span-2">
                <p className="flex items-center gap-2 text-sm font-bold text-[#ef3d66]">
                  <FileText size={16} />
                  {language === 'ja'
                    ? '無料PDFは入口です。継続カードはブリーフィンググループ内で管理します。'
                    : 'The free PDF is the doorway. Current and future releases live inside the briefing group.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">{language === 'ja' ? 'Program Guide' : 'Program Guide'}</p>
            <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">{t.programDetailsTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#62584f]">{t.programDetailsCopy}</p>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {detailPrograms.map((program) => (
              <article key={program.id} id={`program-${program.id}`} className="reference-panel p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d87522]">{program.shortName}</p>
                    <h3 className="font-display mt-2 text-3xl tracking-wide text-[#3d332b]">{program.name}</h3>
                  </div>
                  <a href={mailtoForProgram(program)} className="rule-button rule-button-primary px-4 py-2">
                    {program.bookingAction}
                  </a>
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-[#5b4a40]">{program.answer}</p>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    [t.detailLabels.audience, program.audience],
                    [t.detailLabels.outcome, program.outcome],
                    [t.detailLabels.price, program.price],
                    [t.detailLabels.location, program.location],
                    [t.detailLabels.schedule, program.schedule],
                    [t.detailLabels.proof, program.proof],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-3">
                      <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-[#bd5c24]">{label}</dt>
                      <dd className="mt-1 text-xs leading-5 text-[#62584f]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 rounded-xl border border-[#f4d7de] bg-[#fff8fb] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ef3f6b]">{t.detailLabels.faq}</p>
                  <div className="mt-3 grid gap-3">
                    {program.faq.map((item) => (
                      <div key={item.question}>
                        <p className="text-xs font-black text-[#3d332b]">{item.question}</p>
                        <p className="mt-1 text-xs leading-5 text-[#62584f]">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <article className="reference-panel p-6">
            <h2 className="font-display text-3xl tracking-wide text-[#bd5c24]">{t.funnelTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[#62584f]">{t.funnelCopy}</p>
            <div className="mt-6 grid gap-3">
              {t.ladder.map(([stage, detail], index) => (
                <div key={stage} className="flex gap-4 rounded-xl border border-[#efd39d] bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0ce] font-display text-[#bd5c24]">{index + 1}</span>
                  <p className="text-sm leading-6 text-[#62584f]"><strong className="text-[#3d332b]">{stage}</strong><br />{detail}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="reference-panel p-6">
            <h2 className="font-display text-3xl tracking-wide text-[#bd5c24]">{t.partnerTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[#62584f]">{t.partnerCopy}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.partners.map((partner) => (
                <span key={partner} className="rounded-full border border-[#bde8c9] bg-[#f7fff8] px-3 py-2 text-xs font-bold text-[#2e7c44]">{partner}</span>
              ))}
            </div>
            <a href={generalLink} className="rule-button mt-7 justify-center py-3">
              <Mail size={14} /> {t.primary}
            </a>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#62584f]">
              {t.emailFallback} <a href={`mailto:${contactEmail}`} className="text-[#bd5c24] underline decoration-[#efc779] underline-offset-4">{contactEmail}</a>
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
