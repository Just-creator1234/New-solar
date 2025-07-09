'use server';

import prisma from "@/lib/prisma"; // adjust path if needed


export async function deletePostById(postId) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

   
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: error.message };
  }
}
