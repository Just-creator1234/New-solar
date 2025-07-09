"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePost, getPostBySlug } from "@/app/actions/editPost";
import { Loader2 } from "lucide-react";

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    title: "",
    content: "",
    coverImage: "",
    altText: "",
    excerpt: "",
    categories: [],
    tags: [],
    status: "DRAFT",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostBySlug(slug);

      if (data) {
        setPost({
          title: data.title || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          altText: data.altText || "",
          excerpt: data.excerpt || "",
          categories: data.categories?.map((c) => c.category?.name) || [],
          tags: data.tags?.map((t) => t.tag?.name) || [],
          status: data.status || "DRAFT",
        });
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await updatePost(slug, post);
    setSubmitting(false);
    router.push("/Blogs");
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 dark:text-gray-400">
        <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Edit Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Cover Image URL
          </label>
          <input
            id="coverImage"
            type="text"
            value={post.coverImage}
            onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Alt Text */}
        <div>
          <label
            htmlFor="altText"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Image Alt Text
          </label>
          <input
            id="altText"
            type="text"
            value={post.altText}
            onChange={(e) => setPost({ ...post, altText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={post.tags.join(", ")}
            onChange={(e) =>
              setPost({
                ...post,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Categories */}
        <div>
          <label
            htmlFor="categories"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Categories (comma-separated)
          </label>
          <input
            id="categories"
            type="text"
            value={post.categories.join(", ")}
            onChange={(e) =>
              setPost({
                ...post,
                categories: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={post.status}
            onChange={(e) => setPost({ ...post, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
