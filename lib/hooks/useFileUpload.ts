import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/clients/cloudflare";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/utils/supabase/service";

interface UploadOptions {
  file?: {
    arrayBuffer(): Promise<ArrayBuffer>;
    type?: string;
    name?: string;
  };
  imageUrl?: string;
  uploadPath: string;
  contentType?: string;
  fileName?: string;
  skipMetadata?: boolean;
  userId?: string;
  chatId?: string;
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
  skipMetadata = false,
  userId,
  chatId,
}: UploadOptions) {
  try {
    let fileBuffer: Buffer;
    let finalFileName = fileName || `file-${uuidv4()}`;
    let originalName = file?.name || finalFileName;
    let fileSize = 0;

    // Sanitize uploadPath to prevent path traversal
    uploadPath = uploadPath.replace(/[^a-zA-Z0-9-_\/]/g, "");

    if (file) {
      fileBuffer = Buffer.from(await file.arrayBuffer());
      fileSize = fileBuffer.length;

      // Detect content type if not provided
      if (!contentType && "type" in file) {
        contentType = file.type;
      }

      // Check if the file is an image
      if (contentType?.startsWith("image/")) {
        // Optimize image and convert to JPEG using sharp
        fileBuffer = await sharp(fileBuffer).jpeg({ quality: 80 }).toBuffer();
        finalFileName = `${finalFileName.replace(/\.[^/.]+$/, "")}.jpeg`;
        contentType = "image/jpeg";
        fileSize = fileBuffer.length; // Update size after compression
      }
    } else if (imageUrl) {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch image from URL: ${response.statusText}`
        );
      }
      fileBuffer = Buffer.from(await response.arrayBuffer());
      fileBuffer = await sharp(fileBuffer).jpeg({ quality: 80 }).toBuffer();
      finalFileName = `image-${uuidv4()}.jpeg`;
      contentType = "image/jpeg";
      fileSize = fileBuffer.length;
    } else {
      throw new Error("Either file or imageUrl must be provided.");
    }

    const filePath = `${uploadPath}/${finalFileName}`;

    // Upload to cloud storage
    const putCommand = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: filePath,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await s3.send(putCommand);

    const publicUrl = `${process.env.STORAGE_PUBLIC_URL}/${filePath}`;

    // Only store metadata if not skipped and userId is provided
    if (!skipMetadata && userId) {
      const { error } = await supabase.from("file_uploads").insert({
        user_id: userId,
        chat_id: chatId,
        context: `${uploadPath}:${contentType}`,
        filename: finalFileName,
        original_name: originalName,
        content_type: contentType,
        size: fileSize,
        url: publicUrl,
        metadata: {
          uploadPath,
          contentType,
          originalContentType: file?.type || contentType,
        },
      });

      if (error) {
        console.error("Error storing file metadata in Supabase:", error);
        throw error;
      }
    }

    return {
      url: publicUrl,
      path: filePath,
      filename: finalFileName,
      originalName,
      contentType,
      size: fileSize,
    };
  } catch (error) {
    console.error("Error in file upload:", error);
    throw error;
  }
}
