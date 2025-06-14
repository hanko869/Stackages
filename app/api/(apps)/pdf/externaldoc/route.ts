import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";

/**
 * API Route: Handles external PDF document registration.
 *
 * **Features:**
 * - Registers external PDF URLs in the system
 * - Enforces document limits per user
 * - Maintains document metadata without file storage
 * - Supports integration with external document sources
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Validates user's document count limit
 * 3. Registers external document URL
 * 4. Creates document metadata entry
 *
 * **Limitations:**
 * - Maximum 10 documents per user
 * - Requires valid external URL
 * - URL must point to accessible PDF
 *
 * @param {NextRequest} request - Contains URL and fileName for external document
 * @returns {Promise<NextResponse>} Document ID and URL confirmation
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { url, fileName } = await request.json();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to ingest data",
    });
  }

  // Check document limit
  const { data: docCount, error: countError } = await supabase
    .from("pdf_documents")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (countError || (docCount && docCount.length > 10)) {
    return NextResponse.json({
      error: "You have reached the maximum (10) number of documents.",
    });
  }

  try {
    // Register external document
    const { data, error: insertError } = await supabase
      .from("pdf_documents")
      .insert([
        {
          file_url: url,
          file_name: fileName,
          user_id: userId,
          size: null, // Size unknown for external documents
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting document metadata:", insertError);
      return new NextResponse(
        JSON.stringify({
          error: "An error occurred while saving document metadata.",
        }),
        { status: 500 }
      );
    }

    return new NextResponse(JSON.stringify({ documentId: data[0].id, url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in URL document addition:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          (error as Error).message ||
          "An error occurred during the URL document addition process.",
      }),
      { status: 500 }
    );
  }
}
