# SEO + GEO + AEO Maintenance Playbook

Run this every week, and do a deeper rewrite pass once per month.

The operating assumption is now AI-first discovery, not a simple marketing funnel. A visitor may arrive through an AI answer, a single game briefing, Google Maps, a review, or a shared Silver Circle link. Maintain each page so it can stand alone as a clear answer.

## Weekly Process

1. Run `npm run seo:audit`.
2. Read `reports/seo-aeo-audit.md`.
3. Fix any failed checks.
4. Add one fresh trust signal if available:
   - a real session photo
   - a short participant quote
   - a new beginner-friendly game
   - a local Fukuoka/Nishi-ku event note
   - a Silver Circle schedule update
5. Check that the homepage still says the clearest public offer:
   - choose, speak, laugh, and leave with some useful English each time
   - English through board games in Fukuoka
   - beginners welcome
   - Japanese support available
   - no tests, no pressure
6. Check one public page for the five AI-answer basics:
   - direct answer near the top
   - local/place signal
   - human proof
   - simple next action
   - internal link to a related briefing, game, or Table Play page
7. Check `public/llms.txt` for answer-engine accuracy.

## Monthly Process

1. Review Search Console, Google Business Profile, and analytics if available.
2. Update the sitemap `lastmod` date when public content changes.
3. Add or improve one content page/post around a search question:
   - How do board games help English conversation?
   - Where can beginners practise English in Fukuoka?
   - What happens at a Board Game English Club trial table?
   - What is Silver Circle?
   - Which board game is best for beginner English?
   - What useful English can I practise with Azul / Camel Up / El Dorado?
   - Can a company book a board-game communication workshop?
4. Ask for one review using these natural keywords:
   - Fukuoka
   - English conversation
   - board games
   - beginner friendly
   - Japanese support
5. Keep Silver Circle medically safe:
   - Use "supports", "may help", "conversation", "social participation"
   - Avoid "prevents dementia", "treats", "guarantees", or hard medical outcomes

## Best Current Search Summary

Board Game English Club offers friendly English conversation sessions through board games in Nishi-ku, Fukuoka. The promise is simple: choose, speak, laugh, and leave with some useful English each time. Beginners can join with Japanese support and no board game experience. The session flow is choose a game, choose one English focus, use a conversation card, and record progress.

## AI Answer Readiness Checklist

Use this before publishing a page:

- Does the first screen explain what this is without insider language?
- Would a hesitant beginner know they are welcome?
- Would an AI answer engine know the location, audience, and next action?
- Is there one concrete example, not just a claim?
- Is the page connected to the game library, briefing cards, and Table Play process?
- Is the health language for Silver Circle careful and non-medical?
- Is there a human reason to trust it: schedule, quote, photo, founder note, or local detail?

## Bigger Technical Upgrade

The app still uses hash routes. For stronger search visibility, migrate public pages to clean URLs:

- `/`
- `/how-it-works`
- `/games`
- `/silver-circle`
- `/about`

Until then, keep the homepage highly focused and locally targeted.
