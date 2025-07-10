"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createPost(formData) {
  try {
    // 🔐 Secret check
    const secret = formData.get("secret");
    if (secret !== process.env.BLOG_UPLOAD_SECRET) {
      return { error: "Unauthorized upload attempt" };
    }

    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      publishDate: formData.publishDate ? new Date(formData.publishDate) : null,
      altText: formData.get("altText"),
      status: formData.get("status"),
      categories: JSON.parse(formData.get("categories") || "[]"),
      tags: JSON.parse(formData.get("tags") || "[]"),
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      focusKeyword: formData.get("focusKeyword"),
      authorId: formData.get("authorId"),
    };

    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });

    // Word count & reading time
    const wordCount = data.content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Upload cover image
    let coverImageUrl = null;
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        coverImageUrl = url;
      }
    }

    const categoryRecords = await prisma.category.findMany({
      where: {
        slug: { in: data.categories },
      },
    });

    const tagConnectOrCreate = data.tags
      .filter((tag) => tag && tag.trim())
      .map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      }));

    // ✅ Case 1: Slug exists
    if (existingPost) {
      if (existingPost.status === "PUBLISHED") {
        return { error: "Slug already in use by a published post." };
      }

      // 🟢 Update the existing draft
      const updatedPost = await prisma.post.update({
        where: { slug: data.slug },
        data: {
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          status: data.status,
          publishDate: data.publishDate || new Date(),
          publishedAt: data.status === "PUBLISHED" ? new Date() : null,
          coverImage: coverImageUrl,
          altText: data.altText,
          wordCount,
          readingTime,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          focusKeyword: data.focusKeyword,
          author: {
            connect: { id: data.authorId },
          },
          categories: {
            set: categoryRecords.map((cat) => ({ id: cat.id })),
          },
          tags: {
            connectOrCreate: tagConnectOrCreate,
          },
        },
        include: {
          categories: true,
          tags: true,
          author: true,
        },
      });

      revalidatePath("/Blogs");
      return {
        success: true,
        post: updatedPost,
        message: `Post ${
          data.status === "PUBLISHED" ? "published" : "saved"
        } successfully!`,
      };
    }
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
      status: formData.get("action") === "publish" ? "PUBLISHED" : "DRAFT",
      categories: JSON.parse(formData.get("categories") || "[]"),
      tags: JSON.parse(formData.get("tags") || "[]"),
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      focusKeyword: formData.get("focusKeyword"),
    };

    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }

    const wordCount = data.content
      ? data.content
          .replace(/<[^>]*>/g, "")
          .split(/\s+/)
          .filter(Boolean).length
      : 0;
    const readingTime = Math.ceil(wordCount / 200);

    let coverImageUrl = null;
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        coverImageUrl = url;
      }
    }

    const categoryRecords = await prisma.category.findMany({
      where: {
        slug: { in: data.categories },
      },
    });

    const draft = await prisma.post.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        wordCount,
        readingTime,
        updatedAt: new Date(),
        status: data.status,
        coverImage: coverImageUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        categories: {
          set: categoryRecords.map((cat) => ({ id: cat.id })),
        },
        tags: {
          connectOrCreate: data.tags
            .filter((tag) => tag && tag.trim())
            .map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
        },
      },
      create: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        status: data.status,
        wordCount,
        readingTime,
        coverImage: coverImageUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        authorId: "sunlink-author",
        categories: {
          connect: categoryRecords.map((cat) => ({ id: cat.id })),
        },
        tags: {
          connectOrCreate: data.tags
            .filter((tag) => tag && tag.trim())
            .map((tagName) => ({
              where: { name: tagName },
              create: { name: tagName },
            })),
        },
      },
    });

    return { success: true, draft };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { error: "Failed to save draft" };
  }
}
