"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ViewCounter } from "@/components/Dynamic";

import {
  ImageOff,
  Calendar,
  ChevronDown,
  X,
  User,
  Tag,
  Folder,
  ArrowRight,
  Clock,
  Sun,
  Zap,
  Heart,
  BookOpen,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  Eye,
  Star,
  Coffee,
  Lightbulb,
} from "lucide-react";

const SolarlinkBlogs = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const loadPosts = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${pageNumber}`);
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const allCategories = [
    ...new Map(
      posts.flatMap((post) => post.categories || []).map((c) => [c.id, c])
    ).values(),
  ];

  const allTags = [
    ...new Map(
      posts.flatMap((post) => post.tags || []).map((t) => [t.id, t])
    ).values(),
  ];

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedCategory, selectedTag]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleLoadMore = () => {
    if (loading || page >= totalPages) return;
    setPage((prev) => prev + 1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 dark:border-slate-700 dark:border-t-orange-400 mx-auto mb-4"></div>
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Loading amazing content...
          </div>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? post.categories?.some((cat) => cat.id === selectedCategory)
      : true;

    const matchesTag = selectedTag
      ? post.tags?.some((tag) => tag.id === selectedTag)
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPost =
    filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((post) => !post.featured);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-blue-200/20 dark:from-orange-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-orange-200/20 dark:from-blue-500/10 dark:to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-white to-blue-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-xl border-b border-orange-200/50 dark:border-slate-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full shadow-lg animate-pulse">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full shadow-lg">
                <Sun className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-orange-600 dark:from-orange-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent mb-4">
              Discover Our Stories
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of insights on sustainable energy,
              innovative technology, and modern living.
              <span className="inline-flex items-center gap-1 ml-2 text-orange-600 dark:text-orange-400">
                <Heart className="w-4 h-4" />
                Written with passion
              </span>
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col items-center justify-center gap-6 mt-12 mb-12 max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative w-full max-w-2xl flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search for articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 max-sm:px-2 py-4 rounded-2xl border-2 border-orange-200/50 dark:border-slate-600/50 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-400/20 dark:focus:ring-orange-500/20 transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg shadow-lg hover:shadow-xl"
                />
              </div>

              {/* Filter Section */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                {/* Category Filter */}
                <div className="relative w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
                  {/* Left Icon */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <Folder className="w-5 h-5" />
                  </div>

                  {/* Dropdown */}
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value || null)
                    }
                    className="w-full pl-12 pr-10 py-3 rounded-lg border border-orange-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-sm sm:text-base text-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 dark:focus:ring-orange-500/50 focus:border-orange-400 dark:focus:border-orange-500 transition-all appearance-none backdrop-blur-md"
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* Chevron Icon */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                {/* Tag Filter */}
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <Tag className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedTag || ""}
                    onChange={(e) => setSelectedTag(e.target.value || null)}
                    className="w-full pl-10 pr-8 py-3 rounded-xl border-2 border-orange-200/50 dark:border-slate-600/50 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-400/20 dark:focus:ring-orange-500/20 transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg appearance-none cursor-pointer"
                  >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedCategory || selectedTag || searchTerm) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setSearchTerm("");
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    Clear
                  </button>
                )}
              </div>

              {/* Active Filters Display */}
              {(selectedCategory || selectedTag) && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-200 dark:border-orange-600/50">
                      <Folder className="w-3 h-3" />
                      {
                        allCategories.find((cat) => cat.id === selectedCategory)
                          ?.name
                      }
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="ml-1 hover:bg-orange-200 dark:hover:bg-orange-700 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedTag && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-600/50">
                      <Tag className="w-3 h-3" />
                      {allTags.find((tag) => tag.id === selectedTag)?.name}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Featured Article
              </h2>
              <Sparkles className="w-5 h-5 text-orange-500 dark:text-orange-400 animate-pulse" />
            </div>

            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden group cursor-pointer hover:shadow-3xl transition-all duration-500 border border-orange-200/50 dark:border-slate-600/50">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.altText || featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full border border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <ImageOff className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/60"></div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <ViewCounter />
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {featuredPost.categories?.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-200 dark:border-slate-500"
                      >
                        <Folder className="w-4 h-4" />
                        {category.name}
                      </span>
                    ))}
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        featuredPost.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {featuredPost.status}
                    </span>
                    {featuredPost.password && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full text-sm font-medium">
                        Protected
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">
                        {featuredPost.author?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      <span>
                        {formatDate(
                          featuredPost.publishedAt || featuredPost.createdAt
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span>{featuredPost.readingTime} min read</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-orange-200/50 dark:border-slate-500/50"
                      >
                        <Tag className="w-3 h-3" />
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex justify-between items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl group">
                    <div>
                      <Link
                        href={`/Solarlink-Blogs/${featuredPost.slug}`}
                        className="flex items-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        Read Full Article
                      </Link>
                    </div>

                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Regular Posts Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              More Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/50 dark:border-slate-600/50 hover:border-orange-300 dark:hover:border-slate-500 transition-all duration-300 group overflow-hidden"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.altText || post.title || "Post image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full border border-dashed border-gray-300 dark:border-gray-600 rounded-t-2xl bg-gray-50 dark:bg-gray-800">
                      <ImageOff className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}

                  {/* Category badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                    {post.categories?.slice(0, 2).map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium border border-white/50 dark:border-slate-600/50"
                      >
                        <Folder className="w-3 h-3" />
                        {category.name}
                      </span>
                    ))}
                    {post.categories?.length > 2 && (
                      <span className="inline-flex items-center px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium border border-white/50 dark:border-slate-600/50">
                        +{post.categories.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* View counter */}
                  <div className="absolute top-4 right-4">
                    <ViewCounter />
                  </div>

                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Status + Protection */}
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {post.status}
                    </span>
                    {post.password && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-medium">
                        Protected
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-medium">{post.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange-500 dark:text-orange-400" />
                        <span>
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Coffee className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-gray-600 dark:text-gray-300 rounded-full text-xs border border-orange-200/50 dark:border-slate-500/50"
                      >
                        <Tag className="w-2 h-2" />
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between mt-2">
                    <Link
                      href={`/Solarlink-Blogs/${post.slug}`}
                      className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </Link>
                    <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
            😕 No stories match your search.
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading || page >= totalPages}
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl group ${
              page >= totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-orange-600 hover:to-blue-600"
            }`}
          >
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            {loading
              ? "Loading..."
              : page >= totalPages
              ? "No More Stories"
              : "Load More Amazing Stories"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolarlinkBlogs;
