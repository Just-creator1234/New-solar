import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(file, folder = "blog-images") {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(process.cwd(), "public", folder, fileName);

    // Create the folder if it doesn't exist
    await mkdir(join(process.cwd(), "public", folder), { recursive: true });

    await writeFile(filePath, buffer);

    return `/${folder}/${fileName}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}
