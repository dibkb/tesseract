"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "./ui/progress";
import axios, { AxiosProgressEvent } from "axios";
import { UploadCloud } from "lucide-react";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [, setSelectedImage] = useState<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      setSelectedImage(image);
      handleImageUpload(image);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    setUploadedImagePath(null);
    setSelectedImage(null);
  };

  const handleImageUpload = useCallback(
    async (image: File) => {
      if (!image) return;
      setLoading(true);
      console.log(image);

      const formData = new FormData();
      formData.append("image", image);

      try {
        // onUploadComplete()
        const res = await axios.post("/api/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress,
        });
        if (res.data.imageUrl && onUploadComplete) {
          onUploadComplete(res.data.imageUrl);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image:", error);
      }
    },
    [onUploadComplete]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const image = acceptedFiles[0];
        setSelectedImage(image);
        handleImageUpload(image);
      }
    },
    [handleImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="space-y-3 h-full w-full">
      <div {...getRootProps()} className="h-full w-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center p-6 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600 w-full visually-hidden-focusable h-full"
        >
          {loading && (
            <div className="text-center max-w-md">
              <Progress value={progress} />
              <p className="text-sm font-semibold">Uploading Picture</p>
              <p className="text-xs text-neutral-400">
                Do not refresh or perform any other action while the picture is
                being uploaded
              </p>
            </div>
          )}

          {!loading && !uploadedImagePath && (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud />
              </div>

              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold">Drag an image</span>
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-400">
                Select a image or drag here to upload directly
              </p>
            </div>
          )}

          {uploadedImagePath && !loading && (
            <div className="text-center space-y-2">
              <Image
                width={1000}
                height={1000}
                src={uploadedImagePath}
                className="w-full object-contain max-h-16 opacity-70"
                alt="uploaded image"
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Image Uploaded</p>
                <p className="text-xs text-neutral-400">
                  Click here to upload another image
                </p>
              </div>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg, image/webp, image/svg, image/gif, image/jpg"
          type="file"
          className="hidden"
          disabled={loading || uploadedImagePath !== null}
          onChange={handleImageChange}
        />
      </div>

      {!!uploadedImagePath && (
        <div className="flex items-center justify-between">
          <Link
            href={uploadedImagePath}
            className=" text-neutral-500 text-xs hover:underline "
          >
            Click here to see uploaded image :D
          </Link>

          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            {uploadedImagePath ? "Remove" : "Close"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
