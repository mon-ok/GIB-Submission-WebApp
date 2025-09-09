"use client";

import { useState } from "react";
import { Copy, Twitter, Instagram, Users, Youtube } from "lucide-react";

export default function ContractSection() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "6FtbGaqgZzti1TxJksBV4PSya5of9VqA9vJNDxPwbonk";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-around items-center gap-50 relative">
      {/* Title */}
      <h1 className="text-5xl font-extrabold white-glow mt-4">LIVE, LAUGH, GIB.</h1>

      {/* Contract Address with Copy */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mt-4 bg-gray-800/80 px-4 py-2 rounded-lg shadow-md relative">
            <h1 className="mono font-medium text-sm sm:text-base break-all">
            {contractAddress}
            </h1>
            <button
            onClick={handleCopy}
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
            <Copy className="w-4 h-4 text-white" />
            </button>

            {/* Overlay Copied Text */}
            {copied && (
            <span className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-green-400 px-2 py-1 text-xs rounded-md shadow-lg">
                Copied!
            </span>
            )}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-6">
            {/* X (Twitter) */}
            <a
            href="https://x.com/gibthefrogcto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-white rounded-full transition transform hover:-translate-y-2"
            >
            <Twitter className="w-6 h-6" />
            </a>

            {/* Telegram */}
            <a
            href="https://t.me/CTO_gib_official"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-white rounded-full transition transform hover:-translate-y-2"
            >
            <img src="/telegram.png" className="w-6 h-6" alt="Telegram" />
            </a>

            {/* Dexscreener */}
            <a
            href="https://dexscreener.com/solana/5bsguj2uesrsdpj1hebxbks1wa2pp9metmk3lnqme7tw"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-white rounded-full transition transform hover:-translate-y-2"
            >
            <img src="/dexscreener-no-text.png" className="w-6 h-6" alt="Dexscreener" />
            </a>

            {/* Instagram */}
            <a
            href="https://www.youtube.com/@gibthefrogofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-white rounded-full transition transform hover:-translate-y-2"
            >
            <Youtube className="w-6 h-6" />
            </a>

            {/* TikTok */}
            <a
            href="https://www.tiktok.com/@gibthefrogofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-white rounded-full transition transform hover:-translate-y-2"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
                <path d="M12 2c1.6 0 3 .4 4.3 1.2v2.2c-.8-.5-1.7-.9-2.7-1.1v9.5c0 3.4-2.8 6.2-6.2 6.2S1.2 17.2 1.2 13.8c0-3.3 2.6-6 5.8-6.2v2.5c-1.8.2-3.3 1.7-3.3 3.6 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6V2h1.1z" />
            </svg>
            </a>
        </div>
      </div>
    </div>
  );
}
