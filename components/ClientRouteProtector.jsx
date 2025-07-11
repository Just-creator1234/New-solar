"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";

const PASSWORD = process.env.NEXT_PUBLIC_EDITOR_PASSWORD;

export default function ClientRouteProtector({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // for initial loading
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("client_authenticated");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false); // Stop loading after checking localStorage
  }, []);

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      localStorage.setItem("client_authenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-6 w-6 rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4 ">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
              <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Protected Access
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter your password to continue
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Client Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={handleKeyPress} // ✅ updated from onKeyPress
                    className="block w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={!passwordInput.trim() || loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Access Protected Page"
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Secure access required • Protected by encryption
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
