"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Roadmap() {
  return (
    <section
      className="relative h-screen w-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/roadmap-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      
      <motion.img
        src="/vault/gib-allnighter.png"
        alt="Gib Allnighter"
        className="absolute top-8 right-28 w-40 z-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 flex flex-col justify-center items-center h-screen text-white text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="bg-gray-900/70 border border-gray-500 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.8)] pt-8 px-8 pb-5 max-w-5xl backdrop-blur-md mb-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          >
            <motion.h1
              className="mono text-4xl md:text-6xl font-bold mb-4 text-purple-400"
              animate={{
                textShadow: [
                  "0 0 10px rgba(168,85,247,0.7)",
                  "0 0 20px rgba(168,85,247,1)",
                  "0 0 10px rgba(168,85,247,0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Roadmap Under Construction
            </motion.h1>
          </motion.div>
        </div>

        <motion.p
          className="mono text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          We'll keep you posted. Stay tuned!
        </motion.p>

        <Link href="/" passHref>
          <motion.button
            className="mt-14 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:bg-purple-700 transition-all"
            whileHover={{
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.6 },
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Back to Main Page
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute top-20 left-10 text-5xl text-white/20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-4xl text-white/20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ❖
      </motion.div>
    </section>
  )
}
