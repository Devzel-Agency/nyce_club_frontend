import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function NGOPages() {
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
      <Navbar />
      <main className="max-w-4xl mx-auto px-2 pb-16 pt-32">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 py-8 font-montserrat text-center">
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
                className={`px-5 py-2 rounded-full font-bold border transition-all shadow-sm font-montserrat
                  ${
                    isActive
                      ? "bg-accent text-gray-900 border-accent"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-accent/70 hover:text-gray-900"
                  }
                  ${cause.value !== "women" ? "opacity-60 cursor-not-allowed" : ""}
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
            <div className="text-gray-400 mt-8 text-center font-medium">
              No NGOs available for this cause yet. Stay tuned!
            </div>
          ) : (
            ngosToDisplay.map((ngo, idx) => (
              <Link
                to={`/ngo/${ngo.id}`}
                key={ngo.name}
                className="w-full flex flex-col md:flex-row gap-6 items-center bg-gray-50 rounded-lg shadow-sm p-6 mb-10 border border-gray-100 animate-fade-in hover:shadow-md transition-shadow"
              >
                <img
                  src={ngo.img}
                  alt="Featured NGO"
                  className="w-32 h-32 rounded-md object-cover border-2 border-accent shadow"
                />
                <div>
                  <h2 className="font-bold text-xl text-gray-900 mb-2 font-montserrat">
                    {ngo.name}
                  </h2>
                  <div className="text-gray-700 mb-3">{ngo.desc}</div>
                  <div className="flex gap-2">
                    {ngo.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent text-gray-900 text-sm rounded-full font-bold font-montserrat"
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
          <a
            href="#"
            className="bg-accent text-gray-900 px-8 py-3 font-bold rounded-full shadow-lg font-montserrat hover:scale-105 transition-transform text-lg"
          >
            Support a Cause That Matters to You
          </a>
        </div>
      </main>
    </div>
  );
}
