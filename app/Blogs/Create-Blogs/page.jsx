"use client";

import { useState, useEffect, useRef } from "react";
import { createPost, saveDraft } from "@/app/actions/createPost";
import { getAllCategories } from "@/app/actions/getCategories";
import { useAutoSave } from "@/hook/useAutoSave";
import { formatDistanceToNow } from "date-fns";
import { useTransition } from "react";
import { createCategory } from "@/app/actions/categoryActions";
import { useRouter } from "next/navigation";
import PostPreviewModal from "../../../components/PostPreviewModal";
import TiptapEditor from "@/components/TiptapEditor";
import Image from "next/image";
import { autoSavePost } from "@/app/actions/autoSavePost";
import toast from "react-hot-toast";
import { deleteCategory } from "@/app/actions/deleteCategory";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiType,
  FiEdit,
  FiCode,
  FiList,
  FiMinus,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiAlignLeft,
  FiEye,
  FiSave,
  FiSettings,
  FiCalendar,
  FiTag,
  FiImage,
  FiLink,
  FiFileText,
  FiClock,
  FiUser,
  FiGlobe,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function EnhancedCreatePostPage() {
  // Content state
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  // Media state
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [altText, setAltText] = useState("");

  // Categories and metadata
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [author, setAuthor] = useState("John Doe");
  const [publishDate, setPublishDate] = useState("");
  const [status, setStatus] = useState("DRAFT");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState("content");
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Meta-data state
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [draftId, setDraftId] = useState(null);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (autoSave) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome to show the dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [autoSave]);

  useAutoSave(
    {
      title,
      slug,
      status,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      focusKeyword,
    },
    autoSave ? handleAutoSave : () => {}, // ✅ only save if autoSave is enabled
    autoSave ? setLastSaved : undefined // ✅ update lastSaved if enabled
  );

  async function handleAutoSave() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("focusKeyword", focusKeyword);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("tags", JSON.stringify(tags.map((t) => t.name)));

    if (coverImageFile) {
      formData.append("image", coverImageFile);
    }

    if (draftId) {
      formData.append("id", draftId); // ✅ only if this exists
    }

    // ✅ use autoSavePost instead of saveDraft
    const response = await autoSavePost(formData);

    // ✅ store the draftId if this is the first save
    if (response?.post?.id && !draftId) {
      setDraftId(response.post.id);
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory(id);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete category");
      }

      // Remove from local state if successful
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setValidationErrors({}); // clear previous errors
    } catch (error) {
      setValidationErrors((prev) => ({
        ...prev,
        deleteCategory: error.message,
      }));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    const alreadyExists = categories.some(
      (cat) => cat.name.toLowerCase() === newCategory.trim().toLowerCase()
    );
    if (alreadyExists) {
      setValidationErrors({ name: "This category already exists." });
      return;
    }
    if (!newCategory.trim()) return;

    startTransition(async () => {
      const result = await createCategory(newCategory);

      if (result.success) {
        setCategories((prev) => [...prev, result.category]);
        setSelectedCategories((prev) => [...prev, result.category.id]);
        setNewCategory("");
      } else {
        console.log(result);
        return;
      }
    });
  };
  // Mock categories data
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

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(generatedSlug);
    }
  }, [title]);

  // Calculate word count and reading time
  useEffect(() => {
    if (content) {
      const words = content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const count = words.length;
      setWordCount(count);
      setReadingTime(Math.ceil(count / 200));
    }
  }, [content]);

  const handleSaveDraft = async () => {
    let coverImageUrl = "";

    // ⬆️ Upload image first, if present
    if (coverImageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", coverImageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          coverImageUrl = url;
        } else {
          toast.error("Image upload failed.");
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Unable to upload image.");

        setIsSubmitting(false);
        return;
      }
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("tags", JSON.stringify(tags));
    formData.append("authorId", "sunlink-author");
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("focusKeyword", focusKeyword);
    formData.append("status", "DRAFT");

    if (coverImageUrl) {
      formData.append("coverImage", coverImageUrl);
    }

    try {
      const result = await saveDraft(formData);
      if (result.success) {
        router.push("/Blogs");
        toast.success("Draft saved successfully!");
      } else {
        toast.error("Failed to save draft.");
      }
    } catch (error) {
      console.error("Draft save error:", error);
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const errors = {};

    // Validate file size
    if (file.size > maxSize) {
      errors.coverImage = "Image must be less than 10MB.";
    }

    // Validate MIME type
    if (!allowedTypes.includes(file.type)) {
      errors.coverImage =
        "Unsupported image format. Only JPEG, PNG, and WebP are allowed.";
    }

    // If there are any validation errors, stop here
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear previous errors and proceed
    setValidationErrors({});
    setCoverImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setCoverImageUrl(previewUrl);
  };

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) errors.title = "Title is required";
    if (!content.trim()) errors.content = "Content is required";
    if (!excerpt.trim()) errors.excerpt = "Excerpt is required";
    if (selectedCategories.length === 0)
      errors.categories = "At least one category is required";
    if (status === "scheduled" && !publishDate)
      errors.publishDate = "Publish date is required for scheduled posts";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (action) => {
    if (!validateForm()) {
      toast.error("Please fix the validation errors before publishing.");

      return;
    }

    setIsSubmitting(true);

    let finalStatus = status;
    if (action === "publish" && status !== "SCHEDULED") {
      finalStatus = "PUBLISHED";
    }

    let coverImageUrl = "";

    // ⬆️ Upload image first, if present
    if (coverImageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", coverImageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          coverImageUrl = url;
        } else {
          toast.error("Image upload failed.");
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Unable to upload image.");
        setIsSubmitting(false);
        return;
      }
    }

    // 📦 Build final form data for post creation
    const formData = new FormData();
    formData.append("status", finalStatus);
    formData.append("action", action);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("tags", JSON.stringify(tags));
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("authorId", "sunlink-author");
    formData.append("altText", altText);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("focusKeyword", focusKeyword);

    if (status === "PUBLISHED" || status === "SCHEDULED") {
      formData.append("publishDate", new Date().toISOString());
    }

    // ✅ Use Cloudinary URL if uploaded
    if (coverImageUrl) {
      formData.append("coverImage", coverImageUrl);
    }

    try {
      const res = await createPost(formData);

      if (res?.success) {
        toast.success(res.message || "Blog created. Redirecting...");
        router.push("/Blogs");
      } else {
        toast.error(res?.message || "Failed to create blog.");
      }

      // Reset form state
      setTitle("");
      setSlug("");
      setContent("");
      setExcerpt("");
      setTags([]);
      setSelectedCategories([]);
      setCoverImageUrl("");
      setCoverImageFile(null);
      setAltText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "content", label: "Content", icon: FiFileText },
    { id: "media", label: "Media", icon: FiImage },
    { id: "settings", label: "Settings", icon: FiSettings },
    { id: "seo", label: "SEO", icon: FiGlobe },
  ];

  return (
    <div className="min-h-screen bg-comfort-cream dark:bg-gray-900 mt-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b  border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Create New Post
              </h1>
              {lastSaved && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last saved:{" "}
                  {formatDistanceToNow(new Date(lastSaved), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
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
                name="action"
                value="draft"
                onClick={handleSaveDraft}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FiSave className="mr-2" />
                Save Draft
              </button>

              <button
                type="submit"
                name="action"
                value="publish"
                onClick={() => handleSubmit("publish")}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition"
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter your post title..."
                    className={`w-full text-2xl font-bold placeholder-gray-400 dark:placeholder-gray-500 p-4 rounded-lg border ${
                      validationErrors.title
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white`}
                  />
                  {validationErrors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL Slug
                  </label>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    type="text"
                    placeholder="url-slug"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  {showPreview ? (
                    <div className="prose dark:prose-invert max-w-none p-4 border rounded-md bg-white dark:bg-gray-800">
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  ) : (
                    <div className="min-h-[400px] border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600">
                      <TiptapEditor
                        content={content}
                        onChange={(html) => setContent(html)}
                        placeholder="Write your post content here..."
                        className="custom-optional-classes"
                      />
                    </div>
                  )}

                  {validationErrors.content && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.content}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={4}
                    maxLength={300}
                    placeholder="Write a compelling excerpt for your post..."
                    className={`w-full p-3 rounded-lg border ${
                      validationErrors.excerpt
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                  />
                  <div className="flex justify-between mt-1">
                    {validationErrors.excerpt && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {validationErrors.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      {excerpt.length}/300 characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Image
                  </label>

                  <div className="relative w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-orange-400 dark:hover:border-orange-400 transition cursor-pointer bg-white dark:bg-gray-800 overflow-hidden">
                    {coverImageUrl ? (
                      <Image
                        src={coverImageUrl}
                        alt="Cover"
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    ) : (
                      <div className="text-center pointer-events-none">
                        <FiImage className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                        <span className="mt-2 block text-sm text-gray-500 dark:text-gray-400">
                          Upload a cover image
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleUpload}
                    />
                  </div>
                </div>

                {validationErrors.coverImage && (
                  <p className="text-sm text-red-500 mt-2">
                    {validationErrors.coverImage}
                  </p>
                )}

                {coverImageUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alt Text
                    </label>
                    <input
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      type="text"
                      placeholder="Describe this image for accessibility..."
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="SCHEDULED">Scheduled</option>
                    </select>
                  </div>

                  {status === "SCHEDULED" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Publish Date
                      </label>
                      <input
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        type="datetime-local"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-500 dark:bg-gray-800"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable auto-save
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    placeholder="SEO title for search engines..."
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    maxLength={160}
                    placeholder="SEO description for search engines..."
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="Main keyword for this post..."
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Post Stats */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Post Statistics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Words:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {wordCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Reading time:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {readingTime} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Characters:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {content.replace(/<[^>]*>/g, "").length}
                  </span>
                </div>
              </div>
            </div>

            {/*Categories*/}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Categories
              </h3>

              <div className="max-h-48 overflow-y-auto space-y-2">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-500" />
                  </div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex justify-between items-center group"
                    >
                      <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded flex-1">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-500 dark:bg-gray-800"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {category.name}
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-gray-400 hover:text-red-600 p-1 hidden group-hover:block"
                        title="Delete category"
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* ✅ Add New Category Input */}
              <div className="mt-4">
                <form onSubmit={handleAddCategory} className="flex space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Validation Errors */}
              {validationErrors.categories && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.categories}
                </p>
              )}

              {validationErrors.deleteCategory && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.deleteCategory}
                </p>
              )}

              {validationErrors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Tags
              </h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
                    type="text"
                    placeholder="Add a tag..."
                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <button
                    onClick={handleTagAdd}
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Validation Summary */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FiAlertCircle className="text-red-500 dark:text-red-400 mr-2" />
                  <h3 className="font-semibold text-red-800 dark:text-red-300">
                    Validation Issues
                  </h3>
                </div>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  {Object.values(validationErrors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {showPreview && (
        <PostPreviewModal
          onClose={() => setShowPreview(false)}
          post={{
            title,
            excerpt,
            content,
            coverImageUrl,
            altText,
            categories: categories.filter((cat) =>
              selectedCategories.includes(cat.id)
            ),
            tags: tags.map((tag, i) => ({
              id: i.toString(),
              name: tag,
            })),
          }}
        />
      )}
    </div>
  );
}
