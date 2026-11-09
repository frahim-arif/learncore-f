
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyCoursesPage() {
  const router = useRouter();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnrollments = async () => {
      const token = localStorage.getItem("studentToken");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(`${API}/api/student/enrollments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (res.status === 401) {
          localStorage.removeItem("studentToken");
          localStorage.removeItem("student");
          router.replace("/login");
          return;
        }

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Unable to load enrollments");
        }

        setEnrollments(data.enrollments || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("student");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 mt-2">
            Manage your enrolled courses and learning.
          </p>
        </div>

        <button
          onClick={logout}
          className="border border-red-200 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-50"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {!error && enrollments.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No Enrolled Courses Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Browse our courses and submit your enrollment payment.
          </p>

          <Link
            href="/courses"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Courses
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((item) => {
          const course = item.course;
          if (!course) return null;

          const status = item.paymentStatus;

          return (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold">
                  {course.title}
                </div>
              )}

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {course.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {course.description}
                </p>

                <p className="mt-4 font-semibold text-gray-800">
                  Amount: ₹{item.amount}
                </p>

                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    status === "approved"
                      ? "bg-green-100 text-green-700"
                      : status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </div>

                {status === "approved" ? (
                  <Link
                    href={`/courses/${course._id}`}
                    className="mt-5 block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
                  >
                    Start Learning
                  </Link>
                ) : status === "pending" ? (
                  <p className="mt-5 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                    Your payment is awaiting admin verification.
                  </p>
                ) : status === "rejected" ? (
                  <Link
                    href={`/payment/${course._id}`}
                    className="mt-5 block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold"
                  >
                    Submit Payment Again
                  </Link>
                ) : (
                  <Link
                    href={`/payment/${course._id}`}
                    className="mt-5 block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold"
                  >
                    Complete Enrollment
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
