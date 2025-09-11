"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import Featured from "./components/infiniteMarquee";
import FAQSection from "./components/faqs";
// import GIBVault from "./components/vaultMarquee";
// import GIBVaultReverse from "./components/vaultMarquee-reverse";
import ContractSection from "./components/contractSection";

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
  const [navOpen, setNavOpen] = useState(false);

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

    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  // console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Top Section */}
      <section
        className="relative"
        style={{
          backgroundImage: "url('/top-wallpaper.png')",
          backgroundSize: "cover",
          backgroundPosition: "20% 0",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        <div className="relative z-10 flex flex-col flex-1 mx-2 sm:mx-10">
          {/* Header */}
          <header className="flex justify-between items-center px-2 sm:px-8 py-4 border-b border-gray-800 gap-4 sm:gap-0">
            <div className="flex items-center">
              <img
                src="/LOGO.png"
                alt="GIB Logo"
                className="h-8 sm:h-10 inline-block mr-2 sm:mr-3 animate-float"
              />
              <h1 className="font-mono text-xl sm:text-3xl font-extrabold text-green-500 neon-glow">
                GIB HUB
              </h1>
            </div>
            {/* Hamburger button for mobile */}
            <button
              className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Open navigation"
            >
              <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${navOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
            {/* Desktop nav */}
            <nav className="mono hidden sm:flex gap-2 sm:gap-6 text-white font-medium">
              <Link href="/roadmap" className="hover:text-white">
                Roadmap
              </Link>
              <Link href="/vault" className="hover:text-white">
                Vault
              </Link>
              <button className="hover:text-white" onClick={scrollToFAQs}>
                FAQs
              </button>
            </nav>
          </header>
          {/* Mobile nav dropdown */}
          {navOpen && (
            <nav className="sm:hidden flex flex-col gap-4 bg-gray-900/95 border border-gray-800 rounded-xl mt-2 px-4 py-4 absolute right-2 top-20 z-20 shadow-lg animate-fade-in">
              <Link
                href="/roadmap"
                className="hover:text-green-400 font-medium"
                onClick={() => setNavOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="/vault"
                className="hover:text-green-400 font-medium"
                onClick={() => setNavOpen(false)}
              >
                Vault
              </Link>
              <button
                className="hover:text-green-400 font-medium text-left"
                onClick={() => {
                  setNavOpen(false);
                  scrollToFAQs();
                }}
              >
                FAQs
              </button>
            </nav>
          )}

          {/* Intro */}
          <div className="flex items-center mt-6 sm:mt-16 flex-col text-center">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              GIB delivers the memes
            </h2>
            <p className="text-gray-400 max-w-xs sm:max-w-xl px-2 sm:px-0 text-sm sm:text-base">
              Submit your creations, explore the vault, and let GIB distribute
              the laughs to the world.
            </p>
          </div>

          {/* Hero Section */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-36 md:gap-10 mt-6 md:mt-12 px-0 sm:px-6 pb-10 sm:pb-16">
            <ContractSection />
            <div className="flex flex-col gap-4 sm:gap-6 px-2 sm:px-4 py-6 sm:py-14 border border-indigo-950 bg-indigo-400/10 relative rounded-xl">
              <img
                src="/GIBNG.png"
                alt="Sticker"
                className="absolute sm:-top-24 right-2 sm:-right-10 w-16 sm:w-40 h-16 sm:h-40"
              />
              <div className="p-3 sm:p-6 rounded-2xl bg-gray-900/70 shadow-xl border border-gray-800 hover:border-purple-500 transition">
                <button
                  onClick={() => setShowOverlay("submit")}
                  className="mono w-full px-3 sm:px-6 py-2 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
                            hover:from-blue-600 hover:to-indigo-700 
                            transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
                >
                  Submit to GIB
                </button>
              </div>

              <div className="mono text-xs sm:text-base">
                Submit your GIB-related memes and GIFs. GIB will distribute them
                to the world.
              </div>

              <div className="p-3 sm:p-6 rounded-2xl bg-gray-900/70 shadow-xl border border-gray-800 hover:border-green-500 transition">
                <button
                  onClick={() => setShowOverlay("download")}
                  className="mono w-full px-3 sm:px-6 py-2 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 
                            hover:from-green-600 hover:to-emerald-700 
                            transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
                >
                  Claim from GIB
                </button>
              </div>
              <div className="mono text-xs sm:text-base">
                Want something from GIB? Browse the vault and claim your
                favorite memes.
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Middle Section */}
      <section
        className="w-full pb-6 sm:pb-10"
        style={{
          backgroundImage: "url('/middle-wallpaper.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
        }}
      >
        <Featured />
        <div className="mx-2 sm:mx-10">
          <div className="flex justify-center items-center flex-col text-center">
            <h3
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold my-4 sm:my-6 white-glow"
              ref={vaultRef}
            >
              BROWSE THE VAULT
            </h3>
            <h3
              className="mono font-semibold mb-8 sm:mb-20 text-xs sm:text-base"
              ref={vaultRef}
            >
              View our curated collection of GIB memes and media. Download, and
              submit your own!
            </h3>
          </div>

          <div className="grid grid-cols-2 place-items-center sm:flex sm:flex-row sm:justify-center gap-4 sm:gap-100 mb-8 sm:mb-16">
            <div className="w-32 sm:w-56 h-16 sm:h-24 bg-white rounded-[2rem] flex items-center justify-center 
                            text-black text-center p-2 sm:p-4 mono font-bold 
                            shadow-[6px_6px_0px_rgba(0,0,0,0.8)] 
                            hover:translate-y-[-4px] hover:translate-x-[-4px] 
                            transition-transform duration-200 opacity-80 text-xs sm:text-base">
              Submit Your Own Memes
            </div>

            <div className="w-32 sm:w-56 h-16 sm:h-24 bg-white rounded-[2rem] flex items-center justify-center 
                            text-black text-center p-2 sm:p-4 mono font-bold 
                            shadow-[6px_6px_0px_rgba(0,0,0,0.8)] 
                            hover:translate-y-[-4px] hover:translate-x-[-4px] 
                            transition-transform duration-200 opacity-80 text-xs sm:text-base">
              Download Curated Media
            </div>
          </div>

          <div className="flex justify-center mb-16 sm:mb-36">
            <Link
              href="/vault"
              className="mono px-4 sm:px-8 py-2 sm:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600
                        hover:from-purple-600 hover:to-indigo-700 
                        transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg text-xs sm:text-base"
            >
              ✦ Browse the Vault
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        style={{
          backgroundImage: "url('/bottom-wallpaper.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div ref={faqsRef}>
          <FAQSection />
        </div>
        <p className="flex justify-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-20 bg-black/60 px-2 py-2">
          © {new Date().getFullYear()} GIB. All rights reserved.
        </p>
      </section>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg sm:max-w-5xl h-[90%] sm:h-5/6 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-3 sm:p-6 border-b border-gray-700">
              <h2 className="text-lg sm:text-2xl font-bold capitalize">
                {showOverlay === "submit" ? "Submit to GIB" : "Claim from GIB"}
              </h2>
              <button
                onClick={() => setShowOverlay(null)}
                className="text-gray-400 hover:text-red-500 transition-colors text-xl sm:text-2xl"
              >
                ✕
              </button>
            </div>

            {showOverlay === "download" && (
              <div className="flex-1 relative overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-6 p-2 sm:p-6">
                  {memes.map((meme) => (
                    <div
                      key={meme.id}
                      className="relative group rounded-2xl overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <img
                        src={meme.url}
                        alt="meme"
                        className="h-24 sm:h-40 object-cover w-full"
                      />
                      <button
                        onClick={() => handleDownload(meme.id, meme.url)}
                        className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
                <div className="sticky bottom-2 sm:bottom-4 flex justify-end pr-2 sm:pr-6">
                  <Link
                    href="/vault"
                    className="px-3 sm:px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 text-xs sm:text-base"
                  >
                    View More ➜
                  </Link>
                </div>
              </div>
            )}

            {showOverlay === "submit" && (
              <div className="flex-1 flex items-center justify-center bg-gray-800/70 p-4 sm:p-6 border-t border-gray-700">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdknKkhh7nGq1ja93a3xwxTJtDmqGd3Hf7vYGOJRvBNKa53cw/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-3 sm:px-6 py-2 sm:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center font-semibold text-xs sm:text-base"
                >
                  Go to Submission Form
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
