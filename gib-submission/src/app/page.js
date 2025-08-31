"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [memes, setMemes] = useState([
    { id: 1, url: "https://i.imgur.com/abcd123.jpg", category: "funny" },
    { id: 2, url: "https://i.imgur.com/efgh456.gif", category: "animals" },
    { id: 3, url: "https://placekitten.com/300/200", category: "animals" },
    { id: 4, url: "https://placekitten.com/301/200", category: "gaming" },
  ]);

  const [showOverlay, setShowOverlay] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const trendingRef = useRef(null);

  const scrollToTrending = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMemes = files.map((file, index) => ({
      id: memes.length + index + 1,
      url: URL.createObjectURL(file),
      category: "uncategorized",
    }));
    setMemes([...memes, ...newMemes]);
    setShowOverlay(null);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "gib-meme";
    link.click();
  };

  // Apply search + category filtering
  const filteredMemes = memes.filter((meme) => {
    const matchesSearch = meme.url
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || meme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "funny", "animals", "gaming", "uncategorized"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Top Taskbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="font-mono text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          GIB HUB
        </h1>
        <nav className="flex gap-6 text-gray-300">
          <button className="hover:text-white" onClick={scrollToTrending}>Trending</button>
          <button className="hover:text-white">Categories</button>
          <button className="hover:text-white">About GIB</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-12 px-6 pb-16">
        <h2 className="text-4xl font-bold mb-4">GIB delivers the memes </h2>
        <p className="text-gray-400 max-w-xl mb-8">
          Submit your creations, explore the vault, and let GIB distribute the
          laughs to the world.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mb-12">
          <button
            onClick={() => setShowOverlay("submit")}
            className="px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Submit to GIB
          </button>
          <button
            onClick={() => setShowOverlay("download")}
            className="px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            Claim from GIB
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10 w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search the GIB vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Meme Grid */}
        <section className="w-full max-w-6xl" ref={trendingRef}>
          <h3 className="text-2xl font-semibold mb-6 text-left">
            GIB’s Trending Vault
          </h3>
          {filteredMemes.length === 0 ? (
            <p className="text-gray-400">GIB has nothing for you right now 😔</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredMemes.map((meme) => (
                <div
                  key={meme.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={meme.url}
                    alt="meme"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => handleDownload(meme.url)}
                      className="bg-white text-black text-sm px-3 py-1 rounded-lg shadow"
                    >
                      Claim Meme
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom Rights Reserved */}
        <p className="text-gray-500 text-sm mt-20">
          © {new Date().getFullYear()} GIB. All rights reserved.
        </p>
      </main>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-5xl h-5/6 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold capitalize">
                {showOverlay === "submit" ? "Submit to GIB" : "Claim from GIB"}
              </h2>
              <button
                onClick={() => setShowOverlay(null)}
                className="text-gray-400 hover:text-red-500 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Meme grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
              {memes.map((meme) => (
                <div
                  key={meme.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={meme.url}
                    alt="meme"
                    className="w-full h-full object-cover"
                  />
                  {showOverlay === "download" && (
                    <button
                      onClick={() => handleDownload(meme.url)}
                      className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Claim Meme
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Upload input */}
            {showOverlay === "submit" && (
              <div className="p-6 border-t border-gray-700 bg-gray-800/70">
                <input
                  type="file"
                  multiple
                  accept="image/*,.gif"
                  onChange={handleUpload}
                  className="block w-full text-sm text-gray-300 
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600 transition"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
