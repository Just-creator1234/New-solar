// app/actions/getPaginatedPosts.ts
import prisma from "@/lib/prisma";

export async function getPaginatedPosts(page, pageSize = 6) {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    }),
    prisma.post.count({
      where: { status: "PUBLISHED" },
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return { posts, totalPages };
}
