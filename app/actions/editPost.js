// app/actions/postActions.ts
"use server";

import prisma from "@/lib/prisma";
// export async function getPostBySlug(slug) {
//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//       include: {
//         categories: true,
//         tags: true,
//         author: true,
//       },
//     });
//     return post;
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return null;
//   }
// }

// app/actions/editPost.js
export async function getPostBySlug(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        categories: true, // categories: Category[] directly
        tags: true,
        author: true,
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
    const existing = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existing) throw new Error(`Post with slug "${slug}" not found`);

    // Step 1: Resolve category slugs to actual records
    const categoryRecords = await prisma.category.findMany({
      where: {
        slug: { in: data.categories || [] },
      },
    });
    const tagRecords = await prisma.tag.findMany({
      where: {
        name: { in: data.tags || [] }, // assuming data.tags = ["tech", "design"]
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        status: data.status,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,

        // ✅ Connect only existing category records
        categories: {
          set: categoryRecords.map((cat) => ({ id: cat.id })),
        },

        tags: {
          set: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
        categories: true,
        author: true,
      },
    });

    return updatedPost;
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
}
