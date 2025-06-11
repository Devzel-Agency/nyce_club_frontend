// components/RefundPolicySection.jsx
import Padding from "@/components/padding"; // Assuming this adds horizontal padding only
import Link from "next/link";
import React from "react";

const RefundPolicy = () => {
  // Define the sections for the Table of Contents
  const policySections = [
    { id: "introduction", title: "Introduction" },
    { id: "no-refund-policy", title: "No Refund Policy" },
    { id: "exceptional-circumstances", title: "Exceptional Circumstances" },
    { id: "contact-us", title: "Contact Us" },
  ];

  // IMPORTANT: Replace '80px' with the actual height of your site's main top navigation bar.
  // This ensures the sidebar starts below it and content isn't hidden when jumping.
  const TOP_NAVBAR_HEIGHT = "124px"; // Example: corresponds to Tailwind's h-20 (5rem)

  return (
    <div className="flex bg-white min-h-screen">
      {" "}
      {/* Use flex on the outer container */}
      {/* Left Fixed Navigation (Sidebar) */}
      <aside
        className="sticky hidden md:block top-0 left-0 w-64 h-screen overflow-y-auto bg-gray-50 border-r border-gray-200 py-8 z-40"
        style={{ paddingTop: TOP_NAVBAR_HEIGHT }} // Adjust padding to start below existing top navbar
      >
        {/* Use Padding component for consistent horizontal spacing inside the sidebar */}
        <Padding>
          <ul className="space-y-4">
            {policySections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  className="font-overused-grotesk text-base text-gray-600 hover:text-gray-900 hover:font-medium transition-colors duration-200 block text-left"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </Padding>
      </aside>
      {/* Main Content Area */}
      {/* The main content area starts after the fixed sidebar */}
      <main className="flex-1 overflow-y-auto">
        {/* Padding component to manage internal horizontal spacing and vertical padding */}
        <Padding className="max-w-4xl py-20 lg:py-24 xl:py-28">
          {" "}
          {/* Adjust max-w for better fit within the column */}
          {/* Main Header - now left-aligned */}
          <div className="mb-16">
            <h1 className="font-polysans text-[2rem] md:text-[3rem] lg:text-5xl font-[500] text-gray-900 leading-tight text-left">
              Refund Policy
            </h1>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mt-4 text-left">
              This Refund Policy outlines our stance on refunds for donations
              made through the Nyce Club platform.
            </p>
          </div>
          {/* Policy Content Sections */}
          {/* Each section now has an 'id' and 'scroll-mt-X' to account for sticky top navbar */}
          <div id="introduction" className="mb-12 scroll-mt-[80px]">
            {" "}
            {/* Adjust scroll-mt value to match TOP_NAVBAR_HEIGHT */}
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Introduction
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              At Nyce Club, we facilitate direct donations to various
              Non-Governmental Organizations (NGOs). Our refund policy reflects
              the nature of these transactions.
            </p>
          </div>
          <div id="no-refund-policy" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              No Refund Policy
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              As donations made through the Nyce Club platform are direct
              contributions to the chosen NGOs, and are processed immediately,
              we generally do not offer refunds. Once a donation is successfully
              processed, the funds are transferred to the designated NGO, and we
              are unable to retrieve them.
            </p>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              We encourage all users to carefully review their donation amount
              and the chosen NGO before confirming a transaction.
            </p>
          </div>
          <div
            id="exceptional-circumstances"
            className="mb-12 scroll-mt-[80px]"
          >
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Exceptional Circumstances
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              In rare and exceptional circumstances, such as a clear technical
              error on our part that resulted in an unintended donation, we may
              consider a refund on a case-by-case basis. Such requests must be
              submitted within 24 hours of the transaction and will require
              thorough verification.
            </p>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              To request consideration under exceptional circumstances, please
              contact us immediately with details of the transaction and the
              reason for your request.
            </p>
          </div>
          <div id="contact-us" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Contact Us
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              If you have any questions about this Refund Policy, please contact
              us:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                By email:{" "}
                <Link
                  href="mailto:support@nyceclub.com"
                  className="text-blue-600 hover:underline"
                >
                  support@nyceclub.com
                </Link>
              </li>
              <li>
                By visiting this page on our website:{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  nyceclub.com/contact
                </Link>
              </li>
            </ul>
          </div>
        </Padding>
      </main>
    </div>
  );
};

export default RefundPolicy;
