-- ============================================
-- FinançasFamília — Schema Supabase
-- ============================================

create table if not exists incomes (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  description text not null,
  amount      numeric not null check (amount > 0),
  type        text not null default 'salario',
  member      text not null check (member in ('eu', 'marido')),
  date        date not null
);

create table if not exists transactions (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  description text not null,
  amount      numeric not null check (amount > 0),
  category    text not null,
  member      text not null check (member in ('eu', 'marido')),
  date        date not null,
  notes       text
);

alter table incomes enable row level security;
alter table transactions enable row level security;

create policy "public access incomes" on incomes for all using (true) with check (true);
create policy "public access transactions" on transactions for all using (true) with check (true);

create index if not exists idx_transactions_date on transactions (date);
create index if not exists idx_transactions_member on transactions (member);
create index if not exists idx_incomes_date on incomes (date);
create index if not exists idx_incomes_member on incomes (member);

alter publication supabase_realtime add table incomes;
alter publication supabase_realtime add table transactions;
