import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Ensure all required environment variables are present
if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
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

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "No image provided or invalid file" },
        { status: 400 }
      );
    }

    // Convert the image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: generateFileName(),
      Body: buffer,
      ContentType: image.type,
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

export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js!" });
}
