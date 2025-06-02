
import { Check, Search, FileSearch } from "lucide-react";

const steps = [
  {
    title: "We verify NGOs",
    description: "Every NGO is thoroughly checked for credibility, legal status, and impact by our team before joining the platform.",
    icon: <Search size={34} className="text-blue-500 bg-blue-100 rounded-full p-1" />
  },
  {
    title: "We audit them",
    description: "We regularly audit all listed NGOs to ensure their work remains transparent and aligned with their mission.",
    icon: <FileSearch size={34} className="text-orange-500 bg-orange-100 rounded-full p-1" />
  },
  {
    title: "You donate securely",
    description: "Donate with confidence knowing your funds reach trusted organizations and you can see the impact you make.",
    icon: <Check size={34} className="text-green-600 bg-green-100 rounded-full p-1" />
  },
];

export function ProcessSteps() {
  return (
    <section id="process" className="w-full py-14 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 font-montserrat text-gray-900">
        Our Process
      </h2>
      <ol className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-10 md:gap-8 w-full max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <li
            key={i}
            className={`flex-1 flex flex-col items-center text-center relative animate-fade-in`}
          >
            <div className="relative mb-4 flex flex-col items-center">
              <span
                className={`
                  flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg border-2 border-accent
                  ${i === 2 ? "scale-110 shadow-2xl" : ""}
                `}
                aria-label={step.title}
              >
                {step.icon}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-1 bg-accent rounded"></div>
                </span>
              )}
            </div>
            <div
              className={`
                rounded-xl px-6 py-6 bg-gray-50 shadow-md border border-gray-100 flex flex-col items-center min-h-[110px]
                hover:bg-accent/20 transition-colors
                ${i === 2 ? "bg-green-50 border-green-200 shadow-lg" : ""}
              `}
            >
              <span className="font-bold text-lg md:text-xl text-gray-900 mb-1">{step.title}</span>
              <span className="text-gray-600 text-base">{step.description}</span>
            </div>
          </li>
        ))}
      </ol>
      <a
        href="#process"
        className="mt-10 bg-accent text-gray-900 px-7 py-3 rounded-full font-bold shadow-md hover-scale font-montserrat text-lg transition-transform"
      >
        See How It Works
      </a>
    </section>
  );
}

