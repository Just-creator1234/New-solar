// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   FiBold,
//   FiItalic,
//   FiUnderline,
//   FiType,
//   FiCode,
//   FiList,
//   FiMinus,
//   FiCornerUpLeft,
//   FiCornerUpRight,
//   FiAlignLeft,
//   FiEye,
//   FiSave,
//   FiSettings,
//   FiCalendar,
//   FiTag,
//   FiImage,
//   FiLink,
//   FiFileText,
//   FiClock,
//   FiUser,
//   FiGlobe,
//   FiLock,
//   FiCheckCircle,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { FaListOl, FaQuoteRight } from "react-icons/fa";
// import { BsCodeSlash } from "react-icons/bs";

// export default function EnhancedCreatePostPage() {
//   // Content state
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [content, setContent] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState("");

//   // Media state
//   const [coverImageFile, setCoverImageFile] = useState(null);
//   const [coverImageUrl, setCoverImageUrl] = useState("");
//   const [altText, setAltText] = useState("");

//   // Categories and metadata
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [author, setAuthor] = useState("John Doe");
//   const [publishDate, setPublishDate] = useState("");
//   const [status, setStatus] = useState("draft"); // draft, published, scheduled
//   const [visibility, setVisibility] = useState("public"); // public, private, password
//   const [password, setPassword] = useState("");

//   // UI state
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("content");
//   const [showPreview, setShowPreview] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [readingTime, setReadingTime] = useState(0);
//   const [autoSave, setAutoSave] = useState(true);
//   const [lastSaved, setLastSaved] = useState(null);

//   // Validation state
//   const [validationErrors, setValidationErrors] = useState({});

//   const contentRef = useRef(null);
//   const autoSaveInterval = useRef(null);

//   // Mock categories data
//   useEffect(() => {
//     setCategories([
//       { id: 1, name: "Technology", slug: "technology" },
//       { id: 2, name: "Design", slug: "design" },
//       { id: 3, name: "Business", slug: "business" },
//       { id: 4, name: "Marketing", slug: "marketing" },
//       { id: 5, name: "Development", slug: "development" },
//       { id: 6, name: "AI & ML", slug: "ai-ml" },
//       { id: 7, name: "Mobile", slug: "mobile" },
//       { id: 8, name: "Web", slug: "web" },
//     ]);
//   }, []);

//   // Auto-generate slug from title
//   useEffect(() => {
//     if (title) {
//       const generatedSlug = title
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")
//         .replace(/\s+/g, "-")
//         .replace(/-+/g, "-")
//         .trim();
//       setSlug(generatedSlug);
//     }
//   }, [title]);

//   // Calculate word count and reading time
//   useEffect(() => {
//     if (content) {
//       const words = content
//         .replace(/<[^>]*>/g, "")
//         .split(/\s+/)
//         .filter((word) => word.length > 0);
//       const count = words.length;
//       setWordCount(count);
//       setReadingTime(Math.ceil(count / 200)); // Average reading speed: 200 words per minute
//     }
//   }, [content]);

//   // Auto-save functionality
//   useEffect(() => {
//     if (autoSave && (title || content)) {
//       autoSaveInterval.current = setInterval(() => {
//         handleAutoSave();
//       }, 30000); // Auto-save every 30 seconds

//       return () => {
//         if (autoSaveInterval.current) {
//           clearInterval(autoSaveInterval.current);
//         }
//       };
//     }
//   }, [title, content, autoSave]);

//   const handleAutoSave = () => {
//     // Simulate auto-save
//     setLastSaved(new Date());
//     console.log("Auto-saved at:", new Date());
//   };

//   const handleTagAdd = () => {
//     if (newTag.trim() && !tags.includes(newTag.trim())) {
//       setTags([...tags, newTag.trim()]);
//       setNewTag("");
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleCategoryToggle = (categoryId) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setCoverImageFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setCoverImageUrl(previewUrl);
//   };

//   const validateForm = () => {
//     const errors = {};

