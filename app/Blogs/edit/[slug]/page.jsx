// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { updatePost, getPostBySlug } from "@/app/actions/editPost";
// import { Loader2 } from "lucide-react";

// export default function EditPostPage() {
//   const router = useRouter();
//   const { slug } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [post, setPost] = useState({
//     title: "",
//     content: "",
//     coverImage: "", // this will hold the uploaded file URL (optional)
//     imageFile: null, // new: File object
//     altText: "",
//     excerpt: "",
//     categories: [],
//     tags: [],
//     status: "DRAFT",
//     metaTitle: "",
//     metaDescription: "",
//     focusKeyword: "",
//   });

//   useEffect(() => {
//     const fetchPost = async () => {
//       const data = await getPostBySlug(slug);

//       if (data) {
//         setPost({
//           title: data.title || "",
//           content: data.content || "",
//           coverImage: data.coverImage || "",
//           altText: data.altText || "",
//           excerpt: data.excerpt || "",
//           categories: data.categories?.map((c) => c.category?.name) || [],
//           tags: data.tags?.map((t) => t.tag?.name) || [],
//           status: data.status || "DRAFT",
//           metaTitle: data.metaTitle || "",
//           metaDescription: data.metaDescription || "",
//           focusKeyword: data.focusKeyword || "",
//         });
//       }
//       setLoading(false);
//     };

//     fetchPost();
//   }, [slug]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     let coverImageUrl = post.coverImage;

//     if (post.imageFile instanceof File && post.imageFile.size > 0) {
//       const formData = new FormData();
//       formData.append("image", post.imageFile);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         const { url } = await res.json();
//         coverImageUrl = url;
//         setPost((prev) => ({ ...prev, imageFile: null }));
//       } else {
//         alert("Image upload failed.");
//         setSubmitting(false);
//         return;
//       }
//     }

//     await updatePost(slug, { ...post, coverImage: coverImageUrl });

//     setSubmitting(false);
//     router.push("/Blogs");
//   };

//   if (loading) {
//     return (
//       <div className="p-12 text-center text-gray-500 dark:text-gray-400">
//         <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
//         Loading post...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-6">
//       <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
//         Edit Blog Post
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={post.title}
//             onChange={(e) => setPost({ ...post, title: e.target.value })}
//             required
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Excerpt */}
//         <div>
//           <label
//             htmlFor="excerpt"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Excerpt
//           </label>
//           <textarea
//             id="excerpt"
//             value={post.excerpt}
//             onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Cover Image Upload */}
//         <div>
//           <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Cover Image
//           </label>
//           <input
//             id="image"
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) {
//                 setPost((prev) => ({ ...prev, imageFile: file }));
//               }
//             }}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//           {post.coverImage && (
//             <img
//               src={post.coverImage}
//               alt={post.altText}
//               className="w-32 h-32 object-cover mt-2 rounded-md border"
//             />
//           )}
//         </div>

//         {/* Meta Title */}
//         <div>
//           <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Meta Title
//           </label>
//           <input
//             type="text"
//             value={post.metaTitle}
//             onChange={(e) => setPost({ ...post, metaTitle: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Meta Description */}
//         <div>
//           <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Meta Description
//           </label>
//           <textarea
//             value={post.metaDescription}
//             onChange={(e) =>
//               setPost({ ...post, metaDescription: e.target.value })
//             }
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Focus Keyword */}
//         <div>
//           <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
//             Focus Keyword
//           </label>
//           <input
//             type="text"
//             value={post.focusKeyword}
//             onChange={(e) => setPost({ ...post, focusKeyword: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Content */}
//         <div>
//           <label
//             htmlFor="content"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Content
//           </label>
//           <textarea
//             id="content"
//             rows={12}
//             value={post.content}
//             onChange={(e) => setPost({ ...post, content: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Tags */}
//         <div>
//           <label
//             htmlFor="tags"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Tags (comma-separated)
//           </label>
//           <input
//             id="tags"
//             type="text"
//             value={post.tags.join(", ")}
//             onChange={(e) =>
//               setPost({
//                 ...post,
//                 tags: e.target.value.split(",").map((t) => t.trim()),
//               })
//             }
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Categories */}
//         <div>
//           <label
//             htmlFor="categories"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Categories (comma-separated)
//           </label>
//           <input
//             id="categories"
//             type="text"
//             value={post.categories.join(", ")}
//             onChange={(e) =>
//               setPost({
//                 ...post,
//                 categories: e.target.value.split(",").map((c) => c.trim()),
//               })
//             }
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label
//             htmlFor="status"
//             className="block font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Status
//           </label>
//           <select
//             id="status"
//             value={post.status}
//             onChange={(e) => setPost({ ...post, status: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//           >
//             <option value="DRAFT">Draft</option>
//             <option value="PUBLISHED">Published</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {submitting ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Loader2,
  Save,
  Eye,
  Upload,
  X,
  Tag,
  Folder,
  FileText,
  Search,
  Calendar,
} from "lucide-react";

