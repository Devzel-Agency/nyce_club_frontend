"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { usePathname } from "next/navigation";
import Padding from "./padding";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTranslatingUp, setIsTranslatingUp] = useState(false); // New state for translation
  const pathname = usePathname();
  const lastScrollY = useRef(0); // Ref to store the last scroll position

  // Handle scroll effect and translation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update isScrolled based on scroll position
      setIsScrolled(currentScrollY > 20);

      // Determine scroll direction for translation
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolled down and past initial threshold
        setIsTranslatingUp(true);
      } else if (
        currentScrollY < lastScrollY.current ||
        currentScrollY <= 100
      ) {
        // Scrolled up or back to top
        setIsTranslatingUp(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    console.log(pathname);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Our Process", href: "/#process" },
    { name: "NGOs", href: "/ngos" },
    { name: "Events", href: "/events" },
    { name: "Onboard", href: "/onboard" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? "bg-white/95" : "bg-transparent"
      } ${isMenuOpen ? "bg-white" : ""}
      ${isTranslatingUp ? "-translate-y-full" : "translate-y-0"}`}
    >
      <Padding className="">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="font-polysans text-xl lg:text-2xl font-[500]  duration-200">
              <span className="text-[#00afef]">nyce</span>
              <span className="text-[#f63ee9]"> club</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const isHomePage = pathname === "/";

                return (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`font-overused-grotesk font-medium text-base transition-all duration-200 relative group cursor-pointer ${
                        !isScrolled && isHomePage
                          ? "text-white hover:text-white/80"
                          : active
                          ? "text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }  `}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            {/* Donate Now Button */}
            <Link href="/ngos">
              <button className="bg-[#fbfb4c] cursor-pointer text-gray-900 font-overused-grotesk font-semibold px-6 py-2.5 lg:px-8 lg:py-3 rounded-full duration-200 transform flex items-center space-x-2 group">
                {" "}
                {/* Updated yellow color */}
                <span>Donate Now</span>
                <svg
                  className="w-4 h-4 transition-transform -rotate-45 duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                  }`}
                />
                <span
                  className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 pb-2 space-y-1 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {" "}
                <div
                  className={`block px-4 py-3 rounded-lg font-overused-grotesk font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Padding>
    </nav>
  );
}
