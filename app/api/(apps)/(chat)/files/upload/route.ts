import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { createClient } from "@/lib/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { saveChat } from "@/lib/db/mutations";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB in bytes

/**
 * API Route: Handles file uploads for the Chat app.
 *
 * This route handles file uploads and stores metadata in Supabase while
 * uploading the actual file to Cloudflare Storage.
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Validates the uploaded file and chatId
 * 3. Generates a unique file name using UUID
 * 4. Uploads file to Cloudflare Storage
 * 5. Stores file metadata in Supabase
 * 6. Returns the public URL and path
 *
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response containing the uploaded file URL and path
 */
export async function POST(request: NextRequest) {
  // Authenticate user
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const chatId = formData.get("chatId") as string;

    if (!file) throw new Error("No file provided");
    if (!chatId) throw new Error("No chatId provided");

    // Check file size before processing
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size exceeds maximum limit of 5MB",
          code: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Check if chat exists, if not create it
    const { data: existingChat } = await supabase
      .from("chats")
      .select("id")
      .eq("id", chatId)
      .single();

    if (!existingChat) {
      await saveChat({
        id: chatId,
        userId: user.id,
        title: "New Chat", // This will be updated when the first message is sent
      });
    }

    // Generate unique filename and path
    const uuid = uuidv4();
    const sanitizedOriginalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const fileName = `${uuid}-${sanitizedOriginalName}`;
    const uploadPath = `chat/files/${uuid}`;

    // Upload file to Cloudflare with skipMetadata
    const {
      url: publicUrl,
      path: filePath,
      size,
    } = await uploadFile({
      file,
      fileName,
      uploadPath,
      skipMetadata: true, // Skip metadata storage in uploadFile
    });

    // Store file metadata in Supabase with chat-specific fields
    const { error: dbError } = await supabase.from("file_uploads").insert({
      user_id: user.id,
      chat_id: chatId,
      context: "chat",
      filename: fileName,
      original_name: file.name,
      content_type: file.type,
      size: size,
      url: publicUrl,
      metadata: {
        uploadPath,
        contentType: file.type,
      },
    });

    if (dbError) throw dbError;

    return NextResponse.json(
      { url: publicUrl, path: filePath },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An error occurred during the file upload process.",
      },
      { status: 500 }
    );
  }
}
