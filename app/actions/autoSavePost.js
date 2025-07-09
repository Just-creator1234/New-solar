// app/actions/autoSavePost.js
"use server";

import prisma from "@/lib/prisma";

export async function autoSavePost(formData) {
  if (!title && !content && !excerpt) {
    return { success: false, skipped: true };
  }

  try {
    const slug = formData.get("slug");
    const title = formData.get("title") || "";
    const content = formData.get("content") || "";
    const excerpt = formData.get("excerpt") || "";
    const metaTitle = formData.get("metaTitle") || "";
    const metaDescription = formData.get("metaDescription") || "";
    const focusKeyword = formData.get("focusKeyword") || "";

    // Basic auto-slug if missing
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    const wordCount = content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Upsert draft (create if not exists, update if it does)
    const post = await prisma.post.upsert({
      where: { slug: finalSlug },
      update: {
        title,
        content,
        excerpt,
        metaTitle,
        metaDescription,
        focusKeyword,
        wordCount,
        readingTime,
        updatedAt: new Date(),
      },
      create: {
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
        authorId: "sunlink-author", // Replace with actual author logic
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Auto-save error:", error);
    return { error: "Auto-save failed" };
  }
}
