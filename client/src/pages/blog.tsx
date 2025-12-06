import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Clock, ArrowRight, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { SEO, BreadcrumbSchema } from "@/components/seo";

export default function Blog() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const breadcrumbItems = [
    { name: "Home", url: "https://msostem.replit.app" },
    { name: language === "sq" ? "Blog" : "Blog", url: "https://msostem.replit.app/blog" },
  ];

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString(language === "sq" ? "sq-AL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Education: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      Tutorial: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      Opportunities: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      Inspiration: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    };
    return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <SEO
        title={language === "sq" ? "Blog MsoSTEM - Tutoriale Kodimi, Histori Suksesi & Këshilla Teknologjie" : "MsoSTEM Blog - Coding Tutorials, Success Stories & Tech Tips"}
        description={language === "sq" ? "Zbulo tutoriale kodimi, histori frymëzuese të grave në teknologji, dhe mundësi bursash. Mëso HTML, CSS, Arduino dhe më shumë me udhëzuesit tanë të thjeshtë." : "Discover coding tutorials, inspiring stories of women in tech, and scholarship opportunities. Learn HTML, CSS, Arduino and more with our beginner-friendly guides."}
        keywords={language === "sq" ? "tutoriale kodimi, mëso HTML, mëso CSS, gra në teknologji, bursa STEM, Arduino për fillestarë" : "coding tutorials, learn HTML, learn CSS, women in tech, STEM scholarships, Arduino for beginners, girls who code blog"}
        canonicalUrl="https://msostem.replit.app/blog"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.blog?.title || "CodeHer Blog"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.blog?.subtitle || "Discover tutorials, success stories, and insights to help you on your coding journey."}
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                  data-testid={`skeleton-blog-${i}`}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  data-testid={`blog-card-${post.slug}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} {t.blog?.minRead || "min read"}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all">
                      {t.blog?.readMore || "Read More"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && (!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t.blog?.noPosts || "No blog posts available yet."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
