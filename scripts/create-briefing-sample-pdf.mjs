import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'public', 'downloads', 'bg-english-club-briefing-sample.pdf');
const logoPath = join(root, 'public', 'images', 'board-english-logo-cropped.jpeg');
const gameImagePath = join(root, 'public', 'images', 'collection', '2453.jpg');

const page = {
  width: 595.28,
  height: 841.89,
  margin: 36,
};

const colors = {
  ink: [0.18, 0.14, 0.11],
  muted: [0.39, 0.34, 0.30],
  copper: [0.74, 0.36, 0.14],
  orange: [0.85, 0.46, 0.12],
  cream: [1, 0.98, 0.94],
  panel: [1, 0.95, 0.84],
  bluePanel: [0.96, 0.98, 1],
  greenPanel: [0.96, 1, 0.96],
  pinkPanel: [1, 0.97, 0.98],
  line: [0.91, 0.75, 0.44],
  white: [1, 1, 1],
};

const briefing = {
  title: 'Blokus English Briefing Card',
  subtitle: 'Free sample PDF',
  game: 'Blokus',
  level: 'Very beginner friendly',
  audience: 'Beginners, families, Silver Circle tables, visual thinkers',
  theme: 'Place colorful pieces on the board, protect your space, and try to use as many pieces as possible.',
  mission: 'Use each piece placement as a small reason to speak English.',
  simpleRules: [
    'Choose one piece on your turn.',
    'Place it so it touches one of your pieces only at a corner.',
    'Try to keep space open for your future pieces.',
  ],
  selected: {
    level: 'Beginner',
    goal: 'Explain A Choice',
    question: 'Where are you placing it?',
  },
  phrases: [
    'I am placing this here.',
    'I need this corner.',
    'This space is good for me.',
    'I am saving this piece for later.',
  ],
  prompts: [
    'Where are you placing it?',
    'Are you opening space or blocking space?',
    'Which piece are you saving for later?',
  ],
};

function rgb([r, g, b]) {
  return `${r} ${g} ${b} rg`;
}

function strokeRgb([r, g, b]) {
  return `${r} ${g} ${b} RG`;
}

function pdfText(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replaceAll('•', '-')
    .replaceAll('–', '-')
    .replaceAll('—', '-')
    .replaceAll('¥', 'Yen');
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function jpegSize(buffer) {
  let index = 2;
  while (index < buffer.length) {
    if (buffer[index] !== 0xff) break;
    const marker = buffer[index + 1];
    const length = buffer.readUInt16BE(index + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(index + 5),
        width: buffer.readUInt16BE(index + 7),
      };
    }
    index += 2 + length;
  }
  throw new Error('Could not read JPEG dimensions.');
}

const imageAssets = [
  { name: 'Logo', bytes: readFileSync(logoPath) },
  { name: 'GameCover', bytes: readFileSync(gameImagePath) },
].map((asset) => ({
  ...asset,
  ...jpegSize(asset.bytes),
}));

class PdfPage {
  constructor() {
    this.commands = [];
  }

  fill(color) {
    this.commands.push(rgb(color));
  }

  stroke(color) {
    this.commands.push(strokeRgb(color));
  }

  rect(x, y, width, height, options = {}) {
    const op = options.fill && options.stroke ? 'B' : options.fill ? 'f' : 'S';
    if (options.fill) this.fill(options.fill);
    if (options.stroke) this.stroke(options.stroke);
    this.commands.push(`${x} ${y} ${width} ${height} re ${op}`);
  }

