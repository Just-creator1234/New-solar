// "use client";

// import { useState, useEffect } from "react";
// import { getPosts } from "@/app/actions/getPosts";
// import { Calendar, User, Tag, Folder } from "lucide-react";
// import Link from "next/link";

// const SolarlinkBlogs = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts("PUBLISHED");
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {posts.map((post) => (
//           <Link href={`/blogs/${post.id}`} key={post.id}>
//             <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
//               {post.coverImage && (
//                 <div className="aspect-w-16 aspect-h-9">
//                   <img
//                     src={post.coverImage}
//                     alt={post.title}
//                     className="object-cover w-full h-48"
//                   />
//                 </div>
//               )}

//               <div className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
//                   {post.title}
//                 </h2>

//                 {post.excerpt && (
//                   <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{formatDate(post.createdAt)}</span>
//                   </div>
//                   {post.author && (
//                     <div className="flex items-center gap-1">
//                       <User className="w-4 h-4" />
//                       <span>{post.author.name}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {post.categories?.map((category) => (
//                     <span
//                       key={category.id}
//                       className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs"
//                     >
//                       <Folder className="w-3 h-3" />
//                       {category.name}
//                     </span>
//                   ))}
//                   {post.tags?.map((tag) => (
//                     <span
//                       key={tag.id}
//                       className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs"
//                     >
//                       <Tag className="w-3 h-3" />
//                       {tag.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </article>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SolarlinkBlogs;

// "use client";

// import { useState, useEffect } from "react";
// import { Calendar, User, Tag, Folder, ArrowRight, Clock } from "lucide-react";
// import { getPosts } from "@/app/actions/getPosts";

// const SolarlinkBlogs = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts("PUBLISHED");
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   const featuredPost = posts.find((post) => post.featured) || posts[0];
//   const regularPosts = posts.filter((post) => !post.featured);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header Section */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Browse Our Resources
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Explore our collection of articles, guides, and insights on
//               sustainable energy, technology, and modern living.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Featured Post */}
//         {featuredPost && (
//           <div className="mb-16">
//             <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
//               <div className="lg:flex">
//                 <div className="lg:w-1/2">
//                   <div className="relative h-64 lg:h-full">
//                     <img
//                       src={featuredPost.coverImage}
//                       alt={featuredPost.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/60"></div>
//                   </div>
//                 </div>
//                 <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
//                   <div className="flex items-center gap-3 mb-4">
//                     {featuredPost.categories?.map((category) => (
//                       <span
//                         key={category.id}
//                         className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
//                       >
//                         <Folder className="w-3 h-3" />
//                         {category.name}
//                       </span>
//                     ))}
//                   </div>

//                   <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
//                     {featuredPost.title}
//                   </h2>

//                   <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
//                     {featuredPost.excerpt}
//                   </p>

//                   <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       <span>{featuredPost.author?.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       <span>{formatDate(featuredPost.createdAt)}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span>{featuredPost.readTime}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="flex flex-wrap gap-2">
//                       {featuredPost.tags?.map((tag) => (
//                         <span
//                           key={tag.id}
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
//                         >
//                           <Tag className="w-3 h-3" />
//                           {tag.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
//                     Read More
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Regular Posts Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {regularPosts.map((post) => (
//             <article
//               key={post.id}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={post.coverImage}
//                   alt={post.title}
//                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-4 left-4">
//                   {post.categories?.map((category) => (
//                     <span
//                       key={category.id}
//                       className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-medium"
//                     >
//                       <Folder className="w-3 h-3" />
//                       {category.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                   {post.title}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
//                   {post.excerpt}
//                 </p>

//                 <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-1">
//                       <User className="w-3 h-3" />
//                       <span>{post.author?.name}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3" />
//                       <span>{formatDate(post.createdAt)}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     <span>{post.readTime}</span>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {post.tags?.slice(0, 2).map((tag) => (
//                     <span
//                       key={tag.id}
//                       className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
//                     >
//                       <Tag className="w-2 h-2" />
//                       {tag.name}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
//                     Read More
//                   </button>
//                   <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* Load More Button */}
//         <div className="text-center mt-12">
//           <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
//             Load More Articles
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SolarlinkBlogs;

"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demo purposes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulated API call
        const mockPosts = [
          {
            id: 1,
            title:
              "The Future of Solar Energy: Revolutionary Breakthroughs in 2024",
            excerpt:
              "Discover the latest innovations in solar technology that are reshaping the renewable energy landscape and making clean power more accessible than ever.",
            coverImage:
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
            author: { name: "Dr. Sarah Chen" },
            createdAt: "2024-07-01",
            readTime: "8 min read",
            featured: true,
            categories: [{ id: 1, name: "Technology" }],
            tags: [
              { id: 1, name: "Solar" },
              { id: 2, name: "Innovation" },
              { id: 3, name: "Future" },
            ],
            views: 2847,
          },
          {
            id: 2,
            title: "Smart Home Integration: Making Your House Energy Efficient",
            excerpt:
              "Learn how to seamlessly integrate smart technology with renewable energy systems for maximum efficiency and cost savings.",
            coverImage:
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
            author: { name: "Michael Rodriguez" },
            createdAt: "2024-06-28",
            readTime: "6 min read",
            featured: false,
            categories: [{ id: 2, name: "Smart Home" }],
            tags: [
              { id: 4, name: "Automation" },
              { id: 5, name: "Efficiency" },
            ],
            views: 1534,
          },
          {
            id: 3,
            title: "Sustainable Living: Small Changes, Big Impact",
            excerpt:
              "Explore practical ways to reduce your carbon footprint and live more sustainably without compromising on comfort or convenience.",
            coverImage:
              "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
            author: { name: "Emma Thompson" },
            createdAt: "2024-06-25",
            readTime: "5 min read",
            featured: false,
            categories: [{ id: 3, name: "Lifestyle" }],
            tags: [
              { id: 6, name: "Sustainability" },
              { id: 7, name: "Environment" },
            ],
            views: 892,
          },
          {
            id: 4,
            title: "Energy Storage Solutions: Powering Tomorrow",
            excerpt:
              "Dive deep into the latest battery technologies and energy storage systems that are revolutionizing how we store and use renewable energy.",
            coverImage:
              "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
            author: { name: "David Kim" },
            createdAt: "2024-06-22",
            readTime: "7 min read",
            featured: false,
            categories: [{ id: 4, name: "Energy Storage" }],
            tags: [
              { id: 8, name: "Battery" },
              { id: 9, name: "Technology" },
            ],
            views: 1205,
          },
        ];

        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = posts.filter((post) => !post.featured);

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for articles..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-orange-200 dark:border-slate-600 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none transition-colors bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-medium hover:from-orange-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl">
                <Filter className="w-4 h-4" />
                Filter
              </button>
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
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/60"></div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {featuredPost.views}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
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
                      <span className="text-sm font-medium">Trending</span>
                    </div>
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
                      <span>{formatDate(featuredPost.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span>{featuredPost.readTime}</span>
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

                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl group">
                    <BookOpen className="w-5 h-5" />
                    Read Full Article
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
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-orange-200/50 dark:border-slate-600/50 hover:border-orange-300 dark:hover:border-slate-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    {post.categories?.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium border border-white/50 dark:border-slate-600/50"
                      >
                        <Folder className="w-3 h-3" />
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Eye className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {post.views}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-medium">{post.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange-500 dark:text-orange-400" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
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

                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </button>
                    <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl group">
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            Load More Amazing Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-100 via-white to-blue-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl p-8 border border-orange-200/50 dark:border-slate-600/50">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Stay Connected
              </h3>
              <Heart className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get the latest insights delivered to your inbox weekly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-2 border-orange-200 dark:border-slate-600 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none transition-colors bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-medium hover:from-orange-600 hover:to-blue-600 transition-all shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarlinkBlogs;