//     if (!title.trim()) errors.title = "Title is required";
//     if (!content.trim()) errors.content = "Content is required";
//     if (!excerpt.trim()) errors.excerpt = "Excerpt is required";
//     if (selectedCategories.length === 0)
//       errors.categories = "At least one category is required";
//     if (status === "scheduled" && !publishDate)
//       errors.publishDate = "Publish date is required for scheduled posts";
//     if (visibility === "password" && !password)
//       errors.password = "Password is required for password-protected posts";

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       alert("Please fix the validation errors before publishing.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("slug", slug);
//       formData.append("content", content);
//       formData.append("excerpt", excerpt);
//       formData.append("tags", JSON.stringify(tags));
//       formData.append("categories", JSON.stringify(selectedCategories));
//       formData.append("author", author);
//       formData.append("publishDate", publishDate);
//       formData.append("status", status);
//       formData.append("visibility", visibility);
//       formData.append("password", password);
//       formData.append("altText", altText);

//       if (coverImageFile) {
//         formData.append("image", coverImageFile);
//       }

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       alert(
//         `Post ${status === "published" ? "published" : "saved"} successfully!`
//       );

//       // Reset form
//       setTitle("");
//       setSlug("");
//       setContent("");
//       setExcerpt("");
//       setTags([]);
//       setSelectedCategories([]);
//       setCoverImageUrl("");
//       setCoverImageFile(null);
//       setAltText("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save post.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const tabs = [
//     { id: "content", label: "Content", icon: FiFileText },
//     { id: "media", label: "Media", icon: FiImage },
//     { id: "settings", label: "Settings", icon: FiSettings },
//     { id: "seo", label: "SEO", icon: FiGlobe },
//   ];

//   return (
//     <div className="min-h-screen bg-comfort-cream dark:bg-sky-light-900 mt-12">
//       {/* Header */}
//       <div className="bg-white dark:bg-sky-light-800 border-b border-sky-light-200 dark:border-sky-light-700 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
//             {/* Title & Last Saved */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//               <h1 className="text-lg sm:text-xl font-semibold text-sky-light-900 dark:text-white">
//                 Create New Post
//               </h1>
//               {lastSaved && (
//                 <span className="text-sm text-sky-light-500 dark:text-sky-light-400">
//                   Last saved: {lastSaved.toLocaleTimeString()}
//                 </span>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <button
//                 onClick={() => setShowPreview(!showPreview)}
//                 className="inline-flex items-center px-3 py-2 border border-sky-light-300 dark:border-sky-light-600 rounded-md text-sm font-medium text-sky-light-700 dark:text-sky-light-300 bg-white dark:bg-sky-light-800 hover:bg-sky-light-50 dark:hover:bg-sky-light-700 transition"
//               >
//                 <FiEye className="mr-2" />
//                 {showPreview ? "Edit" : "Preview"}
//               </button>
//               <button
//                 onClick={handleAutoSave}
//                 className="inline-flex items-center px-3 py-2 border border-sky-light-300 dark:border-sky-light-600 rounded-md text-sm font-medium text-sky-light-700 dark:text-sky-light-300 bg-white dark:bg-sky-light-800 hover:bg-sky-light-50 dark:hover:bg-sky-light-700 transition"
//               >
//                 <FiSave className="mr-2" />
//                 Save Draft
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sunlink-orange-500 hover:bg-sunlink-orange-600 disabled:opacity-50 transition"
//               >
//                 {isSubmitting ? "Publishing..." : "Publish"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content Area */}
//           <div className="lg:col-span-3">
//             {/* Tab Navigation */}
//             <div className="border-b border-sky-light-200 dark:border-sky-light-700 mb-6">
//               <nav className="flex space-x-8">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
//                       activeTab === tab.id
//                         ? "border-sunlink-orange-500 text-sunlink-orange-600"
//                         : "border-transparent text-sky-light-500 dark:text-sky-light-400 hover:text-sky-light-700 dark:hover:text-sky-light-300 hover:border-sky-light-300 dark:hover:border-sky-light-600"
//                     }`}
//                   >
//                     <tab.icon className="mr-2" />
//                     {tab.label}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Content Tab */}
//             {activeTab === "content" && (
//               <div className="space-y-6">
//                 <div>
//                   <input
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     type="text"
//                     placeholder="Enter your post title..."
//                     className={`w-full text-2xl font-bold placeholder-sky-light-400 dark:placeholder-sky-light-500 p-4 rounded-lg border ${
//                       validationErrors.title
//                         ? "border-red-300 dark:border-red-600"
//                         : "border-sky-light-300 dark:border-sky-light-600"
//                     } focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white`}
//                   />
//                   {validationErrors.title && (
//                     <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                       {validationErrors.title}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     URL Slug
//                   </label>
//                   <input
//                     value={slug}
//                     onChange={(e) => setSlug(e.target.value)}
//                     type="text"
//                     placeholder="url-slug"
//                     className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Content
//                   </label>
//                   <div className="border border-sky-light-300 dark:border-sky-light-600 rounded-lg bg-white dark:bg-sky-light-800">
//                     {/* Toolbar */}
//                     <div className="flex flex-wrap gap-1 p-2 bg-sky-light-50 dark:bg-sky-light-700 border-b border-sky-light-200 dark:border-sky-light-600 rounded-t-lg">
//                       <ToolbarButton
//                         onClick={() => document.execCommand("bold")}
//                         title="Bold"
//                       >
//                         <FiBold />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() => document.execCommand("italic")}
//                         title="Italic"
//                       >
//                         <FiItalic />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() => document.execCommand("underline")}
//                         title="Underline"
//                       >
//                         <FiUnderline />
//                       </ToolbarButton>
//                       <div className="w-px h-8 bg-sky-light-300 dark:bg-sky-light-600 mx-1"></div>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand("formatBlock", false, "h2")
//                         }
//                         title="Heading"
//                       >
//                         <FiType />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand("insertUnorderedList")
//                         }
//                         title="Bullet List"
//                       >
//                         <FiList />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand("insertOrderedList")
//                         }
//                         title="Numbered List"
//                       >
//                         <FaListOl />
//                       </ToolbarButton>
//                       <div className="w-px h-8 bg-sky-light-300 dark:bg-sky-light-600 mx-1"></div>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand(
//                             "insertHTML",
//                             false,
//                             "<blockquote></blockquote>"
//                           )
//                         }
//                         title="Quote"
//                       >
//                         <FaQuoteRight />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand(
//                             "insertHTML",
//                             false,
//                             "<code></code>"
//                           )
//                         }
//                         title="Code"
//                       >
//                         <BsCodeSlash />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() =>
//                           document.execCommand("insertHorizontalRule")
//                         }
//                         title="Horizontal Rule"
//                       >
//                         <FiMinus />
//                       </ToolbarButton>
//                       <div className="w-px h-8 bg-sky-light-300 dark:bg-sky-light-600 mx-1"></div>
//                       <ToolbarButton
//                         onClick={() => document.execCommand("undo")}
//                         title="Undo"
//                       >
//                         <FiCornerUpLeft />
//                       </ToolbarButton>
//                       <ToolbarButton
//                         onClick={() => document.execCommand("redo")}
//                         title="Redo"
//                       >
//                         <FiCornerUpRight />
//                       </ToolbarButton>
//                     </div>

//                     <div
//                       ref={contentRef}
//                       contentEditable
//                       onInput={(e) => setContent(e.target.innerHTML)}
//                       className={`min-h-[400px] p-4 focus:outline-none dark:text-white ${
//                         validationErrors.content
//                           ? "border-red-300 dark:border-red-600"
//                           : ""
//                       }`}
//                       style={{ whiteSpace: "pre-wrap" }}
//                       dangerouslySetInnerHTML={{ __html: content }}
//                     />
//                   </div>
//                   {validationErrors.content && (
//                     <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                       {validationErrors.content}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Excerpt
//                   </label>
//                   <textarea
//                     value={excerpt}
//                     onChange={(e) => setExcerpt(e.target.value)}
//                     rows={4}
//                     maxLength={300}
//                     placeholder="Write a compelling excerpt for your post..."
//                     className={`w-full p-3 rounded-lg border ${
//                       validationErrors.excerpt
//                         ? "border-red-300 dark:border-red-600"
//                         : "border-sky-light-300 dark:border-sky-light-600"
//                     } focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500`}
//                   />
//                   <div className="flex justify-between mt-1">
//                     {validationErrors.excerpt && (
//                       <p className="text-sm text-red-600 dark:text-red-400">
//                         {validationErrors.excerpt}
//                       </p>
//                     )}
//                     <p className="text-xs text-sky-light-500 dark:text-sky-light-400 ml-auto">
//                       {excerpt.length}/300 characters
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Media Tab */}
//             {activeTab === "media" && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Cover Image
//                   </label>
//                   <div className="relative w-full h-64 border-2 border-dashed border-sky-light-300 dark:border-sky-light-600 rounded-lg flex items-center justify-center hover:border-sunlink-orange-400 dark:hover:border-sunlink-orange-400 transition cursor-pointer bg-white dark:bg-sky-light-800">
//                     {coverImageUrl ? (
//                       <img
//                         src={coverImageUrl}
//                         alt="Cover"
//                         className="h-full w-full object-cover rounded-lg"
//                       />
//                     ) : (
//                       <div className="text-center">
//                         <FiImage className="mx-auto h-12 w-12 text-sky-light-400 dark:text-sky-light-500" />
//                         <span className="mt-2 block text-sm text-sky-light-500 dark:text-sky-light-400">
//                           Upload a cover image
//                         </span>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       onChange={handleUpload}
//                     />
//                   </div>
//                 </div>

//                 {coverImageUrl && (
//                   <div>
//                     <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                       Alt Text
//                     </label>
//                     <input
//                       value={altText}
//                       onChange={(e) => setAltText(e.target.value)}
//                       type="text"
//                       placeholder="Describe this image for accessibility..."
//                       className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === "settings" && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                       Author
//                     </label>
//                     <input
//                       value={author}
//                       onChange={(e) => setAuthor(e.target.value)}
//                       type="text"
//                       className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                       Status
//                     </label>
//                     <select
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                       className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white"
//                     >
//                       <option value="draft">Draft</option>
//                       <option value="published">Published</option>
//                       <option value="scheduled">Scheduled</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                       Visibility
//                     </label>
//                     <select
//                       value={visibility}
//                       onChange={(e) => setVisibility(e.target.value)}
//                       className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white"
//                     >
//                       <option value="public">Public</option>
//                       <option value="private">Private</option>
//                       <option value="password">Password Protected</option>
//                     </select>
//                   </div>

//                   {status === "scheduled" && (
//                     <div>
//                       <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                         Publish Date
//                       </label>
//                       <input
//                         value={publishDate}
//                         onChange={(e) => setPublishDate(e.target.value)}
//                         type="datetime-local"
//                         className={`w-full p-3 rounded-lg border ${
//                           validationErrors.publishDate
//                             ? "border-red-300 dark:border-red-600"
//                             : "border-sky-light-300 dark:border-sky-light-600"
//                         } focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white`}
//                       />
//                       {validationErrors.publishDate && (
//                         <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                           {validationErrors.publishDate}
//                         </p>
//                       )}
//                     </div>
//                   )}

//                   {visibility === "password" && (
//                     <div>
//                       <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                         Password
//                       </label>
//                       <input
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         type="password"
//                         className={`w-full p-3 rounded-lg border ${
//                           validationErrors.password
//                             ? "border-red-300 dark:border-red-600"
//                             : "border-sky-light-300 dark:border-sky-light-600"
//                         } focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white`}
//                       />
//                       {validationErrors.password && (
//                         <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                           {validationErrors.password}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={autoSave}
//                       onChange={(e) => setAutoSave(e.target.checked)}
//                       className="rounded border-sky-light-300 dark:border-sky-light-600 text-sunlink-orange-600 focus:ring-sunlink-orange-500 dark:bg-sky-light-800"
//                     />
//                     <span className="ml-2 text-sm text-sky-light-700 dark:text-sky-light-300">
//                       Enable auto-save
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* SEO Tab */}
//             {activeTab === "seo" && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Meta Title
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="SEO title for search engines..."
//                     className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Meta Description
//                   </label>
//                   <textarea
//                     rows={3}
//                     maxLength={160}
//                     placeholder="SEO description for search engines..."
//                     className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-sky-light-700 dark:text-sky-light-300 mb-2">
//                     Focus Keyword
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Main keyword for this post..."
//                     className="w-full p-3 rounded-lg border border-sky-light-300 dark:border-sky-light-600 focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Post Stats */}
//             <div className="bg-white dark:bg-sky-light-800 p-4 rounded-lg border border-sky-light-200 dark:border-sky-light-700 shadow-sm">
//               <h3 className="font-semibold mb-3 text-sky-light-900 dark:text-white">
//                 Post Statistics
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-sky-light-600 dark:text-sky-light-400">
//                     Words:
//                   </span>
//                   <span className="font-medium text-sky-light-900 dark:text-white">
//                     {wordCount}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sky-light-600 dark:text-sky-light-400">
//                     Reading time:
//                   </span>
//                   <span className="font-medium text-sky-light-900 dark:text-white">
//                     {readingTime} min
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sky-light-600 dark:text-sky-light-400">
//                     Characters:
//                   </span>
//                   <span className="font-medium text-sky-light-900 dark:text-white">
//                     {content.replace(/<[^>]*>/g, "").length}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="bg-white dark:bg-sky-light-800 p-4 rounded-lg border border-sky-light-200 dark:border-sky-light-700 shadow-sm">
//               <h3 className="font-semibold mb-3 text-sky-light-900 dark:text-white">
//                 Categories
//               </h3>
//               <div className="max-h-48 overflow-y-auto">
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <label
//                       key={category.id}
//                       className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-sky-light-50 dark:hover:bg-sky-light-700 p-1 rounded"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedCategories.includes(category.id)}
//                         onChange={() => handleCategoryToggle(category.id)}
//                         className="rounded border-sky-light-300 dark:border-sky-light-600 text-sunlink-orange-600 focus:ring-sunlink-orange-500 dark:bg-sky-light-800"
//                       />
//                       <span className="text-sky-light-700 dark:text-sky-light-300">
//                         {category.name}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               {validationErrors.categories && (
//                 <p className="mt-2 text-sm text-red-600 dark:text-red-400">
//                   {validationErrors.categories}
//                 </p>
//               )}
//             </div>

