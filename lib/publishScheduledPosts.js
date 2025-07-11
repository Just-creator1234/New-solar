import prisma from "./prisma.js";

async function publishScheduledPosts() {
  const now = new Date();

  try {
    const result = await prisma.post.updateMany({
      where: {
        status: "SCHEDULED",
        publishDate: {
          lte: now,
        },
      },
      data: {
        status: "PUBLISHED",
      },
    });

    console.log(`✅ ${result.count} scheduled post(s) published.`);
  } catch (error) {
    console.error("❌ Error publishing scheduled posts:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

publishScheduledPosts();
