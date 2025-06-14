-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the recordings table
create table
  public.recordings (
    id uuid not null default gen_random_uuid (),
    user_id uuid null,
    file_url text not null,
    created_at timestamp without time zone null default current_timestamp,
    title text null,
    constraint recordings_pkey primary key (id),
    constraint recordings_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
  ) tablespace pg_default;

-- Create the transcripts table
create table
  public.transcripts (
    id uuid not null default gen_random_uuid (),
    recording_id uuid null,
    transcript text not null,
    model text not null,
    created_at timestamp without time zone null default current_timestamp,
    chunks jsonb null,
    constraint transcripts_pkey primary key (id),
    constraint transcripts_recording_id_fkey foreign key (recording_id) references recordings (id) on delete cascade
  ) tablespace pg_default;

-- Create the summaries table
create table
  public.summaries (
    id uuid not null default gen_random_uuid (),
    recording_id uuid null,
    summary text not null,
    action_items text null,
    model text not null,
    created_at timestamp without time zone null default current_timestamp,
    title text null,
    constraint summaries_pkey primary key (id),
    constraint summaries_recording_id_fkey foreign key (recording_id) references recordings (id) on delete cascade
  ) tablespace pg_default;

-- Enable Row-Level Security on the tables
ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Create policies for recordings table
CREATE POLICY "Users can select their own recordings"
ON recordings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recordings"
ON recordings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recordings"
ON recordings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recordings"
ON recordings
FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for transcripts table
CREATE POLICY "Users can select their own transcripts"
ON transcripts
FOR SELECT
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can insert their own transcripts"
ON transcripts
FOR INSERT
WITH CHECK (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can update their own transcripts"
ON transcripts
FOR UPDATE
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can delete their own transcripts"
ON transcripts
FOR DELETE
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

-- Create policies for summaries table
CREATE POLICY "Users can select their own summaries"
ON summaries
FOR SELECT
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can insert their own summaries"
ON summaries
FOR INSERT
WITH CHECK (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can update their own summaries"
ON summaries
FOR UPDATE
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

CREATE POLICY "Users can delete their own summaries"
ON summaries
FOR DELETE
USING (auth.uid() = (SELECT user_id FROM recordings WHERE recordings.id = recording_id));

-- Force all access to tables to be controlled by RLS
ALTER TABLE recordings FORCE ROW LEVEL SECURITY;
ALTER TABLE transcripts FORCE ROW LEVEL SECURITY;
ALTER TABLE summaries FORCE ROW LEVEL SECURITY;

-- Create indexes for recordings table
CREATE INDEX idx_recordings_user_id ON public.recordings(user_id);
CREATE INDEX idx_recordings_created_at ON public.recordings(created_at);

-- Create indexes for transcripts table
CREATE INDEX idx_transcripts_recording_id ON public.transcripts(recording_id);
CREATE INDEX idx_transcripts_created_at ON public.transcripts(created_at);
CREATE INDEX idx_transcripts_model ON public.transcripts(model);
CREATE INDEX idx_transcripts_chunks ON public.transcripts USING gin (chunks);

-- Create indexes for summaries table
CREATE INDEX idx_summaries_recording_id ON public.summaries(recording_id);
CREATE INDEX idx_summaries_created_at ON public.summaries(created_at);
CREATE INDEX idx_summaries_model ON public.summaries(model);

