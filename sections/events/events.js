import React from "react";

const socials = [
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "https://www.linkedin.com/company/nyce-club/",
  },
  {
    name: "Instagram",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      </svg>
    ),
    href: "https://www.instagram.com/nyce.club/",
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
            target="#"
            href="https://chat.whatsapp.com/D4WnE0WL1b7CAAgYn5mZKg"
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
