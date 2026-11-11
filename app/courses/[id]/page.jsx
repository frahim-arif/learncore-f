
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("not_submitted");
  const [lockedLessons, setLockedLessons] = useState(0);

  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [courseRes, enrollmentRes] = await Promise.all([
          fetch(`${API_URL}/api/student/courses/${params.id}`, {
            headers,
          }),
          fetch(`${API_URL}/api/student/enrollments/${params.id}`, {
            headers,
          }),
        ]);

        if (courseRes.status === 401 || enrollmentRes.status === 401) {
          localStorage.removeItem("studentToken");
          router.push("/login");
          return;
        }

        const courseData = await courseRes.json();
        const enrollmentData = await enrollmentRes.json();

        if (!courseRes.ok || !courseData.success) {
          throw new Error(
            courseData.message || "Course load nahi hua"
          );
        }

        setCourse(courseData.course);
        setLessons(courseData.lessons || []);
        setIsEnrolled(Boolean(courseData.isEnrolled));
        setLockedLessons(courseData.lockedLessons || 0);

        if (enrollmentRes.ok && enrollmentData.success) {
          setPaymentStatus(
            enrollmentData.paymentStatus || "not_submitted"
          );
        }

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchCourse();
  }, [params.id, router]);

  const handleBuyNow = () => {
    router.push(`/courses/${params.id}/payment`);
  };

  const handleSelectLesson = async (lessonId) => {
    try {
      setVideoLoading(true);
      setError("");
      setSelectedLesson(null);

      const token = localStorage.getItem("studentToken");

      const res = await fetch(
        `${API_URL}/api/student/lessons/${lessonId}`,
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

      if (res.status === 403) {
        throw new Error(
          "Ye lesson locked hai. Course access ke liye payment approval zaroori hai."
        );
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Video load nahi hua");
      }

      setSelectedLesson(data.lesson);

    } catch (err) {
      setError(err.message || "Video load nahi hua");
    } finally {
      setVideoLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return "";

    let id = String(videoId).trim();

    // Full YouTube URL ko video ID mein convert karein
    if (id.includes("youtube.com") || id.includes("youtu.be")) {
      try {
        const url = new URL(
          id.startsWith("http") ? id : `https://${id}`
        );

        if (url.hostname.includes("youtu.be")) {
          id = url.pathname.split("/").filter(Boolean)[0] || "";
        } else {
          id =
            url.searchParams.get("v") ||
            url.pathname.split("/").filter(Boolean).pop() ||
            "";
        }
      } catch {
        return "";
      }
    }

    // Invalid ID check
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return "";
    }

    return `https://www.youtube-nocookie.com/embed/${id}`;
  };

  const goToLesson = (direction) => {
    const currentIndex = lessons.findIndex(
      (lesson) => lesson._id === selectedLesson?.id
    );

    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < lessons.length) {
      handleSelectLesson(lessons[nextIndex]._id);
    }
  };

  if (loading) {
    return (
      <p className="py-16 text-center text-gray-600">
        Loading course...
      </p>
    );
  }

  if (error && !course) {
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

  const selectedIndex = lessons.findIndex(
    (lesson) => lesson._id === selectedLesson?.id
  );

  const videoUrl = getYouTubeEmbedUrl(
    selectedLesson?.youtubeVideoId
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* COURSE DETAILS */}
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
            <p className="text-gray-500 text-sm">
              Course Duration
            </p>
            <p className="font-bold text-gray-900 mt-1">
              {course.duration || "Self-paced"}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Course Price
            </p>
            <p className="text-2xl font-black text-green-700 mt-1">
              ₹{course.price}
            </p>
          </div>

        </div>

        {/* PAYMENT STATUS */}
        {!isEnrolled && (
          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">

            {paymentStatus === "pending" ? (
              <>
                <h3 className="font-bold text-amber-800 text-lg">
                  Payment Verification Pending
                </h3>

                <p className="text-sm text-amber-700 mt-2">
                  Aapki payment details admin ko mil gayi hain.
                  Approval ke baad complete course unlock hoga.
                </p>
              </>
            ) : paymentStatus === "rejected" ? (
              <>
                <h3 className="font-bold text-red-700 text-lg">
                  Payment Rejected
                </h3>

                <p className="text-sm text-red-600 mt-2">
                  Aapki payment approve nahi hui. Admin se contact karein
                  ya dobara payment submit karein.
                </p>

                <button
                  onClick={handleBuyNow}
                  className="mt-4 bg-blue-700 text-white px-5 py-3 rounded-xl font-bold"
                >
                  Submit Payment Again
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold text-amber-800 text-lg">
                  Course Locked
                </h3>

                <p className="text-sm text-amber-700 mt-2">
                  Full course lessons access karne ke liye payment
                  complete karein.
                </p>

                <button
                  onClick={handleBuyNow}
                  className="mt-4 w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-xl font-bold"
                >
                  Proceed to Payment →
                </button>
              </>
            )}
          </div>
        )}

        {isEnrolled && (
          <div className="mt-7 bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-800 text-lg">
              ✓ Course Unlocked
            </h3>

            <p className="text-sm text-green-700 mt-1">
              Aapke course ke saare published lessons available hain.
            </p>
          </div>
        )}

      </div>

      {/* VIDEO PLAYER */}
      {selectedLesson && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-7">

          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
            {selectedLesson.title}
          </h2>

          {videoUrl ? (
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
              <iframe
                key={selectedLesson.id}
                src={videoUrl}
                title={selectedLesson.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="bg-red-50 text-red-700 p-5 rounded-xl">
              Invalid YouTube Video ID. Admin se video ID check karwayein.
            </div>
          )}

          {selectedLesson.description && (
            <p className="text-gray-600 mt-5">
              {selectedLesson.description}
            </p>
          )}

          <div className="flex justify-between gap-3 mt-6">

            <button
              onClick={() => goToLesson(-1)}
              disabled={selectedIndex <= 0 || videoLoading}
              className="px-5 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              onClick={() => goToLesson(1)}
              disabled={
                selectedIndex === -1 ||
                selectedIndex >= lessons.length - 1 ||
                videoLoading
              }
              className="px-5 py-3 bg-blue-700 text-white rounded-xl font-bold disabled:opacity-40"
            >
              Next →
            </button>

          </div>
        </div>
      )}

      {/* LESSON LIST */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">

        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Course Lessons
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {lessons.length} available lesson(s)
            </p>
          </div>

          {isEnrolled && (
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              Full Access
            </span>
          )}

        </div>

        {error && course && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            {error}
          </div>
        )}

        {videoLoading && (
          <p className="text-center py-5 text-blue-700 font-semibold">
            Loading video...
          </p>
        )}

        {lessons.length > 0 ? (
          <div className="space-y-3">

            {lessons.map((lesson, index) => (
              <button
                key={lesson._id}
                type="button"
                onClick={() => handleSelectLesson(lesson._id)}
                disabled={videoLoading}
                className={`w-full text-left border rounded-2xl p-4 flex items-center gap-4 transition ${
                  selectedLesson?.id === lesson._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
                }`}
              >

                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">

                  <h3 className="font-bold text-gray-900">
                    {lesson.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {lesson.duration
                      ? `${lesson.duration} minutes`
                      : "Video Lesson"}
                    {lesson.isPreview ? " • Free Preview" : ""}
                  </p>

                </div>

                <span className="text-blue-700 font-bold text-sm shrink-0">
                  ▶ Play
                </span>

              </button>
            ))}

          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl">
            <p className="text-gray-700 font-semibold">
              {isEnrolled
                ? "Abhi koi published lesson available nahi hai."
                : "Free preview lesson abhi available nahi hai."}
            </p>
          </div>
        )}

        {/* LOCKED LESSONS */}
        {!isEnrolled && lockedLessons > 0 && (
          <div className="mt-5 border border-amber-200 bg-amber-50 rounded-2xl p-5">

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>

              <div>
                <h3 className="font-bold text-amber-900">
                  {lockedLessons} More Lessons Locked
                </h3>

                <p className="text-sm text-amber-700 mt-1">
                  Payment approval ke baad ye lessons unlock honge.
                </p>
              </div>
            </div>

            {paymentStatus !== "pending" && (
              <button
                onClick={handleBuyNow}
                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold"
              >
                Unlock Full Course
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
