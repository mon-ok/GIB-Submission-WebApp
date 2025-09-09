"use client";

import { useState, useRef } from "react";
import Link from "next/link"
import Featured from "./components/infiniteMarquee";
import FAQSection from "./components/faqs";
import GIBVault from "./components/vaultMarquee";
import GIBVaultReverse from "./components/vaultMarquee-reverse";

export default function Home() {
  const [memes, setMemes] = useState([
    { id: 1, url: "/vault/gib-logo-open.png" },
    { id: 2, url: "/vault/gib-logo-default.png" },
    { id: 3, url: "/vault/gib-duck-chill.png" },
    { id: 4, url: "/vault/gib-frog-form.png" },
    { id: 5, url: "/vault/gib-in-car.png" },
    { id: 6, url: "/vault/gib-smoke.png" },
    { id: 7, url: "/vault/gib-wave.png" },
    { id: 8, url: "/vault/gib-yow.png" },
  ]);

  const [showOverlay, setShowOverlay] = useState(null);

  const vaultRef = useRef(null);
  const faqsRef = useRef(null);

  const scrollToVault = () => {
  vaultRef.current?.scrollIntoView({ behavior: "smooth" });
};

const scrollToFAQs = () => {
  faqsRef.current?.scrollIntoView({ behavior: "smooth" });
};

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMemes = files.map((file, index) => ({
      id: memes.length + index + 1,
      url: URL.createObjectURL(file),
      likes: 0,
      downloads: 0,
    }));
    setMemes([...memes, ...newMemes]);
    setShowOverlay(null);
  };

  const handleDownload = (id, url) => {
    setMemes((prev) =>
      prev.map((meme) =>
        meme.id === id ? { ...meme, downloads: meme.downloads + 1 } : meme
      )
    );

    // Trigger actual download
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      <section
        className="relative"
        style={{
          backgroundImage: "url('/top-wallpaper.png')",
          backgroundSize: "cover", 
          // backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
        }}
      >
      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Content */}
    <div className="relative z-10 flex flex-col flex-1 mx-10">
      {/* Top Taskbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <div className="flex items-center">
          <img src="/LOGO.png" alt="GIB Logo" className="h-10 inline-block mr-3 animate-float" />
          <h1 className="font-mono text-3xl font-extrabold text-green-500 neon-glow">
            GIB HUB
          </h1>
        </div>
        <nav className="mono flex gap-6 text-white font-medium">
          <Link href="/roadmap" className="hover:text-white">
            Roadmap
          </Link>
          <Link href="/vault" className="hover:text-white">
            Vault
          </Link>
          <button className="hover:text-white" onClick={scrollToFAQs}>FAQs</button>
        </nav>
      </header>

      {/* Intro Text */}
      <div className="flex items-center mt-16 flex-col text-center">
        <h2 className="text-4xl font-bold mb-4">GIB delivers the memes</h2>
        <p className="text-gray-400 max-w-xl">
          Submit your creations, explore the vault, and let GIB distribute the
          laughs to the world.
        </p>
      </div>

      {/* Hero Section */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 px-6 pb-16 items-center">
        {/* Left Column: Text */}
        <div className="">
          <h1 className="text-5xl font-extrabold mb-6 white-glow">LIVE, LAUGH, GIB.</h1>
        </div>

        {/* Right Column: Buttons */}
        <div className="flex flex-col gap-6 px-4 py-14 border border-indigo-950 bg-indigo-400/10">
          <img
            src="/GIBNG.png"
            alt="Sticker"
            className="absolute top-45 -right-10 w-40 h-40"
          />
          <div className="p-6 rounded-2xl bg-gray-900/70 shadow-xl border border-gray-800 hover:border-purple-500 transition">
            <button
              onClick={() => setShowOverlay("submit")}
              className="mono w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
                        hover:from-blue-600 hover:to-indigo-700 
                        transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Submit to GIB
            </button>
          </div>

          <div className="mono">
            Submit your GIB-related memes and GIFs. GIB will distribute them to the world.
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 shadow-xl border border-gray-800 hover:border-green-500 transition">
            <button
              onClick={() => setShowOverlay("download")}
              className="mono w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700 
                        transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Claim from GIB
            </button>
          </div>
          <div className="mono">
            Want something from GIB? Browse the vault and claim your favorite memes.
          </div>
        </div>
      </main>
    </div>
  </section>

    <section className="w-full max-w-6x pb-10"
      style={{
        backgroundImage: "url('/middle-wallpaper.png')",
        backgroundSize: "cover", 
        // backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
      }}
    >
  
      {/* Optional dark overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/50 z-0"></div> */}
      
      <Featured />
      <div className="mx-10">
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-5xl font-extrabold my-6 text-left white-glow" ref={vaultRef}>
            BROWSE THE VAULT
          </h3>
          <h3 className="mono font-semibold mb-20 text-left" ref={vaultRef}>
            View our curated collection of GIB memes and media. Download, and submit your own!
          </h3>
        </div>

        <div className="flex justify-center gap-140 mb-16">
          <div className="w-58 h-24 bg-white rounded-[2rem] flex items-center justify-center 
                          text-black text-center p-4 mono font-bold 
                          shadow-[8px_8px_0px_rgba(0,0,0,0.8)] 
                          hover:translate-y-[-4px] hover:translate-x-[-4px] 
                          transition-transform duration-200 opacity-80">
            Submit Your Own Memes
          </div>

          <div className="w-58 h-24 bg-white rounded-[2rem] flex items-center justify-center 
                          text-black text-center p-4 mono font-bold 
                          shadow-[8px_8px_0px_rgba(0,0,0,0.8)] 
                          hover:translate-y-[-4px] hover:translate-x-[-4px] 
                          transition-transform duration-200 opacity-80">
            Download Curated Media
          </div>
        </div>

        <div className="flex justify-center mb-36">
          <Link
            href="/vault"
            className="mono px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600
                      hover:from-purple-600 hover:to-indigo-700 
                      transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            ✦ Browse the Vault
          </Link>
        </div>
      </div>
    </section>

    {/* FAQs */}
    <section 
      className=""
      style=
        {{
          backgroundImage: "url('/bottom-wallpaper.png')",
          backgroundSize: "cover", 
          // backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
        }}
        >
      <div ref={faqsRef}>
        <FAQSection />
      </div>
      <p className="flex justify-center text-gray-500 text-sm mt-20 bg-black/60">
        © {new Date().getFullYear()} GIB. All rights reserved.
      </p>
    </section>

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

      {/* Conditionally render content */}
      {showOverlay === "download" && (
        <div className="flex-1 relative overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="relative group rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <img
                  src={meme.url}
                  alt="meme"
                  className="h-40 object-cover"
                />
                <button
                  onClick={() => handleDownload(meme.id, meme.url)}
                  className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
          <div className="sticky bottom-4 flex justify-end pr-6">
            <Link
              href="/vault"
              className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
            >
              View More ➜
            </Link>
          </div>
        </div>
      )}

      {showOverlay === "submit" && (
        <div className="flex-1 flex items-center justify-center bg-gray-800/70 p-6 border-t border-gray-700">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdknKkhh7nGq1ja93a3xwxTJtDmqGd3Hf7vYGOJRvBNKa53cw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center font-semibold"
          >
            Go to Submission Form
          </a>
        </div>
        // <div className="flex-1 flex items-center justify-center bg-gray-800/70 p-6 border-t border-gray-700">
        //   <label className="cursor-pointer px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center font-semibold">
        //     Go to Submission Form
        //     <input
        //       type="file"
        //       multiple
        //       accept="image/*,.gif,.mp4"
        //       onChange={handleUpload}
        //       className="hidden" // hide the default input
        //     />
        //   </label>
        // </div>
      )}
    </div>
  </div>
)}
  </div>
  );
}
