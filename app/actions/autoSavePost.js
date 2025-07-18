// "use server";

// import prisma from "@/lib/prisma";

// export async function autoSavePost(formData) {
//   const title = formData.get("title") || "";
//   const content = formData.get("content") || "";
//   const slugInput = formData.get("slug") || "";

//   // Skip empty drafts
//   if (!title.trim() && !content.trim()) {
//     return { success: false, message: "Empty draft skipped" };
//   }

//   // Generate final slug
//   const finalSlug =
//     slugInput ||
//     title
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-")
//       .trim();

//   try {
//     // Check if already published
//     const existingPost = await prisma.post.findUnique({
//       where: { slug: finalSlug },
//       select: { status: true },
//     });

//     if (existingPost?.status === "PUBLISHED") {
//       return {
//         success: false,
//         message: "Post already published. Autosave skipped.",
//       };
//     }

//     const excerpt = formData.get("excerpt") || "";
//     const metaTitle = formData.get("metaTitle") || "";
//     const metaDescription = formData.get("metaDescription") || "";
//     const focusKeyword = formData.get("focusKeyword") || "";

//     const wordCount = content
//       .replace(/<[^>]*>/g, "")
//       .split(/\s+/)
//       .filter(Boolean).length;

//     const readingTime = Math.ceil(wordCount / 200);

//     const post = await prisma.post.upsert({
//       where: { slug: finalSlug },
//       update: {
//         title,
//         content,
//         excerpt,
//         metaTitle,
//         metaDescription,
//         focusKeyword,
//         wordCount,
//         readingTime,
//         updatedAt: new Date(),
//       },
//       create: {
//         title,
//         slug: finalSlug,
//         content,
//         excerpt,
//         metaTitle,
//         metaDescription,
//         focusKeyword,
//         status: "DRAFT",
//         wordCount,
//         readingTime,
//         authorId: "sunlink-author", // Use dynamic authorId if needed
//       },
//     });

//     return { success: true, post };
//   } catch (error) {
//     console.error("Auto-save error:", error);
//     return { error: "Auto-save failed" };
//   }
// }

"use server";

import prisma from "@/lib/prisma";

export async function autoSavePost(formData) {
  const id = formData.get("id"); // 👈 Get ID if exists
  const title = formData.get("title") || "";
  const content = formData.get("content") || "";
  const slugInput = formData.get("slug") || "";

  // Skip empty drafts
  if (!title.trim() && !content.trim()) {
    return { success: false, message: "Empty draft skipped" };
  }

  const finalSlug =
    slugInput ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  try {
    const excerpt = formData.get("excerpt") || "";
    const metaTitle = formData.get("metaTitle") || "";
    const metaDescription = formData.get("metaDescription") || "";
    const focusKeyword = formData.get("focusKeyword") || "";

    const wordCount = content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter(Boolean).length;

    const readingTime = Math.ceil(wordCount / 200);

    // ✅ If ID exists, update post by ID
    let post;
    if (id) {
      const existing = await prisma.post.findUnique({
        where: { id: id.toString() },
        select: { status: true },
      });

      if (existing?.status === "PUBLISHED") {
        return {
          success: false,
          message: "Post already published. Autosave skipped.",
        };
      }

      post = await prisma.post.update({
        where: { id: id.toString() },
        data: {
          title,
          slug: finalSlug,
          content,
          excerpt,
          metaTitle,
          metaDescription,
          focusKeyword,
          wordCount,
          readingTime,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new draft
      post = await prisma.post.create({
        data: {
          title,
          slug: finalSlug,
          content,
          excerpt,
          metaTitle,
          metaDescription,
          focusKeyword,
          status: "DRAFT",
          wordCount,
          readingTime,
          authorId: "sunlink-author",
        },
      });
    }

    return { success: true, post };
  } catch (error) {
    console.error("Auto-save error:", error);
    return { error: "Auto-save failed" };
  }
}
