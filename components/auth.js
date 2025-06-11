"use client";
import React, { useState, useEffect, useRef } from "react";
import { Phone, RefreshCw, ArrowLeft, Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/userContext";

// Import individual API functions
import sendOTPApi from "@/apis/user/SendOTPApi"; // Adjust path based on your project structure
import verifyOTPApi from "@/apis/user/verifyOTPApi"; // Adjust path based on your project structure
import resendOTPApi from "@/apis/user/resendOTPApi"; // Adjust path based on your project structure

const countries = [
  { code: "+1", name: "US" },
  { code: "+91", name: "IN" },
  { code: "+44", name: "UK" },
  { code: "+86", name: "CN" },
  { code: "+49", name: "DE" },
  { code: "+33", name: "FR" },
  { code: "+81", name: "JP" },
  { code: "+82", name: "KR" },
  { code: "+61", name: "AU" },
  { code: "+55", name: "BR" },
];

const OTPInput = ({ value, onChange, onComplete, hasError }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(value.split("").concat(Array(6).fill("")).slice(0, 6));
  }, [value]);

  const handleChange = (index, digit) => {
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange(otpString);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6);

    if (digits.length > 0) {
      const newOtp = digits.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      onChange(digits.padEnd(6, ""));

      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-lg border rounded-lg focus:ring-0 outline-none transition-colors font-overused-grotesk
            ${
              hasError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-blue-600"
            }`}
        />
      ))}
    </div>
  );
};

const SignupForm = ({ onClose }) => {
  const { dispatch } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phoneNumber: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [countrySearchTerm, setCountrySearchTerm] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Name can only contain letters and spaces";
    }
    return null;
  };

  const validatePhoneNumber = (phone) => {
    if (!phone.trim()) {
      return "Phone number is required";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }
    if (cleanPhone.length > 15) {
      return "Phone number cannot exceed 15 digits";
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const cleanValue = value.replace(/[^\d\s\-\(\)]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: cleanValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) errors.phoneNumber = phoneError;

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errorMsg) => toast.error(errorMsg));
      return false;
    }
    return true;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const fullPhoneNumber =
        formData.countryCode + formData.phoneNumber.replace(/\D/g, "");

      // Call the imported sendOTPApi function
      const data = await sendOTPApi(formData.name.trim(), fullPhoneNumber);

      toast.success("Verification code sent successfully!");
      setStep(2);
      setTimer(600);
      setFormData((prev) => ({ ...prev, phoneNumber: fullPhoneNumber }));
    } catch (error) {
      console.error("Send OTP Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to send verification code";
      toast.error(errorMessage);
      if (error.response?.data?.error?.includes("already exists")) {
        setFieldErrors((prev) => ({
          ...prev,
          phoneNumber: "This phone number is already registered",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length !== 6 || !/^\d{6}$/.test(formData.otp)) {
      setFieldErrors((prev) => ({ ...prev, otp: true }));
      toast.error(
        "Please enter a complete and valid 6-digit verification code"
      );
      return;
    }
    setFieldErrors((prev) => ({ ...prev, otp: false }));

    setLoading(true);

    try {
      // Call the imported verifyOTPApi function
      const data = await verifyOTPApi(formData.phoneNumber, formData.otp);

      dispatch({ type: "SET_USER", payload: data.user });
      toast.success("Account created successfully! Welcome aboard!");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setTimeout(() => {
        setFormData({
          name: "",
          countryCode: "+91",
          phoneNumber: "",
          otp: "",
        });
        setStep(1);
        setTimer(0);
        setAttemptsLeft(5);
        setFieldErrors({});
      }, 2000);
    } catch (error) {
      console.error("Verify OTP Error:", error);
      const errorMessage =
        error.response?.data?.error || "Invalid verification code";
      toast.error(errorMessage);

      if (error.response?.data?.attemptsLeft !== undefined) {
        setAttemptsLeft(error.response.data.attemptsLeft);
        if (error.response.data.attemptsLeft === 0) {
          toast.error("Too many failed attempts. Please request a new code.");
          setTimeout(() => {
            setStep(1);
            setFormData((prev) => ({ ...prev, otp: "" }));
          }, 2000);
        }
      }
      setFieldErrors((prev) => ({ ...prev, otp: true }));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);

    try {
      // Call the imported resendOTPApi function
      const data = await resendOTPApi(formData.phoneNumber);

      toast.success("New verification code sent!");
      setTimer(600);
      setAttemptsLeft(5);
      setFormData((prev) => ({ ...prev, otp: "" }));
    } catch (error) {
      console.error("Resend OTP Error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to resend verification code";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goBackToPhoneInput = () => {
    setStep(1);
    setFieldErrors({});
    setFormData((prev) => ({
      ...prev,
      otp: "",
      // Ensure phoneNumber is reset correctly if the country code was prefixed for API call
      phoneNumber: formData.phoneNumber.startsWith(formData.countryCode)
        ? formData.phoneNumber.substring(formData.countryCode.length)
        : prev.phoneNumber, // Keep original if country code wasn't part of it
    }));
    setTimer(0);
  };

  const selectedCountry = countries.find(
    (c) => c.code === formData.countryCode
  );

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen fixed top-0 w-screen h-screen z-[40] bg-gray-50/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md p-8 relative">
        <div
          onClick={onClose}
          className=" cursor-pointer rotate-45 absolute top-4 right-4 "
        >
          <Plus />
        </div>
        {/* Step 1: Sign Up */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-medium text-gray-900 font-polysans">
                Create your account
              </h1>
              <p className="text-gray-600 text-base font-overused-grotesk">
                Enter your details below to create your account
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2 focus:outline-none active:outline-none rounded-lg outline-none transition-colors font-overused-grotesk ${
                    fieldErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "active:border-blue-600 selection:border-blue-600 focus:border-blue-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 font-overused-grotesk">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <DropdownMenu
                    open={showCountryDropdown}
                    onOpenChange={setShowCountryDropdown}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg hover:border-gray-300 outline-none transition-colors bg-white min-w-[85px] font-overused-grotesk
                          ${
                            fieldErrors.phoneNumber
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-blue-600"
                          }`}
                      >
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{selectedCountry?.code}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-48 overflow-y-auto font-overused-grotesk">
                      <div className="relative p-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          placeholder="Search country"
                          className="pl-10 font-overused-grotesk"
                          value={countrySearchTerm}
                          onChange={(e) => setCountrySearchTerm(e.target.value)}
                        />
                      </div>
                      {filteredCountries.map((country) => (
                        <DropdownMenuItem
                          key={country.code}
                          onSelect={() => {
                            setFormData((prev) => ({
                              ...prev,
                              countryCode: country.code,
                            }));
                            setShowCountryDropdown(false);
                            setCountrySearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 font-overused-grotesk"
                        >
                          <span className="text-sm">{country.code}</span>
                          <span className="text-sm text-gray-500">
                            {country.name}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-0 outline-none transition-colors font-overused-grotesk ${
                      fieldErrors.phoneNumber
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-600"
                    }`}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 font-overused-grotesk"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Sending code...
                </>
              ) : (
                "Send verification code"
              )}
            </Button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-medium text-gray-900 font-polysans">
                Verify your phone
              </h1>
              <p className="text-gray-600 text-base font-overused-grotesk">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-gray-800">
                  {/* Display the full phone number consistently */}
                  {formData.phoneNumber}
                </span>
                .{" "}
                <button className="font-medium text-black text-sm focus:outline-none font-overused-grotesk">
                  Wrong number?
                  <span
                    onClick={goBackToPhoneInput}
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    {" "}
                    Change number
                  </span>
                </button>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3 text-center font-overused-grotesk">
                  Verification Code
                </label>
                <OTPInput
                  value={formData.otp}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, otp: value }))
                  }
                  hasError={fieldErrors.otp}
                />
              </div>

              {timer > 0 && (
                <p className="text-center text-sm text-gray-600 font-overused-grotesk">
                  Code expires in {formatTime(timer)}
                </p>
              )}

              {attemptsLeft < 5 && (
                <p className="text-center text-sm text-orange-600 font-overused-grotesk">
                  {attemptsLeft} attempts remaining
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleVerifyOTP}
                disabled={loading || formData.otp.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 font-overused-grotesk"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify code"
                )}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4 font-overused-grotesk">
                Didn't receive the OTP?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={loading || timer > 540} // Example: allow resend after 1 minute (600 - 540 = 60 seconds)
                  className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium focus:outline-none disabled:text-blue-300 font-overused-grotesk"
                >
                  Resend now
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center font-overused-grotesk">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
