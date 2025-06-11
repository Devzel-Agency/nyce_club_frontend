import React from "react";

const socials = [
  {
    name: "Twitter",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-2.509 0-4.543-2.033-4.543-4.541s2.034-4.541 4.543-4.541 4.541 2.033 4.541 4.541-2.032 4.541-4.541 4.541zm7.119 0c-2.509 0-4.541-2.033-4.541-4.541s2.032-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.032 4.541-4.541 4.541z" />
      </svg>
    ),
    href: "#",
  },
];

export default function Events() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-14 flex flex-col items-center pt-28 lg:pt-28">
        <h1 className="text-3xl md:text-4xl  text-gray-900 mb-6 font-polysans font-medium text-center">
          Events Coming Soon
        </h1>

        <div className="  rounded-xl pt-0 p-6 mb-8 w-full max-w32xl ">
          <p className="text-lg md:text-xl text-gray-700 text-center font-overused-grotesk leading-relaxed">
            We're building a vibrant community of{" "}
            <span className="inline-block">
              <span className="font-semibold">nyce people</span>
            </span>{" "}
            — those who care, contribute, and celebrate impact. Stay tuned for
            events, drives, meet-ups, and more.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <a
            href="#"
            className="bg-[#FBFB4C] text-gray-900 px-8 py-3 font-[500] rounded-full font-polysans text-lg w-full max-w-[16rem] text-center transition-colors"
          >
            Join the Community
          </a>

          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="font-medium text-gray-600 font-overused-grotesk">
              Follow us for updates:
            </span>
            <div className="flex gap-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center "
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
