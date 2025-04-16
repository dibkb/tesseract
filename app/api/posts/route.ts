import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_TESSERACT;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_TESSERACT;

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

    // Resize the image using Sharp
    // Set max width to 1200px while maintaining aspect ratio
    const resizedImageBuffer = await sharp(buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    // Upload to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: generateFileName(),
      Body: resizedImageBuffer,
      ContentType: fileImage.type || "application/octet-stream",
    };
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
