import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_TESSERACT;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_TESSERACT;

// Debug logging for environment variables
console.log("AWS Config:", {
  bucketNameExists: !!bucketName,
  regionExists: !!region,
  accessKeyIdExists: !!accessKeyId,
  secretAccessKeyExists: !!secretAccessKey,
  bucketName,
  region,
});

// Ensure all required environment variables are present
if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  console.error("Missing AWS credentials:", {
    bucketName: !bucketName,
    region: !region,
    accessKeyId: !accessKeyId,
    secretAccessKey: !secretAccessKey,
  });
  throw new Error("Missing required AWS credentials in environment variables");
}
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Use a more specific type for handling formData uploads
    interface FormDataFile {
      arrayBuffer(): Promise<ArrayBuffer>;
      name?: string;
      type?: string;
      size?: number;
    }

    // Get file data regardless of whether it's a File instance or not
    const fileImage = image as FormDataFile;
    const bytes = await fileImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileType = fileImage.type || "application/octet-stream";

    console.log("File info:", {
      name: fileImage.name,
      type: fileType,
      size: buffer.length,
    });

    // Upload to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: generateFileName(),
      Body: buffer,
      ContentType: fileType,
    };
    console.log("uploadParams", uploadParams);
    await s3Client.send(new PutObjectCommand(uploadParams));

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        imageUrl: `https://${bucketName}.s3.${region}.amazonaws.com/${uploadParams.Key}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Test S3 connection
    const testParams = {
      Bucket: bucketName,
    };

    try {
      await s3Client.send(
        new PutObjectCommand({
          ...testParams,
          Key: "test-connection.txt",
          Body: "Testing S3 connection",
          ContentType: "text/plain",
        })
      );
      return NextResponse.json({
        message: "Hello from Next.js!",
        s3Status: "Connection successful",
        config: {
          bucketName,
          region,
          hasAccessKey: !!accessKeyId,
        },
      });
    } catch (s3Error: Error | unknown) {
      const errorMessage =
        s3Error instanceof Error ? s3Error.message : "Unknown S3 error";
      console.error("S3 connection test failed:", s3Error);
      return NextResponse.json({
        message: "Hello from Next.js!",
        s3Status: "Connection failed",
        error: errorMessage,
        config: {
          bucketName,
          region,
          hasAccessKey: !!accessKeyId,
        },
      });
    }
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GET endpoint error:", error);
    return NextResponse.json(
      {
        message: "Error in endpoint",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
