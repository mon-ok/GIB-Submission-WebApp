"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import RoadmapSection from "../components/roadmapSection"

export default function Roadmap() {
  return (
    <section
      className="relative min-h-screen w-screen flex flex-col"
      style={{
        backgroundImage: "url('/beautiful-shining-stars-night-sky.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <RoadmapSection />
    </section>
  )
}
