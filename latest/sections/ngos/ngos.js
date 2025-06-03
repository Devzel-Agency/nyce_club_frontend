// sections/ngos/ngos.js
"use client";
import Link from "next/link";

export default function Ngos({ ngos }) {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-4xl mx-auto px-2 pb-16 pt-32">
        <h1 className="text-3xl md:text-4xl text-gray-900 py-8 font-polysans font-medium text-center">
          Explore NGOs
        </h1>
        <div>
          {ngos.length === 0 ? (
            <div className="text-gray-400 mt-8 text-center font-medium font-overused-grotesk">
              No NGOs available yet. Stay tuned!
            </div>
          ) : (
            ngos.map((ngo) => (
              <Link
                href={`/ngos/${ngo._id}`}
                key={ngo._id}
                className="w-full flex flex-col md:flex-row gap-6 items-center bg-gray-50 rounded-lg p-6 mb-10 border border-gray-100 animate-fade-in"
              >
                <img
                  src={
                    `${
                      "http://localhost:8000/upload/" + ngo.ngoImages[0]?.file
                    }` || "https://via.placeholder.com/150"
                  }
                  alt={ngo.ngoName}
                  className="w-32 h-32 rounded-md object-cover border-2 border-[#FBFB4C]"
                />
                <div>
                  <h2 className="text-xl text-gray-900 mb-2 font-polysans font-medium">
                    {ngo.ngoName}
                  </h2>
                  <div className="text-gray-700 mb-3 font-overused-grotesk">
                    {ngo.ngoDescription}
                  </div>
                  <div className="flex gap-2">
                    {ngo.ngoTags.map((tag) => (
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
            className="bg-[#FBFB4C] text-gray-900 px-8 py-3 font-bold rounded-full font-overused-grotesk transition-transform text-lg"
          >
            Support a Cause That Matters to You
          </Link>
        </div>
      </main>
    </div>
  );
}
