// app/page.js
import CourseCard from "./components/CourseCard";
import Link from "next/link";
import { COURSES } from "./Data/courses";

export default function Home() {
  const popularCourse = COURSES[0];

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white p-6 md:p-12">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold mb-5">
              🚀 Learn • Build • Earn
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Become a Web Developer with Real Projects
            </h1>

            <p className="mt-5 text-lg text-white/90">
              HTML, CSS, JavaScript, React, Next.js, Node.js aur MongoDB practical
              projects ke sath sikho.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold shadow-lg"
              >
                Start Learning
              </Link>

              <Link
                href={`/courses/${popularCourse.id}`}
                className="px-6 py-3 rounded-xl border border-white/30 font-semibold hover:bg-white/10"
              >
                View Popular Course
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-2xl font-bold">3+</h3>
                <p className="text-sm text-white/80">Courses</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">150+</h3>
                <p className="text-sm text-white/80">Hours</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">100%</h3>
                <p className="text-sm text-white/80">Practical</p>
              </div>
            </div>
          </div>

          {/* Right Owner Image */}
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
                <div className="relative mx-auto w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">

                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-3xl scale-110"></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-transparent"></div>
                  </div>

                  {/* Image */}
                  <img
                    src="https://frahim.vercel.app/_next/image?url=%2Fimages%2F1.jpg&w=384&q=75"
                    alt="Owner"
                    className="relative z-10 w-full h-full rounded-full object-cover border-[5px] border-[#0f172a]"
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-white/10 border border-white/20 px-6 py-4 backdrop-blur-md">
                  <h3 className="text-2xl md:text-3xl font-extrabold">
                    Owner
                  </h3>

                  <p className="mt-2 text-xl md:text-2xl font-bold text-yellow-300">
                    📞 9058596626
                  </p>

                  <p className="mt-2 text-sm md:text-base text-white/85">
                    Web Developer & Trainer
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
          
      </section>

      {/* COURSES SECTION */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-blue-700 font-semibold">Choose Your Course</p>
            <h2 className="text-3xl font-extrabold mt-1">Our Courses</h2>
            <p className="text-gray-600 mt-2">
              Beginner se advanced tak complete web development learning path.
            </p>
          </div>

          <Link
            href="/courses"
            className="text-blue-700 font-semibold"
          >
            View all courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-3xl mb-3">💻</div>
          <h3 className="text-xl font-bold">Practical Projects</h3>
          <p className="text-gray-600 mt-2">
            Real websites aur apps banao, jo portfolio me dikha sako.
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-3">👨‍🏫</div>
          <h3 className="text-xl font-bold">Mentorship</h3>
          <p className="text-gray-600 mt-2">
            Step-by-step guidance aur project support milega.
          </p>
        </div>

        <div className="card">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="text-xl font-bold">Certificate</h3>
          <p className="text-gray-600 mt-2">
            Course complete karne ke baad certificate milega.
          </p>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="rounded-3xl bg-gray-50 p-6 md:p-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-blue-700 font-semibold">Learning Path</p>
          <h2 className="text-3xl font-extrabold mt-1">
            Kaise Sikhoge?
          </h2>
          <p className="text-gray-600 mt-2">
            Basic se start karke real fullstack project tak complete roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            "HTML & CSS",
            "JavaScript",
            "React & Next.js",
            "Node.js & MongoDB",
          ].map((item, index) => (
            <div key={item} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="font-bold">{item}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Practical lessons aur assignments ke sath.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gray-900 text-white p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Start Your Developer Journey?
        </h2>

        <p className="text-gray-300 mt-3">
          Aaj course join karo aur real projects banana start karo.
        </p>

        <Link
          href="/courses"
          className="mt-6 inline-block rounded-xl bg-white text-gray-900 px-7 py-4 font-bold"
        >
          Browse Courses
        </Link>
      </section>
    </div>
  );
}