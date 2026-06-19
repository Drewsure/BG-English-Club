import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'public', 'downloads', 'bg-english-club-briefing-sample-ja.pdf');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const logoUrl = pathToFileURL(join(root, 'public', 'images', 'board-english-logo-cropped.jpeg')).href;
const gameImageUrl = pathToFileURL(join(root, 'public', 'images', 'collection', '2453.jpg')).href;
const qrUrl = pathToFileURL(join(root, 'public', 'images', 'member-profile-qr.jpg')).href;

const tmp = mkdtempSync(join(tmpdir(), 'bg-english-ja-pdf-'));
const htmlPath = join(tmp, 'briefing-ja.html');

const html = String.raw`<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <title>ブロックス英語ブリーフィングカード</title>
  <style>
    @page { size: A4; margin: 11mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #332820;
      background: white;
      font-family: "Yu Gothic", "Meiryo", "Noto Sans JP", Arial, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      min-height: 275mm;
      padding: 0;
      page-break-after: always;
    }
    .page:last-child { page-break-after: auto; }
    .header {
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: 18px;
      align-items: center;
      border: 1px solid #e8bf70;
      background: #fff2d6;
      padding: 13px 17px;
      margin-bottom: 14px;
    }
    .logo-box {
      border: 1px solid #e8bf70;
      background: white;
      padding: 5px;
    }
    .logo-box img { display: block; width: 80px; height: auto; }
    .label {
      margin: 0 0 5px;
      color: #d87522;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    h1, h2, h3, p { margin: 0; }
    h1 {
      color: #bd5c24;
      font-size: 21px;
      line-height: 1.2;
      font-weight: 800;
    }
    h2 {
      color: #bd5c24;
      font-size: 21px;
      line-height: 1.25;
      margin: 18px 0 5px;
    }
    h3 {
      font-size: 15px;
      line-height: 1.35;
      font-weight: 800;
    }
    .small { color: #62584f; font-size: 10px; line-height: 1.55; }
    .card {
      border: 1px solid #e8bf70;
      background: #fffdf8;
      padding: 13px 16px;
      margin-top: 12px;
    }
    .game-card {
      display: grid;
      grid-template-columns: 88px 1fr;
      gap: 18px;
      align-items: center;
      background: #f6fbff;
    }
    .game-card img {
      width: 78px;
      height: 62px;
      object-fit: cover;
      border: 1px solid #e8bf70;
      background: white;
      padding: 3px;
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-three { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .selected {
      border-color: #ed7417;
      border-left: 6px solid #ed7417;
      background: #f7fff8;
    }
    ul, ol {
      margin: 8px 0 0;
      padding-left: 18px;
      color: #62584f;
      font-size: 10.5px;
      line-height: 1.65;
    }
    li::marker { color: #d87522; }
    .question { min-height: 62px; }
    .progress {
      display: grid;
      grid-template-columns: 1fr 82px;
      gap: 18px;
      border-color: #efb8c8;
      background: #fff7fa;
      padding-bottom: 14px;
    }
    .line {
      display: grid;
      grid-template-columns: 106px 1fr;
      align-items: end;
      gap: 8px;
      margin-top: 14px;
      font-size: 11px;
      font-weight: 700;
    }
    .write-line {
      height: 1px;
      border-bottom: 1px solid #e8bf70;
    }
    .qr-box { text-align: center; align-self: end; }
    .qr-box img {
      width: 70px;
      height: 70px;
      border: 1px solid #e8bf70;
      background: white;
      padding: 4px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      padding-top: 8px;
      border-top: 1px solid #e8bf70;
      color: #62584f;
      font-size: 8px;
    }
  </style>
</head>
<body>
  <section class="page">
    <header class="header">
      <div class="logo-box"><img src="${logoUrl}" alt=""></div>
      <div>
        <p class="label">Board Game English Club - Fukuoka Chapter</p>
        <h1>ブロックス英語ブリーフィングカード</h1>
      </div>
    </header>

    <section class="card game-card">
      <img src="${gameImageUrl}" alt="">
      <div>
        <p class="label">Game</p>
        <h3>ブロックス</h3>
        <p class="small">カラフルなピースを置き、自分のスペースを守りながら、できるだけ多くのピースを使います。</p>
      </div>
    </section>

    <div class="grid">
      <section class="card selected">
        <p class="label">Table Mission</p>
        <h3>練習すること</h3>
        <p class="small">ピースを置くたびに、小さな理由を英語で言うきっかけにします。</p>
      </section>
      <section class="card">
        <p class="label">Audience</p>
        <h3>初心者にやさしい</h3>
        <p class="small">初心者、家族、シルバーサークル、見て考えるタイプの学習者に向いています。</p>
      </section>
    </div>

    <h2>やさしい英語ルール</h2>
    <p class="small">プレイ前に、落ち着いて確認するための簡単な説明です。</p>
    <section class="card">
      <ul>
        <li>自分の番にピースを一つ選びます。</li>
        <li>自分のピースと角だけが触れるように置きます。</li>
        <li>次に置く場所を残すように考えます。</li>
      </ul>
    </section>

    <h2>今回のセッション</h2>
    <div class="grid-three">
      <section class="card selected">
        <p class="label">Level</p>
        <h3>初心者</h3>
        <p class="small">最初に使いやすい短い表現です。</p>
      </section>
      <section class="card selected">
        <p class="label">English Goal</p>
        <h3>予想して反応する</h3>
        <p class="small">予想、驚き、考え直しを短く言います。</p>
      </section>
      <section class="card selected">
        <p class="label">Live Question</p>
        <h3>どこに置きますか？</h3>
        <p class="small">プレイ中に一度だけ聞きます。</p>
      </section>
    </div>

    <footer class="footer"><span>ministarenglish@mail.com</span><span>Japanese sample briefing PDF - page 1</span></footer>
  </section>

  <section class="page">
    <header class="header">
      <div class="logo-box"><img src="${logoUrl}" alt=""></div>
      <div>
        <p class="label">Board Game English Club - Fukuoka Chapter</p>
        <h1>テーブル言語シート</h1>
      </div>
    </header>

    <h2>使えるフレーズ</h2>
    <p class="small">まず一つだけ選びます。目的は完璧な文法ではなく、実際に使うことです。</p>
    <section class="card">
      <ul>
        <li>I am placing this here. / ここに置きます。</li>
        <li>I need this corner. / この角が必要です。</li>
        <li>This space is good for me. / この場所は私にとって良いです。</li>
        <li>I am saving this piece for later. / このピースは後で使います。</li>
      </ul>
    </section>

    <h2>テーブル質問</h2>
    <p class="small">プレイ中に一つだけ使います。質問を多くしすぎないようにします。</p>
    <section class="card selected question">
      <p class="label">Selected Question</p>
      <h3>Where are you placing it?</h3>
      <p class="small">どこに置きますか？ 盤面と直接つながる、初心者にも使いやすい質問です。</p>
    </section>
    <section class="card question">
      <p class="label">Option 2</p>
      <h3>Are you opening space or blocking space?</h3>
      <p class="small">スペースを作っていますか？ それともブロックしていますか？</p>
    </section>
    <section class="card question">
      <p class="label">Option 3</p>
      <h3>Which piece are you saving for later?</h3>
      <p class="small">後で使うために、どのピースを残していますか？</p>
    </section>

    <h2>ゲームのあと</h2>
    <section class="card progress">
      <div>
        <p class="label">Record Progress</p>
        <div class="line"><span>言えたフレーズ</span><span class="write-line"></span></div>
        <div class="line"><span>起きたこと</span><span class="write-line"></span></div>
        <div class="line"><span>次回</span><span class="write-line"></span></div>
      </div>
      <div class="qr-box">
        <p class="label">Scan To Save</p>
        <img src="${qrUrl}" alt="">
        <p class="small">メンバープロフィール</p>
      </div>
    </section>
  </section>
</body>
</html>`;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(htmlPath, html, 'utf8');

try {
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${output}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'inherit' });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(output);
