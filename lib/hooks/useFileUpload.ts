import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/cloudflare";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

interface UploadOptions {
  file?: {
    arrayBuffer(): Promise<ArrayBuffer>;
    type?: string;
  };
  imageUrl?: string;
  uploadPath: string;
  contentType?: string;
  fileName?: string;
}

/**
 * Uploads a file or image URL to cloud storage.
 *
 * @param {UploadOptions} options - The options for file upload.
 * @returns {Promise<{url: string, path: string}>} The public URL and path of the uploaded file.
 *
 * **Functionality:**
 * - For images:
 *   - Optimizes the image using `sharp` and converts it to JPEG format.
 *   - Ignores the original file extension and saves the file with a `.jpeg` extension.
 * - For other file types (e.g., audio, PDF):
 *   - Preserves the original file's content type and extension.
 * - Generates a unique file name using UUID to prevent guessing or enumeration.
 * - Validates and sanitizes input to prevent path traversal attacks.
 * - Does not use any user-specific information in the file path to ensure privacy.
 */
export async function uploadFile({
  file,
  imageUrl,
  uploadPath,
  contentType,
  fileName,
}: UploadOptions) {
  try {
    let fileBuffer: Buffer;
    let finalFileName = fileName || `file-${uuidv4()}`;

    // Sanitize uploadPath to prevent path traversal
    uploadPath = uploadPath.replace(/[^a-zA-Z0-9-_\/]/g, "");

    if (file) {
      fileBuffer = Buffer.from(await file.arrayBuffer());

      // Detect content type if not provided
      if (!contentType && "type" in file) {
        contentType = file.type;
      }

      // Check if the file is an image
      if (contentType?.startsWith("image/")) {
        // Optimize image and convert to JPEG using sharp
        fileBuffer = await sharp(fileBuffer).jpeg({ quality: 80 }).toBuffer();
        // Ensure the file extension is .jpeg
        finalFileName = `${finalFileName.replace(/\.[^/.]+$/, "")}.jpeg`;
        contentType = "image/jpeg";
      }
      // No changes needed for other file types (audio, PDF, etc.)
    } else if (imageUrl) {
      // Fetch image from URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch image from URL: ${response.statusText}`
        );
      }
      fileBuffer = Buffer.from(await response.arrayBuffer());
      // Optimize image and convert to JPEG using sharp
      fileBuffer = await sharp(fileBuffer).jpeg({ quality: 80 }).toBuffer();
      finalFileName = `image-${uuidv4()}.jpeg`;
      contentType = "image/jpeg";
    } else {
      throw new Error("Either file or imageUrl must be provided.");
    }

    const filePath = `${uploadPath}/${finalFileName}`;

    // Upload the file to cloud storage using s3 client
    const putCommand = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: filePath,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await s3.send(putCommand);

    const publicUrl = `${process.env.STORAGE_PUBLIC_URL}/${filePath}`;
    return { url: publicUrl, path: filePath };
  } catch (error) {
    console.error("Error in file upload:", error);
    throw error;
  }
}
