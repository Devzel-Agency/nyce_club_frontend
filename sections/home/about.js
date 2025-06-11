// components/NyceClubSection.jsx
import FeatureCard from "@/components/featureCard";
import Padding from "@/components/padding";
import Link from "next/link";
import React from "react";

const About = () => {
  const features = [
    {
      title: "Verified NGOs",
      description:
        "We carefully verify each NGO to ensure your donations make a real impact.",
      cardTitle:
        "Impact You Can Trust - Every NGO is screened for authenticity.",
    },
    {
      title: "100% Transparency",
      description:
        "Track every rupee of your donation and see the direct change it makes.",
      cardTitle: "See Where Your Money Goes - Complete clarity at every step.",
    },
    {
      title: "Community Impact",
      description:
        "Join a community of donors driving meaningful change together.",
      cardTitle: "Together for Good - Contribute, connect, and create change.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <Padding className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-polysans text-[1.7rem] md:text-[2.5rem] lg:text-5xl font-[500] lg:max-w-[800px] mx-auto text-gray-900 mb-6 leading-tight">
            What is nyce club and how does it change the way we give?
          </h2>
          <p className="font-overused-grotesk  text-base sm:text-lg   text-gray-600 md:max-w-[580px] lg:max-w-3xl mx-auto">
            <span className="font-semibold">nyce club</span> is a growing
            platform that makes every donation traceable, transparent, and
            trustworthy — so you know exactly where your help goes.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center w-full">
          <Link href={"/ngo"}>
            <button className="bg-black text-white font-overused-grotesk font-medium sm:w-max w-1/2 sm:px-11 py-3 rounded-full text-lg   ">
              Explore NGOs
            </button>
          </Link>
        </div>
      </Padding>
    </section>
  );
};

export default About;
