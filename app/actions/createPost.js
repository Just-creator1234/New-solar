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

    const action = formData.get("action"); // from the button's name="action" value
    const status = action === "publish" ? "PUBLISHED" : "DRAFT";

    // Extract data
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      publishDate: formData.publishDate ? new Date(formData.publishDate) : null,
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
        slug: { in: data.categories }, // ["business", "ai-ml"]
      },
    });

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        status: status,
        publishDate: data.publishDate,
        coverImage: coverImageUrl,
        altText: data.altText,
        wordCount: wordCount,
        readingTime: readingTime,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,

        author: {
          connect: {
            id: data.authorId,
          },
        },

        // ✅ Correct usage for direct many-to-many relation
        categories: {
          connect: categoryRecords.map((cat) => ({ id: cat.id })),
        },
        tags: {
          create: data.tags.map((tag) => ({
            tag: { connect: { name: tag } },
          })),
        },
      },
      include: {
        categories: true,
        tags: true,
        author: true,
      },
    });

    console.log(post, "ggggggggggggggggggggggggg");
    revalidatePath("/blog");

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

    const tagRecords = await Promise.all(
      data.tags.map(async (tagName) => {
        return await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      })
    );

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
          set: tagRecords.map((tag) => ({ id: tag.id })),
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
          connect: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return { success: true, draft };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { error: "Failed to save draft" };
  }
}
