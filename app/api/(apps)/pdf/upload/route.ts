import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { reduceUserCredits } from "@/lib/db/mutations";
import { toolConfig } from "@/app/(apps)/pdf/toolConfig";
import { uploadFile } from "@/lib/hooks/useFileUpload";

/**
 * API Route: Handles PDF file uploads for the PDF app.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Checks if the user has reached their document limit.
 * 3. Extracts the PDF file from the request.
 * 4. Generates a unique file name using UUID.
 * 5. Calls `uploadFile` to handle the upload.
 * 6. Stores document metadata in the database.
 * 7. Reduces user credits if paywall is enabled.
 * 8. Returns the public URL, file path, and document ID.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} JSON response containing the uploaded document details.
 */
export async function POST(request: Request) {
  const supabase = createClient();

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userId) {
    return NextResponse.json(
      { error: "You must be logged in to upload documents." },
      { status: 401 }
    );
  }

  // Check if user has reached the maximum number of documents
  const { count, error: countError } = await supabase
    .from("pdf_documents")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (countError) {
    console.error("Error checking document count:", countError);
    return NextResponse.json(
      {
        error: "An error occurred while checking your document count.",
      },
      { status: 500 }
    );
  }

  if (count && count >= 10) {
    return NextResponse.json(
      {
        error: "You have reached the maximum (10) number of documents.",
      },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const uploadPath = "documents"; // Fixed upload path for documents

    if (!file) {
      throw new Error("No document file uploaded.");
    }

    const uuid = uuidv4(); // Generate a UUID for file naming
    const fileName = `document-${uuid}`; // Unique file name without extension
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Convert size to MB

    console.log(`File Size: ${fileSizeMB} MB`);
    console.log("Uploading document...");

    // Call uploadFile to handle the upload
    const { url: publicUrl, path: filePath } = await uploadFile({
      file,
      uploadPath,
      fileName,
      contentType: file.type, // Use the original content type
      userId,
    });

    console.log("Inserting document metadata...");

    // Insert document metadata into Supabase
    const { data, error: insertError } = await supabase
      .from("pdf_documents")
      .insert([
        {
          file_url: publicUrl,
          file_name: file.name,
          user_id: userId,
          size: parseFloat(fileSizeMB),
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting document metadata:", insertError);
      return NextResponse.json(
        {
          error: "An error occurred while saving document metadata.",
        },
        { status: 500 }
      );
    }

    // Reduce user credits if paywall is enabled
    if (toolConfig.paywall === true && userEmail) {
      await reduceUserCredits(userEmail, toolConfig.credits);
    }

    const documentId = data[0].id;

    return NextResponse.json(
      {
        url: publicUrl,
        path: filePath,
        documentId: documentId,
      },
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
