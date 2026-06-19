import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'public', 'downloads', 'bg-english-club-briefing-sample.pdf');

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

function drawHeader(pdf, title, subtitle) {
  const top = page.height - page.margin;
  pdf.rect(page.margin, top - 104, page.width - page.margin * 2, 104, {
    fill: colors.panel,
    stroke: colors.line,
  });
  pdf.label('Board Game English Club - Fukuoka Chapter', page.margin + 20, top - 24);
  pdf.text(title, page.margin + 20, top - 48, {
    size: 27,
    font: 'F2',
    color: colors.copper,
    maxChars: 31,
    leading: 30,
  });
  pdf.text(subtitle, page.margin + 20, top - 88, {
    size: 11,
    color: colors.muted,
    maxChars: 64,
  });
  pdf.rect(page.width - page.margin - 92, top - 86, 66, 48, {
    fill: colors.white,
    stroke: colors.orange,
  });
  pdf.text('A4', page.width - page.margin - 75, top - 56, {
    size: 17,
    font: 'F2',
    color: colors.orange,
  });
  pdf.text('no bleed', page.width - page.margin - 80, top - 73, {
    size: 9,
    color: colors.muted,
  });
}

function drawFooter(pdf, pageNumber) {
  pdf.line(page.margin, 33, page.width - page.margin, 33, colors.line, 0.8);
  pdf.text('ministarenglish@mail.com', page.margin, 20, { size: 9, color: colors.muted });
  pdf.text(`Sample briefing PDF - page ${pageNumber}`, page.width - page.margin - 135, 20, { size: 9, color: colors.muted });
}

function createPageOne() {
  const pdf = new PdfPage();
  drawHeader(pdf, briefing.title, 'A printable table guide that keeps the same card-based feel as the website.');

  const left = page.margin;
  const right = page.width - page.margin;
  const width = right - left;
  let y = page.height - 170;

  pdf.card({
    x: left,
    y,
    width,
    height: 92,
    fill: colors.bluePanel,
    label: 'Game',
    title: briefing.game,
    body: briefing.theme,
    accent: [0.45, 0.64, 0.91],
  });

  y -= 112;
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
  drawHeader(pdf, 'Table Language Sheet', 'Print this page with the briefing and place it beside the game board.');

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

  y -= 330;
  pdf.text('After The Game', left, y, { size: 22, font: 'F2', color: colors.copper });
  pdf.rect(left, y - 150, width, 116, { fill: colors.pinkPanel, stroke: [0.93, 0.74, 0.80] });
  pdf.label('Record Progress', left + 18, y - 54);
  pdf.text('Useful phrase I said:', left + 18, y - 76, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 130, y - 78, right - 20, y - 78, colors.line, 0.8);
  pdf.text('What happened:', left + 18, y - 104, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 112, y - 106, right - 20, y - 106, colors.line, 0.8);
  pdf.text('Next time:', left + 18, y - 132, { size: 11, font: 'F2', color: colors.ink });
  pdf.line(left + 82, y - 134, right - 20, y - 134, colors.line, 0.8);

  pdf.card({
    x: left,
    y: 170,
    width,
    height: 82,
    fill: colors.panel,
    label: 'Join BG English Club Briefing',
    title: 'More printable game cards',
    body: 'One free sample PDF. Full briefing group: 500 yen / month. Current cards plus new cards as they become available.',
    accent: colors.orange,
  });

  drawFooter(pdf, 2);
  return pdf.content();
}

function buildPdf(pageContents) {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${pageContents.map((_, index) => `${3 + index} 0 R`).join(' ')}] /Count ${pageContents.length} >>`,
  ];

  const contentObjectStart = 3 + pageContents.length;
  pageContents.forEach((_, index) => {
    const contentRef = contentObjectStart + index;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 ${contentObjectStart + pageContents.length} 0 R /F2 ${contentObjectStart + pageContents.length + 1} 0 R >> >> /Contents ${contentRef} 0 R >>`);
  });

  pageContents.forEach((content) => {
    objects.push(`<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`);
  });

  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf, 'utf8');
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, buildPdf([createPageOne(), createPageTwo()]), 'utf8');
console.log(output);
