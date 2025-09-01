export default function Featured() {
  const logos = [
    "/ME_Full_Gradient.png",
    "/StreamFlow.png",
    "/DexScreener.png",
    "/CoinMarketCap-logo.png",
    "/CoinGecko.svg",
  ];

  return (
    <section className="bg-gradient-to-b from-green to-yellow-200 py-10 mb-10">
      <h2 className="text-center text-white font-semibold mb-6 text-2xl">
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
