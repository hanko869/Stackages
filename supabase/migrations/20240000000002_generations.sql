-- Create generations table
create table
  public.generations (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    email text null,
    input_data jsonb null,
    output_data jsonb null,
    model text null,
    type text null,
    title text null,
    subtitle text null,
    description text null,
    slug text null,
    constraint marketing_growth_pkey primary key (id)
  ) tablespace pg_default;

-- Create indexes for better performance
CREATE INDEX idx_generations_created_at ON public.generations(created_at);
CREATE INDEX idx_generations_email ON public.generations(email);
CREATE INDEX idx_generations_model ON public.generations(model);
CREATE INDEX idx_generations_type ON public.generations(type);
CREATE INDEX idx_generations_slug ON public.generations(slug);
CREATE INDEX idx_generations_title ON public.generations(title);
CREATE INDEX idx_generations_input_data ON public.generations USING gin (input_data);
CREATE INDEX idx_generations_output_data ON public.generations USING gin (output_data);

-- Enable Row Level Security
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for SELECT (Reading data)
CREATE POLICY "AI responses are public and readable by anyone." ON public.generations FOR
SELECT
  USING (TRUE);

-- Create a policy for INSERT (Adding data)
CREATE POLICY "Allow insert into generations" ON public.generations FOR INSERT
WITH
  CHECK (TRUE);
