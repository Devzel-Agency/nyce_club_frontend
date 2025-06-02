import { useEffect, useState, useRef } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
    alt: "Sun filtering through trees",
    caption: "Empowering women to lead.",
  },
  {
    img: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    alt: "A lakeside with trees",
    caption: "Children receiving education and joy.",
  },
  {
    img: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    alt: "Deers in a forest",
    caption: "Wildlife rescue in action.",
  },
];

export default function ImpactSlider() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-advance fast, but allow pause on hover
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 2300);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause on mouse enter
  function handleMouseEnter() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }
  function handleMouseLeave() {
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 2300);
  }

  return (
    <div
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden shadow bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100 z-10 animate-slider-next" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 py-4 md:py-6 px-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <span className="text-white text-md md:text-lg font-bold drop-shadow">
              {slide.caption}
            </span>
          </div>
        </div>
      ))}
      {/* Overlay CTA */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 pointer-events-none">
        <div className="bg-accent/95 shadow-lg px-8 py-4 rounded-xl font-extrabold text-2xl md:text-3xl text-gray-900 mix-blend-screen 
          font-montserrat animate-fade-in ring-2 ring-accent ring-offset-2 ring-offset-white">
          See the Impact. <span className="block md:inline">Join the Movement.</span>
        </div>
      </div>
    </div>
  );
}
