"use client";

import Link from "next/link";

export default function MemeGallery() {
  const images = [
    { id: 1, url: "/vault/gib-logo-open.png" },
    { id: 2, url: "/vault/gib-logo-default.png" },
    { id: 3, url: "/vault/gib-duck-chill.png" },
    { id: 4, url: "/vault/gib-frog-form.png" },
    { id: 5, url: "/vault/gib-in-car.png" },
    { id: 6, url: "/vault/gib-smoke.png" },
    { id: 7, url: "/vault/gib-wave.png" },
    { id: 8, url: "/vault/gib-yow.png" },
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
                    className="relative group flex justify-center items-center p-4 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 border border-l-white"
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
    </div>
  );
}
