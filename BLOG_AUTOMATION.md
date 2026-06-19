# Blog Automation Procedure

Use the blog as a teaching library, not as a news diary. Each post should help a visitor choose one game, prepare one English focus, play with one useful question, and know what to do next.

## Two Blog Paths

### Silver Circle

Use this angle when the post is for seniors, retired adults, families helping a parent, or gentle community tables.

Focus on:

- Calm conversation
- Confidence
- Easy first sessions
- Short phrases
- Japanese support
- Community participation

Avoid:

- Medical promises
- Heavy strategy language
- Fast classroom language

### Corporate / Teacher

Use this angle when the post is for teachers, facilitators, companies, workshops, libraries, cafes, or community groups.

Focus on:

- Communication goals
- Facilitation notes
- Team discussion
- Printable aids
- Debrief questions
- Workshop structure

Avoid:

- Making it sound like only a casual hobby table
- Over-promising business outcomes

## Weekly Publishing Steps

1. Create a draft:

```powershell
npm run weekly:draft -- --game "Game Name" --lane "silver"
```

or:

```powershell
npm run weekly:draft -- --game "Game Name" --lane "corporate"
```

2. Fill in the draft in `content/weekly-drafts`.

3. Add the finished briefing content to `src/components/Briefings.tsx`.

4. Add or update the crawlable static blog page in `scripts/build-static-seo-pages.mjs`.

5. Regenerate SEO/static pages:

```powershell
npm run seo:build-pages
```

6. Check the app:

```powershell
npm run typecheck
npm run lint
npm run build
```

7. Commit and push:

```powershell
git add --
git commit -m "Add weekly briefing for Game Name"
git push
```

8. Wait for Netlify to redeploy.

9. Check:

- `/blog/`
- `/blog/game-name-english-briefing-card/`
- `/#briefings`
- Japanese toggle
- PDF/download links if included

## Suggested Post Format

1. Title: `Game Name English Briefing Card`
2. Opening: who this game helps
3. Why the game creates useful English
4. Simple rules
5. Useful phrases
6. Live table question
7. Silver Circle note
8. Corporate / teacher note
9. CTA: Table Play Tool, download PDF, or email contact

## Monthly Roundup

After four weekly posts, publish one roundup:

`Best Beginner Board Games For English Conversation In Fukuoka`

Structure:

- 4 games
- who each game helps
- one phrase per game
- one table question per game
- one CTA to trial/session/briefing group
