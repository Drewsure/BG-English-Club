import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'public', 'downloads', 'bg-english-club-briefing-sample.pdf');

const lines = [
  'BG English Club Briefing',
  'Free Sample PDF',
  '',
  'Game: Azul',
  'Audience: teachers, parents, and game groups',
  '',
  'Table Goal',
  'Players practise simple present continuous English while choosing tiles.',
  '',
  'Beginner Phrases',
  'I am taking this tile.',
  'I am looking for blue.',
  'I am putting this here.',
  '',
  'Some Experience',
  'I am choosing this because it helps my row.',
  'I am waiting for another red tile.',
  '',
  'Experienced',
  'I am blocking this space because it may cost me points later.',
  '',
  'Live Table Questions',
  'What colour are you choosing?',
  'Where are you putting it?',
  'What are you planning next?',
  '',
  'Join BG English Club Briefing',
  'One free sample PDF. Full briefing group: 500 yen / month.',
  'Updated weekly with current and future game briefing releases.',
  'Contact: ministarenglish@mail.com',
];

function pdfText(value) {
  return value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
}

const content = [
  'BT',
  '/F1 22 Tf',
  '72 760 Td',
  `(${pdfText(lines[0])}) Tj`,
  '/F1 13 Tf',
  '0 -28 Td',
  ...lines.slice(1).flatMap((line) => {
    if (!line) return ['0 -15 Td'];
    return [`(${pdfText(line)}) Tj`, '0 -18 Td'];
  }),
  'ET',
].join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`,
];

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

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, pdf, 'utf8');
console.log(output);
