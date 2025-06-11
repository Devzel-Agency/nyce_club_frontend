// components/TermsAndConditionsSection.jsx
import Padding from "@/components/padding"; // Assuming this adds horizontal padding only
import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  // Define the sections for the Table of Contents
  const policySections = [
    { id: "introduction", title: "Introduction" },
    { id: "acceptance-of-terms", title: "Acceptance of Terms" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "donations-and-payments", title: "Donations and Payments" },
    { id: "prohibited-uses", title: "Prohibited Uses" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "disclaimer-of-warranties", title: "Disclaimer of Warranties" },
    { id: "limitation-of-liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes-to-terms", title: "Changes to Terms" },
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
        <Padding className="max-w-4xl py-20 lg:py-24 xl:py-28">
          {" "}
          {/* Adjust max-w for better fit within the column */}
          {/* Main Header - now left-aligned */}
          <div className="mb-16">
            <h1 className="font-polysans text-[2rem] md:text-[3rem] lg:text-5xl font-[500] text-gray-900 leading-tight text-left">
              Terms and Conditions
            </h1>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mt-4 text-left">
              Welcome to Nyce Club. These Terms and Conditions govern your use
              of our platform.
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
              These Terms and Conditions ("Terms") govern your access to and use
              of the Nyce Club website and services (collectively, the
              "Service") provided by Nyce Club ("us", "we", or "our"). Please
              read these Terms carefully before using our Service.
            </p>
          </div>
          <div id="acceptance-of-terms" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Acceptance of Terms
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>
          </div>
          <div id="user-accounts" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              User Accounts
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service.
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                You are responsible for safeguarding the password that you use
                to access the Service.
              </li>
              <li>
                You agree not to disclose your password to any third party.
              </li>
              <li>
                You must notify us immediately upon becoming aware of any breach
                of security or unauthorized use of your account.
              </li>
            </ul>
          </div>
          <div id="donations-and-payments" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Donations and Payments
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              Nyce Club facilitates donations to various Non-Governmental
              Organizations (NGOs).
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>All donations are made voluntarily by you.</li>
              <li>
                We use third-party payment processors to handle transactions.
                Your payment information is subject to the privacy policies and
                terms of these third-party processors.
              </li>
              <li>
                We are not responsible for any issues arising from your
                transaction with these third-party payment processors.
              </li>
            </ul>
          </div>
          <div id="prohibited-uses" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Prohibited Uses
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              You may use the Service only for lawful purposes and in accordance
              with the Terms. You agree not to use the Service:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                In any way that violates any applicable national or
                international law or regulation.
              </li>
              <li>
                For the purpose of exploiting, harming, or attempting to exploit
                or harm minors in any way by exposing them to inappropriate
                content or otherwise.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material without our prior written consent.
              </li>
              <li>
                To impersonate or attempt to impersonate Nyce Club, a Nyce Club
                employee, another user, or any other person or entity.
              </li>
            </ul>
          </div>
          <div id="intellectual-property" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Intellectual Property
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Nyce Club and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of both the India and foreign countries.
            </p>
          </div>
          <div id="disclaimer-of-warranties" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Disclaimer of Warranties
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              Your use of the Service is at your sole risk. The Service is
              provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
              provided without warranties of any kind, whether express or
              implied, including, but not limited to, implied warranties of
              merchantability, fitness for a particular purpose,
              non-infringement or course of performance.
            </p>
          </div>
          <div id="limitation-of-liability" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Limitation of Liability
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              In no event shall Nyce Club, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside font-overused-grotesk text-base sm:text-lg text-gray-600 space-y-2 text-left">
              <li>
                your access to or use of or inability to access or use the
                Service;
              </li>
              <li>any conduct or content of any third party on the Service;</li>
              <li>any content obtained from the Service; and</li>
              <li>
                unauthorized access, use or alteration of your transmissions or
                content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage.
              </li>
            </ul>
          </div>
          <div id="governing-law" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Governing Law
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              These Terms shall be governed and construed in accordance with the
              laws of India, without regard to its conflict of law provisions.
            </p>
          </div>
          <div id="changes-to-terms" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Changes to This Terms and Conditions
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 text-left">
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use the Service.
            </p>
          </div>
          <div id="contact-us" className="mb-12 scroll-mt-[80px]">
            <h2 className="font-polysans text-2xl md:text-3xl font-[500] text-gray-900 mb-4 text-left">
              Contact Us
            </h2>
            <p className="font-overused-grotesk text-base sm:text-lg text-gray-600 mb-4 text-left">
              If you have any questions about these Terms and Conditions, please
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

export default TermsAndConditions;
