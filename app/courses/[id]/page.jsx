
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${API_URL}/api/student/courses/${params.id}`,
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
          throw new Error(data.message || "Course load nahi hua");
        }

        setCourse(data.course);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchCourse();
  }, [params.id, router]);

  const handleBuyNow = () => {
    router.push(`/courses/${params.id}/payment`);
  };

  if (loading) {
    return <p className="py-16 text-center">Loading course...</p>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center">
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

  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-gray-100">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          Professional Course
        </span>

        <h1 className="text-3xl sm:text-4xl font-black mt-5 text-gray-900">
          {course.title}
        </h1>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {course.description || "Learn with practical projects."}
        </p>

        {course.skill?.name && (
          <p className="mt-4 text-sm font-semibold text-blue-700">
            {course.skill.name}
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">Course Duration</p>
            <p className="font-bold text-gray-900 mt-1">
              {course.duration || "Self-paced"}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">Course Price</p>
            <p className="text-2xl font-black text-green-700 mt-1">
              ₹{course.price}
            </p>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="mt-8 w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white py-4 rounded-xl font-bold text-lg transition"
        >
          Proceed to Payment →
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Course access will be activated after admin payment verification.
        </p>
      </div>
    </div>
  );
}
