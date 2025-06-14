import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

/**
 * Document API Endpoints
 *
 * GET /api/document?id={documentId}
 * - Gets both latest version and version history of a document
 * - Used when loading a document in the editor
 *
 * POST /api/document?id={documentId}
 * - Creates a new document or updates existing one
 * - Handles document versioning automatically
 * - Used for saving documents
 *
 * PATCH /api/document?id={documentId}
 * - Updates only specific fields of a document
 * - Used for partial updates like title changes
 */

export async function GET(req: NextRequest) {
  // 1. Check if user is logged in
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) return authResponse;

  try {
    // 2. Get document ID from URL
    const { id } = Object.fromEntries(new URL(req.url).searchParams);
    const supabase = createClient();

    // 3. Get latest version
    const { data: latestVersion, error: latestError } = await supabase
      .from("chat_documents")
      .select("*")
      .eq("id", id)
      .eq("user_id", (req as any).user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (latestError) throw latestError;

    // 4. Get version history
    const { data: versions, error: versionsError } = await supabase
      .from("chat_documents")
      .select("*")
      .eq("id", id)
      .eq("user_id", (req as any).user.id)
      .order("created_at", { ascending: true });

    if (versionsError) throw versionsError;

    // 5. Return all versions
    return NextResponse.json(versions);
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) return authResponse;

  try {
    const { id } = Object.fromEntries(new URL(req.url).searchParams);
    const { content, title } = await req.json();
    const supabase = createClient();

    // Create new version with current timestamp
    const newVersion = {
      id,
      content,
      title,
      user_id: (req as any).user.id,
      created_at: new Date().toISOString(), // This creates a new version
    };

    const { error } = await supabase.from("chat_documents").insert(newVersion);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving document:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) return authResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { timestamp } = await req.json();
    const supabase = createClient();

    // 1. First get the version we want to restore
    const { data: versionToRestore, error: fetchError } = await supabase
      .from("chat_documents")
      .select("*")
      .eq("id", id)
      .eq("user_id", (req as any).user.id)
      .eq("created_at", timestamp)
      .single();

    if (fetchError) throw fetchError;
    if (!versionToRestore) throw new Error("Version not found");

    // 2. Create new version with content from the old version
    const newVersion = {
      id,
      content: versionToRestore.content,
      title: versionToRestore.title,
      user_id: (req as any).user.id,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("chat_documents").insert(newVersion);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error restoring document version:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
