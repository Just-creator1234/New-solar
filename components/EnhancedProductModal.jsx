import React, { useState } from "react";
import { X, Star, Heart, Share2, Zap, Award } from "lucide-react";

const EnhancedProductModal = ({
  product,
  onClose,
  isFavorite,
  onFavoriteToggle,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount =
    product?.originalPrice && product?.price
      ? Math.round(
          ((parseFloat(product.originalPrice.replace("$", "")) -
            parseFloat(product.price.replace("$", ""))) /
            parseFloat(product.originalPrice.replace("$", ""))) *
            100
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative animate-fadeIn">
        {/* Header */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
            onClick={onFavoriteToggle}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </button>
          <button className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg">
            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Left Side - Image */}
          <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-8 flex items-center justify-center">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-80 object-cover rounded-2xl shadow-lg"
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}

              {/* Stock Badge */}
              <div
                className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {product.inStock
                  ? `${product.stockCount} in stock`
                  : "Out of stock"}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 flex-1">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                    {product.type}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Efficiency
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {product.efficiency}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Power
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {product.power}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Warranty
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {product.warranty}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  {["overview", "features", "specs"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    {product?.description ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No description available.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "features" && (
                  <ul className="space-y-3">
                    {Array.isArray(product?.features) &&
                    product.features.length > 0 ? (
                      product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 dark:text-gray-400 italic">
                        No features available.
                      </li>
                    )}
                  </ul>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-3">
                    {product?.specifications ? (
                      Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800"
                          >
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key}
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {value}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No specs available.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EnhancedProductModal;
