'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function MemeGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showOverlay, setShowOverlay] = useState(null); // 'submit' or null
  const [selectedFileName, setSelectedFileName] = useState("");

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
        path: item.file_url,
        url: supabase.storage.from("media").getPublicUrl(item.file_url).data.publicUrl, 
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

  const handleDownload = async (path, title) => {
    try {
      const { data, error } = await supabase.storage
        .from("media")
        .download(path);

      if (error) {
        console.error("Download error:", error);
        return;
      }

      // Create a blob URL for the file
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title || path.split("/").pop(); // use title if available, else filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
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
          <button
            onClick={() => setShowOverlay("submit")}
            className="hover:text-gray-300 cursor-pointer"
          >
            Submit Your Meme
          </button>
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
          <button
            onClick={() => {
              setNavOpen(false);
              setShowOverlay("submit");
            }}
            className="hover:text-green-400 font-medium text-left"
          >
            Submit Your Meme
          </button>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(meme.path, meme.title);
                    }}
                    className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg shadow
                    opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    Download
                  </button>
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

      {/* Submission Overlay */}
      {showOverlay === "submit" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative flex flex-col items-center bg-gray-900 rounded-3xl p-6 sm:p-8 w-11/12 max-w-lg shadow-2xl border border-gray-700">
            <button
              onClick={() => setShowOverlay(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              aria-label="Close form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mono text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Submit Your Meme</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const title = formData.get("title");
                const description = formData.get("description");
                const submitted_by = formData.get("submitted_by");
                const file = formData.get("file");

                if (!title || !file) {
                  alert("Title and file are required!");
                  return;
                }

                const fileName = `${Date.now()}_${file.name}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                  .from("media")
                  .upload(fileName, file);

                if (uploadError) {
                  console.error("Upload error:", uploadError);
                  alert("Failed to upload file.");
                  return;
                }

                const { data: insertData, error: insertError } = await supabase
                  .from("media_submissions")
                  .insert({
                    title,
                    description,
                    submitted_by,
                    file_url: uploadData.path,
                    status: "pending",
                  });

                if (insertError) {
                  console.error("Insert error:", insertError);
                  alert("Failed to submit meme.");
                  return;
                }

                alert("Meme submitted successfully! We'll review it shortly. Stay updated to see if it's approved.");
                setShowOverlay(null);
              }}
              className="flex flex-col gap-4 w-full"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="mono px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description (optional)"
                className="mono px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="submitted_by"
                placeholder="Your Name or Email"
                className="mono px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="file"
                  className="mono font-semibold text-sm text-gray-200"
                >
                  Upload Meme File
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept="image/*,video/*"
                    className="hidden"
                    required
                    onChange={(e) => {
                      const fileName = e.target.files?.[0]?.name;
                      setSelectedFileName(fileName || "");
                    }}
                  />
                  <label
                    htmlFor="file"
                    className="mono px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold cursor-pointer transition shadow-md"
                  >
                    {selectedFileName ? "Change File" : "Select File"}
                  </label>
                  {selectedFileName && (
                    <span className="mono text-xs text-gray-400 truncate max-w-[180px] min-h-[1.5rem] flex items-center">
                      {selectedFileName}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="mono mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-bold text-white transition shadow-lg"
              >
                Submit Meme
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}