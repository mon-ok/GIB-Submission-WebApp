"use client";

import Link from "next/link";
import { useState } from "react";

export default function MemeGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, url: "/vault/gib-kuma-epic.jpg" },
    { id: 2, url: "/vault/gib-dunk.jpg" },
    { id: 3, url: "/vault/gib-always-has-been.jpg" },
    { id: 4, url: "/vault/gib-forbes.jpg" },
    { id: 5, url: "/vault/gib-mage.jpg" },
    { id: 6, url: "/vault/gib-gunpoint.jpg" },
    { id: 7, url: "/vault/gib-lilypad.jpg" },
    { id: 8, url: "/vault/gib-piggyback.jpg" },
    { id: 9, url: "/vault/gib-probe.jpg" },
    { id: 10, url: "/vault/gib-rambo.jpg" },
    { id: 11, url: "/vault/gib-sparring.jpg" },
    { id: 12, url: "/vault/gib-screen.jpg" },
    { id: 13, url: "/vault/gib-suit-fancy.jpg" },
    { id: 14, url: "/vault/gib-logo-open.png" },
    { id: 15, url: "/vault/gib-logo-default.png" },
    { id: 16, url: "/vault/gib-duck-chill.png" },
    { id: 17, url: "/vault/gib-frog-form.png" },
    { id: 18, url: "/vault/gib-in-car.png" },
    { id: 19, url: "/vault/gib-smoke.png" },
    { id: 20, url: "/vault/gib-wave.png" },
    { id: 21, url: "/vault/gib-yow.png" },
    { id: 22, url: "/vault/gib-kick.png" },
    { id: 23, url: "/vault/gib-suit.png" },
  ];

  const videos = [
    { id: 1, url: "/vault/gib-arcade.MOV" },
    { id: 2, url: "/vault/gib-free-fall.MOV" },
    { id: 3, url: "/vault/gib-strange.MOV" },
    { id: 4, url: "/vault/gib-street.MOV" },
    { id: 5, url: "/vault/gib-v-kuma.MOV" },
    { id: 6, url: "/vault/gib-x-slash.MOV" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        backgroundImage: "url('/space.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
       <Link href="/" className="mono absolute top-10 left-6">
          <img src="/LOGO.png" alt="home" className="h-12 w-auto ml-4 inline-block mr-2" />
        </Link>
      {/* Navbar */}
      <header className="mono flex justify-center gap-16 mt-7 py-6 text-lg font-bold">
        <button
          onClick={() => scrollToSection("stickers")}
          className="hover:text-gray-300"
        >
          Stickers
        </button>
        <button
          onClick={() => scrollToSection("videos")}
          className="hover:text-gray-300"
        >
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
      </header>

      {/* Content */}
      <main className="flex justify-center flex-1 px-6">
        <div className="rounded-3xl shadow-2xl p-8 w-full max-w-6xl space-y-12">
          {/* Meme Grid */}
          <div id="stickers" className="bg-slate-900/40 p-4 rounded-2xl">
            <h2 className="mono text-3xl font-extrabold text-center mb-8 white-glow">
                Stickers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {images.map((meme) => (
                <div
                    key={meme.id}
                    className="relative group flex justify-center items-center p-4 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 border border-l-white cursor-pointer"
                    onClick={() => setSelectedImage(meme.url)}
                >
                    <img
                        src={meme.url}
                        alt={`Meme ${meme.id}`}
                        className="h-40 w-full object-contain"
                    />

                    <a
                        href={meme.url}
                        download
                        className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
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
            <h2 className="mono text-3xl font-extrabold text-center mb-8 white-glow">
              Videos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex justify-center items-center p-4 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 border border-l-white"
                >
                  <video
                    src={video.url}
                    controls
                    className="h-40 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Magnified Meme"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
