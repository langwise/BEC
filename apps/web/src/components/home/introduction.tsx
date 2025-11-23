export function Introduction() {
  return (
    <div className="block">
      <div className="pt-24 md:pt-32 lg:pt-48 min-h-[60vh] md:min-h-[calc(100vh-50px)] pb-12 md:pb-[50px] flex items-center bg-primary bg-[url('/section_2_diagonals.svg')] bg-no-repeat bg-bottom bg-cover">
        <div className="container w-full mx-auto px-4 md:px-6 text-center">
          {/* Responsive Heading: smaller on mobile, large on desktop */}
          <h2 className="mb-8 md:mb-[50px] text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-normal leading-tight">
            Boundless Ambition
            <br />
            with bec roots
          </h2>

          {/* Responsive Container & Text Size */}
          <div className="mx-auto my-0 max-w-full flex flex-wrap justify-center w-full md:w-10/12 lg:w-3/4">
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque in quod molestiae voluptate harum nam. Accusamus id,
              numquam error praesentium ipsum neque tempora excepturi ab
              blanditiis pariatur possimus fugit quas?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
