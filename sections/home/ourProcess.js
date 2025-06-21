// components/OurProcessSection.jsx
import Padding from "@/components/padding";
import ProcessStep from "@/components/processStep";
import Link from "next/link";
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
      title: "You Donate Securely",
      description:
        "Donate with confidence—your funds go to trusted organizations, and you'll see the real impact of your contribution",
    },
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <Padding className="mx-auto">
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
          <div className="relative">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[1.25rem] top-0 h-full w-[1px] bg-[#ECECEC] z-0"></div>

            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Step Number Circle */}
                <div className="flex flex-col items-center mr-6 flex-shrink-0">
                  <div className="w-10 h-10 font-polysans bg-blue-600 text-white rounded-full flex items-center justify-center font-medium text-sm  transition-transform hover:scale-110 z-10">
                    {index + 1}
                  </div>
                </div>

                {/* Process Step Content */}
                <div className="flex-1 pt-1">
                  <ProcessStep
                    {...step}
                    isLast={index === processSteps.length - 1}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex mt-10 md:mt-14 justify-center w-full">
          <Link className=" flex justify-center w-full" href={"/ngos"}>
            <button className="bg-black  cursor-pointer text-white font-overused-grotesk font-medium sm:w-max w-1/2 sm:px-11 py-3 rounded-full text-lg   ">
              Donate Now
            </button>
          </Link>
        </div>
      </Padding>
    </section>
  );
};

export default OurProcess;
