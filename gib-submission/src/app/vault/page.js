"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function MemeGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data: submissions, error } = await supabase
        .from("media_submissions")
        .select("id, file_url, title, status")
        .eq("status", "approved");

      if (error) {
        console.error("Error fetching media:", error);
        return;
      }

      const mapped = submissions.map((item) => ({
        id: item.id,
        url: item.file_url,
        title: item.title,
      }));

      // separate images and videos
      const imageExts = ["png", "jpg", "jpeg", "gif", "webp"];
      const videoExts = ["mp4", "mov", "webm"];

      setImages(mapped.filter((m) => imageExts.includes(m.url.split(".").pop().toLowerCase())));
      setVideos(mapped.filter((m) => videoExts.includes(m.url.split(".").pop().toLowerCase())));
    };

    fetchMedia();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        backgroundImage: "url('/space.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Link href="/" className="mono absolute top-10 left-6 border border-gray-700 rounded-full bg-gray-900/70 hover:bg-gray-900/90 transition px-2 py-1 shadow-lg z-30">
        <img src="/LOGO.png" alt="home" className="h-12 w-auto ml-2 inline-block mr-2" />
      </Link>

      {/* Navbar */}
      <header className="mono flex justify-center items-center gap-4 sm:gap-16 mt-7 py-6 text-lg font-bold relative">
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 absolute right-4 top-8 -translate-y-1/2"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Open navigation"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${navOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        <nav className="hidden sm:flex gap-16">
          <button onClick={() => scrollToSection("stickers")} className="hover:text-gray-300">
            Stickers
          </button>
          <button onClick={() => scrollToSection("videos")} className="hover:text-gray-300">
            Videos
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdknKkhh7nGq1ja93a3xwxTJtDmqGd3Hf7vYGOJRvBNKa53cw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 cursor-pointer"
          >
            Submit Your Meme
          </a>
        </nav>
      </header>

      {/* Mobile nav */}
      {navOpen && (
        <nav className="sm:hidden flex flex-col gap-4 bg-gray-900/95 border border-gray-800 rounded-xl mt-2 px-6 py-4 absolute left-1/2 -translate-x-1/2 top-24 z-20 shadow-lg w-11/12 max-w-xs">
          <button
            onClick={() => {
              setNavOpen(false);
              scrollToSection("stickers");
            }}
            className="hover:text-green-400 font-medium text-left"
          >
            Stickers
          </button>
          <button
            onClick={() => {
              setNavOpen(false);
              scrollToSection("videos");
            }}
            className="hover:text-green-400 font-medium text-left"
          >
            Videos
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdknKkhh7nGq1ja93a3xwxTJtDmqGd3Hf7vYGOJRvBNKa53cw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 font-medium text-left"
            onClick={() => setNavOpen(false)}
          >
            Submit Your Meme
          </a>
        </nav>
      )}

      <main className="flex justify-center flex-1 px-6">
        <div className="rounded-3xl shadow-2xl p-8 w-full max-w-6xl space-y-12">
          {/* Meme Grid */}
          <div id="stickers" className="bg-slate-900/40 p-4 rounded-2xl">
            <h2 className="mono text-3xl font-extrabold text-center mb-8 white-glow">Stickers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {images.map((meme) => (
                <div
                  key={meme.id}
                  className="relative group flex justify-center items-center p-4 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 border border-l-white cursor-pointer"
                  onClick={() => setSelectedMedia(meme.url)}
                >
                  <img src={meme.url} alt={meme.title} className="h-40 w-full object-contain" />
                  <a
                    href={meme.url}
                    download
                    className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg shadow
                    opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div id="videos" className="bg-slate-900/40 p-4 rounded-2xl">
            <h2 className="mono text-3xl font-extrabold text-center mb-8 white-glow">Videos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex justify-center items-center p-4 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 border border-l-white"
                >
                  <video src={video.url} controls className="h-40 w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedMedia(null)}
        >
          <img src={selectedMedia} alt="Magnified Media" className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
}
