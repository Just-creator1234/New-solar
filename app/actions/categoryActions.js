// app/actions/createCategory.js
"use server";

import prisma from "@/lib/prisma";

export async function createCategory(name) {
  if (!name || !name.trim()) {
    return { error: "Name is required." };
  }

  try {
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const category = await prisma.category.create({
      data: {
        id: slug, // ✅ so it's consistent with seed data
        name: name.trim(),
        slug,
      },
    });

    return { success: true, category };
  } catch (err) {
    if (err.code === "P2002") {
      return { error: "Category with this name or slug already exists." };
    }

    console.error("Error creating category:", err);
    return { error: "Failed to create category." };
  }
}
