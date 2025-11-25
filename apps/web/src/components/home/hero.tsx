export function Hero() {
  return (
    // Added [clip-path:inset(0)] here.
    // This constrains the 'fixed' image child to only be visible
    // within the bounds of this specific div.
    <div className="box-border block">
      <h2
        className="sticky text-white font-black uppercase text-[40px] md:text-[80px] container mx-auto px-3 leading-[0.85] z-2"
        style={{
          top: "calc(((100vh - 380px) / 2) + 50px)",
        }}
      >
        Building
        <br /> Excellence <br />
        Here <br />
        Since <br />
        1963
      </h2>
      <div className="h-[150vh] box-border block">
        <div className="fixed inset-0 -z-2">
          <img
            alt="background"
            className="object-cover -inset-9999 m-auto h-full p-0 min-w-full"
            src="/homepage-parallax-background-image.jpg"
          />
          {/* Orange tint overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-orange-500/20 via-orange-400/20 to-orange-500/30" />
        </div>
      </div>
    </div>
  );
}
