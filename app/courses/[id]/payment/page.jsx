
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CoursePaymentPage() {
  const params = useParams();
  const router = useRouter();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${API_URL}/api/student/payment/courses/${params.id}/payment-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 401) {
          localStorage.removeItem("studentToken");
          router.push("/login");
          return;
        }

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Payment information load nahi hui");
        }

        const info = data.paymentInfo || data;
        setPaymentInfo({
          ...info,
          course: info.course || data.course || {},
        });
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPaymentInfo();
  }, [params.id, router]);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.upiId);
      setSuccess("UPI ID copied successfully!");
    } catch {
      setError("UPI ID copy nahi hui. Manually copy karein.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!transactionId.trim()) {
      setError("Transaction ID / UTR enter karein.");
      return;
    }

    if (!screenshot) {
      setError("Payment screenshot upload karein.");
      return;
    }

    if (screenshot.size > 5 * 1024 * 1024) {
      setError("Screenshot maximum 5 MB ka hona chahiye.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("studentToken");

      if (!token) {
        router.push("/login");
        return;
      }

      const formData = new FormData();
      formData.append("courseId", params.id);
      formData.append("transactionId", transactionId.trim());
      formData.append("screenshot", screenshot);

      const res = await fetch(
        `${API_URL}/api/student/payment/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("studentToken");
        router.push("/login");
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Payment submit nahi hua");
      }

      setSuccess(
        data.message ||
          "Payment details successfully submitted. Admin verification pending hai."
      );
      setPaymentInfo((prev) => ({
        ...prev,
        paymentStatus: "pending",
      }));
      setTransactionId("");
      setScreenshot(null);

      const fileInput = document.getElementById("paymentScreenshot");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(err.message || "Payment submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-16 text-gray-600">
        Loading payment details...
      </p>
    );
  }

  if (error && !paymentInfo) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push("/courses")}
          className="mt-5 bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!paymentInfo) return null;

  const course = paymentInfo.course || {};
  const title = paymentInfo.title || course.title || "Course";
  const amount = paymentInfo.amount ?? course.price ?? 0;
  const upiId = paymentInfo.upiId || "";
  const qrImage = paymentInfo.qrImage || "/images/upi-qr.png";
  const paymentStatus = String(
    paymentInfo.paymentStatus || ""
  ).toLowerCase();

  const qrSrc = qrImage.startsWith("http")
    ? qrImage
    : qrImage.startsWith("/")
      ? qrImage
      : `/${qrImage}`;

  if (paymentStatus === "approved") {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-black text-green-800">
            Payment Approved!
          </h1>
          <p className="text-gray-600 mt-3">
            Aapka course access approve ho chuka hai.
          </p>
          <button
            onClick={() => router.push("/my-courses")}
            className="mt-6 bg-green-700 text-white px-7 py-3 rounded-xl font-bold"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "pending") {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
          <div className="text-5xl mb-4">⌛</div>
          <h1 className="text-2xl font-black text-amber-800">
            Verification Pending
          </h1>
          <p className="text-gray-700 mt-3">
            Aapki payment details admin ko mil gayi hain. Verification complete
            hone ke baad course unlock hoga.
          </p>
          <button
            onClick={() => router.push("/my-courses")}
            className="mt-6 bg-blue-700 text-white px-7 py-3 rounded-xl font-bold"
          >
            My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          Secure UPI Payment
        </span>
        <h1 className="text-3xl sm:text-4xl font-black mt-4 text-gray-900">
          Complete Your Payment
        </h1>
        <p className="text-gray-600 mt-2">
          Payment verify hone ke baad course access milega.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Course Details */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Course Details
          </h2>

          <h3 className="text-2xl font-black mt-5 text-blue-800">
            {title}
          </h3>

          <div className="mt-7 bg-blue-50 rounded-2xl p-5">
            <p className="text-gray-600 text-sm">Total Amount</p>
            <p className="text-4xl font-black text-blue-800 mt-2">
              ₹{amount}
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p>1. QR code scan karke payment karein.</p>
            <p>2. Correct amount pay karein.</p>
            <p>3. UTR number aur screenshot submit karein.</p>
            <p>4. Admin verification ke baad course unlock hoga.</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Scan & Pay
          </h2>

          <div className="mt-5 bg-white border rounded-2xl p-4 inline-block">
            <img
              src={qrSrc}
              alt="UPI Payment QR Code"
              className="w-56 h-56 object-contain mx-auto"
            />
          </div>

          <p className="text-gray-500 text-sm mt-4">UPI ID</p>

          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="font-bold text-gray-900 break-all">{upiId}</p>
            <button
              type="button"
              onClick={handleCopyUPI}
              className="shrink-0 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-bold"
            >
              Copy
            </button>
          </div>

          <p className="text-green-700 font-bold mt-4">
            Pay exactly ₹{amount}
          </p>
        </div>
      </div>

      {/* Payment Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8"
      >
        <h2 className="text-2xl font-black text-gray-900">
          Submit Payment Details
        </h2>

        <p className="text-gray-600 mt-2 mb-6">
          Payment complete karne ke baad neeche details fill karein.
        </p>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
            {success}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Transaction ID / UTR Number
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter 12 digit UTR / Transaction ID"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Payment Screenshot
          </label>
          <input
            id="paymentScreenshot"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG or WEBP. Maximum file size 5 MB.
          </p>
          {screenshot && (
            <p className="text-sm text-green-700 mt-2">
              Selected: {screenshot.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || paymentStatus === "pending"}
          className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-800 hover:to-indigo-800 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit for Verification"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Course access admin verification ke baad hi activate hoga.
        </p>
      </form>
    </div>
  );
}
