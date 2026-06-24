import Link from "next/link";

export default function MyCoursesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>

      <div className="card">
        <h2 className="text-xl font-bold">Course access system pending</h2>

        <p className="text-gray-600 mt-2">
          Payment success ke baad yahan purchased courses dikhenge.
        </p>

        <Link
          href="/courses"
          className="mt-5 inline-block bg-brand text-white px-5 py-3 rounded-lg"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}