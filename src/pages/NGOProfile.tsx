import { Navbar } from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronLeft, ChevronRight, FileText, Video, ExternalLink, CheckCircle, ArrowRight, Info } from "lucide-react";

const NGOProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [donationAmount, setDonationAmount] = useState("1000");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [isVideoPlaying, setIsVideoPlaying] = useState({
    shruti: false,
    khushi: false,
    impact: false
  });
  const [donationProgress, setDonationProgress] = useState(0);
  const totalDonationNeeded = 124000; // Total amount needed

  const videoRefs = {
    shruti: useRef<HTMLIFrameElement>(null),
    khushi: useRef<HTMLIFrameElement>(null),
    impact: useRef<HTMLIFrameElement>(null)
  };

  const impactImages = [
    {
      img: "/photo1.jpg.jpg",
      alt: "Trishul NGO Impact",
      caption: "Building sustainable futures through education and empowerment"
    },
    {
      img: "/photo2.jpg",
      alt: "Education Initiative",
      caption: "Empowering children through quality education"
    },
    {
      img: "/photo3.jpg",
      alt: "Women Empowerment",
      caption: "Skill development and livelihood programs"
    }
  ];

  const donationBreakdown = [
    { name: "Tuition Fees - Shruti", value: 40000 },
    { name: "Tuition Fees - Khushi", value: 72000 },
    { name: "Administration Cost", value: 12000 }
  ];

  const totalDonation = donationBreakdown.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ["#4299E1", "#38B2AC", "#ED8936"];
  
  // Handle video playback when slides change
  useEffect(() => {
    const videoElement = document.querySelector(`[data-slide="${currentSlide}"] video`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.currentTime = 0; // Reset video to start
      videoElement.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % impactImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + impactImages.length) % impactImages.length);
  };

  const toggleVideo = (videoId: 'shruti' | 'khushi' | 'impact') => {
    const videoElement = videoRefs[videoId].current;
    
    if (videoElement) {
      const iframe = videoElement as HTMLIFrameElement;
      const currentSrc = new URL(iframe.src);
      const isPlaying = currentSrc.searchParams.get('autoplay') === '1';
      
      // Create a new URL with updated parameters
      if (isPlaying) {
        currentSrc.searchParams.set('autoplay', '0');
        currentSrc.searchParams.set('muted', '1');
      } else {
        // Pause other videos if playing
        Object.entries(videoRefs).forEach(([id, ref]) => {
          if (id !== videoId && ref.current) {
            const otherIframe = ref.current;
            const otherSrc = new URL(otherIframe.src);
            otherSrc.searchParams.set('autoplay', '0');
            otherSrc.searchParams.set('muted', '1');
            otherIframe.src = otherSrc.toString();
            setIsVideoPlaying(prev => ({ ...prev, [id]: false }));
          }
        });
        
        currentSrc.searchParams.set('autoplay', '1');
        currentSrc.searchParams.set('muted', '0');
      }
      
      iframe.src = currentSrc.toString();
      setIsVideoPlaying(prev => ({
        ...prev,
        [videoId]: !prev[videoId]
      }));
    }
  };

  // Calculate donation progress
  useEffect(() => {
    const progress = (parseInt(donationAmount) / totalDonationNeeded) * 100;
    setDonationProgress(Math.min(progress, 100));
  }, [donationAmount]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Visual Impact Carousel */}
        <section className="relative h-[300px] sm:h-[400px] md:h-[600px] mb-10 overflow-hidden">
          {impactImages.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center bg-black">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-contain sm:object-cover"
                  onError={(e) => {
                    console.error("Image loading error:", e);
                    console.error("Image path:", item.img);
                    console.error("Full path:", window.location.origin + item.img);
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">Trishul NGO</h2>
                  <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Controls */}
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
          
          {/* Indicator Dots */}
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
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3">
              {/* About Section */}
              <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">About Trishul NGO</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A registered charitable trust building self-sustainable communities in India's urban slums and rural villages. 
                  For over 20 years, Trishul has empowered over 50,000 families through programs in skill development, 
                  education, women's livelihood, hygiene, nutrition, youth empowerment, and environmental conservation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Education</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Women Empowerment</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Skill Development</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Environmental Conservation</span>
                </div>
              </section>
              
              {/* Current Offering */}
              <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">Current Offering</h2>
                  <Link 
                    to="#donate" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full flex items-center transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Sponsor This Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Sponsor 2 Girl Children
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Your contribution will sponsor the education and basic needs of two underprivileged 
                    girls for a full academic year, including tuition, books, uniforms, and nutrition.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <span className="text-blue-600 text-xl font-bold">K</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Khushi</h4>
                          <p className="text-sm text-gray-600">18 years • 12th Grade Graduate</p>
                          <p className="mt-2 text-gray-700">
                            Dreams of becoming a teacher. Khushi is a bright student with a passion for education.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <div className="p-2 bg-teal-100 rounded-full mr-4">
                          <span className="text-teal-600 text-xl font-bold">S</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Shruti</h4>
                          <p className="text-sm text-gray-600">21 years • TYBCom Graduate</p>
                          <p className="mt-2 text-gray-700">
                            Aspires to join the Raja Rani Course. Shruti shows remarkable talent in design.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Donation Breakdown */}
              <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Donation Breakdown</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expense Category
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donationBreakdown.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <span 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></span>
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {item.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          Total Sponsorship Cost
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                          ₹{totalDonation.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              {/* Proof & Documentation */}
              <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Proof & Documentation</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <a
                    href="/tuition-fee-receipts.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Tuition Fees Proof</h3>
                      <p className="text-sm text-gray-600">Verified school fee receipts for Khushi and Shruti</p>
                    </div>
                  </a>
                </div>
                
                <div className="mt-6 flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800">All documents verified by nyce club</span>
                </div>
              </section>
              
              {/* Stories of Sponsored Girls */}
              <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Stories of Impact</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative bg-black" style={{ maxWidth: '400px', margin: '0 auto' }}>
                      <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                        <iframe
                          ref={videoRefs.khushi}
                          src="https://player.vimeo.com/video/1079895167?h=2ade59fe8e"
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          title="khushi-story"
                        ></iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-20">
                        <button
                          onClick={() => toggleVideo('khushi')}
                          className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200"
                        >
                          {!isVideoPlaying.khushi ? (
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
                      <h3 className="font-semibold text-lg">Khushi: Future Teacher</h3>
                      <p className="text-gray-700 mt-2">
                        A bright 12th-grade graduate, Khushi aspires to become a school teacher. Despite her potential, 
                        financial hurdles threaten her path. With support, she can go from student to future shaper.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative bg-black" style={{ maxWidth: '400px', margin: '0 auto' }}>
                      <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                        <iframe
                          ref={videoRefs.shruti}
                          src="https://player.vimeo.com/video/1079894888?h=715f4636fa"
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          title="shruti-story"
                        ></iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-20">
                        <button
                          onClick={() => toggleVideo('shruti')}
                          className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200"
                        >
                          {!isVideoPlaying.shruti ? (
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
                      <h3 className="font-semibold text-lg">Shruti: Aspiring Designer</h3>
                      <p className="text-gray-700 mt-2">
                        A recent TYBCom graduate with a passion for colors and design, Shruti dreams of joining 
                        the Raja Rani Course seen on Shark Tank. Her talent and dedication are clear—but 
                        financial constraints hold her back.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Right Column - Fixed Donation Module */}
            <div className="lg:w-1/3">
              <div id="donation-section" className="sticky top-32 bg-white rounded-xl shadow-lg p-6">
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sponsor Two Girl Children</h2>
                  <p className="text-gray-600 text-sm mt-1">Your donation will support education for a full year</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Choose Amount</span>
                    <span className="flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Total cost: ₹{totalDonation.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {["500", "1000", "2500"].map((amount) => (
                      <button
                        key={amount}
                        className={`p-3 rounded-lg text-sm ${
                          donationAmount === amount
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ₹{parseInt(amount).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>
                  
                  {/* Donation Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Donation Progress</span>
                      <span>{Math.round(donationProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${donationProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹{totalDonationNeeded.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-2">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          selectedPaymentMethod === "upi"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={selectedPaymentMethod === "upi"}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-sm">UPI</span>
                      </label>
                      
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          selectedPaymentMethod === "card"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={selectedPaymentMethod === "card"}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-sm">Card</span>
                      </label>
                      
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          selectedPaymentMethod === "netbanking"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="netbanking"
                          checked={selectedPaymentMethod === "netbanking"}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-sm">Netbanking</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* UPI Link if UPI selected */}
                  {selectedPaymentMethod === "upi" && (
                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                      <p className="text-sm text-gray-600 mb-2">Scan QR code or click below:</p>
                      <a 
                        href="https://www.upi.me/pay?pa=stockswithharrit@okaxis" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        <span>Pay via UPI</span>
                      </a>
                    </div>
                  )}
                  
                  {/* Sponsor Now Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold transition-colors">
                    Sponsor Now
                  </button>
                  
                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">Secure Payment</span>
                      
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">Tax Benefits</span>
                    </div>
                    <p className="text-xs text-center text-gray-500">
                      All donations are eligible for tax deduction under Section 80G
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NGOProfile;