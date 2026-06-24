import Link from "next/link";
// import { } from "@/Data/courses";
import { COURSES } from "../Data/courses";

export const metadata = {
  title: "Pricing | WebcoreCubeTech",
  description: "Explore our web development courses and pricing.",
};

export default function PricingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-semibold">
            Course Pricing
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Choose Your
            <span className="text-brand"> Learning Path</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Learn modern web development with practical projects and lifetime
            access.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                {course.title}
              </h2>

              <p className="mt-4 text-gray-600">
                {course.desc}
              </p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-brand">
                  ₹{course.price}
                </span>

                <p className="mt-2 text-gray-500">
                  {course.hours} Hours Training
                </p>
              </div>

              <p className="mt-8 text-gray-600 leading-7">
                {course.details}
              </p>

              <Link
                href={`/courses/${course.id}`}
                className="mt-10 block w-full rounded-xl bg-brand text-white py-3 text-center font-semibold hover:opacity-90 transition"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}