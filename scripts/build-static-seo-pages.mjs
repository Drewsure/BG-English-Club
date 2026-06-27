import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const siteUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://bg-english-club.netlify.app';
const today = new Date().toISOString().slice(0, 10);

function pageShell({ lang = 'en', title, description, keywords, canonicalPath, body, schema }) {
  const canonical = `${siteUrl}${canonicalPath}`;
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans JP", sans-serif; color: #2f251e; background: #fffaf0; line-height: 1.75; }
      main { max-width: 980px; margin: 0 auto; padding: 40px 20px 72px; }
      .hero, .card { background: #fffdf8; border: 1px solid #efc779; border-radius: 24px; padding: 28px; box-shadow: 0 14px 36px rgba(91, 58, 24, 0.08); }
      .hero { background: linear-gradient(135deg, #fffdf8, #fff1dc); }
      .pink { background: linear-gradient(135deg, #fff2ef, #fff8e8); border-color: #f5c1cb; }
      h1 { color: #bd5c24; font-size: clamp(2.2rem, 6vw, 4.2rem); line-height: 1.08; margin: 12px 0 18px; }
      h2 { color: #bd5c24; margin-top: 42px; font-size: 1.8rem; }
      h3 { margin-bottom: 8px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-top: 16px; }
      .badge { display: inline-block; color: #ef3d66; border: 1px solid #ff9aad; border-radius: 999px; padding: 8px 14px; font-weight: 800; letter-spacing: 0.04em; }
      .cta { display: inline-block; margin-top: 20px; border-radius: 999px; background: #d87522; color: white; padding: 12px 20px; font-weight: 800; text-decoration: none; }
      .cta.pink-cta { background: #f63360; }
      .soft { color: #665b59; }
      li { margin-bottom: 8px; }
      footer { margin-top: 48px; border-top: 1px solid #efd8cf; padding-top: 24px; color: #756c69; font-size: 0.95rem; }
      a { color: #bd5c24; }
    </style>
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
  </head>
  <body>
    <main>${body}</main>
  </body>
</html>`;
}

const pages = [
  {
    path: '/blog/',
    lang: 'en',
    title: 'Board Game English Blog | Silver Circle, Briefings, And Workshops',
    description: 'Board Game English Club blog hub for weekly game briefings, Silver Circle conversation ideas, and corporate or teacher workshop notes in Fukuoka.',
    keywords: 'Board Game English blog, English board games Fukuoka, Silver Circle English, corporate English workshops Fukuoka, ESL board game briefings',
    priority: '0.9',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Board Game English Club Blog',
      description: 'Weekly game briefings and practical English-through-board-games guides.',
      publisher: {
        '@type': 'Organization',
        name: 'Board Game English Club',
        email: 'ministarenglish@mail.com',
      },
    },
    body: `
      <section class="hero">
        <span class="badge">Board Game English Blog</span>
        <h1>Weekly game briefings for conversation, community, and workshops.</h1>
        <p class="soft">Each post turns one board game into simple English rules, useful phrases, one live table question, and a clear next step. The blog has two paths: gentle Silver Circle tables and practical corporate / teacher use.</p>
        <a class="cta" href="/#briefings">Open the interactive briefing library</a>
      </section>
      <h2>Two reading paths</h2>
      <div class="grid">
        <article class="card pink">
          <h3>Silver Circle</h3>
          <p>Gentle posts for seniors, families, and community tables. These focus on calm conversation, confidence, short phrases, Japanese support, and low-pressure participation.</p>
          <a href="/silver-circle/">Open Silver Circle</a>
        </article>
        <article class="card">
          <h3>Corporate + Teacher</h3>
          <p>Practical posts for teachers, facilitators, companies, libraries, cafes, and community groups. These focus on facilitation, team discussion, printable aids, and workshop outcomes.</p>
          <a href="/corporate-workshops-fukuoka/">Open corporate workshops</a>
        </article>
      </div>
      <h2>Latest post</h2>
      <article class="card">
        <h3>BG English Weekly Table Note 001</h3>
        <p>A weekly table note for prediction, reaction, corporate discussion, Silver Circle participation, PDF downloads, and sponsor-supported local tables.</p>
        <a class="cta" href="/blog/bg-english-weekly-table-note-001/">Read the Weekly Table Note</a>
      </article>
      <h2>Latest game briefing</h2>
      <article class="card">
        <h3>Blokus English Briefing Card</h3>
        <p>Beginner-friendly English practice for shape placement, corners, space, blocking, and simple reason-giving.</p>
        <a class="cta" href="/blog/blokus-english-briefing-card/">Read the briefing</a>
      </article>
      <h2>How posts are used</h2>
      <div class="grid">
        <article class="card"><strong>Before a session</strong><br />Choose one game, one focus, and one table question.</article>
        <article class="card"><strong>During play</strong><br />Use short phrases when the game creates a real reason to speak.</article>
        <article class="card"><strong>After play</strong><br />Save one phrase and one next step in the member profile.</article>
      </div>
      <footer><a href="/#offers">Ask about a session or workshop</a></footer>
    `,
  },
  {
    path: '/silver-circle/',
    lang: 'ja',
    title: '福岡市西区 シニア向け英語ボードゲームサークル | Silver Circle',
    description: 'Silver Circle は福岡市西区のシニア向け少人数英語ボードゲームサークルです。退職後の趣味、外出のきっかけ、会話、地域交流を日本語サポートつきでやさしく始められます。',
    keywords: '福岡市西区 高齢者 趣味, 福岡市西区 シニア サークル, 西区 高齢者 交流, 高齢者 ボードゲーム 福岡, 英語 初心者 シニア 福岡, シルバーサークル',
    priority: '1.0',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Silver Circle - 福岡市西区 シニア向け英語ボードゲームサークル',
      description: '福岡市西区のシニア向け少人数英語ボードゲームサークル。日本語サポートつき。',
      location: {
        '@type': 'Place',
        name: 'Nearby community hall, Nishi-ku, Fukuoka',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nishi-ku, Fukuoka',
          addressCountry: 'JP',
        },
      },
      eventSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P2W',
        byDay: 'https://schema.org/Thursday',
        startTime: '14:00',
        endTime: '16:00',
        scheduleTimezone: 'Asia/Tokyo',
      },
      maximumAttendeeCapacity: 6,
      organizer: {
        '@type': 'Organization',
        name: 'Board Game English Club',
        email: 'ministarenglish@mail.com',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'JPY',
        description: '¥3,000 / month for 2 sessions',
      },
    },
    body: `
      <section class="hero pink">
        <span class="badge">福岡市西区・シニア向け少人数活動</span>
        <h1>英語でゲーム。<br />脳を使う。<br />人とつながる。</h1>
        <p class="soft">Silver Circle は、退職後の新しい趣味、外出のきっかけ、ご近所での交流を探している方のための英語ボードゲームサークルです。英語が初めてでも、ゲームが初めてでも、日本語サポートで安心して参加できます。</p>
        <a class="cta pink-cta" href="mailto:ministarenglish@mail.com?subject=Silver%20Circle%20%E7%84%A1%E6%96%99%E4%BD%93%E9%A8%93%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">無料体験について問い合わせる</a>
      </section>
      <h2>こんな方に向いています</h2>
      <div class="grid">
        <article class="card"><strong>福岡市西区で趣味を探しているシニア</strong><br />静かで安心できる少人数テーブルです。</article>
        <article class="card"><strong>退職後の外出機会がほしい方</strong><br />近くで人と会い、笑い、軽く頭を使う時間を作ります。</article>
        <article class="card"><strong>親御さんの居場所を探しているご家族</strong><br />ご家族からの事前相談も歓迎しています。</article>
      </div>
      <h2>開催予定</h2>
      <div class="card"><p><strong>第1・第3木曜日 午後2時〜4時</strong></p><p>ご近所コミュニティホール・定員6名・月会費 ¥3,000（月2回）</p></div>
      <h2>よくある質問</h2>
      <div class="grid">
        <article class="card"><strong>英語が全くわからなくても大丈夫？</strong><br />大丈夫です。短い英語と日本語サポートで始めます。</article>
        <article class="card"><strong>一人でも参加できますか？</strong><br />はい。一人で体験に来られる方も歓迎です。</article>
        <article class="card"><strong>医療や治療ですか？</strong><br />いいえ。地域の会話と参加を支える活動です。</article>
      </div>
      <footer><a href="/#silver-circle">インタラクティブ版 Silver Circle ページを見る</a></footer>
    `,
  },
  {
    path: '/board-game-english-fukuoka/',
    lang: 'ja',
    title: '福岡市西区 英語ボードゲームサークル | Board Game English Club',
    description: 'Board Game English Club 福岡チャプターは、福岡市西区で英語をボードゲームで楽しく使う少人数サークルです。初心者、親子、シニア、大人、企業・団体向けに日本語サポートつきで参加できます。',
    keywords: '福岡市西区 英語 サークル, 福岡 英会話 初心者, 福岡 ボードゲーム 英語, 西区 親子 英語, 福岡 シニア 英語, 福岡 企業研修 英語',
    priority: '0.95',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Board Game English Club',
      alternateName: 'Board Game English Fukuoka',
      email: 'ministarenglish@mail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nishi-ku, Fukuoka',
        addressCountry: 'JP',
      },
      description: '福岡市西区で、英語をボードゲームで楽しく使う少人数サークル。',
    },
    body: `
      <section class="hero">
        <span class="badge">福岡市西区・英語ボードゲーム</span>
        <h1>ゲームを選んで、話して、笑って、使える英語を持ち帰る。</h1>
        <p class="soft">Board Game English Club は、福岡市西区を中心にした小さな英語ボードゲームサークルです。英語初心者、親子、シニア、大人の学び直し、企業・団体研修まで、日本語サポートつきで安心して参加できます。</p>
        <a class="cta" href="mailto:ministarenglish@mail.com?subject=Board%20Game%20English%20Club%20%E4%BD%93%E9%A8%93%E7%9B%B8%E8%AB%87">体験・相談をする</a>
      </section>
      <h2>参加の流れ</h2>
      <div class="grid">
        <article class="card"><strong>ゲームを選ぶ</strong><br />年齢・人数・英語レベルに合うゲームを選びます。</article>
        <article class="card"><strong>英語の目的を一つ選ぶ</strong><br />説明する、質問する、提案する、相談する、振り返る。</article>
        <article class="card"><strong>使えた英語を記録する</strong><br />その日に実際に言えた一文を持ち帰ります。</article>
      </div>
      <h2>プログラム</h2>
      <div class="grid">
        <article class="card"><strong>親子・子ども</strong><br />¥2,000 / 回 / 1人</article>
        <article class="card"><strong>Silver Circle</strong><br />シニア向け・月¥3,000 / 2回</article>
        <article class="card"><strong>企業・団体研修</strong><br />¥20,000から</article>
        <article class="card"><strong>週刊ブリーフィング</strong><br />PDF教材・月¥500</article>
      </div>
      <footer><a href="/#home">メインサイトを見る</a></footer>
    `,
  },
  {
    path: '/blog/blokus-english-briefing-card/',
    lang: 'en',
    title: 'Blokus English Briefing Card | Board Game English Club Fukuoka',
    description: 'A beginner-friendly Blokus English briefing card for board game conversation: simple rules, useful phrases, Japanese support, and one live table question for English learners in Fukuoka.',
    keywords: 'Blokus English phrases, Blokus English briefing card, board game English Fukuoka, English conversation board games, ブロックス 英語',
    priority: '0.8',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Blokus English Briefing Card',
      about: ['Blokus', 'English conversation', 'board games', 'Fukuoka'],
      publisher: {
        '@type': 'Organization',
        name: 'Board Game English Club',
      },
    },
    body: `
      <section class="hero">
        <span class="badge">Weekly English Game Briefing</span>
        <h1>Blokus English Briefing Card</h1>
        <p>Blokus is a colorful shape-placement game. It is excellent for first English tables because players can point, think, and say one useful sentence before placing a piece.</p>
        <a class="cta" href="/#briefings/blokus-english-briefing-card">Open the full interactive briefing</a>
      </section>
      <h2>Simple English Rules</h2>
      <ol class="card">
        <li>Choose your color.</li><li>Start in your corner.</li><li>On your turn, place one piece.</li><li>Your new piece must touch one of your pieces at a corner.</li><li>Your pieces cannot touch side to side.</li><li>Try to use many pieces.</li><li>If you cannot place a piece, you stop playing.</li><li>At the end, fewer leftover squares is better.</li>
      </ol>
      <h2>Useful English Phrases</h2>
      <div class="grid">
        <article class="card"><h3>Beginner</h3><p>I'm placing this here. / I'm using this corner. / I'm blocking this space.</p><p>これをここに置いています。/ この角を使っています。/ この場所をふさいでいます。</p></article>
        <article class="card"><h3>Some Experience</h3><p>I'm trying to open more space. / I'm keeping my small pieces for later.</p><p>もっと場所を広げようとしています。/ 小さいピースを後のために残しています。</p></article>
        <article class="card"><h3>Experienced</h3><p>I'm placing this piece here because it gives me two new corners.</p><p>新しい角が二つできるので、このピースをここに置いています。</p></article>
      </div>
      <h2>Live Table Question</h2>
      <article class="card"><p><strong>Ask:</strong> Are you opening space or blocking space?</p><p><strong>Choices:</strong> I am opening space. / I am blocking space. / I am saving space for later.</p></article>
      <footer><a href="/#briefings">Open all briefing cards</a></footer>
    `,
  },

  {
    path: '/blog/bg-english-weekly-table-note-001/',
    lang: 'en',
    title: 'BG English Weekly Table Note 001 | Predict, React, And Keep Talking',
    description: 'BG English Weekly Table Note 001 gives one game-table English phrase, corporate use, Silver Circle use, Japanese context, PDF downloads, and a sponsor space for local Fukuoka tables.',
    keywords: 'BG English Weekly Table Note, Board Game English weekly note, Fukuoka English conversation, Silver Circle English, corporate English Fukuoka, board game English PDF',
    priority: '0.85',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'BG English Weekly Table Note 001: Predict, React, And Keep Talking',
      about: ['English conversation', 'board games', 'Fukuoka', 'Silver Circle', 'corporate English'],
      inLanguage: ['en', 'ja'],
      publisher: {
        '@type': 'Organization',
        name: 'Board Game English Club',
        email: 'ministarenglish@mail.com',
      },
    },
    body: `
      <section class="hero">
        <span class="badge">BG English Weekly Table Note</span>
        <h1>Predict, react, and keep talking.</h1>
        <p class="soft">One game idea, one English skill, and one practical use for Board Game English tables in Fukuoka. This note supports corporate workshops, Silver Circle sessions, families, teachers, and anyone building real conversation through play.</p>
        <a class="cta" href="/#weekly-note">Open the interactive Weekly Note</a>
      </section>
      <h2>This week's English</h2>
      <article class="card">
        <h3>“I changed my mind.”</h3>
        <p>This phrase turns a small strategy change into natural English. The learner does not need a perfect explanation. Saying “I changed my mind” keeps the conversation moving and makes thinking visible.</p>
        <p><strong>Step pattern:</strong> I think this will happen. / That surprised me. / I changed my mind.</p>
      </article>
      <h2>日本語メモ</h2>
      <article class="card pink">
        <h3>「考えが変わりました」</h3>
        <p>ゲーム中の小さな作戦変更を、自然な英語に変える表現です。完璧な理由を言う必要はありません。「考えが変わりました」と言えるだけで、会話が続きます。</p>
      </article>
      <h2>Applications</h2>
      <div class="grid">
        <article class="card"><h3>Corporate</h3><p>Use before a planning meeting as a low-pressure warm-up. Ask each person for one prediction, then ask what changed after the move.</p></article>
        <article class="card pink"><h3>Silver Circle</h3><p>Use one phrase only, repeated several times. The aim is friendly participation, memory, and social contact. This is not medical care.</p></article>
      </div>
      <h2>Japanese social context</h2>
      <article class="card"><p>In many Japanese community and workplace settings, open conversation can feel too vague. A board game gives visible structure: turns, roles, choices, and a shared object of attention. That structure lowers the pressure to perform English.</p></article>
      <h2>Downloads</h2>
      <div class="grid">
        <article class="card"><h3>English PDF</h3><a class="cta" href="/downloads/bg-english-weekly-note-001-en.pdf">Download English PDF</a></article>
        <article class="card"><h3>日本語PDF</h3><a class="cta" href="/downloads/bg-english-weekly-note-001-ja.pdf">日本語PDFをダウンロード</a></article>
      </div>
      <h2>Sponsorship space</h2>
      <article class="card"><p>Reserved for a cafe, company, education partner, or community sponsor aligned with language learning, local connection, and thoughtful participation.</p></article>
      <footer><a href="mailto:ministarenglish@mail.com?subject=BG%20English%20Weekly%20Table%20Note">Request the Weekly Table Note by email</a></footer>
    `,
  },
  {
    path: '/comparison/board-games-vs-english-lessons-fukuoka/',
    lang: 'en',
    title: 'Board Games vs Normal English Lessons in Fukuoka | Board Game English Club',
    description: 'A plain comparison of board-game English sessions and normal English lessons for beginners, families, seniors, and adult learners in Fukuoka.',
    keywords: 'English lessons Fukuoka, board game English Fukuoka, English conversation alternatives Fukuoka, beginner English Fukuoka',
    priority: '0.75',
    changefreq: 'monthly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Board Games vs Normal English Lessons in Fukuoka',
      publisher: {
        '@type': 'Organization',
        name: 'Board Game English Club',
      },
    },
    body: `
      <section class="hero">
        <span class="badge">Comparison Guide</span>
        <h1>Board games vs normal English lessons in Fukuoka</h1>
        <p class="soft">Normal lessons can be useful. Board-game English is different: the table gives people a reason to speak before they feel ready.</p>
      </section>
      <div class="grid">
        <article class="card"><h2>Normal English lessons</h2><p>Good for grammar, textbooks, tests, and structured teacher-led practice.</p></article>
        <article class="card"><h2>Board-game English</h2><p>Good for choices, questions, reactions, negotiation, teamwork, and real table confidence.</p></article>
      </div>
      <h2>Who should try board-game English?</h2>
      <p class="card">Beginners, shy speakers, families, adult learners, seniors, and people who want English to feel social rather than like homework.</p>
      <footer><a href="/#offers">Ask about joining</a></footer>
    `,
  },
  {
    path: '/corporate-workshops-fukuoka/',
    lang: 'ja',
    title: '福岡 企業向け英語コミュニケーション研修 | BG English Club',
    description: '福岡の企業・団体向け英語ボードゲーム研修。チームワーク、会話、ファシリテーション、実用英語をゲームで練習します。¥20,000から。',
    keywords: '福岡 企業研修 英語, 福岡 チームビルディング, 英語 コミュニケーション研修, 企業向け ボードゲーム研修, ソフトスキル 研修 福岡',
    priority: '0.95',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'BG English Club: Corporate Workshops',
      serviceType: '企業向け英語コミュニケーション研修',
      areaServed: '福岡',
      provider: { '@type': 'Organization', name: 'Board Game English Club', email: 'ministarenglish@mail.com' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', description: '¥20,000から。人数追加料金あり。' },
    },
    body: `
      <section class="hero">
        <span class="badge">企業・団体向け</span>
        <h1>英語、会話、チームワークをボードゲームで練習する研修。</h1>
        <p class="soft">福岡の企業、学校、図書館、公民館、カフェ、地域団体向け。講義より温かく、ゲーム会より構造化された、英語コミュニケーション研修です。</p>
        <a class="cta" href="mailto:ministarenglish@mail.com?subject=%E4%BC%81%E6%A5%AD%E5%90%91%E3%81%91%E7%A0%94%E4%BF%AE%E7%9B%B8%E8%AB%87">研修について相談する</a>
      </section>
      <h2>向いている目的</h2>
      <div class="grid">
        <article class="card">チーム内コミュニケーション</article>
        <article class="card">英語を使ったソフトスキル練習</article>
        <article class="card">新入社員・地域イベント・学校活動</article>
      </div>
      <h2>内容</h2>
      <div class="card"><p><strong>料金:</strong> ¥20,000から。人数追加料金あり。</p><p><strong>形式:</strong> 90分、半日、継続型に対応。</p><p><strong>成果:</strong> 説明、相談、交渉、計画、振り返りの英語を練習します。</p></div>
      <footer><a href="/#offers">全プログラムを見る</a></footer>
    `,
  },
  {
    path: '/strategy-coaching-fukuoka/',
    lang: 'ja',
    title: '福岡 大人向け英語ストラテジーコーチング | BG English Club',
    description: '福岡で大人向けの英語ストラテジーコーチング。ボードゲームを使って、説明、質問、交渉、判断、振り返りを練習します。¥12,000 / セッションから。',
    keywords: '福岡 大人 英語 コーチング, 福岡 英会話 学び直し, 福岡 ビジネス英語 個人, 英語 交渉 練習 福岡, ボードゲーム 英語 コーチング',
    priority: '0.9',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'BG English Club: Strategy Coaching',
      serviceType: '大人向け英語ストラテジーコーチング',
      provider: { '@type': 'Organization', name: 'Board Game English Club', email: 'ministarenglish@mail.com' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', description: '¥12,000 / セッションから。人数追加料金あり。' },
    },
    body: `
      <section class="hero">
        <span class="badge">大人向け・少人数</span>
        <h1>戦略ゲームで、説明・質問・交渉の英語を練習する。</h1>
        <p class="soft">大人の学び直し、経営者、ビジネス英語を実用的に使いたい方、小さなグループ向け。ゲームの判断を使って、自然に英語を話す練習をします。</p>
        <a class="cta" href="mailto:ministarenglish@mail.com?subject=Strategy%20Coaching%20%E7%9B%B8%E8%AB%87">ストラテジーコーチングを相談する</a>
      </section>
      <div class="grid"><article class="card">個人または少人数</article><article class="card">¥12,000 / セッションから</article><article class="card">実用フレーズと振り返りつき</article></div>
      <footer><a href="/#offers">全プログラムを見る</a></footer>
    `,
  },
  {
    path: '/kids-family-english-games-fukuoka/',
    lang: 'ja',
    title: '福岡 親子・子ども向け英語ボードゲーム | BG English Club',
    description: '福岡の親子・子ども向け英語ボードゲームセッション。英語初心者歓迎、日本語サポートあり。1回1人 ¥2,000。',
    keywords: '福岡 子ども 英語, 福岡 親子 英語, 福岡 英語 ボードゲーム 子ども, 西区 子ども 英会話, 親子 英語 ゲーム 福岡',
    priority: '0.9',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'BG English Club: Kids & Families',
      serviceType: '親子・子ども向け英語ボードゲームセッション',
      provider: { '@type': 'Organization', name: 'Board Game English Club', email: 'ministarenglish@mail.com' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', description: '1回1人 ¥2,000' },
    },
    body: `
      <section class="hero">
        <span class="badge">親子・子ども・初心者</span>
        <h1>ゲームで、子どもが英語を使ってみる時間。</h1>
        <p class="soft">親子で参加できる、やさしい英語ボードゲームテーブルです。英語が苦手でも、ゲームが初めてでも、日本語サポートで安心して始められます。</p>
        <a class="cta" href="mailto:ministarenglish@mail.com?subject=Kids%20and%20Families%20%E4%BD%93%E9%A8%93%E7%9B%B8%E8%AB%87">親子テーブルを相談する</a>
      </section>
      <div class="grid"><article class="card">1回1人 ¥2,000</article><article class="card">親子参加歓迎</article><article class="card">シンプルなゲームから</article></div>
      <footer><a href="/#offers">全プログラムを見る</a></footer>
    `,
  },
  {
    path: '/briefing-cards/',
    lang: 'ja',
    title: '英語ボードゲーム教材 PDF ブリーフィングカード | BG English Club',
    description: '先生、保護者、ゲーム会向けの英語ボードゲームPDF教材。簡単ルール、使える英語、日本語訳、会話質問、印刷用プレイヤーエイドを毎週更新。月¥500。',
    keywords: '英語 ボードゲーム 教材, 英語 ゲーム PDF, ボードゲーム 英語 フレーズ, 親子 英語 教材, 英語 教師 ボードゲーム, ESL board game materials Japan',
    priority: '0.85',
    changefreq: 'weekly',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'BG English Club Briefing',
      serviceType: '週刊英語ボードゲームPDF教材',
      provider: { '@type': 'Organization', name: 'Board Game English Club', email: 'ministarenglish@mail.com' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', description: '無料サンプルPDFあり。月¥500で最新・今後のブリーフィングを利用。' },
    },
    body: `
      <section class="hero">
        <span class="badge">週刊ブリーフィングカード</span>
        <h1>ボードゲーム一つにつき、英語で遊ぶための印刷教材。</h1>
        <p class="soft">先生、保護者、ゲーム会向け。簡単ルール、使える英語、日本語訳、ライブ質問、印刷用プレイヤーエイドをまとめたPDF教材です。</p>
        <a class="cta" href="/downloads/bg-english-club-briefing-sample.pdf">英語サンプルPDFをダウンロード</a>
        <a class="cta" href="/downloads/bg-english-club-briefing-sample-ja.pdf">日本語サンプルPDFをダウンロード</a>
        <a class="cta" href="mailto:ministarenglish@mail.com?subject=BG%20English%20Club%20Briefing%20%E5%8F%82%E5%8A%A0">月¥500で参加する</a>
      </section>
      <div class="grid"><article class="card">無料サンプルPDFあり</article><article class="card">毎週更新</article><article class="card">印刷して使える</article></div>
      <footer><a href="/#briefings">ブリーフィング一覧を見る</a></footer>
    `,
  },
];

async function writePage(page) {
  const dir = join(process.cwd(), 'public', page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, 'index.html'),
    pageShell({
      lang: page.lang,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      canonicalPath: page.path,
      body: page.body,
      schema: page.schema,
    }),
    'utf8',
  );
}

async function writeSitemap() {
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    ...pages.map((page) => ({ loc: page.path, priority: page.priority, changefreq: page.changefreq })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  await writeFile(join(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf8');
}

for (const page of pages) {
  await writePage(page);
}

await writeSitemap();

console.log(`Generated ${pages.length} static SEO pages and sitemap for ${siteUrl}`);
