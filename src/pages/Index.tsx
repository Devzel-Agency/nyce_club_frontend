import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Index = () => {
  // Add scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="/hero-children.jpg"
              alt="Happy children making peace signs"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-start px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#fbfb4c] text-black font-semibold px-3 sm:px-4 py-1 rounded-full w-fit mb-4 sm:mb-6 text-sm sm:text-base"
            >
              100% Transparent Donations
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6"
            >
              Track Every Penny
              <br />
              <span className="text-[#fbfb4c]">Make Every Donation</span>
              <br />
              <span className="text-[#fbfb4c]">Count</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6 sm:mb-8 bg-black/20 p-3 sm:p-4 rounded-lg backdrop-blur-sm"
            >
              At <span className="text-[#00afef]">nyce</span>
              <span className="text-[#f63ee9]"> club</span>, we ensure that 100% of your donation reaches those who need it most, 
              with complete transparency on how your generosity makes an impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                to="/ngo"
                className="bg-[#fbfb4c] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform inline-block text-center"
              >
                Make a Difference Today
              </Link>
              <Link
                to="/process"
                className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform inline-block border border-white/20 text-center"
              >
                Learn Our Process
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What is Nyce Club? */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Gradient Circles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl"
              style={{ y }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"
            />

            {/* Floating Elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.3, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute hidden md:block"
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  width: `${10 + (i % 3) * 5}px`,
                  height: `${10 + (i % 3) * 5}px`,
                  backgroundColor: 'var(--accent)',
                  borderRadius: '50%',
                }}
              />
            ))}

            {/* Animated Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(3)].map((_, i) => (
                <motion.path
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.5 }}
                  d={`M ${100 + i * 200} 0 Q ${150 + i * 200} ${300 + i * 50} ${100 + i * 200} 600`}
                  stroke="var(--accent)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
            </svg>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  What is{" "}
                  <span className="text-[#00afef]">nyce</span>
                  <span className="text-[#f63ee9]"> club</span>?
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl"
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
                  <span>
                    <span className="text-[#00afef]">nyce</span>
                    <span className="text-[#f63ee9]"> club</span>
                  </span> is a growing community of changemakers committed to supporting genuine causes through verified NGOs. 
                  We're redefining how people contribute — transparently, effectively, and with heart.
                </p>
              </motion.div>

              {/* Features Grid with Enhanced Hover Effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12">
                {[
                  {
                    icon: "🎯",
                    title: "Verified NGOs",
                    description: "We carefully verify each NGO to ensure your donations make a real impact."
                  },
                  {
                    icon: "💡",
                    title: "100% Transparency",
                    description: "Track every rupee of your donation and see the direct impact it creates."
                  },
                  {
                    icon: "❤️",
                    title: "Community Impact",
                    description: "Join a community of donors making meaningful change together."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-accent/10"
                  >
                    <motion.div 
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12"
              >
                <Link
                  to="/ngo"
                  className="inline-block bg-accent text-gray-900 px-7 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform font-montserrat text-lg"
                >
                  Discover the Club
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <ProcessSteps />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
