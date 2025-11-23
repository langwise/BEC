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
        What
        <br /> starts <br />
        here <br />
        changes
        <br /> the <br />
        world
      </h2>
      <div className="h-[150vh] box-border block">
        <div className="fixed inset-0 -z-2">
          <img
            alt="background"
            className="object-cover -inset-9999 m-auto h-full p-0 min-w-full"
            src="https://www.utexas.edu/sites/default/files/homepage-parallax-background-image.jpg"
          />
        </div>
      </div>
    </div>
  );
}
