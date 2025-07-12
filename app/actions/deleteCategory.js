"use server";

import prisma from "@/lib/prisma";

export async function deleteCategory(id) {
  if (!id) {
    return {
      success: false,
      message: "Missing category ID.",
    };
  }

  try {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return {
        success: false,
        message: "Category not found.",
      };
    }

    const relatedPost = await prisma.post.findFirst({
      where: {
        categories: {
          some: {
            id,
          },
        },
      },
    });

    if (relatedPost) {
      return {
        success: false,
        message: "Cannot delete category in use.",
      };
    }

    await prisma.category.delete({ where: { id } });

    return {
      success: true,
      message: "Category deleted.",
    };
  } catch (error) {
    console.error("deleteCategory error:", error);
    return {
      success: false,
      message: "An error occurred.",
      error: error?.message,
    };
  }
}
