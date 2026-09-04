-- PostgreSQL/Supabase foundation. UUID generation uses pgcrypto.
create extension if not exists pgcrypto;

create table brand_settings (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  brand_name text not null default 'Artemis Mortgage',
  loan_officer_name text not null default 'Austin Bacon',
  brokerage text not null default 'Artemis Mortgage',
  phone text, email text, website text,
  nmls_information text, brokerage_disclosures text,
  logo_url text, headshot_url text,
  primary_color text not null default '#173f3a',
  accent_color text not null default '#c97b45',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table realtor_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  name text not null, brokerage text,
  phone text, email text, photo_url text, logo_url text, license_information text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table properties (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  address_line_1 text not null, city text not null, state text not null, postal_code text not null,
  county text, provider_name text, provider_external_id text,
  normalized_data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table property_snapshots (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id),
  normalized_data jsonb not null,
  raw_provider_response_id uuid,
  captured_at timestamptz not null default now()
);

create table provider_responses (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id),
  provider_name text not null, request_fingerprint text not null,
  response_payload jsonb not null, fetched_at timestamptz not null default now()
);

alter table property_snapshots add constraint property_snapshot_provider_response_fk
  foreign key (raw_provider_response_id) references provider_responses(id);

create table market_data_snapshots (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id),
  geography_type text not null, geography_identifier text not null,
  source text not null, metrics jsonb not null,
  period_start date, period_end date, captured_at timestamptz not null default now()
);

create table loan_scenarios (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id),
  name text not null, assumptions jsonb not null, calculated_results jsonb not null,
  created_at timestamptz not null default now()
);

create table investment_assumptions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id),
  assumptions jsonb not null, created_at timestamptz not null default now()
);

create table comparables (
  id uuid primary key default gen_random_uuid(),
  property_snapshot_id uuid not null references property_snapshots(id),
  comparable_type text not null check (comparable_type in ('sale', 'rental')),
  normalized_data jsonb not null
);

create table report_templates (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null, report_type text not null,
  name text not null, configuration jsonb not null, is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  property_snapshot_id uuid not null references property_snapshots(id),
  loan_scenario_id uuid references loan_scenarios(id),
  realtor_profile_id uuid references realtor_profiles(id),
  brand_settings_snapshot jsonb not null,
  report_type text not null, report_data_snapshot jsonb not null,
  status text not null default 'draft', public_slug text unique, pdf_url text,
  created_at timestamptz not null default now(), published_at timestamptz
);

create index properties_owner_idx on properties(owner_user_id);
create index reports_owner_created_idx on reports(owner_user_id, created_at desc);
create index property_snapshots_property_idx on property_snapshots(property_id, captured_at desc);

-- Enable RLS before production; policies should scope each row to auth.uid().
