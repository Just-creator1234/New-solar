// import { notFound } from "next/navigation";
// import prisma from "@/lib/prisma";
// import { format } from "date-fns";
// import { Calendar, User } from "lucide-react";

// export const dynamic = "force-dynamic"; // always fetch latest

// export default async function DraftPostPage({ params }) {
//   const { slug } = await params;

//   const post = await prisma.post.findUnique({
//     where: { slug },
//     include: {
//       author: true,
//       tags: { include: { tag: true } },
//       categories: { include: { category: true } },
//     },
//   });

//   if (!post || post.status !== "DRAFT") {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             {post.title}
//           </h1>
//           <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//             DRAFT
//           </span>
//         </div>

//         <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-6 text-sm">
//           <div className="flex items-center gap-2">
//             <User size={14} />
//             <span>{post.author?.name ?? "Unknown Author"}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Calendar size={14} />
//             <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
//           </div>
//         </div>

//         {post.coverImage && (
//           <img
//             src={post.coverImage}
//             alt={post.altText || post.title}
//             className="rounded-lg w-full mb-6"
//           />
//         )}

//         <article
//           className="prose dark:prose-invert max-w-none"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         <div className="mt-8 flex flex-wrap gap-2">
//           {post.tags.map(({ tag }) => (
//             <span
//               key={tag.id}
//               className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
//             >
//               #{tag.name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Calendar, User, Tag, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // always fetch latest

export default async function DraftPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
    },
  });

  if (!post || post.status !== "DRAFT") {
    notFound();
  }

  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                  DRAFT
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Preview Mode
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium">
                {post.author?.name ?? "Unknown Author"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>
                Created {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map(({ category }) => (
                <span
                  key={category.id}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.coverImage && (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.coverImage}
                alt={post.altText || post.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-16 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Tags Section */}
        {post.tags.length > 0 && (
          <div className="mt-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Draft Actions */}
        <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Draft Actions
              </h3>
              <p className="text-amber-800 dark:text-amber-300">
                This post is currently in draft mode and not visible to the
                public.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/dashboard/posts/${post.slug}/edit`}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
              >
                Edit Post
              </Link>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                Publish
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
