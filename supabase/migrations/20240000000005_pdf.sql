-- 1. First we need to create the necessary SQL tables
create extension vector;

-- Create conversations table to store user chat history
create table
  public.conversations (
    id uuid not null default uuid_generate_v4 (),
    user_id uuid null,
    model_used text not null,
    conversation jsonb null default '[]'::jsonb,
    created_at timestamp without time zone null default now(),
    updated_at timestamp without time zone null default now(),
    title text null,
    type text null,
    constraint conversations_pkey primary key (id),
    constraint conversations_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
  ) tablespace pg_default;

-- Create a table to store document information
create table
  public.pdf_documents (
    id uuid not null default gen_random_uuid (),
    file_url text null,
    file_name text null,
    user_id uuid null,
    created_at timestamp without time zone null default current_timestamp,
    size numeric null,
    conversation_id uuid null,
    constraint pdf_documents_pkey primary key (id),
    constraint pdf_documents_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade,
    constraint pdf_documents_conversation_fkey foreign key (conversation_id) references conversations (id)
  ) tablespace pg_default;

-- Add an index for user_id for faster queries
create index idx_pdf_documents_user_id on public.pdf_documents using btree (user_id);

-- Add an index for created_at for sorting
create index idx_pdf_documents_created_at on public.pdf_documents using btree (created_at);

-- Create embeddings table to store your vectors
create table
  public.embeddings (
    id uuid not null default gen_random_uuid (),
    document_id uuid null,
    content text null,
    embedding public.vector null,
    metadata jsonb null,
    created_at timestamp without time zone null default current_timestamp,
    constraint embeddings_pkey primary key (id),
    constraint embeddings_document_id_fkey foreign key (document_id) references pdf_documents (id) on update cascade on delete cascade
  ) tablespace pg_default;


-- 2. Now we create the search vector function to search for embeddings
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default null,
  filter jsonb default '{}'
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    embeddings.id,
    embeddings.content,
    embeddings.metadata,
    (embeddings.embedding::text)::jsonb as embedding,
    1 - (embeddings.embedding <=> query_embedding) as similarity
  from embeddings
  where embeddings.metadata @> filter
  order by embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- 3. Finally we enable Row-Level Security on the tables
ALTER TABLE pdf_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for pdf_documents table
CREATE POLICY "Users can select their own pdf_documents"
ON pdf_documents
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pdf_documents"
ON pdf_documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pdf_documents"
ON pdf_documents
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pdf_documents"
ON pdf_documents
FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for embeddings table
CREATE POLICY "Users can select their own embeddings"
ON embeddings
FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM pdf_documents WHERE id = embeddings.document_id));

CREATE POLICY "Users can insert their own embeddings"
ON embeddings
FOR INSERT
WITH CHECK (auth.uid() IN (SELECT user_id FROM pdf_documents WHERE id = embeddings.document_id));

CREATE POLICY "Users can update their own embeddings"
ON embeddings
FOR UPDATE
USING (auth.uid() IN (SELECT user_id FROM pdf_documents WHERE id = embeddings.document_id));

CREATE POLICY "Users can delete their own embeddings"
ON embeddings
FOR DELETE
USING (auth.uid() IN (SELECT user_id FROM pdf_documents WHERE id = embeddings.document_id));

-- Create policies for conversations table
CREATE POLICY "Users can select their own conversations"
ON conversations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
ON conversations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
ON conversations
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
ON conversations
FOR DELETE
USING (auth.uid() = user_id);

-- Force all access to tables to be controlled by RLS
ALTER TABLE pdf_documents FORCE ROW LEVEL SECURITY;
ALTER TABLE embeddings FORCE ROW LEVEL SECURITY;
ALTER TABLE conversations FORCE ROW LEVEL SECURITY;
