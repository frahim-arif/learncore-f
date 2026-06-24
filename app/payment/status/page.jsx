"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!orderId) {
          setStatus({
            paymentSuccess: false,
            message: "Order ID not found",
          });
          return;
        }

        const res = await fetch(
          `${API_URL}/api/payment/status/${orderId}`
        );

        const data = await res.json();
        setStatus(data);

        if (data.paymentSuccess) {
          setTimeout(() => {
            router.push("/my-courses");
          }, 2000);
        }
      } catch (error) {
        setStatus({
          paymentSuccess: false,
          message: "Payment status check failed",
        });
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold">Payment checking...</h1>
      </div>
    );
  }

  if (status?.paymentSuccess) {
    return (
      <div className="card text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful ✅
        </h1>

        <p className="mt-3">Redirecting to My Courses...</p>

        <p className="mt-2 text-sm text-gray-500">
          Order ID: {orderId}
        </p>

        <Link
          href="/my-courses"
          className="mt-6 inline-block bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Go Now
        </Link>
      </div>
    );
  }

  return (
    <div className="card text-center">
      <h1 className="text-3xl font-bold text-red-600">
        Payment Not Completed
      </h1>

      <p className="mt-3">
        {status?.message || "Payment failed or pending"}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Order ID: {orderId}
      </p>

      <Link
        href="/courses"
        className="mt-6 inline-block bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        Back to Courses
      </Link>
    </div>
  );
}