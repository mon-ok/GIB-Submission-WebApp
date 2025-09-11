'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

function getPublicUrl(path) {
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export default function AdminAuthPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [pendingMemes, setPendingMemes] = useState([]);
  const [declinedMemes, setDeclinedMemes] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = "gibthefrog";

  const fetchMemes = async () => {
    setIsLoading(true);
    const { data: pendingData, error: pendingError } = await supabase
      .from("media_submissions")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    const { data: declinedData, error: declinedError } = await supabase
      .from("media_submissions")
      .select("*")
      .eq("status", "declined")
      .order("created_at", { ascending: false });

    if (pendingError || declinedError) {
      console.error("Error fetching memes:", pendingError || declinedError);
    } else {
      setPendingMemes(pendingData || []);
      setDeclinedMemes(declinedData || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
      fetchMemes();
    } else {
      setError("Incorrect password. Please try again.");
    }
    setPassword("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => setAnimate(true), 100);
    }
  }, [isAuthenticated]);

  const handleDecline = async (memeId) => {
    const { error } = await supabase
      .from("media_submissions")
      .update({ status: "declined" })
      .eq("id", memeId);

    if (error) {
      console.error("Error declining submission:", error.message);
      alert("An error occurred. Please try again.");
    } else {
      const declinedMeme = pendingMemes.find((m) => m.id === memeId);
      if (declinedMeme) {
        setPendingMemes((prev) => prev.filter((m) => m.id !== memeId));
        setDeclinedMemes((prev) => [declinedMeme, ...prev]);
      }
      alert("Submission declined successfully!");
    }
  };

  const handleApprove = async (memeId) => {
    const { error } = await supabase
      .from("media_submissions")
      .update({ status: "approved" })
      .eq("id", memeId);

    if (error) {
      console.error("Error accepting submission:", error.message);
      alert("An error occurred. Please try again.");
    } else {
      setPendingMemes((prev) => prev.filter((m) => m.id !== memeId));
      alert("Submission approved successfully!");
    }
  };

  const MemeCard = ({ meme, onApprove, onDecline }) => (
    <div className="relative p-6 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-md border border-gray-700/50 flex flex-col items-center">
      <div className="w-full flex justify-end">
        <button className="text-red-400 hover:text-red-300 transition" onClick={() => onDecline(meme.id)}>
          ✖️
        </button>
      </div>
      {meme.file_url && (
        /\.(mp4|webm|mov)$/i.test(meme.file_url) ? (
          <video src={getPublicUrl(meme.file_url)} controls className="w-full h-48 object-contain mb-4 rounded-xl shadow-inner" />
        ) : (
          <img src={getPublicUrl(meme.file_url)} alt={meme.title} className="w-full h-48 object-contain mb-4 rounded-xl shadow-inner" />
        )
      )}
      <div className="w-full text-center">
        <h3 className="text-xl font-bold mb-1">{meme.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{meme.description}</p>
        <p className="text-xs text-gray-500">By: {meme.submitted_by}</p>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold transition shadow-md"
          onClick={() => onApprove(meme.id)}
        >
          Approve
        </button>
        <button
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition shadow-md"
          onClick={() => onDecline(meme.id)}
        >
          Decline
        </button>
      </div>
    </div>
  );

  const DeclinedMemeCard = ({ meme }) => (
    <div className="relative p-6 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-md border border-gray-700/50 flex flex-col items-center opacity-70">
      <button className="absolute top-4 right-4 text-red-400">✖️</button>
      {meme.file_url && (
        /\.(mp4|webm|mov)$/i.test(meme.file_url) ? (
          <video src={getPublicUrl(meme.file_url)} controls className="w-full h-48 object-contain mb-4 rounded-xl shadow-inner" />
        ) : (
          <img src={getPublicUrl(meme.file_url)} alt={meme.title} className="w-full h-48 object-contain mb-4 rounded-xl shadow-inner" />
        )
      )}
      <div className="w-full text-center">
        <h3 className="text-xl font-bold mb-1 line-through">{meme.title}</h3>
        <p className="text-sm text-gray-400 mb-2 line-through">{meme.description}</p>
        <p className="text-xs text-gray-500">By: {meme.submitted_by}</p>
      </div>
    </div>
  );

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
        <div className={`${animate ? "move-up" : "fade-in-up"} text-center`}>
          <h1 className="text-5xl font-extrabold mb-4 animate-pulse">Admin Dashboard</h1>
          <p className={`text-xl transition-opacity duration-1000 ${animate ? "opacity-0" : "opacity-100"}`}>You are now authenticated. Let's get to work! 🚀</p>
        </div>

        <div className="mt-12 w-full max-w-4xl">
          <div className="flex justify-center mb-6 gap-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${showPending ? "bg-blue-600 shadow-lg" : "bg-gray-700 hover:bg-gray-600"}`}
              onClick={() => setShowPending(true)}
            >
              Pending ({pendingMemes.length})
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${!showPending ? "bg-red-600 shadow-lg" : "bg-gray-700 hover:bg-gray-600"}`}
              onClick={() => setShowPending(false)}
            >
              Declined ({declinedMemes.length})
            </button>
          </div>
          
          {isLoading ? (
            <div className="text-center text-gray-400 mt-12">Loading...</div>
          ) : (
            showPending ? (
              pendingMemes.length === 0 ? (
                <p className="text-center text-gray-400 mt-12">No pending memes at the moment.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                  {pendingMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} onApprove={handleApprove} onDecline={handleDecline} />
                  ))}
                </div>
              )
            ) : (
              declinedMemes.length === 0 ? (
                <p className="text-center text-gray-400 mt-12">No memes have been declined yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                  {declinedMemes.map((meme) => (
                    <DeclinedMemeCard key={meme.id} meme={meme} />
                  ))}
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="p-8 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-lg border border-gray-700/50 flex flex-col items-center fade-in-up">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="mb-4 px-6 py-3 rounded-full bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-72 text-center"
            required
          />
          <button
            type="submit"
            className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
          {error && <p className="mt-4 text-red-400 text-sm animate-pulse">{error}</p>}
        </form>
      </div>
    </div>
  );
}