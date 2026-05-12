-- ============================================================
-- Trusted Appliances · Schema Supabase
-- ============================================================
-- Cómo usar este archivo:
--   1) Abre tu proyecto Supabase → SQL Editor → New query.
--   2) Pega TODO este archivo y haz click en "Run".
--   3) Después crea el usuario admin (instrucciones al final).
-- ============================================================


-- ------------------------------------------------------------
-- 1) Tabla public.products
-- ------------------------------------------------------------
create table if not exists public.products (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  title               text   not null,
  category            text   not null
                              check (category in (
                                'lavadora', 'secadora', 'estufa',
                                'refrigerador', 'freezer', 'combo', 'otro'
                              )),
  price               numeric(10, 2),
  status              text   not null default 'disponible'
                              check (status in ('disponible', 'vendido', 'agotado')),

  brand               text,
  color               text,
  condition           text,
  short_description   text,
  image_url           text,

  featured            boolean not null default false,
  delivery_available  boolean not null default true,
  sort_order          integer default 100
);

create index if not exists products_status_idx       on public.products (status);
create index if not exists products_featured_idx     on public.products (featured);
create index if not exists products_sort_order_idx   on public.products (sort_order);
create index if not exists products_created_at_idx   on public.products (created_at desc);


-- Trigger que mantiene updated_at al día en cada UPDATE
create or replace function public.tg_set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.products;
create trigger set_updated_at
  before update on public.products
  for each row execute function public.tg_set_updated_at();


-- ------------------------------------------------------------
-- 2) RLS · Row Level Security
-- ------------------------------------------------------------
-- Cualquiera puede LEER productos (la web pública los necesita).
-- Solo usuarios autenticados pueden INSERTAR / ACTUALIZAR / BORRAR.
-- ------------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "Public can read products"           on public.products;
drop policy if exists "Authenticated can insert products"  on public.products;
drop policy if exists "Authenticated can update products"  on public.products;
drop policy if exists "Authenticated can delete products"  on public.products;

create policy "Public can read products"
  on public.products
  for select
  using (true);

create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);


-- ------------------------------------------------------------
-- 3) Storage bucket · product-images
-- ------------------------------------------------------------
-- Bucket público para alojar las fotos de producto.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;


-- Políticas del bucket
-- (las políticas de storage.objects se filtran por bucket_id)
drop policy if exists "Public can read product images"          on storage.objects;
drop policy if exists "Authenticated can upload product images" on storage.objects;
drop policy if exists "Authenticated can update product images" on storage.objects;
drop policy if exists "Authenticated can delete product images" on storage.objects;

create policy "Public can read product images"
  on storage.objects
  for select
  using (bucket_id = 'product-images');

create policy "Authenticated can upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated can update product images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "Authenticated can delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');


-- ============================================================
-- 4) Crear el primer usuario admin
-- ============================================================
-- Después de ejecutar lo de arriba, crea el admin desde el panel
-- de Supabase (NO desde SQL para evitar problemas con el hash):
--
--   Authentication → Users → Add user → "Create new user"
--     · Email:     admin@tu-dominio.com  (o el que prefieras)
--     · Password:  una contraseña fuerte
--     · "Auto Confirm User":  ✅ ACTIVADO
--
-- Después, en Authentication → Providers → Email:
--   · "Enable Sign Ups":  ❌ DESACTIVADO
--   (Para que solo entren los usuarios que tú crees a mano.)
-- ============================================================
