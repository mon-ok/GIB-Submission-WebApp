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
  const [view, setView] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [approvedMemes, setApprovedMemes] = useState([]);

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState(null); 
  const [selectedMeme, setSelectedMeme] = useState(null);

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

    const { data: approvedData, error: approvedError } = await supabase
        .from("media_submissions")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (pendingError || declinedError || approvedError) {
        console.error("Error fetching memes:", pendingError || declinedError || approvedError);
    } else {
        setPendingMemes(pendingData || []);
        setDeclinedMemes(declinedData || []);
        setApprovedMemes(approvedData || []);
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

  const confirmAndProceed = async () => {
    if (!selectedMeme || !confirmAction) return;

    if (confirmAction === "approve") {
      const { error } = await supabase
        .from("media_submissions")
        .update({ status: "approved" })
        .eq("id", selectedMeme.id);

      if (!error) {
        setPendingMemes((prev) => prev.filter((m) => m.id !== selectedMeme.id));
        alert("Submission approved successfully!");
      }
    }

    if (confirmAction === "decline") {
      const { error } = await supabase
        .from("media_submissions")
        .update({ status: "declined" })
        .eq("id", selectedMeme.id);

      if (!error) {
        setPendingMemes((prev) => prev.filter((m) => m.id !== selectedMeme.id));
        setDeclinedMemes((prev) => [selectedMeme, ...prev]);
        alert("Submission declined successfully!");
      }
    }

    if (confirmAction === "backToPending") {
      const { error } = await supabase
        .from("media_submissions")
        .update({ status: "pending" })
        .eq("id", selectedMeme.id);

      if (!error) {
        setDeclinedMemes((prev) => prev.filter((m) => m.id !== selectedMeme.id));
        setPendingMemes((prev) => [selectedMeme, ...prev]);
        alert("Meme moved back to pending!");
      }
    }

    if (confirmAction === "delete") {
      const { error: dbError } = await supabase
        .from("media_submissions")
        .delete()
        .eq("id", selectedMeme.id);

      if (!dbError) {
        const { error: storageError } = await supabase.storage
          .from("media")
          .remove([selectedMeme.file_url]);

        if (storageError) {
          alert("Record deleted, but file could not be removed from storage.");
        } else {
          alert("Meme and file deleted successfully!");
        }
        setDeclinedMemes((prev) => prev.filter((m) => m.id !== selectedMeme.id));
      }
    }

    // Reset modal state
    setConfirmAction(null);
    setSelectedMeme(null);
  };

    // Bring back declined meme to pending
    const onBackToPending = async (memeId) => {
        const { error } = await supabase
            .from("media_submissions")
            .update({ status: "pending" })
            .eq("id", memeId);

        if (error) {
            console.error("Error moving meme back to pending:", error.message);
            alert("An error occurred. Please try again.");
        } else {
            const memeToRestore = declinedMemes.find((m) => m.id === memeId);
            if (memeToRestore) {
            setDeclinedMemes((prev) => prev.filter((m) => m.id !== memeId));
            setPendingMemes((prev) => [memeToRestore, ...prev]);
            }
            alert("Meme moved back to pending!");
        }
    };

    // Permanently delete meme (row + file in storage)
    const onDelete = async (memeId, filePath) => {
        // 1. Delete the row from the table
        const { error: dbError } = await supabase
            .from("media_submissions")
            .delete()
            .eq("id", memeId);

        if (dbError) {
            console.error("Error deleting meme row:", dbError.message);
            alert("An error occurred while deleting the record. Please try again.");
            return;
        }

        // 2. Delete the file from Supabase storage
        const { error: storageError } = await supabase
            .storage
            .from("media")
            .remove([filePath]);

        if (storageError) {
            console.error("Error deleting file from storage:", storageError.message);
            alert("Record deleted, but file could not be removed from storage.");
        } else {
            alert("Meme and file deleted successfully!");
        }

        // 3. Update local state
        setDeclinedMemes((prev) => prev.filter((m) => m.id !== memeId));
    };


  const MemeCard = ({ meme }) => (
    <div className="relative p-6 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-md border border-gray-700/50 flex flex-col items-center">
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
          onClick={() => {
            setConfirmAction("approve");
            setSelectedMeme(meme);
          }}
        >
          Approve
        </button>
        <button
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition shadow-md"
          onClick={() => {
            setConfirmAction("decline");
            setSelectedMeme(meme);
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );

  const DeclinedMemeCard = ({ meme }) => (
    <div className="relative p-6 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-md border border-gray-700/50 flex flex-col items-center opacity-70">
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
      <div className="flex gap-3 mt-4">
        <button
          className="text-sm px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold transition shadow-md"
          onClick={() => {
            setConfirmAction("backToPending");
            setSelectedMeme(meme);
          }}
        >
          Back to Pending
        </button>
        <button
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition shadow-md"
          onClick={() => {
            setConfirmAction("delete");
            setSelectedMeme(meme);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const ApprovedMemeCard = ({ meme }) => (
    <div className="relative p-6 rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-md border border-gray-700/50 flex flex-col items-center">
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
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition shadow-md"
            onClick={() => {
            setConfirmAction("delete");
            setSelectedMeme(meme);
            }}
        >
            Delete
        </button>
        </div>
    </div>
    );

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
        <div className={`${animate ? "move-up" : "fade-in-up"} text-center`}>
          <h1 className="text-5xl font-extrabold mb-4 animate-pulse">Admin Dashboard</h1>
          <p className={`text-xl transition-opacity duration-1000 ${animate ? "opacity-0" : "opacity-100"}`}>
            You are now authenticated. Let's get to work! 🚀
          </p>
        </div>

        <div className="mt-4 w-full max-w-4xl">
          <div className="flex justify-center mb-14 gap-4">
            <button
                className={`px-6 py-2 rounded-full font-semibold transition ${view === "pending" ? "bg-blue-600 shadow-lg" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setView("pending")}
            >
                Pending ({pendingMemes.length})
            </button>
            <button
                className={`px-6 py-2 rounded-full font-semibold transition ${view === "declined" ? "bg-red-600 shadow-lg" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setView("declined")}
            >
                Declined ({declinedMemes.length})
            </button>
            <button
                className={`px-6 py-2 rounded-full font-semibold transition ${view === "approved" ? "bg-green-600 shadow-lg" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setView("approved")}
            >
                Approved ({approvedMemes.length})
            </button>
            </div>

          {isLoading ? (
            <div className="text-center text-gray-400 mt-12">Loading...</div>
            ) : view === "pending" ? (
            pendingMemes.length === 0 ? (
                <p className="text-center text-gray-400 mt-12">No pending memes at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                {pendingMemes.map((meme) => (
                    <MemeCard key={meme.id} meme={meme} />
                ))}
                </div>
            )
            ) : view === "declined" ? (
            declinedMemes.length === 0 ? (
                <p className="text-center text-gray-400 mt-12">No memes have been declined yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                {declinedMemes.map((meme) => (
                    <DeclinedMemeCard key={meme.id} meme={meme} />
                ))}
                </div>
            )
            ) : approvedMemes.length === 0 ? (
            <p className="text-center text-gray-400 mt-12">No memes have been approved yet.</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
                {approvedMemes.map((meme) => (
                <ApprovedMemeCard key={meme.id} meme={meme} />
                ))}
            </div>
            )}
        </div>

        {/* Confirmation Modal */}
        {confirmAction && selectedMeme && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">
                {confirmAction === "approve" && "Approve Meme?"}
                {confirmAction === "decline" && "Decline Meme?"}
                {confirmAction === "backToPending" && "Move Meme Back to Pending?"}
                {confirmAction === "delete" && "Delete Meme Permanently?"}
              </h2>
              <p className="text-gray-400 mb-6">
                Are you sure you want to{" "}
                <span
                  className={
                    confirmAction === "approve"
                      ? "text-green-400"
                      : confirmAction === "decline"
                      ? "text-red-400"
                      : confirmAction === "backToPending"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }
                >
                  {confirmAction}
                </span>{" "}
                this submission?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmAndProceed}
                  className={`px-5 py-2 rounded-lg font-semibold shadow-md transition ${
                    confirmAction === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : confirmAction === "decline"
                      ? "bg-red-600 hover:bg-red-700"
                      : confirmAction === "backToPending"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-red-700 hover:bg-red-800"
                  } text-white`}
                >
                  Yes, {confirmAction}
                </button>
                <button
                  onClick={() => {
                    setConfirmAction(null);
                    setSelectedMeme(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold shadow-md transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
