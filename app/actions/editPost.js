// app/actions/postActions.ts
"use server";

import prisma from "@/lib/prisma";
export async function getPostBySlug(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function updatePost(slug, data) {
  try {
    // Find the post by slug to get its ID
    const existing = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existing) throw new Error(`Post with slug "${slug}" not found`);

    const validTags = (data.tags || []).filter((tag) => tag?.name && tag?.slug);
    const validCategories = (data.categories || []).filter(
      (cat) => cat?.name && cat?.slug
    );

    const updatedPost = await prisma.post.update({
      where: { id: existing.id }, // ✅ Use actual post ID
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        altText: data.altText,
        status: data.status,

        tags: {
          deleteMany: {}, // Clear existing
          create: validTags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug,
                },
              },
            },
          })),
        },

        categories: {
          deleteMany: {}, // Clear existing
          create: validCategories.map((category) => ({
            category: {
              connectOrCreate: {
                where: { slug: category.slug },
                create: {
                  name: category.name,
                  slug: category.slug,
                },
              },
            },
          })),
        },
      },
      include: {
        tags: { include: { tag: true } },
        categories: { include: { category: true } },
        author: true,
      },
    });

    return updatedPost;
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
}
