// sections/ngos/ngoProfile.js
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Info,
  X,
  Loader2,
  Share2,
} from "lucide-react";
import SignupForm from "@/components/auth";
import { useUser } from "@/context/userContext";
import GeneratePaymentLinkApi from "@/apis/payment/GeneratePaymentLinkApi";
import { toast } from "sonner";
import { BACKEND_URL } from "@/apis/variables";
import StoriesOfImpact from "@/components/storiesOfImpact";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import clsx from "clsx";
import { motion } from "framer-motion";
import Padding from "@/components/padding";

// New Reusable Donation Widget Component
const DonationWidget = ({
  donatedAmount, // Renamed for clarity
  totalDonationNeeded,
  onSponsor,
  isLoading,
}) => {
  const [donationAmount, setDonationAmount] = useState("1000");
  const [donationProgress, setDonationProgress] = useState(0);

  // Calculate donation progress
  useEffect(() => {
    // Ensure totalDonationNeeded is not zero to prevent division by zero
    if (totalDonationNeeded > 0) {
      const progress = (parseInt(donatedAmount) / totalDonationNeeded) * 100;
      setDonationProgress(Math.min(progress, 100));
    } else {
      setDonationProgress(0); // If no target, progress is 0
    }
  }, [donatedAmount, totalDonationNeeded]);

  const handleSponsorClick = () => {
    onSponsor(donationAmount);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2 font-overused-grotesk">
          <span>Choose Amount</span>
          <span className="flex items-center">
            <Info className="w-4 h-4 mr-1" />
            Total Donated: ₹{donatedAmount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["500", "1000", "2500"].map((amount) => (
            <button
              key={amount}
              className={`p-3 rounded-lg text-sm font-overused-grotesk transition-colors ${
                donationAmount === amount
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
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
            <span>Donation Progress</span>
            <span>{Math.round(donationProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${donationProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 font-overused-grotesk">
            <span> ₹{donatedAmount.toLocaleString("en-IN")}</span>
            <span>₹{totalDonationNeeded.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <button
          onClick={handleSponsorClick}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold transition-colors font-overused-grotesk flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Sponsor Now"
          )}
        </button>
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-600 font-overused-grotesk">
              Secure Payment
            </span>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-600 font-overused-grotesk">
              Tax Benefits
            </span>
          </div>
          <p className="text-xs text-center text-gray-500 font-overused-grotesk">
            All donations are eligible for tax deduction under Section 80G
          </p>
        </div>
      </div>
    </div>
  );
};

export default function NGOProfile({ ngo }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const { state } = useUser();
  const user = state.user || {};

  const [pendingDonationAmount, setPendingDonationAmount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // New state to control scroll-based active section updates
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);

  // Ref for the scrollable navigation container
  const navScrollRef = useRef(null);

  // Navigation items for tabs
  const navItems = [
    { id: "about", label: "About" },
    { id: "offering", label: "Current Offering" },
    { id: "breakdown", label: "Donation Breakdown" },
    { id: "documents", label: "Proof & Documentation" },
    { id: "stories", label: "Stories Of Impact" },
  ];

  // Function to scroll the active tab into view and center it
  const scrollActiveTabIntoView = useCallback(() => {
    if (navScrollRef.current && activeSection) {
      const activeElement = navScrollRef.current.querySelector(
        `[data-id="${activeSection}"]`
      );
      if (activeElement) {
        const containerWidth = navScrollRef.current.offsetWidth;
        const elementWidth = activeElement.offsetWidth;
        const elementLeft = activeElement.offsetLeft;

        // Calculate the scroll position to center the element
        const scrollLeft =
          elementLeft - (containerWidth / 2 - elementWidth / 2);

        navScrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection]); // Depend on activeSection

  // Handle share functionality
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support ${ngo.ngoName}`,
          text: `Help make a difference by supporting ${ngo.ngoName} - ${ngo.ngoTagline}`,
          url: url,
        });
      } catch (error) {
        // Fallback to clipboard if native sharing fails
        copyToClipboard(url);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  // Handle tab clicks and smooth scroll to sections
  const handleTabClick = (sectionId) => {
    // 1. Set the intended active section immediately
    setActiveSection(sectionId);
    // 2. Indicate that a programmatic scroll is about to happen
    setIsScrollingByClick(true);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Define onScrollEndThrottle here so it's always accessible
      let timeoutId;
      const onScrollEndThrottle = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onScrollEnd();
        }, 150);
      };

      // 3. Listen for scroll end to reset `isScrollingByClick`
      const onScrollEnd = () => {
        const currentScrollPosition = window.scrollY;
        const targetElement = document.getElementById(sectionId);

        // Remove the 'scrollend' listener first to prevent multiple calls
        if ("onscrollend" in window) {
          window.removeEventListener("scrollend", onScrollEnd);
        } else {
          window.removeEventListener("scroll", onScrollEndThrottle);
        }

        if (targetElement) {
          const targetPosition = targetElement.offsetTop - offset;
          // Allow a small tolerance for the scroll end check
          if (
            Math.abs(currentScrollPosition - targetPosition) < 5 || // Within 5px of target
            window.innerHeight + currentScrollPosition >=
              document.body.offsetHeight - 5 // Scrolled to bottom with a small buffer
          ) {
            setIsScrollingByClick(false);
          }
        }
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", onScrollEnd, { once: true });
      } else {
        window.addEventListener("scroll", onScrollEndThrottle);
      }
    }
  };

  // Track active section on scroll and scroll the navigation bar
  useEffect(() => {
    const handleScroll = () => {
      // ONLY update active section based on scroll if NOT initiated by a tab click
      if (isScrollingByClick) {
        return;
      }

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 150; // Offset for sticky header

      let newActiveSection = null;
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
  }, [activeSection, navItems, isScrollingByClick]); // Depend on isScrollingByClick

  // Effect to scroll the active navigation tab into view
  // This will run when `activeSection` changes, whether by click or scroll
  useEffect(() => {
    scrollActiveTabIntoView();
  }, [activeSection, scrollActiveTabIntoView]);

  // Memoize complex calculations to prevent re-running on every render
  const impactImages = ngo.ngoImages.map((img, index) => ({
    img: img.file,
    alt: `${ngo.ngoName} Impact ${index + 1}`,
    caption: ngo.ngoTagline,
  }));

  const donationBreakdown = ngo.donationBreakdown.map((item) => ({
    name: item.expense,
    value: parseInt(item.amount),
  }));

  const receiveDonation = ngo.receiveDonation.map((item) => ({
    name: item.expense,
    value: parseInt(item.amount),
  }));

  const totalDonationTarget = donationBreakdown.reduce(
    (sum, item) => sum + item.value,
    0
  );
  // const totalRecievedDonation = receiveDonation.reduce(
  //   (sum, item) => sum + item.value,
  //   0
  // );
  const totalRecievedDonation = ngo.tempReceivedDonation || 0;
  // Ensured consistency: totalDonationNeeded now explicitly refers to the target
  const totalDonationNeeded = totalDonationTarget;
  const COLORS = ["#4299E1", "#38B2AC", "#ED8936"];

  const generatePaymentLink = useCallback(
    async (amount) => {
      if (!user.isVerified) {
        setPendingDonationAmount(amount);
        setShowDonationPopup(false); // Hide donation popup
        setShowLoginPopup(true); // Show login popup
        return;
      }
      setIsLoading(true);
      try {
        // const data = await GeneratePaymentLinkApi(
        //   parseInt(amount),
        //   ngo._id,
        //   ngo.ngoName,
        //   user.id,
        //   user.phoneNumber
        // );
        window.location.href =
          "https://www.upi.me/pay?pa=sonineels@okhdfcbank&tn=NYCE%20CLUB%20DONATION%20(Nelay%20Thaleshwar)";
        // if (data?.payment_link) {
        // window.location.href = data.payment_link;
        // } else {
        //   toast.error(
        //     "Failed to generate payment link. Please try again later."
        //   );
        // }
      } catch (error) {
        console.error("Error creating payment link:", error);
        toast.error("Failed to generate payment link. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [user.isVerified, ngo._id, ngo.ngoName]
  );

  useEffect(() => {
    if (user.isVerified && pendingDonationAmount) {
      // If user is verified and there's a pending donation, initiate payment
      setShowLoginPopup(false);
      generatePaymentLink(pendingDonationAmount);
      setPendingDonationAmount(null); // Clear pending amount if login is closed
    }
  }, [user.isVerified, pendingDonationAmount, generatePaymentLink]);

  // Handle video playback when slides change
  useEffect(() => {
    const videoElement = document.querySelector(
      `[data-slide="${currentSlide}"] video`
    );
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % impactImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + impactImages.length) % impactImages.length
    );
  };

  const DonationPopup = () => (
    <div className="fixed top-0 h-[100dvh] w-screen bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl h-max md:rounded-2xl w-full max-w-md overflow-y-auto">
        <div className="bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-xl text-black font-polysans font-medium">
            {ngo.currentOffering.title}
          </h3>
          <button
            onClick={() => setShowDonationPopup(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {/* Use the reusable widget here */}
          <DonationWidget
            donatedAmount={totalRecievedDonation}
            totalDonationNeeded={totalDonationNeeded}
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
          onClose={() => {
            setShowLoginPopup(false);
            setPendingDonationAmount(null); // Clear pending amount if login is closed
          }}
          onSuccess={() => {
            setShowLoginPopup(false);
            // The useEffect will handle initiating payment if pendingDonationAmount is set
          }}
        />
      )}

      <main className="pb-16 md:pb-8 w-full ">
        <div className=" w-full mb-4 ">
          <AspectRatio ratio={20 / 9}>
            <section className="relative w-full h-full mb-10 overflow-hidden">
              {impactImages.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <img
                      src={
                        `${BACKEND_URL}/upload/${item.img}` ||
                        "https://via.placeholder.com/600"
                      }
                      alt={item.alt}
                      className="w-full h-full object-cover sm:object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-2xl sm:text-3xl md:text-4xl md:mb-2 text-white font-polysans font-medium">
                            {ngo.ngoName}
                          </h2>
                          <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white font-overused-grotesk">
                            {item.caption}
                          </p>
                        </div>
                        <button
                          onClick={handleShare}
                          className="bg-white/20 cursor-pointer relative z-[500] hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-colors backdrop-blur-[1px] md:backdrop-blur-[2px]"
                          title="Share this NGO"
                        >
                          <Share2 className=" w-3.5 h-3.5 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {impactImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </section>
          </AspectRatio>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 bg-white z-30 mb-8">
          <Padding className="container mx-auto">
            <div
              ref={navScrollRef} // Assign the ref here
              className="flex overflow-x-auto scrollbar-custom md:overflow-visible w-full space-x-3 md:space-x-8 scroll-smooth scrollbar-custom" // Added scrollbar-custom
            >
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={clsx(
                    "flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 relative py-4",
                    activeSection === item.id
                      ? "text-black"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  data-id={item.id} // Important for selecting the element
                >
                  <span className="text-base font-overused-grotesk font-medium">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="tab"
                      className="absolute bottom-0 left-0 h-[2px] bg-black w-full"
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

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <section
                id="about"
                className="bg-white rounded-xl md:border border-gray-100 p-0 sm:p-8 mb-8"
              >
                <h2 className="text-3xl mb-4 font-polysans font-medium">
                  About {ngo.ngoName}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6 font-overused-grotesk">
                  {ngo.ngoDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ngo.ngoTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-overused-grotesk"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section
                id="offering"
                className="bg-white rounded-xl md:border border-gray-100 p-0 sm:p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-polysans font-medium">
                    Current Offering
                  </h2>
                </div>
                <div className="p-4 sm:p-6 bg-[#F6F6F6] rounded-lg mb-6">
                  <h3 className="text-xl mb-4 text-gray-800 font-polysans font-medium">
                    {ngo.currentOffering.title}
                  </h3>
                  <p className="text-gray-700 mb-6 font-overused-grotesk">
                    {ngo.currentOffering.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ngo.currentOffering.offerings.map((offering, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-start">
                          <div className=" bg-blue-100 min-h-9 h-9 min-w-9 w-9 flex justify-center items-center rounded-full mr-4">
                            <span className="text-blue-600 text-xl mb-0.5 uppercase text-center font-medium font-overused-grotesk">
                              {offering.name[0]}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-polysans font-medium">
                              {offering.name}
                            </h4>
                            <p className="text-sm text-gray-600 font-overused-grotesk">
                              {offering.age} years
                            </p>
                            <p className="mt-2 text-gray-700 font-overused-grotesk">
                              {offering.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="breakdown"
                className="bg-white rounded-xl md:border border-gray-100 p-0 sm:p-8 mb-8"
              >
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Donation Breakdown
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
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
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donationBreakdown.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-overused-grotesk">
                            <div className="flex items-center">
                              <span
                                className="w-3 h-3 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></span>
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-overused-grotesk">
                            {item.value.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 font-overused-grotesk">
                          Total Sponsorship Cost
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right font-overused-grotesk">
                          ₹{totalDonationTarget.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="documents"
                className="bg-white rounded-xl md:border border-gray-100 p-0 sm:p-8 mb-8"
              >
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Proof & Documentation
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {ngo.proofDocuments.map((doc, index) => (
                    <a
                      key={index}
                      href={`${BACKEND_URL}/upload/${doc.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 sm:p-5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
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
                <div className="mt-6 flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-overused-grotesk">
                    All documents verified
                  </span>
                </div>
              </section>

              <div id="stories">
                <StoriesOfImpact storiesOfImpact={ngo.storiesOfImpact} />
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/3">
              <div
                id="donation-section"
                className="sticky top-20 bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-2xl text-gray-900 font-polysans font-medium">
                    {ngo.currentOffering.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 font-overused-grotesk">
                    {ngo.currentOffering.description}
                  </p>
                </div>
                {/* Use the reusable widget here */}
                <DonationWidget
                  donatedAmount={totalRecievedDonation}
                  totalDonationNeeded={totalDonationNeeded}
                  onSponsor={generatePaymentLink}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="sticky -bottom-0.5 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40 lg:hidden">
        <div className=" pb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (parseInt(totalRecievedDonation) / totalDonationNeeded) *
                    100 || 0
                }%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 font-overused-grotesk">
            <span>₹{totalRecievedDonation}</span>
            <span>₹{totalDonationNeeded.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <button
          onClick={() => setShowDonationPopup(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors font-overused-grotesk flex items-center justify-center"
        >
          Sponsor Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      {showDonationPopup && <DonationPopup />}
    </div>
  );
}
