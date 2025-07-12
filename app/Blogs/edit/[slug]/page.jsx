"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TagInput from "./TagInput";
import TiptapEditor from "@/components/TiptapEditor";
import Image from "next/image";
import PostPreviewModal from "@/components/PostPreviewModal";
import {
  ImageOff,
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
import { FiEdit, FiEye } from "react-icons/fi";

import { updatePost, getPostBySlug } from "@/app/actions/editPost";
import { getAllCategories } from "@/app/actions/getCategories";
export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [categories, setCategories] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
          categories: data.categories?.map((c) => c.slug) || [],
          tags: data.tags?.map((t) => t.name) || [],
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

    console.log(post, "hhhhhhhhhhhhhhhhhhhhh");

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
    <div className="min-h-screen bg-comfort-cream dark:bg-gray-900 mt-10">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center py-4 max-sm:flex-col max-sm:gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white max-sm:text-lg">
                Edit Blog Post
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {showPreview ? (
                  <FiEdit className="mr-2" />
                ) : (
                  <FiEye className="mr-2" />
                )}
                {showPreview ? "Edit" : "Preview"}
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
                          <Image
                            src={post.coverImage}
                            alt={post.altText || "Cover Image"}
                            width={1200}
                            height={400}
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
                    {!loading && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Content
                        </label>

                        <div className="min-h-[400px] border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-lg">
                          <TiptapEditor
                            content={post.content}
                            onChange={(html) =>
                              setPost({ ...post, content: html })
                            }
                            placeholder="Write your post content here..."
                          />
                        </div>
                      </div>
                    )}
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

                    <TagInput
                      tags={post.tags}
                      onChange={(updatedTags) =>
                        setPost({ ...post, tags: updatedTags })
                      }
                    />

                    {/* Categories */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Folder className="w-4 h-4 mr-2" />
                        Categories
                      </label>

                      {categories.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No categories found.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {categories.map((category) => {
                            const isChecked = post.categories.includes(
                              category.slug
                            ); // ← match by slug
                            return (
                              <label
                                key={category.slug}
                                className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    setPost((prev) => ({
                                      ...prev,
                                      categories: isChecked
                                        ? prev.categories.filter(
                                            (slug) => slug !== category.slug
                                          )
                                        : [...prev.categories, category.slug],
                                    }));
                                  }}
                                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {category.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
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

      {showPreview && (
        <PostPreviewModal
          onClose={() => setShowPreview(false)}
          post={{
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImageUrl: post.coverImage, // assuming this is the actual image URL
            altText: post.altText,
            categories: post.categories,
            tags: post.tags.map((tag, i) => ({
              id: tag.id || i.toString(), // support both fetched and typed tags
              name: tag.name || tag, // support both string or object
            })),
          }}
        />
      )}
    </div>
  );
}
