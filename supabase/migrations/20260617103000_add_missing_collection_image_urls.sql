/*
  Add local image URLs for remaining personal collection cards that had no cover image.

  These image files live in public/images/collection and keep the Supabase catalogue
  aligned with the local fallback collection-preview.json.
*/

UPDATE games
SET cover_image_url = '/images/collection/153938.jpg', updated_at = now()
WHERE bgg_id = 153938 OR title = 'Camel Up';

UPDATE games
SET cover_image_url = '/images/collection/63268.png', updated_at = now()
WHERE bgg_id = 63268 OR title = 'Dobble';

UPDATE games
SET cover_image_url = '/images/collection/145399.jpg', updated_at = now()
WHERE bgg_id = 145399 OR title = 'Ginkgopolis: The Experts';

UPDATE games
SET cover_image_url = '/images/collection/13230.jpg', updated_at = now()
WHERE bgg_id = 13230 OR title = 'Gobblers';

UPDATE games
SET cover_image_url = '/images/collection/122515.jpg', updated_at = now()
WHERE bgg_id = 122515 OR title = 'Keyflower';

UPDATE games
SET cover_image_url = '/images/collection/30549.png', updated_at = now()
WHERE bgg_id = 30549 OR title = 'Pandemic: 10th Anniversary Edition';

UPDATE games
SET cover_image_url = '/images/collection/3076.jpg', updated_at = now()
WHERE bgg_id = 3076 OR title IN ('Puerto Rico', 'San Juan');

UPDATE games
SET cover_image_url = '/images/collection/173389.jpg', updated_at = now()
WHERE bgg_id = 173389 OR title = 'Rush Hour Shift';

UPDATE games
SET cover_image_url = '/images/collection/255984.png', updated_at = now()
WHERE bgg_id = 255984 OR title = 'Sleeping Gods';

UPDATE games
SET cover_image_url = '/images/collection/287670.jpg', updated_at = now()
WHERE bgg_id = 287670 OR title = 'Sleeping Gods: Dungeons';

UPDATE games
SET cover_image_url = '/images/collection/5432.jpg', updated_at = now()
WHERE bgg_id = 5432 OR title = 'Snakes & Ladders';

UPDATE games
SET cover_image_url = '/images/collection/2653.png', updated_at = now()
WHERE bgg_id = 2653 OR title = 'The Island';

UPDATE games
SET cover_image_url = '/images/collection/272409.jpg', updated_at = now()
WHERE bgg_id = 272409 OR title = 'Tiny Epic Tactics';

UPDATE games
SET cover_image_url = '/images/collection/252399.png', updated_at = now()
WHERE bgg_id = 252399 OR title = 'Vast: The Mysterious Manor';

UPDATE games
SET cover_image_url = '/images/collection/202174.png', updated_at = now()
WHERE bgg_id = 202174 OR title = 'Viticulture: Tuscany Essential Edition';
