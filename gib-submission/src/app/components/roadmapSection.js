"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle,
  Rocket,
  Gift,
  Users,
  Link as LinkIcon,
  Award,
  Repeat,
  Globe,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const DoneItems = [
  {
    title: "August / September 2025",
    details: [
      "1.5% supply locked for 6 months",
      "DexScreener update with CTO recognition",
      "Creation of Instagram, YouTube, Telegram, TikTok & X community",
      "All official links integrated in Linktree",
      "Buybacks",
      "30k pool USD1/gib",
      "Art contest with live graffiti — big turnout",
      "Team of 3 artists creating weekly content (art + videos)",
      "Giveaways & active community engagement",
    ],
    tag: "DONE",
    icon: <CheckCircle size={18} />,
  },
];

const OctoberItems = [
  {
    title: "October 2025",
    details: [
      "New alliances within Bonk/Pump ecosystem — @StatiCKy_ on X Coin with 70% of fees → gib",
      "From 2M+ market cap",
      "Airdrops for holders at milestones (2M, 5M, 10M...)",
      "Poker tournaments 🃏 with 10% of market cap as prize pool (2M, 5M,10M)",
      "Free participation for Top 20 wallets and NFT holders",
      "Collaborations with KOLs and other meme projects",
    ],
    tag: "OCT",
    icon: <Rocket size={18} />,
  },
];

const GoalsItems = [
  {
    title: "2025 Goals",
    details: [
      "10M+ MC Goal",
      "Listings on small exchanges",
      "Community treasury with transparent management",
    ],
    tag: "GOALS",
    icon: <Award size={18} />,
  },
];

function SectionCard({ item }) {
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
      variants={sectionVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-black/70 dark:bg-slate-950/70 backdrop-blur-md border border-slate-700 dark:border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
          {item.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mono text-white">{item.title}</h3>
            <span className="text-xs font-medium uppercase text-white/70">{item.tag}</span>
          </div>
          <ul className="mt-3 grid gap-2">
            {item.details.map((d, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                <span className="mt-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-white/30 text-[10px]">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

export default function Roadmap() {
  return (
    
    <motion.section
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionVariants}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-6"
    >
    {/* Header */}
    <header className="flex justify-between items-center px-2 sm:px-8 py-4 border-b border-gray-800 gap-4 sm:gap-0">
        <Link href="/" className="flex items-center">
            <img
            src="/LOGO.png"
            alt="GIB Logo"
            className="h-8 sm:h-10 inline-block mr-2 sm:mr-3 animate-float"
            />
            <h1 className="font-mono text-xl sm:text-3xl font-extrabold text-green-500 neon-glow">
            GIB HUB
            </h1>
        </Link>

        <nav className="mono flex gap-4 sm:gap-6 text-white font-medium">
            <Link href="/vault" className="hover:text-white">
            Vault
            </Link>
        </nav>
    </header>

      <div className="flex flex-col text-center items-center justify-centermd:flex-row md:items-center md:justify-between gap-6 mb-2">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold my-4 sm:my-6 white-glow mono text-white">Project Roadmap</h2>
          <p className="mono font-semibold mb-8 sm:mb-20 text-xs sm:text-base text-white/90">
            A crisp timeline of executed milestones and near-term plans. 
            <br />
            Modern, transparent, and community-focused.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-slate-700 dark:border-slate-800 bg-black/70 dark:bg-slate-950/70 p-4 backdrop-blur-md">
              <h4 className="text-sm font-semibold mono text-white">Quick stats</h4>
              <div className="mt-3 grid gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Locked supply</span>
                  <span className="font-medium text-white">1.5% • 6 months</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Pool</span>
                  <span className="font-medium text-white">$30k (USD1/gib)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Art team</span>
                  <span className="font-medium text-white">3 artists weekly</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 dark:border-slate-800 bg-black/70 dark:bg-slate-950/70 p-4 backdrop-blur-md">
              <h4 className="text-sm font-semibold mono text-white">Community</h4>
              <p className="text-sm mt-2 text-white/80">
                Active giveaways, social channels, and transparent treasury plans keep the community engaged and rewarded.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 text-white"> <LinkIcon size={14} /> Links</button>
                <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 text-white"> <Users size={14} /> Events</button>
                <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 text-white"> <Gift size={14} /> Giveaways</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="rounded-3xl p-6 border border-slate-700 dark:border-slate-800 bg-black/70 dark:bg-slate-950/70 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold mono text-white">Timeline</h3>
              <div className="text-sm text-white/70">Transparent • Community-first • Milestone-driven</div>
            </div>

            <ol className="space-y-4">
              {DoneItems.map((it, i) => (
                <SectionCard key={i} item={it} />
              ))}

              {OctoberItems.map((it, i) => (
                <SectionCard key={`oct-${i}`} item={it} />
              ))}

              {GoalsItems.map((it, i) => (
                <SectionCard key={`goal-${i}`} item={it} />
              ))}
            </ol>

            <div className="mt-6 border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <h4 className="text-sm font-semibold mono text-white">Milestone incentives</h4>
                <p className="text-sm text-white/80 mt-2">Airdrops and tournament prize pools are structured around clear market-cap milestones so the community knows what to expect and how to qualify.</p>
              </div>

              <div className="flex flex-col items-start gap-2 text-white">
                <div className="inline-flex items-center gap-2 text-sm">
                  <Rocket size={16} /> <span className="font-medium">Growth roadmap</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <Repeat size={16} /> <span className="font-medium">Buybacks & fees</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <Globe size={16} /> <span className="font-medium">Listings & partnerships</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}