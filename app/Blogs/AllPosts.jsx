"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Pagination from "./Pagination";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AllPosts({ post, currentPage }) {
  const { pagePosts, totalPages } = post;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    fetch("/api/catgories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleCategoryClick = (catId) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }

    // Always reset to page 1 when changing category
    params.set("page", "1");

    // Build relative URL
    const queryString = params.toString();
    const newPath = `/Posts?${queryString}`;

    router.push(newPath);
  };
  async function handleDelete(postId) {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
 
      router.refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }

  return (
    <div className="relative w-full mx-auto mt-4 rounded-2xl bg-white shadow-lg min-h-[38rem] p-6 flex flex-col">
      {/* Header */}
      {session.user.role?.toUpperCase() == "ADMIN" && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Your Posts
          </h1>
          <Link href="/Posts/createPost">
            <button className="inline-block rounded-lg px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
              + Add Post
            </button>
          </Link>
        </div>
      )}
      {/* Posts Grid */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-1 rounded-full border ${
            !selectedCategory ? "bg-blue-600 text-white" : "bg-white"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagePosts.map((p) => (
          <div
            key={p.id}
            className="group bg-white border border-gray-100 rounded-2xl shadow hover:shadow-md transition-all overflow-hidden"
          >
            <div className="h-52 bg-gray-100 overflow-hidden">
              <img
                src={p.imageOrig || "/placeholder.jpg"}
                alt={p.postname}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex flex-wrap gap-2">
                {(p.categories?.length
                  ? p.categories
                  : [{ name: "Uncategorized" }]
                ).map((cat) => (
                  <span
                    key={cat.name}
                    className="text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:underline">
                <Link href={`/Posts/${p.id}`}>{p.postname}</Link>
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>

              <div className="flex justify-between items-center pt-2 text-xs text-gray-400">
                <span>
                  {formatDistanceToNow(new Date(p.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <span>{p.readTime || "3 min read"}</span>
              </div>

              {session?.user?.role === "ADMIN" && (
                <button
                  onClick={() => handleDelete(p.id)}
                  className="mt-3 text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - sticky to bottom */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
