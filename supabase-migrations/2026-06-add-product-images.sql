-- ============================================================
-- Migración: galería de fotos por producto
-- ============================================================
-- Añade una columna `images` (array de URLs) a products para
-- soportar varias fotos por producto. La primera foto del array
-- es la portada (se refleja también en image_url).
--
-- Cómo correr:
--   Supabase → SQL Editor → New query → pega esto → Run.
-- Es idempotente (se puede correr varias veces sin problema).
-- ============================================================
alter table public.products
  add column if not exists images text[] not null default '{}';

-- Backfill: para productos que ya tienen image_url pero el array vacío,
-- inicializa images = [image_url].
update public.products
  set images = array[image_url]
  where image_url is not null
    and image_url <> ''
    and (images is null or array_length(images, 1) is null);
