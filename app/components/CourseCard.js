import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900">
        {course.title}
      </h3>

      <p className="text-sm text-gray-600 mt-3 min-h-[50px]">
        {course.desc}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
          {course.hours} Hours
        </span>

        <span className="text-2xl font-extrabold text-blue-700">
          ₹{course.price}
        </span>
      </div>

      <Link
        href={`/courses/${course.id}`}
        className="mt-6 block text-center bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition duration-300"
      >
        View Course
      </Link>
    </div>
  );
}