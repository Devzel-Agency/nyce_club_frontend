// components/PrivacyPolicySection.jsx
import Padding from "@/components/padding"; // Assuming this adds horizontal padding only
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  // Define the sections for the Table of Contents
  const policySections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-information", title: "How We Use Your Information" },
    { id: "how-we-share-information", title: "How We Share Your Information" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "changes-to-policy", title: "Changes to This Policy" },
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
          {/* <h3 className="font-polysans text-lg font-medium text-gray-900 mb-6 text-left">
            On this page
          </h3> */}
          <ul className="space-y-4">
            {policySections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  // Increased text size from text-sm to text-base
                  className="font-overused-grotesk text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 block text-left"
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
        <Padding className="max-w-4xl  py-20 lg:py-24 xl:py-28">
          {" "}
          {/* Adjust max-w for better fit within the column */}
          {/* Main Header - now left-aligned */}
          <div className="mb-16">
            <h1 className="font-polysans text-[2rem] md:text-[3rem] lg:text-5xl font-[500] text-gray-900 leading-tight text-left">
              Privacy Policy
            </h1>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mt-4 text-left">
              This Privacy Policy describes how Nyce Club collects, uses, and
              discloses your information when you use our platform.
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
              At Nyce Club, we are committed to protecting your privacy. This
              policy outlines our practices regarding the collection, use, and
              disclosure of your personal information when you visit our website
              or use our services. By using Nyce Club, you agree to the
              collection and use of information in accordance with this policy.
            </p>
          </div>
          <div id="information-we-collect" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Information We Collect
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              We collect several types of information from and about users of
              our platform, including:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                **Personal Information:** Such as your name, email address,
                mailing address, phone number, and payment information when you
                make a donation.
              </li>
              <li>
                **Usage Data:** Information on how the service is accessed and
                used, including your computer's IP address, browser type,
                browser version, the pages of our service that you visit, the
                time and date of your visit, the time spent on those pages,
                unique device identifiers, and other diagnostic data.
              </li>
            </ul>
          </div>
          <div id="how-we-use-information" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              How We Use Your Information
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              Nyce Club uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>To provide and maintain our service.</li>
              <li>To notify you about changes to our service.</li>
              <li>
                To allow you to participate in interactive features of our
                service when you choose to do so.
              </li>
              <li>To provide customer support.</li>
              <li>To monitor the usage of our service.</li>
              <li>To detect, prevent and address technical issues.</li>
              <li>To facilitate donations and ensure transparency.</li>
            </ul>
          </div>
          <div id="how-we-share-information" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              How We Share Your Information
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              We may share your information with third parties in the following
              situations:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                **With NGOs:** When you make a donation, we share necessary
                transaction details with the specific NGO to whom you donate,
                ensuring transparency and accountability.
              </li>
              <li>
                **Service Providers:** We may employ third party companies and
                individuals to facilitate our service ("Service Providers"), to
                provide the service on our behalf, to perform service-related
                services or to assist us in analyzing how our service is used.
              </li>
              <li>
                **For Legal Reasons:** If required to do so by law or in
                response to valid requests by public authorities (e.g., a court
                or a government agency).
              </li>
            </ul>
          </div>
          <div id="data-security" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Data Security
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </div>
          <div id="your-rights" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Your Rights
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                The right to access, update, or delete the information we have
                on you.
              </li>
              <li>The right of rectification.</li>
              <li>The right to object.</li>
              <li>The right of restriction.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent.</li>
            </ul>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mt-4 text-left">
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </div>
          <div id="changes-to-policy" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Changes to This Privacy Policy
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email and/or a prominent notice on our
              service, prior to the change becoming effective and update the
              "effective date" at the top of this Privacy Policy.
            </p>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 text-left">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
          <div id="contact-us" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Contact Us
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              If you have any questions about this Privacy Policy, please
              contact us:
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

export default PrivacyPolicy;
