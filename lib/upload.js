// import { writeFile, mkdir } from "fs/promises";
// import { join, dirname } from "path";
// import { v4 as uuidv4 } from "uuid";

// export async function uploadFile(file, folder = "blog-images") {
//   try {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const fileExtension = file.name.split(".").pop();
//     const fileName = `${uuidv4()}.${fileExtension}`;
//     const filePath = join(process.cwd(), "public", folder, fileName);

//     // Create the folder if it doesn't exist
//     await mkdir(join(process.cwd(), "public", folder), { recursive: true });

//     await writeFile(filePath, buffer);

//     return `/${folder}/${fileName}`;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw new Error("Failed to upload file");
//   }
// }

import cloudinary from "./cloudinary";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(file, folder = "blog-images") {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: `${folder}/${fileName}`,
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}
