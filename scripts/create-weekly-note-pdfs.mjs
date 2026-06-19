import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, 'public', 'downloads');
const tempDir = join(root, '.tmp-weekly-note-pdf');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const assets = {
  logo: pathToFileURL(join(root, 'public', 'images', 'board-english-logo-cropped.jpeg')).href,
  hero: pathToFileURL(join(root, 'public', 'images', 'weekly-note', 'table-note-001.png')).href,
};

const notes = [
  {
    code: 'en',
    file: 'bg-english-weekly-note-001-en.pdf',
    title: 'BG English Weekly Table Note',
    kicker: 'Weekly note 001',
    headline: 'Predict, React, And Keep Talking.',
    intro:
      'One game idea, one English skill, and one practical use. This note supports corporate tables, Silver Circle sessions, and anyone building conversation through play.',
    phraseTitle: 'This Week’s English Expansion',
    phrase: 'I changed my mind.',
    phraseCopy:
      'This phrase turns a small strategy change into natural English. The learner does not need a perfect explanation. Saying it keeps the conversation moving and makes thinking visible.',
    phraseSteps: [
      ['First step', 'I think this will happen.'],
      ['Reaction', 'That surprised me.'],
      ['Change', 'I changed my mind.'],
    ],
    corporateTitle: 'Application For Corporate Users',
    corporateCopy:
      'Meetings often change direction. A game table gives teams a safe rehearsal space for saying what they expected, what surprised them, and why they changed direction.',
    silverTitle: 'Application For Silver Circle Users',
    silverCopy:
      'The aim is not speed or correctness. Predicting, seeing what happens, and giving a small reaction creates gentle conversation, participation, and social contact.',
    contextTitle: 'Japanese Social Context',
    contextCopy:
      'In many Japanese community and workplace settings, open conversation can feel too vague. A board game gives visible structure: turns, roles, choices, and a shared object of attention.',
    sponsorTitle: 'Sponsorship Space',
    sponsorCopy:
      'Reserved for a cafe, company, education partner, or community sponsor aligned with language learning, local connection, and thoughtful participation.',
    footer: 'BG English Club - Fukuoka Chapter | ministarenglish@mail.com',
  },
  {
    code: 'ja',
    file: 'bg-english-weekly-note-001-ja.pdf',
    title: 'BG English Weekly Table Note',
    kicker: '週刊ノート 001',
    headline: '予想して、反応する。',
    intro:
      '一つのゲーム、一つの英語スキル、一つの使い方。企業テーブルとシルバーサークルの両方で使える、週刊の読みものです。',
    phraseTitle: '今週の英語',
    phrase: 'I changed my mind.',
    phraseCopy:
      'この表現は、ゲーム中の小さな作戦変更を自然な英語に変えます。完璧な理由を言う必要はありません。「考えが変わりました」と言えるだけで、会話が続きます。',
    phraseSteps: [
      ['最初の一言', 'I think this will happen.'],
      ['反応', 'That surprised me.'],
      ['変更', 'I changed my mind.'],
    ],
    corporateTitle: '企業での使い方',
    corporateCopy:
      '会議では、計画が変わることがあります。ゲームでは、その変化を安全に練習できます。予想、驚き、変更理由を短く言うことで、チーム内の発言がしやすくなります。',
    silverTitle: 'シルバーサークルでの使い方',
    silverCopy:
      'シニア向けのテーブルでは、正解を急がないことが大切です。予想して、結果を見て、少し反応するだけで、自然な会話になります。',
    contextTitle: '日本の活動視点',
    contextCopy:
      '自由会話よりも「何をするか」が決まっている方が参加しやすいことがあります。ボードゲームは順番、役割、目的が見えるため、英語初心者にも入り口を作ります。',
    sponsorTitle: 'スポンサー枠',
    sponsorCopy:
      'カフェ、企業、教育団体、地域活動の紹介枠として使えます。英語、交流、学びに合うスポンサーだけを掲載します。',
    footer: 'BG English Club - Fukuoka Chapter | ministarenglish@mail.com',
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderNote(note) {
  const phraseCards = note.phraseSteps
    .map(
      ([label, phrase]) => `
        <div class="mini-card">
          <p>${escapeHtml(label)}</p>
          <strong>${escapeHtml(phrase)}</strong>
        </div>`
    )
    .join('');

  return `<!doctype html>
<html lang="${note.code}">
<head>
  <meta charset="utf-8" />
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #332922;
      background: #fffaf0;
      font-family: "Noto Sans JP", "Yu Gothic", "Segoe UI", Arial, sans-serif;
      font-size: 12px;
      line-height: 1.55;
    }
    .page {
      min-height: 269mm;
      border: 1px solid #efc779;
      background: #fffdf8;
      padding: 16mm;
      position: relative;
    }
    header {
      display: grid;
      grid-template-columns: 35mm 1fr;
      gap: 10mm;
      align-items: center;
      border: 1px solid #efc779;
      background: #fff2d8;
      padding: 8mm;
    }
    .logo { width: 32mm; height: auto; display: block; }
    .kicker {
      margin: 0 0 1mm;
      color: #d87522;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    h1, h2, h3, p { margin: 0; }
    h1 {
      color: #bd5c24;
      font-size: 25px;
      line-height: 1.05;
    }
    .hero {
      display: grid;
      grid-template-columns: 1fr 54mm;
      gap: 8mm;
      margin-top: 8mm;
      align-items: stretch;
    }
    .hero-copy {
      border-left: 4px solid #d87522;
      background: #f7fff5;
      padding: 7mm;
    }
    .hero-copy h2 {
      color: #bd5c24;
      font-size: 24px;
      line-height: 1.1;
      margin-bottom: 4mm;
    }
    .hero img {
      width: 54mm;
      height: 54mm;
      object-fit: cover;
      border: 1px solid #efc779;
    }
    .section {
      margin-top: 7mm;
      border: 1px solid #efc779;
      background: white;
      padding: 6mm;
      break-inside: avoid;
    }
    .section h2 {
      color: #bd5c24;
      font-size: 19px;
      margin-bottom: 2mm;
    }
    .phrase {
      color: #2f2822;
      font-size: 24px;
      line-height: 1.1;
      margin: 1mm 0 3mm;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5mm;
    }
    .mini-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4mm;
      margin-top: 5mm;
    }
    .mini-card {
      border: 1px solid #efd39d;
      background: #fffaf0;
      padding: 4mm;
      min-height: 25mm;
    }
    .mini-card p {
      color: #d87522;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }
    .mini-card strong {
      display: block;
      font-size: 13px;
      line-height: 1.3;
    }
    .corporate { background: #f8fff5; border-color: #c9e4c4; }
    .silver { background: #fff7fa; border-color: #ffbdce; }
    .sponsor {
      margin-top: 7mm;
      border: 1px dashed #caa367;
      background: #fffdf8;
      padding: 6mm;
      min-height: 33mm;
    }
    .sponsor-box {
      margin-top: 4mm;
      border: 1px solid #efd39d;
      background: #fffaf0;
      text-align: center;
      padding: 5mm;
      color: #8f735f;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    footer {
      position: absolute;
      left: 16mm;
      right: 16mm;
      bottom: 8mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #efc779;
      padding-top: 2mm;
      color: #6e6057;
      font-size: 8px;
    }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <img class="logo" src="${assets.logo}" alt="" />
      <div>
        <p class="kicker">${escapeHtml(note.kicker)}</p>
        <h1>${escapeHtml(note.title)}</h1>
      </div>
    </header>
    <section class="hero">
      <div class="hero-copy">
        <h2>${escapeHtml(note.headline)}</h2>
        <p>${escapeHtml(note.intro)}</p>
      </div>
      <img src="${assets.hero}" alt="" />
    </section>
    <section class="section">
      <p class="kicker">${escapeHtml(note.phraseTitle)}</p>
      <h2 class="phrase">${escapeHtml(note.phrase)}</h2>
      <p>${escapeHtml(note.phraseCopy)}</p>
      <div class="mini-grid">${phraseCards}</div>
    </section>
    <section class="grid">
      <article class="section corporate">
        <h2>${escapeHtml(note.corporateTitle)}</h2>
        <p>${escapeHtml(note.corporateCopy)}</p>
      </article>
      <article class="section silver">
        <h2>${escapeHtml(note.silverTitle)}</h2>
        <p>${escapeHtml(note.silverCopy)}</p>
      </article>
    </section>
    <section class="section">
      <h2>${escapeHtml(note.contextTitle)}</h2>
      <p>${escapeHtml(note.contextCopy)}</p>
    </section>
    <section class="sponsor">
      <h2>${escapeHtml(note.sponsorTitle)}</h2>
      <p>${escapeHtml(note.sponsorCopy)}</p>
      <div class="sponsor-box">Sponsor Logo / Message</div>
    </section>
    <footer>
      <span>${escapeHtml(note.footer)}</span>
      <span>${note.code.toUpperCase()} PDF - Weekly Note 001</span>
    </footer>
  </main>
</body>
</html>`;
}

function printPdf(htmlPath, outputPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outputPath}`,
      pathToFileURL(htmlPath).href,
    ], { stdio: 'inherit' });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Chrome exited with code ${code}`));
    });
  });
}

if (!existsSync(chromePath)) {
  throw new Error(`Chrome was not found at ${chromePath}`);
}

mkdirSync(outputDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });

for (const note of notes) {
  const htmlPath = join(tempDir, `weekly-note-${note.code}.html`);
  const outputPath = join(outputDir, note.file);
  writeFileSync(htmlPath, renderNote(note), 'utf8');
  await printPdf(htmlPath, outputPath);
  console.log(`Created ${outputPath}`);
}

rmSync(tempDir, { recursive: true, force: true });
