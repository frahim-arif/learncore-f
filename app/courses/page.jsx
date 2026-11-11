
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "../components/CourseCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${API_URL}/api/student/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("COURSES API RESPONSE:", data);

        if (res.status === 401) {
          localStorage.removeItem("studentToken");
          router.push("/login");
          return;
        }

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Courses load nahi ho sake");
        }

        const formattedCourses = (data.courses || []).map((course) => ({
          ...course,
          id: course._id,
          hours: course.duration || "Self-paced",
          desc: course.description || course.skill?.name || "Professional Course",
        }));

        setCourses(formattedCourses);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Our Courses</h1>

      <p className="text-gray-600 mb-6">
        Choose your course and start learning today.
      </p>

      {loading && (
        <p className="text-gray-600 py-10 text-center">
          Loading courses...
        </p>
      )}

      {!loading && error && (
        <p className="text-red-600 text-center py-10">{error}</p>
      )}

      {!loading && !error && courses.length === 0 && (
        <p className="text-gray-600 text-center py-10">
          No published courses available yet.
        </p>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
