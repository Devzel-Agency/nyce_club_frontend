// components/OurProcessSection.jsx
import Padding from "@/components/padding";
import ProcessStep from "@/components/processStep";
import React from "react";

const OurProcess = () => {
  const processSteps = [
    {
      icon: "verify",
      iconColor: "orange",
      title: "We Verify NGOs",
      description:
        "Every NGO is thoroughly vetted for credibility, legal compliance, and real-world impact by our team before being listed on the platform",
    },
    {
      icon: "audit",
      iconColor: "blue",
      title: "We Audit Them",
      description:
        "We regularly audit all listed NGOs to ensure transparency, accountability, and alignment with their mission — so your support drives real impact",
    },
    {
      icon: "donate",
      iconColor: "green",
      title: "You Donate Securely", // Note: This appears to be a duplicate title in the original
      description:
        "Donate with confidence—your funds go to trusted organizations, and you'll see the real impact of your contribution",
    },
  ];

  return (
    <section id="process" className="py-16   bg-white">
      <Padding className="  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-8">
            <h2 className="font-polysans text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-[500] text-gray-900 mb-2 md:mb-3 leading-tight">
              Our Process
            </h2>
            <p className="font-overused-grotesk text-base md:text-lg md:max-w-[450px] text-gray-600 leading-relaxed">
              A simple, transparent process that connects your donations to
              verified NGOs — ensuring every rupee creates real, measurable
              change.
            </p>
          </div>

          {/* Right Column - Process Steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                {...step}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </Padding>
    </section>
  );
};

export default OurProcess;
