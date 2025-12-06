import Navbar from "@/components/navbar";
import CourseCard from "@/components/course-card";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, BreadcrumbSchema, CourseListSchema } from "@/components/seo";

export default function Courses() {
  const { language } = useLanguage();
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const breadcrumbItems = [
    { name: "Home", url: "https://msostem.replit.app" },
    { name: language === "sq" ? "Kurse" : "Courses", url: "https://msostem.replit.app/courses" },
  ];

  const courseItems = courses?.map(c => ({
    name: c.title,
    description: c.description,
    provider: "MsoSTEM",
    url: `https://msostem.replit.app/course/${c.id}`,
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={language === "sq" ? "Kurse Falas Kodimi - Mëso HTML, CSS dhe Arduino | MsoSTEM" : "Free Coding Courses - Learn HTML, CSS and Arduino | MsoSTEM"}
        description={language === "sq" ? "Zbulo kurse falas programimi në HTML, CSS dhe Arduino. Mësime interaktive hap pas hapi për vajzat që duan të mësojnë zhvillim web dhe elektronikë." : "Discover free programming courses in HTML, CSS, and Arduino. Step-by-step interactive lessons for girls who want to learn web development and electronics."}
        keywords={language === "sq" ? "kurse kodimi falas, mëso HTML, mëso CSS, kurse Arduino, programim për fillestarë" : "free coding courses, learn HTML, learn CSS, Arduino courses, programming for beginners, girls who code"}
        canonicalUrl="https://msostem.replit.app/courses"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CourseListSchema courses={courseItems} />
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              All <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master web development with our comprehensive HTML and CSS courses
              designed for beginners.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses?.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  //  progress={index === 0 ? 75 : index === 1 ? 45 : 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
