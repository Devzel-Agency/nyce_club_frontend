"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const causes = [
  { label: "Women Empowerment", value: "women" },
  { label: "Child Welfare", value: "child" },
  { label: "Education", value: "education" },
  { label: "Animal Rescue", value: "animal" },
  { label: "Environmental Action", value: "env" },
];

const trishul = {
  id: "trishul",
  name: "Trishul NGO",
  img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
  desc: "Trishul NGO is dedicated to empowering women and marginalized communities in India, providing skill development, education, and resources to drive positive social change.",
  supportedCauses: ["women"],
};

export default function Ngos() {
  const [selectedCause, setSelectedCause] = useState("women");

  // In a real app, this would filter NGOs fetched from backend
  const ngosToDisplay =
    selectedCause === "women"
      ? [
          {
            ...trishul,
            tags: ["Women Empowerment"],
          },
        ]
      : [];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-4xl mx-auto px-2 pb-16 pt-32">
        <h1 className="text-3xl md:text-4xl text-gray-900 py-8 font-polysans font-medium text-center">
          Explore NGOs
        </h1>
        {/* Cause Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {causes.map((cause) => {
            const isActive = selectedCause === cause.value;
            return (
              <button
                key={cause.value}
                disabled={cause.value !== "women"}
                className={`px-5 py-2 rounded-full font-bold border transition-all font-overused-grotesk
                  ${
                    isActive
                      ? "bg-[#FBFB4C] text-gray-900 border-[#FBFB4C]"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-[#FBFB4C70] hover:text-gray-900"
                  }
                  ${
                    cause.value !== "women"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }
                `}
                onClick={() => setSelectedCause(cause.value)}
              >
                {cause.label}
                {isActive && (
                  <Check className="inline ml-2 w-5 h-5 text-gray-900" />
                )}
              </button>
            );
          })}
        </div>
        <div>
          {ngosToDisplay.length === 0 ? (
            <div className="text-gray-400 mt-8 text-center font-medium font-overused-grotesk">
              No NGOs available for this cause yet. Stay tuned!
            </div>
          ) : (
            ngosToDisplay.map((ngo, idx) => (
              <Link
                href={`/ngo/${ngo.id}`}
                key={ngo.name}
                className="w-full flex flex-col md:flex-row gap-6 items-center bg-gray-50 rounded-lg p-6 mb-10 border border-gray-100 animate-fade-in  "
              >
                <img
                  src={ngo.img}
                  alt="Featured NGO"
                  className="w-32 h-32 rounded-md object-cover border-2 border-[#FBFB4C] "
                />
                <div>
                  <h2 className="text-xl text-gray-900 mb-2 font-polysans font-medium">
                    {ngo.name}
                  </h2>
                  <div className="text-gray-700 mb-3 font-overused-grotesk">
                    {ngo.desc}
                  </div>
                  <div className="flex gap-2">
                    {ngo.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#FBFB4C] text-gray-900 text-sm rounded-full font-bold font-overused-grotesk"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href="#"
            className="bg-[#FBFB4C] text-gray-900 px-8 py-3 font-bold rounded-full  font-overused-grotesk transition-transform text-lg"
          >
            Support a Cause That Matters to You
          </Link>
        </div>
      </main>
    </div>
  );
}