  line(x1, y1, x2, y2, color = colors.line, width = 1) {
    this.stroke(color);
    this.commands.push(`${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  image(name, x, y, width, height) {
    this.commands.push('q', `${width} 0 0 ${height} ${x} ${y} cm`, `/${name} Do`, 'Q');
  }

  text(value, x, y, options = {}) {
    const {
      size = 11,
      font = 'F1',
      color = colors.ink,
      leading = size + 4,
      maxChars,
      uppercase = false,
    } = options;
    const source = uppercase ? String(value).toUpperCase() : String(value);
    const lines = maxChars ? wrapText(source, maxChars) : source.split('\n');
    this.fill(color);
    this.commands.push('BT', `/${font} ${size} Tf`, `${x} ${y} Td`);
    lines.forEach((line, index) => {
      if (index > 0) this.commands.push(`0 -${leading} Td`);
      this.commands.push(`(${pdfText(line)}) Tj`);
    });
    this.commands.push('ET');
    return y - leading * lines.length;
  }

  label(value, x, y) {
    return this.text(value, x, y, {
      size: 8,
      font: 'F2',
      color: colors.orange,
      uppercase: true,
    });
  }

  card({ x, y, width, height, fill = colors.white, title, label, body, accent = colors.line, selected = false }) {
    this.rect(x, y - height, width, height, {
      fill,
      stroke: selected ? colors.orange : colors.line,
    });
    if (selected) {
      this.rect(x + 4, y - height + 4, 4, height - 8, { fill: colors.orange });
    }
    let cursor = y - 20;
    if (label) cursor = this.label(label, x + 16, cursor) - 6;
    if (title) cursor = this.text(title, x + 16, cursor, { size: 16, font: 'F2', color: selected ? colors.copper : colors.ink, maxChars: Math.floor((width - 32) / 7) }) - 4;
    if (body) this.text(body, x + 16, cursor, { size: 10.5, color: colors.muted, leading: 14, maxChars: Math.floor((width - 32) / 5.4) });
    this.line(x + 16, y - height + 16, x + width - 16, y - height + 16, accent, 0.8);
  }

  bulletList(items, x, y, options = {}) {
    const { size = 10.5, maxChars = 54, gap = 20 } = options;
    let cursor = y;
    items.forEach((item) => {
      this.fill(colors.orange);
      this.commands.push(`${x} ${cursor - 3} 4 4 re f`);
      cursor = this.text(item, x + 13, cursor, {
        size,
        color: colors.muted,
        leading: 14,
        maxChars,
      }) - (gap - 14);
    });
    return cursor;
  }

  content() {
    return this.commands.join('\n');
  }
}

function drawHeader(pdf, title) {
  const top = page.height - page.margin;
  pdf.rect(page.margin, top - 104, page.width - page.margin * 2, 104, {
    fill: colors.panel,
    stroke: colors.line,
  });
  pdf.rect(page.margin + 18, top - 86, 104, 54, {
    fill: colors.white,
    stroke: colors.line,
  });
  pdf.image('Logo', page.margin + 22, top - 82, 96, 46);
  pdf.label('Board Game English Club - Fukuoka Chapter', page.margin + 142, top - 28);
  pdf.text(title, page.margin + 142, top - 54, {
    size: 27,
    font: 'F2',
    color: colors.copper,
    maxChars: 24,
    leading: 30,
  });
}

function drawFooter(pdf, pageNumber) {
  pdf.line(page.margin, 33, page.width - page.margin, 33, colors.line, 0.8);
  pdf.text('ministarenglish@mail.com', page.margin, 20, { size: 9, color: colors.muted });
  pdf.text(`Sample briefing PDF - page ${pageNumber}`, page.width - page.margin - 135, 20, { size: 9, color: colors.muted });
}

function createPageOne() {
  const pdf = new PdfPage();
  drawHeader(pdf, briefing.title);

  const left = page.margin;
  const right = page.width - page.margin;
  const width = right - left;
  let y = page.height - 170;

  pdf.rect(left, y - 112, width, 112, {
    fill: colors.bluePanel,
    stroke: colors.line,
  });
  pdf.rect(left + 16, y - 96, 88, 72, {
    fill: colors.white,
    stroke: colors.line,
  });
  pdf.image('GameCover', left + 20, y - 92, 80, 64);
  pdf.label('Game', left + 124, y - 22);
  pdf.text(briefing.game, left + 124, y - 46, {
    size: 19,
    font: 'F2',
    color: colors.ink,
  });
  pdf.text(briefing.theme, left + 124, y - 67, {
    size: 10.5,
    color: colors.muted,
    leading: 14,
    maxChars: 68,
  });
  pdf.line(left + 124, y - 96, right - 18, y - 96, [0.45, 0.64, 0.91], 0.8);

  y -= 132;
  pdf.card({
    x: left,
    y,
    width: 250,
    height: 116,
    fill: colors.greenPanel,
    label: 'Table Mission',
    title: 'What We Practise',
    body: briefing.mission,
    accent: [0.52, 0.76, 0.49],
    selected: true,
  });
  pdf.card({
    x: left + 270,
    y,
    width: width - 270,
    height: 116,
    fill: colors.white,
    label: 'Audience',
    title: briefing.level,
    body: briefing.audience,
    accent: colors.line,
  });

  y -= 142;
  pdf.text('Simple English Rules', left, y, { size: 20, font: 'F2', color: colors.copper });
  pdf.text('Use these as the calm table explanation before play starts.', left, y - 20, { size: 10.5, color: colors.muted });
  pdf.rect(left, y - 130, width, 94, { fill: colors.cream, stroke: colors.line });
  pdf.bulletList(briefing.simpleRules, left + 18, y - 56, { maxChars: 82, gap: 20 });

  y -= 170;
  pdf.text('Selected For This Session', left, y, { size: 20, font: 'F2', color: colors.copper });
  pdf.card({
    x: left,
    y: y - 24,
    width: 164,
    height: 96,
    fill: colors.white,
    label: 'Level',
    title: briefing.selected.level,
    body: 'Short, safe phrases for first use.',
    selected: true,
  });
  pdf.card({
    x: left + 184,
    y: y - 24,
    width: 164,
    height: 96,
    fill: colors.white,
    label: 'English Goal',
    title: briefing.selected.goal,
    body: 'Say why you put a piece in one place.',
    selected: true,
  });
  pdf.card({
    x: left + 368,
    y: y - 24,
    width: width - 368,
    height: 96,
    fill: colors.white,
    label: 'Live Question',
    title: briefing.selected.question,
    body: 'Ask once during play.',
    selected: true,
  });

  drawFooter(pdf, 1);
  return pdf.content();
}

function createPageTwo() {
  const pdf = new PdfPage();
  drawHeader(pdf, 'Table Language Sheet');

  const left = page.margin;
  const right = page.width - page.margin;
  const width = right - left;
  let y = page.height - 170;

  pdf.text('Useful Phrases', left, y, { size: 22, font: 'F2', color: colors.copper });
  pdf.text('Choose one phrase first. The aim is real use, not perfect grammar.', left, y - 21, { size: 10.5, color: colors.muted });
  pdf.rect(left, y - 144, width, 96, { fill: colors.cream, stroke: colors.line });
  pdf.bulletList(briefing.phrases, left + 18, y - 68, { maxChars: 82, gap: 19 });

  y -= 190;
  pdf.text('Live Table Questions', left, y, { size: 22, font: 'F2', color: colors.copper });
  pdf.text('Use one question during play. Do not overload the table.', left, y - 21, { size: 10.5, color: colors.muted });
  briefing.prompts.forEach((prompt, index) => {
    pdf.card({
      x: left,
      y: y - 52 - index * 84,
      width,
      height: 68,
      fill: index === 0 ? colors.greenPanel : colors.white,
      label: index === 0 ? 'Selected Question' : `Option ${index + 1}`,
      title: prompt,
      body: index === 0 ? 'Good first prompt for beginners because it connects directly to the board.' : 'Use if this question fits the moment better.',
      selected: index === 0,
    });
  });

  y -= 267;
  pdf.text('After The Game', left, y, { size: 22, font: 'F2', color: colors.copper });
  pdf.rect(left, y - 150, width, 116, { fill: colors.pinkPanel, stroke: [0.93, 0.74, 0.80] });
  pdf.label('Record Progress', left + 18, y - 54);
  pdf.text('Useful phrase I said:', left + 18, y - 76, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 130, y - 78, right - 20, y - 78, colors.line, 0.8);
  pdf.text('What happened:', left + 18, y - 104, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 112, y - 106, right - 20, y - 106, colors.line, 0.8);
  pdf.text('Next time:', left + 18, y - 132, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 82, y - 134, right - 20, y - 134, colors.line, 0.8);

  return pdf.content();
}

function buildPdf(pageContents, images) {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${pageContents.map((_, index) => `${3 + index} 0 R`).join(' ')}] /Count ${pageContents.length} >>`,
  ];

  const contentObjectStart = 3 + pageContents.length;
  const fontObjectStart = contentObjectStart + pageContents.length;
  const imageObjectStart = fontObjectStart + 2;
  const imageResources = images.map((image, index) => `/${image.name} ${imageObjectStart + index} 0 R`).join(' ');
  pageContents.forEach((_, index) => {
    const contentRef = contentObjectStart + index;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 ${fontObjectStart} 0 R /F2 ${fontObjectStart + 1} 0 R >> /XObject << ${imageResources} >> >> /Contents ${contentRef} 0 R >>`);
  });

  pageContents.forEach((content) => {
    objects.push(`<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`);
  });

  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  images.forEach((image) => {
    objects.push({
      header: `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`,
      bytes: image.bytes,
      footer: '\nendstream',
    });
  });

  let pdf = Buffer.from('%PDF-1.4\n', 'utf8');
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    const objectBuffer = typeof object === 'string'
      ? Buffer.from(`${index + 1} 0 obj\n${object}\nendobj\n`, 'utf8')
      : Buffer.concat([
        Buffer.from(`${index + 1} 0 obj\n${object.header}`, 'utf8'),
        object.bytes,
        Buffer.from(`${object.footer}\nendobj\n`, 'utf8'),
      ]);
    pdf = Buffer.concat([pdf, objectBuffer]);
  });

  const xrefOffset = pdf.length;
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += '0000000000 65535 f \n';
  for (let index = 1; index <= objects.length; index += 1) {
    xref += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.concat([pdf, Buffer.from(xref, 'utf8')]);
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, buildPdf([createPageOne(), createPageTwo()], imageAssets));
console.log(output);
