-- Drop existing tables and objects if they exist
DROP TABLE IF EXISTS public.file_uploads;

-- Create the file_uploads table with all required columns and constraints
CREATE TABLE public.file_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
    context TEXT, -- e.g., 'chat', 'vision', 'pdf document', etc.
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- For any additional context-specific data

    -- Unique constraint for files within same context
    CONSTRAINT file_uploads_unique_name UNIQUE (user_id, context, filename)
);

-- Enable RLS
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for file_uploads
CREATE POLICY "Users can insert their own files"
    ON public.file_uploads
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own files"
    ON public.file_uploads
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files"
    ON public.file_uploads
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX file_uploads_user_id_idx ON public.file_uploads(user_id);
CREATE INDEX file_uploads_chat_id_idx ON public.file_uploads(chat_id);
CREATE INDEX file_uploads_context_idx ON public.file_uploads(context);
CREATE INDEX file_uploads_created_at_idx ON public.file_uploads(created_at);

-- Grant necessary permissions
GRANT ALL ON public.file_uploads TO authenticated;
GRANT SELECT ON public.file_uploads TO public;