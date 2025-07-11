import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const maxSize = 10_000_000; // 1MB in bytes
    if (file.size > maxSize) {
      throw new Error("File size exceeds 1MB limit");
    }
    
    const url = await uploadFile(file, "blog-images");

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
