import { SupabaseClient } from "@supabase/supabase-js";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string;
          id: string;
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      pdf_documents: {
        Row: {
          conversation_id: string | null;
          created_at: string | null;
          file_name: string | null;
          file_url: string | null;
          id: string;
          size: number | null;
          user_id: string | null;
        };
        Insert: {
          conversation_id?: string | null;
          created_at?: string | null;
          file_name?: string | null;
          file_url?: string | null;
          id?: string;
          size?: number | null;
          user_id?: string | null;
        };
        Update: {
          conversation_id?: string | null;
          created_at?: string | null;
          file_name?: string | null;
          file_url?: string | null;
          id?: string;
          size?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pdf_documents_conversation_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pdf_documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      conversations: {
        Row: {
          conversation: Json | null;
          created_at: string | null;
          id: string;
          model_used: string;
          title: string | null;
          type: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          conversation?: Json | null;
          created_at?: string | null;
          id?: string;
          model_used: string;
          title?: string | null;
          type?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          conversation?: Json | null;
          created_at?: string | null;
          id?: string;
          model_used?: string;
          title?: string | null;
          type?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      chat_documents: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      embeddings: {
        Row: {
          content: string | null;
          created_at: string | null;
          document_id: string | null;
          embedding: string | null;
          id: string;
          metadata: Json | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          document_id?: string | null;
          embedding?: string | null;
          id?: string;
          metadata?: Json | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          document_id?: string | null;
          embedding?: string | null;
          id?: string;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      file_uploads: {
        Row: {
          bucket_id: string;
          chat_id: string;
          content_type: string;
          created_at: string;
          filename: string;
          id: string;
          original_name: string;
          size: number;
          storage_path: string;
          url: string;
          user_id: string;
          version: number;
        };
        Insert: {
          bucket_id?: string;
          chat_id: string;
          content_type: string;
          created_at?: string;
          filename: string;
          id?: string;
          original_name: string;
          size: number;
          storage_path: string;
          url: string;
          user_id: string;
          version?: number;
        };
        Update: {
          bucket_id?: string;
          chat_id?: string;
          content_type?: string;
          created_at?: string;
          filename?: string;
          id?: string;
          original_name?: string;
          size?: number;
          storage_path?: string;
          url?: string;
          user_id?: string;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "file_uploads_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          }
        ];
      };
      generations: {
        Row: {
          created_at: string;
          description: string | null;
          email: string | null;
          id: string;
          input_data: Json | null;
          model: string | null;
          output_data: Json | null;
          slug: string | null;
          subtitle: string | null;
          title: string | null;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          input_data?: Json | null;
          model?: string | null;
          output_data?: Json | null;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          input_data?: Json | null;
          model?: string | null;
          output_data?: Json | null;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          chat_id: string;
          content: Json;
          created_at: string;
          id: string;
          role: string;
          updated_at: string;
        };
        Insert: {
          chat_id: string;
          content: Json;
          created_at?: string;
          id?: string;
          role: string;
          updated_at?: string;
        };
        Update: {
          chat_id?: string;
          content?: Json;
          created_at?: string;
          id?: string;
          role?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          credits: number | null;
          email: string | null;
          full_name: string | null;
          id: string;
          purchase: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          credits?: number | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          purchase?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          credits?: number | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          purchase?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          created_at: string | null;
          github_username: string | null;
          id: number;
          payload: Json | null;
          provider: string | null;
          purchase_id: string | null;
          type: string | null;
          user_email: string | null;
        };
        Insert: {
          created_at?: string | null;
          github_username?: string | null;
          id?: number;
          payload?: Json | null;
          provider?: string | null;
          purchase_id?: string | null;
          type?: string | null;
          user_email?: string | null;
        };
        Update: {
          created_at?: string | null;
          github_username?: string | null;
          id?: number;
          payload?: Json | null;
          provider?: string | null;
          purchase_id?: string | null;
          type?: string | null;
          user_email?: string | null;
        };
        Relationships: [];
      };
      recordings: {
        Row: {
          created_at: string | null;
          file_url: string;
          id: string;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          file_url: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          file_url?: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recordings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      summaries: {
        Row: {
          action_items: string | null;
          created_at: string | null;
          id: string;
          model: string;
          recording_id: string | null;
          summary: string;
          title: string | null;
        };
        Insert: {
          action_items?: string | null;
          created_at?: string | null;
          id?: string;
          model: string;
          recording_id?: string | null;
          summary: string;
          title?: string | null;
        };
        Update: {
          action_items?: string | null;
          created_at?: string | null;
          id?: string;
          model?: string;
          recording_id?: string | null;
          summary?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "summaries_recording_id_fkey";
            columns: ["recording_id"];
            isOneToOne: false;
            referencedRelation: "recordings";
            referencedColumns: ["id"];
          }
        ];
      };
      transcripts: {
        Row: {
          chunks: Json | null;
          created_at: string | null;
          id: string;
          model: string;
          recording_id: string | null;
          transcript: string;
        };
        Insert: {
          chunks?: Json | null;
          created_at?: string | null;
          id?: string;
          model: string;
          recording_id?: string | null;
          transcript: string;
        };
        Update: {
          chunks?: Json | null;
          created_at?: string | null;
          id?: string;
          model?: string;
          recording_id?: string | null;
          transcript?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transcripts_recording_id_fkey";
            columns: ["recording_id"];
            isOneToOne: false;
            referencedRelation: "recordings";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_document_latest_version: {
        Args: {
          doc_id: string;
        };
        Returns: string;
      };
      get_latest_document: {
        Args: {
          doc_id: string;
          auth_user_id: string;
        };
        Returns: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          created_at: string;
        }[];
      };
      get_next_file_version: {
        Args: {
          p_bucket_id: string;
          p_storage_path: string;
        };
        Returns: number;
      };
      gtrgm_compress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gtrgm_options: {
        Args: {
          "": unknown;
        };
        Returns: undefined;
      };
      gtrgm_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      hnswhandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      match_documents: {
        Args: {
          query_embedding: string;
          match_count?: number;
          filter?: Json;
        };
        Returns: {
          id: string;
          content: string;
          metadata: Json;
          embedding: Json;
          similarity: number;
        }[];
      };
      replace_api_routes: {
        Args: {
          frontend_code: string;
        };
        Returns: string;
      };
      set_limit: {
        Args: {
          "": number;
        };
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: {
          "": string;
        };
        Returns: string[];
      };
      vector_avg: {
        Args: {
          "": number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export type Client = SupabaseClient<Database>;

export type MessageRole = "user" | "assistant" | "system" | "tool";

// Add types for tool invocations and annotations
export interface ToolInvocation {
  state: "call" | "result";
  toolCallId: string;
  toolName: string;
  args?: any;
  result?: any;
}

export interface MessageAnnotation {
  messageIdFromServer?: string;
}

// Update Message interface to match AI library format
export interface Message {
  id: string;
  chat_id: string;
  role: MessageRole;
  content: string | Record<string, unknown>;
  created_at: string;
  toolInvocations?: ToolInvocation[];
  annotations?: MessageAnnotation[];
}

export interface PostgrestError {
  code: string;
  message: string;
  details: string | null;
  hint: string | null;
}

export function handleDatabaseError(error: PostgrestError | null) {
  if (!error) return null;

  console.error("Database error:", error);

  switch (error.code) {
    case "23505": // Unique violation
      if (error.message.includes("messages_pkey")) {
        throw new Error("Message ID already exists");
      }
      if (error.message.includes("chats_pkey")) {
        throw new Error("Chat ID already exists");
      }
      throw new Error("Unique constraint violation");
    case "23503": // Foreign key violation
      throw new Error("Referenced record does not exist");
    case "42501": // RLS violation
      throw new Error("Unauthorized access");
    case "PGRST116": // Not found
      return null;
    case "PGRST204": // Column not found
      throw new Error("Invalid column name");
    default:
      throw error;
  }
}

// Add Document type
export type Document = Database["public"]["Tables"]["chat_documents"]["Row"];
export type Chat = Database["public"]["Tables"]["chats"]["Row"];

// Add DatabaseMessage type to match the database schema
export interface DatabaseMessage {
  id: string;
  chat_id: string;
  role: string;
  content: string; // Always stored as string in database
  created_at: string;
}

// Helper function to convert between formats
export function convertToDBMessage(message: Message): DatabaseMessage {
  let content = message.content;

  // Convert content to string if it's an object
  if (typeof content === "object") {
    const messageData: any = { content };

    // Add tool invocations if present
    if (message.toolInvocations?.length) {
      messageData.toolInvocations = message.toolInvocations;
    }

    // Add annotations if present
    if (message.annotations?.length) {
      messageData.annotations = message.annotations;
    }

    content = JSON.stringify(messageData);
  }

  return {
    id: message.id,
    chat_id: message.chat_id,
    role: message.role,
    content: content as string,
    created_at: message.created_at,
  };
}

// Helper function to parse database message
export function parseDBMessage(dbMessage: DatabaseMessage): Message {
  try {
    const content = JSON.parse(dbMessage.content);

    // Check if content is a message data object
    if (content && typeof content === "object" && "content" in content) {
      return {
        ...dbMessage,
        content: content.content,
        toolInvocations: content.toolInvocations,
        annotations: content.annotations,
        role: dbMessage.role as MessageRole,
      };
    }

    // If not a special format, return as is
    return {
      ...dbMessage,
      content: dbMessage.content,
      role: dbMessage.role as MessageRole,
    };
  } catch {
    // If not valid JSON, return as plain text
    return {
      ...dbMessage,
      content: dbMessage.content,
      role: dbMessage.role as MessageRole,
    };
  }
}

// Add these types to your existing types file

export interface FileUpload {
  id: string;
  created_at: string;
  chat_id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  public_url: string;
}

export interface StorageError {
  message: string;
  statusCode: string;
}
