-- Create Chats table
CREATE TABLE IF NOT EXISTS public.chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;


-- Create RLS Policies
CREATE POLICY "Users can view own chats" ON public.chats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chats" ON public.chats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chats" ON public.chats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chats" ON public.chats
    FOR DELETE USING (auth.uid() = user_id);



-- Create Chat Documents table
CREATE TABLE IF NOT EXISTS public.chat_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE (id, created_at)
);

-- Enable RLS
ALTER TABLE public.chat_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat documents
CREATE POLICY "Users can view own chat documents" 
    ON public.chat_documents
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat documents" 
    ON public.chat_documents
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat documents" 
    ON public.chat_documents
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat documents" 
    ON public.chat_documents
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Handle versioning setup
ALTER TABLE public.chat_documents
    DROP CONSTRAINT IF EXISTS chat_documents_pkey CASCADE;

ALTER TABLE public.chat_documents
    ADD CONSTRAINT chat_documents_pkey
    PRIMARY KEY (id, created_at);

-- Create function to get latest version
CREATE OR REPLACE FUNCTION get_chat_document_latest_version(doc_id UUID)
    RETURNS TIMESTAMPTZ AS $$
BEGIN
    RETURN (
        SELECT MAX(created_at)
        FROM public.chat_documents
        WHERE id = doc_id
    );
END;
$$ LANGUAGE plpgsql;

-- Create function to handle document versioning
CREATE OR REPLACE FUNCTION handle_chat_document_version()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM public.chat_documents
        WHERE id = NEW.id 
        AND user_id = NEW.user_id
    ) THEN
        INSERT INTO public.chat_documents (
            id,
            user_id,
            title,
            content,
            created_at
        ) VALUES (
            NEW.id,
            NEW.user_id,
            NEW.title,
            NEW.content,
            NOW()
        );
        RETURN NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for document versioning
CREATE TRIGGER chat_document_version_trigger
    BEFORE UPDATE ON public.chat_documents
    FOR EACH ROW
    EXECUTE FUNCTION handle_chat_document_version();

-- Add function to get latest document version
CREATE OR REPLACE FUNCTION get_latest_chat_document(doc_id UUID, auth_user_id UUID)
    RETURNS TABLE (
        id UUID,
        user_id UUID,
        title TEXT,
        content TEXT,
        created_at TIMESTAMPTZ
    ) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id, 
        d.user_id, 
        d.title, 
        d.content, 
        d.created_at
    FROM public.chat_documents d
    WHERE d.id = doc_id
    AND d.user_id = auth_user_id
    AND d.created_at = get_chat_document_latest_version(d.id);
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Create indexes
CREATE INDEX idx_chat_documents_user_id 
    ON public.chat_documents(user_id);

CREATE INDEX idx_chat_documents_created_at 
    ON public.chat_documents(created_at);

CREATE INDEX idx_chat_documents_title 
    ON public.chat_documents(title);

CREATE UNIQUE INDEX idx_chat_documents_latest_version
    ON public.chat_documents(id, user_id, created_at DESC);

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_latest_chat_document TO authenticated;
GRANT EXECUTE ON FUNCTION get_chat_document_latest_version TO authenticated;

-- Create indexes for chats
CREATE INDEX idx_chats_user_id ON public.chats(user_id);
CREATE INDEX idx_chats_created_at ON public.chats(created_at);
CREATE INDEX idx_chats_updated_at ON public.chats(updated_at);

-- Create Messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for messages
CREATE INDEX idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX idx_messages_role ON public.messages(role);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_messages_content ON public.messages USING gin (content);

-- Enable RLS for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Add message policies
CREATE POLICY "Users can view messages from their chats" ON public.messages
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.chats WHERE id = chat_id
        )
    );

CREATE POLICY "Users can create messages in their chats" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM public.chats WHERE id = chat_id
        )
    );

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER handle_chats_updated_at
    BEFORE UPDATE ON public.chats
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
