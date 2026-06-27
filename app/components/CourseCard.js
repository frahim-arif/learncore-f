import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="group h-full rounded-3xl bg-white p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-bold">
          {course.hours} Hours
        </span>

        <span className="text-xl sm:text-2xl font-black text-blue-700">
          ₹{course.price}
        </span>
      </div>

      <h3 className="mt-5 text-xl sm:text-2xl font-black text-gray-900 leading-snug">
        {course.title}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 mt-3 min-h-[48px]">
        {course.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {course.desc.split("•").map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <Link
        href={`/courses/${course.id}`}
        className="mt-6 block text-center bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white py-3 rounded-xl font-bold transition duration-300 group-hover:scale-[1.02]"
      >
        View Course →
      </Link>
    </div>
  );
}