"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Calendar,
  User,
  Send,
} from "lucide-react";
import { getPosts } from "@/app/actions/getPosts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlogItem from "./BlogItem";
import { publishPost } from "@/app/actions/publishPost";

const BlogPostsManager = () => {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const status = filter === "ALL" ? undefined : filter;
      const data = await getPosts(status);
      console.log(data, "hhhhhhhhhhhh");
      setPosts(data);
    };
    fetchPosts();
  }, [filter]);

  const handlePublishSinglePost = async (id) => {
    try {
      const result = await publishPost(id);
      alert(`Published post: ${result.title}`);
    } catch (err) {
      console.error(err);
      alert("Error publishing post.");
    }
  };

  const handlePublishNow = async () => {
    try {
      // Get only scheduled posts from current state
      const scheduledPosts = posts.filter(
        (post) => post.status === "SCHEDULED"
      );

      if (scheduledPosts.length === 0) {
        alert("No scheduled posts to publish.");
        return;
      }

      // Send them to your backend
      const res = await fetch("/api/dev/publish-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts: scheduledPosts }),
      });

      if (!res.ok) throw new Error("Failed to publish posts");

      alert("Scheduled posts published!");

      // Refresh updated list
      const data = await getPosts("SCHEDULED");
      setPosts(data);
      console.log(posts);
    } catch (error) {
      console.error("Error publishing now:", error);
      alert("Something went wrong.");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 border-green-200";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "SCHEDULED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Blog Posts
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your blog posts, drafts, and published content
              </p>
            </div>
            <Link
              href="/Blogs/new"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              New Post
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
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
                    {f === "ALL"
                      ? posts.length
                      : posts.filter((p) => p.status === f).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative max-w-md">
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
          </div>

          {filter === "SCHEDULED" && (
            <div className="mt-6 text-right">
              <button
                onClick={handlePublishNow}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-sm transition"
              >
                Publish Due Posts Now
              </button>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="text-gray-400 dark:text-gray-500 text-lg">
                No posts found matching your criteria
              </div>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="w-full lg:w-48 lg:flex-shrink-0">
                      <img
                        src={post.coverImage}
                        alt={post.altText || post.title}
                        className="w-full h-32 lg:h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}

                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                        {post.title}
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          post.status
                        )}`}
                      >
                        {post.status}
                      </span>
                    </div>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author?.name || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Created {formatDate(post.createdAt)}</span>
                      </div>
                      {post.updatedAt !== post.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Updated {formatDate(post.updatedAt)}</span>
                        </div>
                      )}
                      {post.readingTime > 0 && (
                        <div className="flex items-center gap-1">
                          <span>{post.readingTime} min read</span>
                        </div>
                      )}
                    </div>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Categories:
                        </span>
                        {post.categories.map((category, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        {post.tags.length > 0 && (
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Tags:
                          </span>
                        )}
                        {post.tags.map((tag, i) => (
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

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
                    <Link
                      href={
                        post.status === "DRAFT"
                          ? `/Blogs/draft/${post.slug}`
                          : `/Blogs/published/${post.slug}`
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
                        className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                        title="Publish now"
                      >
                        <Send size={16} />
                        <span className="hidden sm:inline">Publish</span>
                      </button>
                    )}
                    <BlogItem key={post.id} post={post} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostsManager;
