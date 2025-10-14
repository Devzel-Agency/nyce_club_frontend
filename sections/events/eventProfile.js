"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  ArrowRight,
  Info,
  X,
  Loader2,
  Share2,
  Calendar,
  MapPin,
  Heart,
} from "lucide-react";
import SignupForm from "@/components/auth";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import clsx from "clsx";
import { motion } from "framer-motion";
import Padding from "@/components/padding";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/apis/variables";

// Reusable Donation Widget (Adapted for Events)
const DonationWidget = ({
  donatedAmount,
  totalDonationNeeded,
  onSponsor,
  isLoading,
}) => {
  const [donationAmount, setDonationAmount] = useState("1000");
  const donationProgress =
    totalDonationNeeded > 0 ? (donatedAmount / totalDonationNeeded) * 100 : 0;

  const handleSponsorClick = () => {
    onSponsor(donationAmount);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2 font-overused-grotesk">
          <span>Choose Amount</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["500", "1000", "2500"].map((amount) => (
            <button
              key={amount}
              className={clsx(
                "p-3 rounded-lg text-sm font-overused-grotesk transition-colors",
                donationAmount === amount
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              )}
              onClick={() => setDonationAmount(amount)}
              disabled={isLoading}
            >
              ₹{parseInt(amount).toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 font-overused-grotesk">₹</span>
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-overused-grotesk"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2 font-overused-grotesk">
            <span>Fundraising Progress</span>
            <span>{Math.round(donationProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(donationProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 font-overused-grotesk">
            <span>₹{donatedAmount.toLocaleString("en-IN")} Raised</span>
            <span>of ₹{totalDonationNeeded.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <button
          onClick={handleSponsorClick}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold transition-colors font-overused-grotesk flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
            </>
          ) : (
            "Contribute Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default function EventProfile({ event }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const { state } = useUser();
  const user = state.user || {};

  const [pendingDonationAmount, setPendingDonationAmount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);
  const navScrollRef = useRef(null);

  const navItems = [
    { id: "about", label: "About Event" },
    { id: "sponsors", label: "Our Sponsors" },
    { id: "breakdown", label: "Fundraising Goal" },
    { id: "documents", label: "Documentation" },
  ];

  // --- START: SCROLL & NAVIGATION LOGIC (from your reference) ---
  const scrollActiveTabIntoView = useCallback(() => {
    if (navScrollRef.current && activeSection) {
      const activeElement = navScrollRef.current.querySelector(
        `[data-id="${activeSection}"]`
      );
      if (activeElement) {
        const containerWidth = navScrollRef.current.offsetWidth;
        const elementWidth = activeElement.offsetWidth;
        const elementLeft = activeElement.offsetLeft;
        const scrollLeft =
          elementLeft - (containerWidth / 2 - elementWidth / 2);
        navScrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join the event: ${event.eventName}`,
          text: `Support this cause with ${event.ngo?.ngoName || "us"}: ${
            event.eventTagline
          }`,
          url: url,
        });
      } catch (error) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Event link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleTabClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsScrollingByClick(true);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      let timeoutId;
      const onScrollEndThrottle = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => onScrollEnd(), 150);
      };
      const onScrollEnd = () => {
        window.removeEventListener("scroll", onScrollEndThrottle);
        setIsScrollingByClick(false);
      };
      window.addEventListener("scroll", onScrollEndThrottle, { once: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingByClick) return;
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 150;
      let newActiveSection = "about"; // Default to 'about'
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          newActiveSection = sections[i];
          break;
        }
      }
      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navItems, isScrollingByClick]);

  useEffect(() => {
    scrollActiveTabIntoView();
  }, [activeSection, scrollActiveTabIntoView]);
  // --- END: SCROLL & NAVIGATION LOGIC ---

  const totalDonationTarget =
    event.donationBreakdown?.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    ) || 0;
  const totalReceivedDonation = event.tempReceivedDonation || 0;
  const COLORS = ["#4299E1", "#38B2AC", "#ED8936", "#9F7AEA", "#4C51BF"];

  const generatePaymentLink = useCallback(
    async (amount) => {
      if (!user.isVerified) {
        setPendingDonationAmount(amount);
        setShowDonationPopup(false);
        setShowLoginPopup(true);
        return;
      }
      setIsLoading(true);
      toast.info("Connecting to payment gateway...");
      setTimeout(() => {
        window.location.href =
          "https://www.upi.me/pay?pa=9821155588@yes&tn=NYCE%20CLUB";
        setIsLoading(false);
      }, 1500);
    },
    [user.isVerified]
  );

  useEffect(() => {
    if (user.isVerified && pendingDonationAmount) {
      setShowLoginPopup(false);
      generatePaymentLink(pendingDonationAmount);
      setPendingDonationAmount(null);
    }
  }, [user.isVerified, pendingDonationAmount, generatePaymentLink]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % event.eventImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + event.eventImages.length) % event.eventImages.length
    );

  const DonationPopup = () => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl text-black font-polysans font-medium">
            Contribute to {event.eventName}
          </h3>
          <button
            onClick={() => setShowDonationPopup(false)}
            disabled={isLoading}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <DonationWidget
            donatedAmount={totalReceivedDonation}
            totalDonationNeeded={totalDonationTarget}
            onSponsor={generatePaymentLink}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {showLoginPopup && (
        <SignupForm
          onClose={() => setShowLoginPopup(false)}
          onSuccess={() => setShowLoginPopup(false)}
        />
      )}
      <main className="pb-24 md:pb-8 w-full">
        <div className="w-full mb-4">
          <AspectRatio ratio={20 / 9}>
            <section className="relative w-full h-full overflow-hidden bg-gray-100">
              {event.eventImages.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={`${BACKEND_URL}/upload/${item.file}`}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl md:mb-2 text-white font-polysans font-medium">
                          {event.eventName}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl max-w-3xl text-white/90 font-overused-grotesk">
                          {event.eventTagline}
                        </p>
                      </div>
                      <button
                        onClick={handleShare}
                        className="bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-colors backdrop-blur-sm"
                        title="Share this Event"
                      >
                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {event.eventImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full z-10 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full z-10 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {event.eventImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          currentSlide === index ? "bg-white" : "bg-white/40"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </AspectRatio>
        </div>

        <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200">
          <Padding>
            <div
              ref={navScrollRef}
              className="flex overflow-x-auto scrollbar-hide space-x-6 sm:space-x-8"
            >
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={clsx(
                    "flex-shrink-0 cursor-pointer transition-colors duration-300 relative py-4",
                    activeSection === item.id
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-800"
                  )}
                  data-id={item.id}
                >
                  <span className="text-sm sm:text-base font-overused-grotesk font-medium">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 h-0.5 bg-black w-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Padding>
        </div>

        <Padding className="container mx-auto pt-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-2/3 space-y-12">
              <section id="about">
                <h2 className="text-3xl mb-4 font-polysans font-medium">
                  About this Event
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3 mb-6 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium font-overused-grotesk">
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium font-overused-grotesk">
                      {event.eventLocation}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed mb-6 font-overused-grotesk whitespace-pre-wrap">
                  {event.eventDescription}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-overused-grotesk">
                  <Heart className="w-4 h-4 text-gray-500" />
                  An initiative by{" "}
                  <strong className="text-gray-800">
                    {event.ngo?.ngoName || "our dedicated team"}
                  </strong>
                </div>
              </section>

              <section id="sponsors">
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Our Valued Sponsors
                </h2>
                {event.sponsors && event.sponsors.length > 0 ? (
                  <div className=" flex flex-wrap gap-4">
                    {event.sponsors.map(
                      (sponsor) =>
                        sponsor.image && (
                          <div
                            key={sponsor._id}
                            className=" h-max  flex flex-col items-center justify-center transition-all "
                          >
                            <div className="relative h-6 w-full mb-2">
                              <img
                                src={`${BACKEND_URL}/upload/${sponsor.image}`}
                                alt={sponsor.name}
                                className="h-full  object-cover grayscale opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                              />
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
                    <p className="text-gray-600 font-overused-grotesk">
                      This event is actively seeking sponsors!
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0">
                      Become a sponsor
                    </Button>
                  </div>
                )}
              </section>

              <section id="breakdown">
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Fundraising Goal
                </h2>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-overused-grotesk">
                          Expense Category
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-overused-grotesk">
                          Amount (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {event.donationBreakdown.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-overused-grotesk">
                            <div className="flex items-center">
                              <span
                                className="w-2.5 h-2.5 rounded-full mr-3"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></span>
                              {item.expense}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-mono">
                            {parseFloat(item.amount).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold">
                        <td className="px-6 py-4 text-sm text-gray-900 font-overused-grotesk">
                          Total Cost
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono">
                          ₹{totalDonationTarget.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="documents" className="pb-8">
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Documentation
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {event.proofDocuments.map((doc, index) => (
                    <a
                      key={index}
                      href={`${BACKEND_URL}/upload/${doc.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-polysans font-medium">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-overused-grotesk">
                          {doc.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <div className="hidden lg:block lg:w-1/3">
              <div
                id="donation-section"
                className="sticky top-24 bg-white rounded-xl border p-6 shadow-sm"
              >
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-2xl text-gray-900 font-polysans font-medium">
                    Support this Event
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 font-overused-grotesk">
                    Your contribution makes a direct impact.
                  </p>
                </div>
                <DonationWidget
                  donatedAmount={totalReceivedDonation}
                  totalDonationNeeded={totalDonationTarget}
                  onSponsor={generatePaymentLink}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </Padding>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t p-4 z-40 lg:hidden">
        <button
          onClick={() => setShowDonationPopup(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
        >
          Contribute Now <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      {showDonationPopup && <DonationPopup />}
    </div>
  );
}
