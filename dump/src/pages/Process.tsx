import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Search, Shield, Heart, ArrowRight } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Discover NGOs",
      description: "Browse through our curated list of verified NGOs working across different causes.",
      color: "bg-blue-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verification",
      description: "Each NGO undergoes rigorous verification of their credentials, impact, and financial transparency.",
      color: "bg-green-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Choose & Donate",
      description: "Select your cause, choose the amount, and make your donation through secure payment methods.",
      color: "bg-purple-500"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Track Impact",
      description: "Follow your donation's journey and see the real impact it creates in the community.",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 pb-16 pt-32">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            How do we operate?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            A transparent and secure process to ensure your donations make the maximum impact
          </motion.p>
        </section>

        {/* Process Steps */}
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Verification Process */}
        <section className="max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-6">Our Verification Process</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#00afef]/10 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[#00afef]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Document Verification</h3>
                  <p className="text-gray-600">All legal documents, registrations, and certifications are thoroughly verified.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#f63ee9]/10 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[#f63ee9]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact Assessment</h3>
                  <p className="text-gray-600">We evaluate the NGO's past work, impact metrics, and beneficiary testimonials.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#00afef]/10 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[#00afef]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Financial Transparency</h3>
                  <p className="text-gray-600">Regular audits and financial reports are reviewed to ensure proper fund utilization.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#f63ee9]/10 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[#f63ee9]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Monitoring</h3>
                  <p className="text-gray-600">Ongoing assessment of activities and impact to maintain quality standards.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-600 mb-8">
              Join our community of changemakers and start supporting causes that matter to you.
            </p>
            <a
              href="/ngo"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform border-2 border-yellow-400"
            >
              Explore NGOs
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Process; 