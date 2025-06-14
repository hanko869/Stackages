import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

const s3Config: S3ClientConfig = {
  region: process.env.STORAGE_REGION,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY!,
    secretAccessKey: process.env.STORAGE_SECRET_KEY!,
  },
  endpoint: process.env.STORAGE_ENDPOINT,
  forcePathStyle: true,
};

const s3 = new S3Client(s3Config);

export default s3;
