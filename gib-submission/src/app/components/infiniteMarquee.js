export default function Featured() {
  const logos = [
    "/ME_Full_Gradient.png",
    "/StreamFlow.png",
    "/DexScreener.png",
    "/CoinMarketCap-logo.png",
    "/CoinGecko.svg",
  ];

  return (
    <section className="relative pt-10 mb-8">
      {/* <div className="absolute inset-0 bg-purple-500/20 pointer-events-none" /> */}
      <h2 className="mono text-center font-bold mb-6 text-2xl">
        FEATURED IN
      </h2>
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="brand logo"
              className="h-12 mx-8 inline-block"
            />
          ))}

          {logos.map((logo, idx) => (
            <img
              key={`dup-${idx}`}
              src={logo}
              alt="brand logo duplicate"
              className="h-12 mx-8 inline-block"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
