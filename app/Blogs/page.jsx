// "use client";

// import { useState, useEffect } from "react";
// import { Eye, Edit3, Trash2, Plus, Search, Calendar, User } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { getPosts } from "@/app/actions/getPosts";

// const BlogPostsManager = () => {
//   const [filter, setFilter] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getPosts(filter === "ALL" ? undefined : filter);
//       setPosts(data || []);
//     }
//     fetchData();
//   }, [filter]);

//   const handleEdit = (post) => {
//     setSelectedPost(post);
//     setEditModalOpen(true);
//   };

//   const handleView = (post) => {
//     setSelectedPost(post);
//     setViewModalOpen(true);
//   };

//   const handleDelete = (postId) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       setPosts(posts.filter((post) => post.id !== postId));
//       // You can also call a backend delete action here
//     }
//   };

//   const filteredPosts = posts.filter((post) => {
//     const matchesFilter = filter === "ALL" || post.status === filter;
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (post.author?.name || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       post.tags?.some((t) =>
//         (typeof t === "string" ? t : t.tag?.name || "")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())
//       );
//     return matchesFilter && matchesSearch;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "PUBLISHED":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "DRAFT":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                 Blog Posts
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Manage your blog posts, drafts, and published content
//               </p>
//             </div>
//             <button
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//               onClick={() => router.push("/dashboard/posts/create")}
//             >
//               <Plus size={16} />
//               New Post
//             </button>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
//             <div className="flex flex-wrap gap-2">
//               {["ALL", "DRAFT", "PUBLISHED"].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
//                     filter === f
//                       ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                       : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   }`}
//                 >
//                   {f}
//                   <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
//                     {f === "ALL"
//                       ? posts.length
//                       : posts.filter((p) => p.status === f).length}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             <div className="relative max-w-md">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search posts, authors, or tags..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Posts Grid */}
//         <div className="space-y-4">
//           {filteredPosts.length === 0 ? (
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
//               <div className="text-gray-400 dark:text-gray-500 text-lg">
//                 No posts found
//               </div>
//             </div>
//           ) : (
//             filteredPosts.map((post) => (
//               <div
//                 key={post.id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                   {/* Info */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
//                         {post.title}
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
//                           post.status
//                         )}`}
//                       >
//                         {post.status}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
//                       <div className="flex items-center gap-1">
//                         <User size={14} />
//                         <span>{post.author?.name || "Unknown"}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar size={14} />
//                         <span>Created {formatDate(post.createdAt)}</span>
//                       </div>
//                       {post.updatedAt !== post.createdAt && (
//                         <div className="flex items-center gap-1">
//                           <Calendar size={14} />
//                           <span>Updated {formatDate(post.updatedAt)}</span>
//                         </div>
//                       )}
//                     </div>
//                     {/* Tags */}
//                     <div className="flex flex-wrap gap-2">
//                       {post.tags?.map((tagObj, i) => (
//                         <span
//                           key={i}
//                           className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
//                         >
//                           {typeof tagObj === "string"
//                             ? tagObj
//                             : tagObj.tag?.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleView(post)}
//                       className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
//                     >
//                       <Eye size={16} />
//                       <span className="hidden sm:inline">View</span>
//                     </button>
//                     <button
//                       onClick={() => handleEdit(post)}
//                       className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
//                     >
//                       <Edit3 size={16} />
//                       <span className="hidden sm:inline">Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(post.id)}
//                       className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
//                     >
//                       <Trash2 size={16} />
//                       <span className="hidden sm:inline">Delete</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostsManager;

"use client";

import { useState, useEffect } from "react";
import { Eye, Edit3, Trash2, Plus, Search, Calendar, User } from "lucide-react";
import { getPosts } from "@/app/actions/getPosts";
import Link from "next/link";

const BlogPostsManager = () => {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const status = filter === "ALL" ? undefined : filter;
      const data = await getPosts(status);
      setPosts(data);
    };
    fetchPosts();
  }, [filter]);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleView = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "ALL" || post.status === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tagObj) =>
        (typeof tagObj === "string" ? tagObj : tagObj.tag?.name)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) ||
      post.categories?.some((categoryObj) =>
        (typeof categoryObj === "string"
          ? categoryObj
          : categoryObj.category?.name
        )
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 border-green-200";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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
        {/* Add the rest of your JSX here as-is, UI already working */}
        {/* Keep existing UI logic, modals, filtering and rendering as written */}

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
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} />
              New Post
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["ALL", "DRAFT", "PUBLISHED"].map((f) => (
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

            {/* Search */}
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
                        {post.categories.map((categoryObj, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"
                          >
                            {typeof categoryObj === "string"
                              ? categoryObj
                              : categoryObj.category?.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Tags:
                        </span>
                        {post.tags.map((tagObj, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                          >
                            {typeof tagObj === "string"
                              ? tagObj
                              : tagObj.tag?.name}
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
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View Modal */}
        {viewModalOpen && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedPost.title}
                  </h2>
                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>By {selectedPost.author}</span>
                  <span>{formatDate(selectedPost.createdAt)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      selectedPost.status
                    )}`}
                  >
                    {selectedPost.status}
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit: {selectedPost.title}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedPost.title}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea
                      value={selectedPost.content}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          content: e.target.value,
                        })
                      }
                      rows={12}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Here you'd call updatePost(selectedPost)
                      setEditModalOpen(false);
                      // router.refresh();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostsManager;
