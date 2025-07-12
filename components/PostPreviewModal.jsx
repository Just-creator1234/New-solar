"use client";
import { format } from "date-fns";
import { BookOpen, Calendar, Clock, Share2, User, X, Tag } from "lucide-react";
import Link from "next/link";

export default function PostPreviewModal({ onClose, post }) {
  console.log(post.categories, "cat");
  console.log(post.categories.id, "id");
  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[100vh] overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header with close button */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Post Preview
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="p-6 lg:p-8">
            {/* Cover Image */}
            {post.coverImageUrl && (
              <div className="mb-8 -mx-6 lg:-mx-8">
                <img
                  src={post.coverImageUrl}
                  alt={post.altText || post.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <header className="mb-8">
              {/* Categories */}
              {post.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories &&
                    post.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(
                      new Date(post.createdAt || new Date()),
                      "MMMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <article className="mb-8">
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Tags Section */}
            {post.tags?.length > 0 && (
              <footer className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </div>
        </div>

        {/* Editor Actions Footer */}
        <div className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Preview Mode • {post.status || "Draft"}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