//             {/* Tags */}
//             <div className="bg-white dark:bg-sky-light-800 p-4 rounded-lg border border-sky-light-200 dark:border-sky-light-700 shadow-sm">
//               <h3 className="font-semibold mb-3 text-sky-light-900 dark:text-white">
//                 Tags
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex space-x-2">
//                   <input
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
//                     type="text"
//                     placeholder="Add a tag..."
//                     className="flex-1 p-2 text-sm border border-sky-light-300 dark:border-sky-light-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sunlink-orange-500 bg-white dark:bg-sky-light-800 dark:text-white placeholder-sky-light-400 dark:placeholder-sky-light-500"
//                   />
//                   <button
//                     onClick={handleTagAdd}
//                     className="px-3 py-2 bg-sunlink-orange-600 text-white text-sm rounded-md hover:bg-sunlink-orange-700 transition-colors"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {tags.length > 0 && (
//                   <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-2 py-1 text-xs bg-sunlink-blue-100 dark:bg-sunlink-blue-900 text-sunlink-blue-800 dark:text-sunlink-blue-200 rounded-full"
//                       >
//                         {tag}
//                         <button
//                           onClick={() => handleTagRemove(tag)}
//                           className="ml-1 text-sunlink-blue-600 dark:text-sunlink-blue-300 hover:text-sunlink-blue-800 dark:hover:text-sunlink-blue-100"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Validation Summary */}
//             {Object.keys(validationErrors).length > 0 && (
//               <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
//                 <div className="flex items-center mb-2">
//                   <FiAlertCircle className="text-red-500 dark:text-red-400 mr-2" />
//                   <h3 className="font-semibold text-red-800 dark:text-red-300">
//                     Validation Issues
//                   </h3>
//                 </div>
//                 <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
//                   {Object.values(validationErrors).map((error, index) => (
//                     <li key={index}>• {error}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Toolbar Button Component
// function ToolbarButton({ children, active, onClick, title }) {
//   return (
//     <button
//       onClick={onClick}
//       title={title}
//       className={`p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center ${
//         active ? "bg-blue-100 text-blue-600" : "text-gray-600"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { createPost, saveDraft } from "@/app/actions/createPost";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiType,
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
import { FaListOl, FaQuoteRight } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

