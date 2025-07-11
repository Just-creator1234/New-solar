"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import {
  Eye,
  Edit3,
  ImageOff,
  Trash2,
  Plus,
  Search,
  Calendar,
  User,
  Send,
  Clock,
  BookOpen,
  TrendingUp,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Tag,
  Folder,
  Loader2,
} from "lucide-react";
import { getPosts } from "@/app/actions/getPosts";
import Link from "next/link";
import BlogItem from "./BlogItem";
import { publishPost } from "@/app/actions/publishPost";

const BlogPostsManager = () => {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);
  const [publishingPosts, setPublishingPosts] = useState(new Set());

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const status = filter === "ALL" ? undefined : filter;
      const data = await getPosts(status);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handlePublishSinglePost = async (id) => {
    try {
      setPublishingPosts((prev) => new Set(prev).add(id));
      const result = await publishPost(id);
      alert(`Published post: ${result.title}`);
      fetchPosts(); // Refresh posts after publishing
    } catch (err) {
      console.error(err);
      alert("Error publishing post.");
    } finally {
      setPublishingPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handlePublishNow = async () => {
    try {
      const scheduledPosts = posts.filter(
        (post) => post.status === "SCHEDULED"
      );

      if (scheduledPosts.length === 0) {
        alert("No scheduled posts to publish.");
        return;
      }

      setLoading(true);
      const res = await fetch("/api/dev/publish-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts: scheduledPosts }),
      });

      if (!res.ok) throw new Error("Failed to publish posts");

      alert("Scheduled posts published!");
      fetchPosts(); // Refresh posts after publishing
    } catch (error) {
      console.error("Error publishing now:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "ALL" || post.status === filter;
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tagObj) =>
        tagObj.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      post.categories?.some((categoryObj) =>
        categoryObj.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "author") {
      aValue = a.author?.name || "";
      bValue = b.author?.name || "";
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
      case "SCHEDULED":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusCounts = () => {
    const counts = {
      ALL: posts.length,
      DRAFT: posts.filter((p) => p.status === "DRAFT").length,
      PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
      SCHEDULED: posts.filter((p) => p.status === "SCHEDULED").length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-md animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Skeleton */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
              viewMode === "grid" ? "flex flex-col" : "p-6"
            }`}
          >
            {viewMode === "grid" ? (
              <>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-14 animate-pulse"></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-6">
                <div className="w-32 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-comfort-cream dark:bg-gray-900 mt-12">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white max-md:text-lg">
                  Blog Manager
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {posts.length} total posts
                </p>
              </div>
            </div>
            <Link
              href="/Blogs/Create-Blogs"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
              New Post
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Posts
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {statusCounts.ALL}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Published
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {statusCounts.PUBLISHED}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drafts
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {statusCounts.DRAFT}
                    </p>
                  </div>
                  <Edit3 className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scheduled
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {statusCounts.SCHEDULED}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search posts, authors, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* View Mode and Sort Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${
                          viewMode === "grid"
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Grid size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${
                          viewMode === "list"
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <List size={16} />
                      </button>
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="createdAt">Created Date</option>
                      <option value="updatedAt">Updated Date</option>
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                    </select>

                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc size={16} />
                      ) : (
                        <SortDesc size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["ALL", "DRAFT", "PUBLISHED", "SCHEDULED"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        filter === f
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {f}
                      <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {statusCounts[f]}
                      </span>
                    </button>
                  ))}
                </div>

                {filter === "SCHEDULED" && statusCounts.SCHEDULED > 0 && (
                  <div className="flex justify-end">
                    <button
                      onClick={handlePublishNow}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg shadow-sm transition-colors"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Publish All Due Posts
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Posts Grid/List */}
            {sortedPosts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by creating your first blog post"}
                </p>
                {!searchTerm && (
                  <Link
                    href="/Blogs/Create-Blogs"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    Create Your First Post
                  </Link>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {sortedPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${
                      viewMode === "grid" ? "flex flex-col" : "p-6"
                    }`}
                  >
                    {viewMode === "grid" ? (
                      // Grid View
                      <>
                        <div className="relative">
                          {post.coverImage ? (
                            <div className="relative w-full h-48">
                              <Image
                                src={post.coverImage}
                                alt={post.altText || post.title || "Blog Cover"}
                                fill
                                className="object-cover rounded-t-lg"
                                sizes="100vw"
                                priority={false}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 flex items-center justify-center rounded-t-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                              <ImageOff className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}

                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                                post.status
                              )}`}
                            >
                              {post.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                              {post.title}
                            </h3>
                            {!post.coverImage && (
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ml-2 ${getStatusColor(
                                  post.status
                                )}`}
                              >
                                {post.status}
                              </span>
                            )}
                          </div>

                          {post.excerpt && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="space-y-3 mt-auto">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <User size={12} />
                                <span>{post.author?.name || "Unknown"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{formatDate(post.createdAt)}</span>
                              </div>
                            </div>

                            {(post.categories?.length > 0 ||
                              post.tags?.length > 0) && (
                              <div className="flex flex-wrap gap-1">
                                {post.categories
                                  ?.slice(0, 2)
                                  .map((category, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
                                    >
                                      {category.name}
                                    </span>
                                  ))}
                                {post.tags?.slice(0, 2).map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                                  >
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={
                                    post.status === "DRAFT"
                                      ? `/Blogs/draft/${post.slug}`
                                      : `/Solarlink-Blogs/${post.slug}`
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                  title="View post"
                                >
                                  <Eye size={16} />
                                </Link>
                                <Link
                                  href={`/Blogs/edit/${post.slug}`}
                                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                  title="Edit post"
                                >
                                  <Edit3 size={16} />
                                </Link>
                                {post.status === "SCHEDULED" && (
                                  <button
                                    onClick={() =>
                                      handlePublishSinglePost(post.id)
                                    }
                                    disabled={publishingPosts.has(post.id)}
                                    className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors disabled:opacity-50"
                                    title="Publish now"
                                  >
                                    {publishingPosts.has(post.id) ? (
                                      <Loader2
                                        size={16}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <Send size={16} />
                                    )}
                                  </button>
                                )}
                              </div>
                              <BlogItem
                                key={post.id}
                                post={post}
                                onPostUpdated={fetchPosts}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // List View
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        <div className="w-full lg:w-32 lg:flex-shrink-0">
                          {post.coverImage ? (
                            <div className="relative w-full h-20 lg:h-20">
                              <Image
                                src={post.coverImage}
                                alt={
                                  post.altText || post.title || "Cover Image"
                                }
                                fill
                                className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                sizes="(min-width: 1024px) 8rem, 100vw"
                                priority={false}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-20 lg:h-20 flex items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                              <ImageOff className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                              {post.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full border ml-2 ${getStatusColor(
                                post.status
                              )}`}
                            >
                              {post.status}
                            </span>
                          </div>

                          {post.excerpt && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-1">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{post.author?.name || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{formatDate(post.createdAt)}</span>
                            </div>
                            {post.readingTime > 0 && (
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{post.readingTime} min read</span>
                              </div>
                            )}
                          </div>

                          {(post.categories?.length > 0 ||
                            post.tags?.length > 0) && (
                            <div className="flex flex-wrap gap-1">
                              {post.categories
                                ?.slice(0, 3)
                                .map((category, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                              {post.tags?.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={
                              post.status === "DRAFT"
                                ? `/Blogs/draft/${post.slug}`
                                : `/Solarlink-Blogs/${post.slug}`
                            }
                            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View post"
                          >
                            <Eye size={16} />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                          <Link
                            href={`/Blogs/edit/${post.slug}`}
                            className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Edit post"
                          >
                            <Edit3 size={16} />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>
                          {post.status === "SCHEDULED" && (
                            <button
                              onClick={() => handlePublishSinglePost(post.id)}
                              disabled={publishingPosts.has(post.id)}
                              className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Publish now"
                            >
                              {publishingPosts.has(post.id) ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Send size={16} />
                              )}
                              <span className="hidden sm:inline">Publish</span>
                            </button>
                          )}
                          <BlogItem
                            key={post.id}
                            post={post}
                            onPostUpdated={fetchPosts}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPostsManager;