import { updatePost, getPostBySlug } from "@/app/actions/editPost";
export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    altText: "",
    categories: [],
    tags: [],
    status: "DRAFT",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    imageFile: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const data = await getPostBySlug(slug);
      if (data) {
        setPost({
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          altText: data.altText || "",
          categories: data.categories?.map((c) => c.category.name) || [],
          tags: data.tags?.map((t) => t.tag.name) || [],
          status: data.status || "DRAFT",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          focusKeyword: data.focusKeyword || "",
          imageFile: null,
        });
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let coverImageUrl = post.coverImage;

    if (post.imageFile instanceof File && post.imageFile.size > 0) {
      const formData = new FormData();
      formData.append("image", post.imageFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        coverImageUrl = url;
        router.refresh();
      } else {
        alert("Image upload failed.");
        setSubmitting(false);
        return;
      }
    }

    await updatePost(slug, {
      ...post,
      coverImage: coverImageUrl,
    });

    setSubmitting(false);
    alert("Post updated successfully!");
    router.push("/Blogs"); // Or wherever your blog list is
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPost((prev) => ({
        ...prev,
        imageFile: file,
        coverImage: url,
      }));
    }
  };

  const removeImage = () => {
    setPost((prev) => ({ ...prev, coverImage: "", imageFile: null }));
  };

  const tabs = [
    { id: "content", label: "Content", icon: FileText },
    { id: "seo", label: "SEO", icon: Search },
    { id: "settings", label: "Settings", icon: Calendar },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Blog Post
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Last saved 2 minutes ago
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600 dark:text-blue-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Content Tab */}
                {activeTab === "content" && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                          setPost({ ...post, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter post title..."
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={post.excerpt}
                        onChange={(e) =>
                          setPost({ ...post, excerpt: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Brief description of your post..."
                      />
                    </div>

                    {/* Cover Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cover Image
                      </label>
                      {post.coverImage ? (
                        <div className="relative">
                          <img
                            src={post.coverImage}
                            alt={post.altText}
                            className="w-full h-64 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Alt Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={post.altText}
                        onChange={(e) =>
                          setPost({ ...post, altText: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Describe the image for accessibility..."
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content
                      </label>
                      <textarea
                        rows={16}
                        value={post.content}
                        onChange={(e) =>
                          setPost({ ...post, content: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                        placeholder="Write your post content..."
                      />
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        SEO Optimization
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Optimize your post for search engines by filling out the
                        fields below.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={post.metaTitle}
                        onChange={(e) =>
                          setPost({ ...post, metaTitle: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="SEO title for search results..."
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {post.metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={post.metaDescription}
                        onChange={(e) =>
                          setPost({ ...post, metaDescription: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Brief description for search results..."
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {post.metaDescription.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Focus Keyword
                      </label>
                      <input
                        type="text"
                        value={post.focusKeyword}
                        onChange={(e) =>
                          setPost({ ...post, focusKeyword: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Primary keyword for this post..."
                      />
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    {/* Tags */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Tag className="w-4 h-4 mr-2" />
                        Tags
                      </label>
                      <input
                        type="text"
                        value={post.tags.join(", ")}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            tags: e.target.value
                              .split(",")
                              .map((t) => t.trim()),
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter tags separated by commas..."
                      />
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Folder className="w-4 h-4 mr-2" />
                        Categories
                      </label>
                      <input
                        type="text"
                        value={post.categories.join(", ")}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            categories: e.target.value
                              .split(",")
                              .map((c) => c.trim()),
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter categories separated by commas..."
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Publication Status
                      </label>
                      <select
                        value={post.status}
                        onChange={(e) =>
                          setPost({ ...post, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Post Summary
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Word Count
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {post.content?.split(" ").length || 0} words
                  </p>
                </div>

                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Reading Time
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {Math.ceil((post.content?.split(" ").length || 0) / 200)}{" "}
                    min read
                  </p>
                </div>

                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Categories
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {post.categories?.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Tags
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {post.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags?.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
