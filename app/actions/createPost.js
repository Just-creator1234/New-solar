"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData) {
  console.log(formData, "gggggggggggggg");
  try {
    // 🔐 Secret check
    const secret = formData.get("secret");
    if (secret !== process.env.BLOG_UPLOAD_SECRET) {
      return { error: "Unauthorized upload attempt" };
    }

    // Extract data
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      status: formData.get("status"),
      visibility: formData.get("visibility"),
      password: formData.get("password"),
      publishDate: formData.get("publishDate"),
      altText: formData.get("altText"),
      categories: JSON.parse(formData.get("categories") || "[]"),
      tags: JSON.parse(formData.get("tags") || "[]"),
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      focusKeyword: formData.get("focusKeyword"),
      authorId: formData.get("authorId"),
    };

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return { error: "Slug already exists" };
    }

    // Word count & reading time
    const wordCount = data.content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    const readingTime = Math.ceil(wordCount / 200);

    // Upload cover image
    let coverImageUrl = null;
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        coverImageUrl = url;
      }
    }

    // Resolve category slugs to actual category records
    const categoryRecords = await prisma.category.findMany({
      where: {
        slug: { in: data.categories }, // e.g., ["technology", "ai-ml"]
      },
    });

    // Create post
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        status: data.status,
        visibility: data.visibility,
        password: data.password,
        publishDate: data.publishDate ? new Date(data.publishDate) : null,
        coverImage: coverImageUrl,
        altText: data.altText,
        wordCount,
        readingTime,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        authorId: "sunlink-author", // Or pull from session if auth added later
        categories: {
          create: categoryRecords.map((cat) => ({
            categoryId: cat.id,
          })),
        },
        tags: {
          create: await Promise.all(
            data.tags.map(async (tagName) => {
              const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
              });
              return { tagId: tag.id };
            })
          ),
        },
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        author: true,
      },
    });

    // Revalidate pages
    revalidatePath("/blog");
    revalidatePath("/dashboard/posts");

    return {
      success: true,
      post,
      message: `Post ${
        data.status === "PUBLISHED" ? "published" : "saved"
      } successfully!`,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}


export async function saveDraft(formData) {
  try {
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      status: "DRAFT",
      categories: JSON.parse(formData.get("categories") || "[]"), // slugs
      tags: JSON.parse(formData.get("tags") || "[]"), // names
    };

    // Auto-generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }

    // Calculate word count and reading time
    const wordCount = data.content
      ? data.content.replace(/<[^>]*>/g, "").split(/\s+/).filter((word) => word.length > 0).length
      : 0;

    const readingTime = Math.ceil(wordCount / 200);

    // Resolve category slugs
    const categoryRecords = await prisma.category.findMany({
      where: {
        slug: { in: data.categories },
      },
    });

    // Upsert draft post
    const draft = await prisma.post.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        wordCount,
        readingTime,
        updatedAt: new Date(),
      },
      create: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        status: "DRAFT",
        wordCount,
        readingTime,
        authorId: "sunlink-author", // or your fixed author ID
        categories: {
          create: categoryRecords.map((cat) => ({
            categoryId: cat.id,
          })),
        },
        tags: {
          create: await Promise.all(
            data.tags.map(async (tagName) => {
              const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
              });
              return { tagId: tag.id };
            })
          ),
        },
      },
    });

    return { success: true, draft };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { error: "Failed to save draft" };
  }
}
