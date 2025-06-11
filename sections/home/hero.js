"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Padding from "@/components/padding";

const Hero = () => {
  return (
    <section className="relative py-28 md:h-screen w-full overflow-hidden">
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
      <Padding className="relative h-full flex flex-col justify-center items-start max-w-[1900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#fbfb4c] font-overused-grotesk font-medium text-black px-3 sm:px-4 py-1 rounded-full w-fit mb-4 sm:mb-6 text-sm sm:text-base"
        >
          100% Transparent Donations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[2rem] leading-tight font-polysans md:text-[3rem] xl:text-[4rem] 2xl:text-[4.25rem] md:max-w-[30rem] lg:max-w-[40rem] xl:max-w-[50rem] font-[500] text-white mb-2 sm:mb-6"
        >
          Track Every Penny Make Every
          <span className="text-[#fbfb4c]"> Donation Count</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base font-overused-grotesk sm:text-lg md:max-w-[35rem] xl:max-w-[35rem] text-white max-w-2xl mb-12 sm:mb-14 pb-3 "
        >
          At nyce club, we ensure that 100% of your donation reaches those who
          need it most, with complete transparency on how your generosity makes
          an impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/ngo"
            className="bg-[#fbfb4c] text-black w-1/2 sm:w-max px-6 sm:px-11 py-3  rounded-full font-overused-grotesk font-medium text-base sm:text-lg hover:scale-105 transition-transform inline-block text-center"
          >
            Explore NGOs
          </Link>
          <Link
            href="/process"
            className="  text-white px-6 sm:px-11 w-1/2 sm:w-max py-3  rounded-full font-overused-grotesk font-medium text-base sm:text-lg hover:scale-105 transition-transform inline-block border border-white/90 text-center"
          >
            Our Process
          </Link>
        </motion.div>
      </Padding>
    </section>
  );
};

export default Hero;
