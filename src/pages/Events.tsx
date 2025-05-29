import { Navbar } from "@/components/Navbar";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 26 26">
        <rect width="26" height="26" rx="6" fill="#fbfb4c"/>
        <path d="M13 7.8a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4zm0 8.6A3.4 3.4 0 1113 9a3.4 3.4 0 010 6.8zm6.5-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM21 9.14V16.86a4.14 4.14 0 01-4.14 4.14H9.14A4.14 4.14 0 015 16.86V9.14A4.14 4.14 0 019.14 5h7.72A4.14 4.14 0 0121 9.14z" fill="#222"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 26 26">
        <rect width="26" height="26" rx="6" fill="#fbfb4c"/>
        <path d="M21 8.02a7.84 7.84 0 01-2.21.61A3.86 3.86 0 0020.43 6.2a7.73 7.73 0 01-2.44.93A3.86 3.86 0 0012.64 6c-2.13 0-3.86 1.74-3.86 3.86 0 .3.03.6.09.89A10.9 10.9 0 015.47 6.85a3.86 3.86 0 001.19 5.15 3.83 3.83 0 01-1.75-.48v.05c0 1.91 1.36 3.5 3.17 3.86a3.9 3.9 0 01-1.74.07c.49 1.53 1.9 2.63 3.57 2.66a7.74 7.74 0 01-4.79 1.65A7.8 7.8 0 015 19.5a10.9 10.9 0 005.91 1.73c7.09 0 10.98-5.88 10.98-10.98 0-.17 0-.33-.01-.5A7.9 7.9 0 0021 8.02z" fill="#222"/>
      </svg>
    ),
  },
];

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-3 py-14 flex flex-col items-center pt-32">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 font-montserrat text-center">
          Events Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-7 text-center">
          We're building a vibrant community of <span><span className="text-[#00afef]">nyce</span><span className="text-[#f63ee9]"> people</span></span> — those who care, contribute, and celebrate impact. 
          Stay tuned for events, drives, meet-ups, and more.
        </p>
        <a
          href="#"
          className="bg-accent text-gray-900 px-8 py-3 font-bold rounded-full shadow-lg font-montserrat hover:scale-105 transition-transform text-lg mb-6"
        >
          Join the Community
        </a>
        <div className="flex flex-col items-center gap-3 mt-2">
          <span className="font-semibold text-md text-gray-600">Follow us for updates:</span>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                href={social.href}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
