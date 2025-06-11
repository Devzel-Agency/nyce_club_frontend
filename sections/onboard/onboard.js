"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Padding from "@/components/padding";
import SubmitNgoApplicationApi from "@/apis/ngo/SubmitNgoApplicationApi"; // Import the new API function

const Onboard = () => {
  const [formData, setFormData] = useState({
    ngoName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    location: "",
    links: [""],
    description: "",
    reason: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.ngoName.trim()) {
      errors.ngoName = "NGO name is required";
    }

    if (!formData.contactPerson.trim()) {
      errors.contactPerson = "Contact person's name is required";
    } else if (formData.contactPerson.trim().length < 2) {
      errors.contactPerson = "Name must be at least 2 characters";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = "Phone number must be 10-15 digits";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 50) {
      errors.description = "Description must be at least 50 characters";
    }

    if (!formData.reason.trim()) {
      errors.reason = "Reason to join is required";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const errorOrder = [
        "reason",
        "description",
        "location",
        "email",
        "phoneNumber",
        "contactPerson",
        "ngoName",
      ];
      errorOrder
        .filter((field) => errors[field])
        .forEach((field) => toast.error(errors[field]));
      return false;
    }
    return true;
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "links") {
      const newLinks = [...formData.links];
      newLinks[index] = value;
      setFormData((prev) => ({ ...prev, links: newLinks }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const addLinkField = () => {
    if (formData.links.length >= 4) {
      toast.error("Maximum of 4 links allowed");
      return;
    }
    setFormData((prev) => ({ ...prev, links: [...prev.links, ""] }));
  };

  const removeLinkField = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call the new API function here
      await SubmitNgoApplicationApi(formData);

      toast.success("Application submitted successfully!");
      setFormData({
        ngoName: "",
        contactPerson: "",
        phoneNumber: "",
        email: "",
        location: "",
        links: [""],
        description: "",
        reason: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Display the specific error message from the API function
      toast.error(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Padding className="py-10 md:py-20 lg:py-28 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 font-polysans">
              NGO Onboarding Form
            </h1>
            <p className="text-gray-600 text-lg font-overused-grotesk">
              Join the NYCE Club by completing this form
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ngoName"
                  className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
                >
                  NGO Name *
                </label>
                <Input
                  id="ngoName"
                  type="text"
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleInputChange}
                  placeholder="Enter NGO name"
                  className={`w-full transition-all duration-200 ${
                    fieldErrors.ngoName
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-invalid={!!fieldErrors.ngoName}
                  aria-describedby={
                    fieldErrors.ngoName ? "ngoName-error" : undefined
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="contactPerson"
                  className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
                >
                  Contact Person's Name *
                </label>
                <Input
                  id="contactPerson"
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Enter contact person's name"
                  className={`w-full transition-all duration-200 ${
                    fieldErrors.contactPerson
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-invalid={!!fieldErrors.contactPerson}
                  aria-describedby={
                    fieldErrors.contactPerson
                      ? "contactPerson-error"
                      : undefined
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
                >
                  Phone Number *
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter 10-15 digit phone number"
                  className={`w-full transition-all duration-200 ${
                    fieldErrors.phoneNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-invalid={!!fieldErrors.phoneNumber}
                  aria-describedby={
                    fieldErrors.phoneNumber ? "phoneNumber-error" : undefined
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email (optional)"
                  className={`w-full transition-all duration-200 ${
                    fieldErrors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
                >
                  Location *
                </label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter NGO location"
                  className={`w-full transition-all duration-200 ${
                    fieldErrors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  aria-invalid={!!fieldErrors.location}
                  aria-describedby={
                    fieldErrors.location ? "location-error" : undefined
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk">
                  Website / Social Handles
                </label>
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      type="text"
                      name="links"
                      value={link}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter website or social media link"
                      className="w-full transition-all duration-200 focus:ring-blue-500"
                    />
                    {formData.links.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeLinkField(index)}
                        className="shrink-0"
                        aria-label="Remove link"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLinkField}
                  className="mt-2 bg-blue-50 hover:bg-blue-100 text-blue-600"
                  disabled={formData.links.length >= 4}
                >
                  Add Another Link
                </Button>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
              >
                Brief Description of NGO and Cause *
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your NGO and its mission (minimum 50 characters)"
                rows={4}
                className={`w-full transition-all duration-200 ${
                  fieldErrors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                aria-invalid={!!fieldErrors.description}
                aria-describedby={
                  fieldErrors.description ? "description-error" : undefined
                }
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk"
              >
                Reason to join NYCE Club *
              </label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Why do you want to join NYCE Club?"
                rows={3}
                className={`w-full transition-all duration-200 ${
                  fieldErrors.reason
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                aria-invalid={!!fieldErrors.reason}
                aria-describedby={
                  fieldErrors.reason ? "reason-error" : undefined
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 font-overused-grotesk"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center font-overused-grotesk">
              We'll review your application and get back to you within 5-7
              business days
            </p>
          </div>
        </div>
      </div>
    </Padding>
  );
};

export default Onboard;
