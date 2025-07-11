import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import {
  Calendar,
  User,
  Tag,
  Clock,
  ArrowLeft,
  Edit3,
  Eye,
} from "lucide-react";
import Link from "next/link";

import PublishButton from "./PublishButton";

export const dynamic = "force-dynamic"; // always fetch latest

export default async function DraftPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
      author: true,
    },
  });

  if (!post || post.status !== "DRAFT") {
    notFound();
  }

  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-slate-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/Blogs"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back to Dashboard</span>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/Blogs/edit/${post.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Edit3 size={16} />
                <span className="hidden sm:inline">Edit</span>
              </Link>
              <PublishButton post={post} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Enhanced Header Section */}
        <header className="mb-12">
          {/* Status and Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                DRAFT
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Eye size={14} />
                <span>Preview Mode</span>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated{" "}
              {format(
                new Date(post.updatedAt || post.createdAt),
                "MMM d, yyyy 'at' h:mm a"
              )}
            </div>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Enhanced Meta Information */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <User size={14} className="text-white" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {post.author?.name ?? "Unknown Author"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>
                Created {format(new Date(post.createdAt), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((category, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={post.coverImage}
                alt={post.altText || post.title}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 lg:p-12">
            <div
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:scroll-mt-16 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 
                prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-medium
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:shadow-lg
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Tags Section */}
        {post.tags.length > 0 && (
          <div className="mb-8 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Draft Actions */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Ready to Publish?
              </h3>
              <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                This post is currently in draft mode and not visible to the
                public. You can continue editing or publish it to make it live.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <Link
                href={`/Blogs/edit/${post.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm"
              >
                <Edit3 size={16} />
                Continue Editing
              </Link>
              <PublishButton post={post} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
