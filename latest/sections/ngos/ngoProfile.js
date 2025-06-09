// sections/ngos/ngoProfile.js
"use client";
import { useState, useRef, useEffect, useCallback } from "react"; // Added useCallback
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Info,
  X,
  Loader2, // Added for loading spinner
} from "lucide-react";
import SignupForm from "@/components/auth";
import { useUser } from "@/context/userContext";
import GeneratePaymentLinkApi from "@/apis/payment/GeneratePaymentLinkApi";
import { toast } from "sonner"; // Import Toaster and toast

// New Reusable Donation Widget Component
const DonationWidget = ({
  totalDonation,
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
      const progress = (parseInt(donationAmount) / totalDonationNeeded) * 100;
      setDonationProgress(Math.min(progress, 100));
    }
  }, [donationAmount, totalDonationNeeded]);

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
            Total cost: ₹{totalDonation.toLocaleString()}
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
              ₹{parseInt(amount).toLocaleString()}
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
            <span>₹0</span>
            <span>₹{totalDonationNeeded.toLocaleString()}</span>
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

  const { state } = useUser();
  const user = state.user || {};

  const [pendingDonationAmount, setPendingDonationAmount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state

  const videoRefs = useRef({});
  const [isVideoPlaying, setIsVideoPlaying] = useState({});

  // Memoize complex calculations to prevent re-running on every render
  const impactImages = ngo.ngoImages.map((img, index) => ({
    img: img.file,
    alt: `${ngo.ngoName} Impact ${index + 1}`,
    caption: ngo.ngoDescription,
  }));

  const donationBreakdown = ngo.donationBreakdown.map((item) => ({
    name: item.expense,
    value: parseInt(item.amount),
  }));

  const totalDonation = donationBreakdown.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const totalDonationNeeded =
    parseInt(ngo.donationBreakdown[0]?.amount) || 50000;
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
        const data = await GeneratePaymentLinkApi(
          parseInt(amount),
          ngo._id,
          ngo.ngoName
        );
        if (data?.payment_link) {
          window.location.href = data.payment_link;
        } else {
          toast.error(
            "Failed to generate payment link. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error creating payment link:", error);
        toast.error("Failed to generate payment link. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [user.isVerified, ngo._id, ngo.ngoName]
  ); // Added dependencies

  useEffect(() => {
    if (user.isVerified && pendingDonationAmount) {
      // If user is verified and there's a pending donation, initiate payment
      generatePaymentLink(pendingDonationAmount);
      setPendingDonationAmount(null); // Clear pending amount after initiating
    }
  }, [user.isVerified, pendingDonationAmount, generatePaymentLink]); // Added generatePaymentLink to dependencies

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

  const toggleVideo = (videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      const iframe = videoElement;
      const currentSrc = new URL(iframe.src);
      const isPlaying = currentSrc.searchParams.get("autoplay") === "1";

      if (isPlaying) {
        currentSrc.searchParams.set("autoplay", "0");
        currentSrc.searchParams.set("muted", "1");
      } else {
        Object.entries(videoRefs.current).forEach(([id, ref]) => {
          if (id !== videoId && ref) {
            const otherIframe = ref;
            const otherSrc = new URL(otherIframe.src);
            otherSrc.searchParams.set("autoplay", "0");
            otherSrc.searchParams.set("muted", "1");
            otherIframe.src = otherSrc.toString();
            setIsVideoPlaying((prev) => ({ ...prev, [id]: false }));
          }
        });
        currentSrc.searchParams.set("autoplay", "1");
        currentSrc.searchParams.set("muted", "0");
      }
      iframe.src = currentSrc.toString();
      setIsVideoPlaying((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
    }
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
            totalDonation={totalDonation}
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

      <main className="pb-16 md:pb-8">
        <section className="relative h-[80vh] sm:h-[400px] md:h-[600px] mb-10 overflow-hidden">
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
                    `http://localhost:8000/upload/${item.img}` ||
                    "https://via.placeholder.com/600"
                  }
                  alt={item.alt}
                  className="w-full h-full object-contain sm:object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 text-white font-polysans font-medium">
                    {ngo.ngoName}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white font-overused-grotesk">
                    {item.caption}
                  </p>
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

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
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

              <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
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
                          <div className="p-2 bg-blue-100 h-10 w-10 flex justify-center items-center rounded-full mr-4">
                            <span className="text-blue-600 text-xl uppercase text-center font-medium font-overused-grotesk">
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

              <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
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
                            {item.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 font-overused-grotesk">
                          Total Sponsorship Cost
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right font-overused-grotesk">
                          ₹{totalDonation.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Proof & Documentation
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {ngo.proofDocuments.map((doc, index) => (
                    <a
                      key={index}
                      href={`http://localhost:8000/upload/${doc.file}`}
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

              <section className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-8">
                <h2 className="text-3xl mb-6 font-polysans font-medium">
                  Stories of Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ngo.storiesOfImpact.map((story, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <div
                        className="relative bg-black"
                        style={{ maxWidth: "400px", margin: "0 auto" }}
                      >
                        <div
                          style={{
                            padding: "177.78% 0 0 0",
                            position: "relative",
                          }}
                        >
                          <iframe
                            ref={(el) => (videoRefs.current[story._id] = el)}
                            src={story.video}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={story.title}
                          ></iframe>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-20">
                          <button
                            onClick={() => toggleVideo(story._id)}
                            className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200"
                          >
                            {!isVideoPlaying[story._id] ? (
                              <div className="w-0 h-0 border-t-5 border-b-5 border-t-transparent border-b-transparent border-l-10 border-l-white ml-1"></div>
                            ) : (
                              <div className="flex space-x-1">
                                <div className="w-2 h-6 bg-white rounded-sm"></div>
                                <div className="w-2 h-6 bg-white rounded-sm"></div>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h3 className="text-lg font-polysans font-medium">
                          {story.title}
                        </h3>
                        <p className="text-gray-700 mt-2 font-overused-grotesk">
                          {story.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
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
                    Your donation will support {ngo.currentOffering.description}
                  </p>
                </div>
                {/* Use the reusable widget here */}
                <DonationWidget
                  totalDonation={totalDonation}
                  totalDonationNeeded={totalDonationNeeded}
                  onSponsor={generatePaymentLink}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40 lg:hidden">
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
