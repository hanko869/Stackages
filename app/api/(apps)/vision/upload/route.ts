import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { v4 as uuidv4 } from "uuid";

/**
 * API Route: Handles image uploads for the Vision app.
 *
 * This route supports both file uploads and image URL uploads.
 * - For uploaded files:
 *   - Accepts multipart/form-data with an image file.
 * - For image URLs:
 *   - Accepts application/json with an `imageUrl` field.
 *
 * **Process:**
 * 1. Authenticates the user.
 * 2. Extracts the file or image URL from the request.
 * 3. Generates a unique file name using UUID.
 * 4. Calls `uploadFile` to handle the upload and optimization.
 * 5. Returns the public URL and path of the uploaded image.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} JSON response containing the uploaded image URL and path.
 */
export async function POST(request: NextRequest) {
  // Authenticate user and get user data
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) return authResponse;

  // Get user from the middleware-enhanced request
  const user = (request as any).user;

  try {
    const contentType = request.headers.get("content-type");
    let file: File | null = null;
    let imageUrl: string | undefined;
    const uploadPath = "vision"; // Fixed upload path for vision images
    const uuid = uuidv4(); // Generate a UUID for file naming

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      file = formData.get("image") as File | null;
      if (!file) {
        throw new Error("No image file uploaded.");
      }
    } else if (contentType?.includes("application/json")) {
      const requestBody = await request.json();
      imageUrl = requestBody.imageUrl;
      if (!imageUrl) {
        throw new Error("No image URL provided.");
      }
    } else {
      throw new Error("Unsupported content type.");
    }

    // Generate a unique file name
    const fileName = `image-${uuid}`;

    // Prepare upload options, conditionally including file or imageUrl
    const uploadOptions = {
      uploadPath,
      fileName,
      userId: user.id,
      ...(file ? { file } : {}),
      ...(imageUrl ? { imageUrl } : {}),
    };

    // Call uploadFile with the prepared options
    const { url: publicUrl, path: filePath } = await uploadFile(uploadOptions);

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
