import Link from "next/link";

export const metadata = {
  title: "About Us | WebcoreCubeTech",
  description:
    "Learn about WebcoreCubeTech, our mission, courses, and practical web development training.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            About WebcoreCubeTech
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Learn Coding with Practical Projects
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            WebcoreCubeTech is an online learning platform where students learn
            web development step by step with real projects, practical training,
            and simple explanations.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              Hamara mission hai students ko affordable price me practical web
              development sikhana, taki wo real websites aur apps bana saken.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              What We Teach
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              HTML, CSS, JavaScript, Bootstrap, React, Next.js, Node.js,
              Express.js, MongoDB, AWS aur Payment Gateway integration.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Why Choose Us
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              Simple language, project-based learning, lifetime access,
              beginner-friendly lessons aur real-world guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Goal
          </h2>

          <p className="mt-5 text-gray-600 leading-8">
            WebcoreCubeTech ka goal hai beginners ko zero level se professional
            level tak le jana. Yahan aap sirf theory nahi, balki real projects
            banana seekhenge jaise course website, business website, backend
            API, database connection aur payment system.
          </p>

          <div className="mt-8">
            <Link
              href="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}