function TiptapEditor({
  content,
  onChange,
  placeholder = "Write something amazing...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${
            editor.isActive("bold")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Bold"
        >
          <FiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Italic"
        >
          <FiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md ${
            editor.isActive("underline")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Underline"
        >
          <FiUnderline />
        </button>
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-md ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Heading"
        >
          <FiType />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md ${
            editor.isActive("bulletList")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Bullet List"
        >
          <FiList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md ${
            editor.isActive("orderedList")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-md ${
            editor.isActive("blockquote")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Quote"
        >
          <FaQuoteRight />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-md ${
            editor.isActive("codeBlock")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Code Block"
        >
          <BsCodeSlash />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Horizontal Rule"
        >
          <FiMinus />
        </button>
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          onClick={setLink}
          className={`p-2 rounded-md ${
            editor.isActive("link")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Link"
        >
          <FiLink />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Image"
        >
          <FiImage />
        </button>
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${
            !editor.can().undo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Undo"
        >
          <FiCornerUpLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${
            !editor.can().redo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Redo"
        >
          <FiCornerUpRight />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[400px] p-4 focus:outline-none prose dark:prose-invert max-w-none"
      />
    </div>
  );
}

export default function EnhancedCreatePostPage() {
  // Content state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

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
  const [visibility, setVisibility] = useState("PUBLIC");

  const [password, setPassword] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  const contentRef = useRef(null);
  const autoSaveInterval = useRef(null);

  // Mock categories data
  useEffect(() => {
    setCategories([
      { id: "technology", name: "Technology", slug: "technology" },
      { id: "design", name: "Design", slug: "design" },
      { id: "business", name: "Business", slug: "business" },
      { id: "marketing", name: "Marketing", slug: "marketing" },
      { id: "development", name: "Development", slug: "development" },
      { id: "ai-ml", name: "AI & ML", slug: "ai-ml" },
      { id: "mobile", name: "Mobile", slug: "mobile" },
      { id: "web", name: "Web", slug: "web" },
    ]);
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

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && (title || content)) {
      autoSaveInterval.current = setInterval(() => {
        handleAutoSave();
      }, 30000);

      return () => {
        if (autoSaveInterval.current) {
          clearInterval(autoSaveInterval.current);
        }
      };
    }
  }, [title, content, autoSave]);

  const handleAutoSave = () => {
    setLastSaved(new Date());
    console.log("Auto-saved at:", new Date());
  };

  const handleSaveDraft = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("tags", JSON.stringify(tags));
    formData.append("authorId", "sunlink-author");

    try {
      const result = await saveDraft(formData);
      if (result.success) {
        alert("Draft saved successfully!");
      } else {
        alert("Failed to save draft.");
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
    if (visibility === "password" && !password)
      errors.password = "Password is required for password-protected posts";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fix the validation errors before publishing.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("tags", JSON.stringify(tags));
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("author", author);
    formData.append("publishDate", publishDate);
    formData.append("status", status);
    formData.append("visibility", visibility.toUpperCase());
    formData.append("password", password);
    formData.append("altText", altText);
    formData.append("secret", "blackbills");
    formData.append("authorId", "sunlink-author");

    if (coverImageFile) {
      formData.append("image", coverImageFile);
    }

    try {
      await createPost(formData);

      alert(
        `Post ${status === "published" ? "published" : "saved"} successfully!`
      );

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
      alert("Failed to save post.");
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
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Create New Post
              </h1>
              {lastSaved && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FiEye className="mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={handleSaveDraft}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FiSave className="mr-2" />
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
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
                  <TiptapEditor
                    content={content}
                    onChange={(html) => setContent(html)}
                    placeholder="Write your post content here..."
                  />
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
                  <div className="relative w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-orange-400 dark:hover:border-orange-400 transition cursor-pointer bg-white dark:bg-gray-800">
                    {coverImageUrl ? (
                      <img
                        src={coverImageUrl}
                        alt="Cover"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
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
                      Author
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>

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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Visibility
                    </label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="password">Password Protected</option>
                    </select>
                  </div>

                  {status === "scheduled" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Publish Date
                      </label>
                      <input
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        type="datetime-local"
                        className={`w-full p-3 rounded-lg border ${
                          validationErrors.publishDate
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-300 dark:border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white`}
                      />
                      {validationErrors.publishDate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.publishDate}
                        </p>
                      )}
                    </div>
                  )}

                  {visibility === "password" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className={`w-full p-3 rounded-lg border ${
                          validationErrors.password
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-300 dark:border-gray-600"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white`}
                      />
                      {validationErrors.password && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.password}
                        </p>
                      )}
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="Main keyword for this post..."
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

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Categories
              </h3>
              <div className="max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                    >
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
                  ))}
                </div>
              </div>
              {validationErrors.categories && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.categories}
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
    </div>
  );
}
