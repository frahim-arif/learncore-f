"use client";

import { COURSES } from "../../Data/courses";
import { useParams } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CourseDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const course = COURSES.find((c) => c.id === params.id);

  if (!course) {
    return (
      <div className="card">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  const handleBuyNow = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: course.price,
          courseId: course.id,
          userEmail: "test@gmail.com",
          userPhone: "9058596626",
        }),
      });

      const data = await res.json();

      console.log("Payment Response:", data);

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(data.message || "Payment start nahi hua");
      }
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment error: backend ya API URL check karo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold">{course.title}</h1>

        <p className="text-gray-600 mt-3">{course.desc}</p>

        <p className="mt-5">{course.details}</p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Course Duration</p>
            <p className="font-bold">{course.hours} Hours</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Course Price</p>
            <p className="text-2xl font-bold">₹{course.price}</p>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="mt-8 w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}