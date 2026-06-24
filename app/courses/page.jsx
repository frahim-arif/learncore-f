import CourseCard from "../components/CourseCard";
import { COURSES } from "../Data/courses";

export default function CoursesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Our Courses</h1>

      <p className="text-gray-600 mb-6">
        Choose your course and start learning today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}