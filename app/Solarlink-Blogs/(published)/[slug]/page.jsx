import { notFound } from "next/navigation";
import SaveBookmarkButton from "./SaveBookmarkButton";
import ShareBox from "./ShareBox";
import { LikeButton, ViewCounter } from "@/components/Dynamic";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import BookmarkButton from "@/components/BookmarkButton";
import {
  Calendar,
  User,
  Clock,
  Share2,
  BookOpen,
  ImageOff,
  ArrowLeft,
  Eye,
  Heart,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Tag,
  MessageCircle,
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
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

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
      author: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  // Get related posts by shared categories (you can also include tags)
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: post.id },
      categories: {
        some: {
          id: { in: post.categories.map((cat) => cat.id) },
        },
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      createdAt: true,
    },
    take: 3,
  });

  if (!post || post.status !== "PUBLISHED") return notFound();

  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 bg-comfort-cream dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Enhanced Navigation */}
      <nav
        id="section1"
        className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 z-10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/Solarlink-Blogs"
              className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back to Blog</span>
            </Link>
            <div className="flex items-center gap-3">
              <BookmarkButton />
              <ShareButton title={post.title} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Image */}
      {post.coverImage ? (
        <section className="relative">
          <div className="relative mx-auto max-w-6xl px-6 py-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.altText || post.title}
                width={1920}
                height={800}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {post.categories.length > 0 && (
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900 backdrop-blur-sm border border-white/20 shadow-lg"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative">
          <div className="relative mx-auto max-w-6xl px-6 py-8">
            <div className="flex items-center justify-center h-[400px] md:h-[500px] rounded-2xl shadow-2xl bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <ImageOff className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No cover image
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8" id="section2">
            {/* Article Header */}
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Enhanced Meta Info */}
            <div className="mb-10 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center ring-2 ring-white dark:ring-gray-800 shadow-lg">
                      {post.author?.image ? (
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={24} className="text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {post.author?.name || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Author & Content Creator
                    </p>
                  </div>
                </div>

                {/* Article Meta */}
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 max-sm:flex-col">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <Calendar size={16} />
                    <span>
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <Clock size={16} />
                    <span>{readingTime} min read</span>
                  </div>
                  <ViewCounter />
                </div>
              </div>
            </div>

            {/* Article Body */}
            <article className="mb-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none break-words whitespace-normal
             prose-headings:text-gray-900 dark:prose-headings:text-white 
             prose-p:text-gray-700 dark:prose-p:text-gray-300 
             prose-a:text-blue-600 dark:prose-a:text-blue-400 
             prose-strong:text-gray-900 dark:prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </article>

            {/* Tags Section */}
            {post.tags.length > 0 && (
              <div className="mb-10 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-blue-500" />
                  Related Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog/tags/${tag.slug ?? tag.name.toLowerCase()}`}
                      className="group inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-700 dark:text-gray-300 transition-all duration-200 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md"
                    >
                      <span className="mr-1 text-blue-500 group-hover:text-blue-600">
                        #
                      </span>
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div
              id="section3"
              className="mb-10 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <div className="flex items-center justify-center gap-4 max-sm:flex-col ">
                <LikeButton />
                <ShareButton title={post.title} />
                <SaveBookmarkButton />
              </div>
            </div>

            {/* Author Bio */}
            {post.author?.bio && (
              <div className="mb-10 p-8 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg">
                    {post.author.image ? (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {post.author.bio}
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <Twitter size={20} />
                      </button>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <Linkedin size={20} />
                      </button>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <Link2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quick Share */}
              <ShareBox title={post.title} slug={post.slug} />

              {/* Table of Contents (placeholder) */}
              <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  <a
                    href="#section1"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Introduction
                  </a>
                  <a
                    href="#section2"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Main Content
                  </a>
                  <a
                    href="#section3"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Conclusion
                  </a>
                </nav>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/Solarlink-Blogs/${related.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          {related.coverImage ? (
                            <Image
                              src={related.coverImage}
                              alt={related.title}
                              width={400} // or adjust to suit layout
                              height={250}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                              <ImageOff className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:underline line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {format(new Date(related.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
