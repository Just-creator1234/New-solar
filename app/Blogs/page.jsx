// app/dashboard/posts/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/actions/getPosts";
import { useRouter } from "next/navigation";

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts(filter === "ALL" ? undefined : filter);
      setPosts(data);
    }
    fetchData();
  }, [filter]);

  const handleView = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  return (
    <div className="p-6 border-4 border-amber-600 min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {["ALL", "DRAFT", "PUBLISHED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md border ${
              "ALL" === f
                ? "bg-orange-500 text-white"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
            } ${filter === f && "bg-orange-500 text-white"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-md shadow-sm">
            <h2 className="font-semibold text-xl">{post.title}</h2>
            <p className="text-sm text-gray-500">Status: {post.status}</p>
            <div className="flex space-x-3 mt-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleView(post)}
                className="text-green-600 underline"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <div
              className="prose dark:prose-invert max-h-96 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
            <button
              onClick={() => setViewModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              Edit: {selectedPost.title}
            </h2>
            <textarea
              value={selectedPost.content}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, content: e.target.value })
              }
              className="w-full h-64 p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you'd call updatePost(selectedPost)
                  setEditModalOpen(false);
                  router.refresh();
                }}
                className="px-4 py-2 bg-orange-500 rounded-md text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
