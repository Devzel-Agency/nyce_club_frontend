"use client";
import React, { useState, useEffect } from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const RazorpayButton = ({
  ngoId,
  amount = 5000,
  name = "",
  phoneNumber = "",
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setScriptLoaded(loaded);
    });
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/payment/create-payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            ngo_id: "123456",
            ngo_name: "Trisshull",
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      const { order } = data;

      if (!order) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: "rzp_test_d0Aorjn5wTfIHC", // Use env variable in production
        amount: order.amount,
        currency: "INR",
        name: "Your NGO Name",
        description: "Donation",
        image: "https://your-logo-url.com",
        order_id: order.id,
        handler: function (response) {
          alert(
            "Payment successful. Payment ID: " + response.razorpay_payment_id
          );
          // Optionally POST to backend to confirm payment success
        },
        prefill: {
          name: name || undefined,
          contact: phoneNumber || undefined,
        },
        readonly: {
          contact: false,
        },
        theme: {
          color: "#1e1e2f",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!scriptLoaded}
      className="w-full rzp-button bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold transition-colors font-overused-grotesk"
    >
      Sponsor Now
    </button>
  );
};

export default RazorpayButton;
