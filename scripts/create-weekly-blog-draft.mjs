import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);

function readArg(name, fallback = '') {
  const flag = `--${name}`;
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const game = readArg('game', 'New Game');
const date = readArg('date', new Date().toISOString().slice(0, 10));
const slug = `${slugify(game)}-english-briefing-card`;
const outDir = join(process.cwd(), 'content', 'weekly-drafts');
const outPath = join(outDir, `${date}-${slug}.md`);

const draft = `# ${game} English Briefing Card

Date: ${date}
Status: Draft
Public URL target: /blog/${slug}.html
Interactive URL target: /#briefings/${slug}

## SEO / GEO / AEO

SEO title:
${game} English Briefing Card | Board Game English Club Fukuoka

Meta description:
A beginner-friendly ${game} English briefing card for board game conversation in Fukuoka, with simple rules, useful phrases, Japanese support, and one live table question.

Local search angle:
- Board Game English Fukuoka
- English conversation through board games
- 福岡市西区 英語 初心者
- 福岡市西区 趣味 サークル

Answer-engine summary:
${game} can be used for English conversation practice because the table naturally creates choices, questions, reactions, and simple explanations.

## Game Summary

Write 2-3 plain sentences about the theme and what players do.

## Simple English Rules

Use 8-year-old-level English.

1. 
2. 
3. 
4. 
5. 

## Useful English Phrases

### Beginner

- I'm ...
- I'm ...
- I'm ...

Japanese:
- ...
- ...
- ...

### Some Experience

- I'm ...
- I'm ...
- I'm ...

Japanese:
- ...
- ...
- ...

### Experienced

- I'm ... because ...
- I'm ... so ...
- I'm changing my plan because ...

Japanese:
- ...
- ...
- ...

## Live Table Question

Ask:

Choices:
1. 
2. 
3. 

## Silver Circle Fit

Is this good for seniors? Explain gently. Avoid medical promises.

## FAQ

Q: Is this good for beginners?
A:

Q: Can this be used in a family table?
A:

Q: What English can players practise?
A:

## Publishing Checklist

- [ ] Add briefing entry to src/components/Briefings.tsx
- [ ] Add static crawlable page in public/blog/
- [ ] Link from game card if matching game exists
- [ ] Add Japanese translations
- [ ] Run npm run typecheck
- [ ] Run npm run build
- [ ] Redeploy D:\\BG-English-Club\\dist to Netlify
- [ ] Share one short announcement
`;

await mkdir(outDir, { recursive: true });
await writeFile(outPath, draft, 'utf8');
console.log(`Created weekly draft: ${outPath}`);
