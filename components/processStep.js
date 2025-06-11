// components/ProcessStep.jsx
import React from "react";

const ProcessStep = ({ icon, iconColor, title, description, isLast }) => {
  const getIcon = (iconType, color) => {
    const iconClasses = `w-6 h-6 ${getIconColor(color)}`;

    switch (iconType) {
      case "verify":
        return (
          <svg
            className={iconClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "audit":
        return (
          <svg
            className={iconClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case "donate":
        return (
          <svg
            className={iconClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case "orange":
        return "text-orange-500";
      case "blue":
        return "text-blue-500";
      case "green":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getBackgroundColor = (color) => {
    switch (color) {
      case "orange":
        return "bg-orange-50";
      case "blue":
        return "bg-blue-50";
      case "green":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="relative bg-[#FAFAFA] border-[#ECECEC] border p-5 rounded-xl max-w-[550px]">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div>
          <div
            className={`flex-shrink-0 w-12 h-12 ${getBackgroundColor(
              iconColor
            )} rounded-full flex items-center justify-center`}
          >
            {getIcon(icon, iconColor)}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-polysans mt-2 text-lg md:text-xl font-[500] text-gray-900 mb-3">
            {title}
          </h3>
          <p className="font-overused-grotesk text-sm md:text-base md:max-w-[400px] text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
