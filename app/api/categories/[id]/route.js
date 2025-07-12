// // app/api/categories/[id]/route.js
// import prisma from "@/lib/prisma";

// export async function DELETE(req, { params }) {
//   const { id } = await params;

//   try {
//     // Ensure it exists
//     const category = await prisma.category.findUnique({
//       where: { id },
//     });

//     if (!category) {
//       return new Response(JSON.stringify({ message: "Category not found" }), {
//         status: 404,
//       });
//     }

//     const relatedPosts = await prisma.post.findFirst({
//       where: {
//         categories: {
//           some: { id },
//         },
//       },
//     });

//     if (relatedPosts) {
//       return new Response(
//         JSON.stringify({ message: "Cannot delete category in use." }),
//         { status: 400 }
//       );
//     }

//     // If found, delete it
//     await prisma.category.delete({
//       where: { id },
//     });

//     return new Response(JSON.stringify({ message: "Category deleted" }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Delete category error:", error);
//     return new Response(
//       JSON.stringify({ message: "Something went wrong", error }),
//       { status: 500 }
//     );
//   }
// }

// app/api/categories/[id]/route.js
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return new Response(JSON.stringify({ message: "Category not found" }), {
        status: 404,
      });
    }

    const relatedPosts = await prisma.post.findFirst({
      where: {
        categories: {
          some: { id },
        },
      },
    });

    if (relatedPosts) {
      return new Response(
        JSON.stringify({ message: "Cannot delete category in use." }),
        { status: 400 }
      );
    }

    await prisma.category.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Category deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}
