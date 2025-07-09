// import { notFound } from 'next/navigation';
// import { Calendar, User } from 'lucide-react';
// import prisma from '@/lib/prisma';

// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany({
//     where: { status: 'PUBLISHED' },
//     select: { slug: true },
//   });

//   return posts.map(post => ({ slug: post.slug }));
// }

// export async function generateMetadata({ params }) {
//       const { slug } = await params;
//   const post = await prisma.post.findUnique({
//     where: { slug: slug },
//   });

//   if (!post) return notFound();

//   return {
//     title: post.metaTitle || post.title,
//     description: post.metaDescription || post.excerpt,
//   };
// }

// export default async function PublishedPostPage({ params }) {
//   const post = await prisma.post.findUnique({
//     where: { slug: params.slug },
//     include: {
//       author: true,
//       tags: { include: { tag: true } },
//       categories: { include: { category: true } },
//     },
//   });

//   if (!post || post.status !== 'PUBLISHED') return notFound();

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           {post.title}
//         </h1>

//         <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
//           <div className="flex items-center gap-1">
//             <User size={16} />
//             <span>{post.author?.name || 'Unknown Author'}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Calendar size={16} />
//             <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {post.tags.map(({ tag }) => (
//             <span
//               key={tag.id}
//               className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white rounded-full"
//             >
//               #{tag.name}
//             </span>
//           ))}
//         </div>

//         {/* Featured Image */}
//         {post.coverImage && (
//           <img
//             src={post.coverImage}
//             alt={post.altText || post.title}
//             className="w-full h-auto rounded-lg shadow mb-8"
//           />
//         )}

//         {/* Post Content */}
//         <div
//           className="prose dark:prose-invert max-w-none"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />
//       </div>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  Clock,
  Share2,
  BookOpen,
  ArrowLeft,
  Eye,
  Heart,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import prisma from "@/lib/prisma";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      metaTitle: true,
      excerpt: true,
      metaDescription: true,
      coverImage: true,
      author: { select: { name: true } },
      createdAt: true,
    },
  });

  console.log(post,"metaaaaaaa dataaaaaaa")
  if (!post) return notFound();

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      authors: [post.author?.name],
      publishedTime: post.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PublishedPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,

          //bio: true,
        },
      },
      tags: { include: { tag: true } },
      categories: { include: { category: true } },
    },
  });

  if (!post || post.status !== "PUBLISHED") return notFound();

  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </nav>

      {/* Standalone Hero Image */}
      {post.coverImage && (
        <section className="relative mx-auto flex justify-center items-center">
          <img
            src={post.coverImage}
            alt={post.altText || post.title}
            className="w-[80%]  h-auto max-h-[600px] object-cover"
          />
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Meta Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center">
                {post.author?.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {post.author?.name || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Author
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Article</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8 md:p-12">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map(({ tag }) => (
                <Link
                  key={tag.id}
                  href={`/blog/tags/${tag.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center flex-shrink-0">
                {post.author.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 transition-colors">
            <Heart size={18} />
            <span className="font-medium">Like</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-colors">
            <Share2 size={18} />
            <span className="font-medium">Share</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 transition-colors">
            <BookOpen size={18} />
            <span className="font-medium">Save</span>
          </button>
        </div>
      </main>
    </div>
  );
}
