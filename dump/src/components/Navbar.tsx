import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Process", to: "/process" },
  { label: "NGOs", to: "/ngo" },
  { label: "Events", to: "/events" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Set background transparency
      setHasScrolled(currentScrollPos > 20);
      
      // Determine scroll direction and visibility
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setIsVisible(currentScrollPos < 10 || isScrollingUp);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        hasScrolled ? "bg-black/20 backdrop-blur-[2px]" : "bg-transparent"
      }`}
    >
      {/* Content */}
      <div className="relative w-full">
        <div className="flex items-center justify-between h-16 sm:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center pl-4 sm:pl-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center"
            >
              <span className="text-xl sm:text-2xl font-bold">
                <span className="text-[#00afef]">nyce</span>
                <span className="text-[#f63ee9]"> club</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 pr-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-lg font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] ${
                  pathname === link.to
                    ? "text-[#fbfb4c] font-semibold"
                    : "text-white brightness-125"
                } hover:text-[#fbfb4c] transition-colors`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ngo"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#fbfb4c] text-black font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-[#fbfb4c]/90"
              >
                Donate Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden pr-4 sm:pr-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#fbfb4c] hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/90 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`block text-lg font-medium ${
                      pathname === link.to
                        ? "text-[#fbfb4c] font-semibold"
                        : "text-white brightness-125"
                    } hover:text-[#fbfb4c] transition-colors`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile CTA Button */}
                <motion.div whileTap={{ scale: 0.95 }} className="pt-2">
                  <Link
                    to="/ngo"
                    className="inline-flex items-center w-full justify-center px-6 py-3 rounded-full bg-[#fbfb4c] text-black font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-[#fbfb4c]/90"
                  >
                    Donate Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
