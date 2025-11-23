export function Information() {
  return (
    <div className="block box-border">
      {/* Responsive Spacer/Gradient: 
        - Height scales from h-48 (mobile) to h-96 (desktop).
        - Gradient start position adjusts for smaller screens.
      */}
      <div className="relative pb-8 md:pb-[50px] bg-transparent before:inset-0 before:-top-[200px] md:before:-top-[500px] before:z-0 before:absolute before:bg-gradient-to-b before:from-transparent before:to-primary pointer-events-none">
        <div className="w-full h-48 md:h-72 lg:h-96"></div>
      </div>
    </div>
  );
}
