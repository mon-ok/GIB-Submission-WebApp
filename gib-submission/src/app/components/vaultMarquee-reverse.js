"use client"; // make sure this is a client component

import { useEffect, useState } from "react";

export default function GIBVaultReverse() {
  const media = [
    "/vault/gib-smoke.png",
    "/vault/gib-wave.png",
    "/vault/gib-duck-chill.png",
    "/vault/gib-frog-form.png",
    "/vault/gib-logo-open.png",
    "/vault/gib-logo-default.png",
  ];

  const [shuffledMedia, setShuffledMedia] = useState(media);

  useEffect(() => {
    const shuffleArray = (array) => {
      return [...array].sort(() => Math.random() - 0.5);
    };
    setShuffledMedia(shuffleArray(media));
  }, []); // run once after hydration

  return (
    <section className="bg-black/50 shadow-xl py-4">
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
            {shuffledMedia.map((medias, idx) => (
            <img
                key={idx}
                src={medias}
                alt="gib-media"
                className="h-40 w-auto mx-10 inline-block"
            />
            ))}
            {shuffledMedia.map((medias, idx) => (
            <img
                key={`dup-${idx}`}
                src={medias}
                alt="gib-media-duplicate"
                className="h-40 w-auto mx-10 inline-block"
            />
            ))}
        </div>
        </div>
    </section>
  );
}
