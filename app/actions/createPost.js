"use server";

import prisma from "@/lib/prisma";
export async function createPost(formData) {
  try {
    // 🔐 Secret check

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

    const coverImageUrl = formData.get("coverImage") || null;

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

      return {
        success: true,
        post: updatedPost,
        message: `Post ${
          data.status === "PUBLISHED" ? "published" : "saved"
        } successfully, Redirecting...`,
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

    const coverImageUrl = formData.get("coverImage") || null;

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
