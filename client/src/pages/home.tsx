import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Play, Clock, CheckCircle, Rocket, Search, Eye, Code, GraduationCap } from "lucide-react";
import type { Course, Scholarship } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, OrganizationSchema, WebsiteSchema, FAQSchema } from "@/components/seo";

export default function Home() {
  const { t, language } = useLanguage();
  
  const faqQuestions = language === "sq" ? [
    { question: "Çfarë është MsoSTEM?", answer: "MsoSTEM është një platformë edukative falas që fuqizon vajzat e reja në teknologji përmes kurseve interaktive të kodimit, bursave dhe mbështetjes së komunitetit." },
    { question: "A janë kurset falas?", answer: "Po, të gjitha kurset tona të HTML, CSS dhe Arduino janë plotësisht falas. Ne besojmë se arsimi në teknologji duhet të jetë i aksesueshëm për të gjithë." },
    { question: "Çfarë moshë duhet të kem për të filluar?", answer: "Kurset tona janë projektuar për vajzat 12-18 vjeç, por kushdo që dëshiron të mësojë kodim është i mirëpritur." },
    { question: "A kam nevojë për përvojë të mëparshme në kodim?", answer: "Jo! Kurset tona fillojnë nga bazat absolute. Ju do të mësoni gjithçka hap pas hapi." },
  ] : [
    { question: "What is MsoSTEM?", answer: "MsoSTEM is a free educational platform that empowers young women in technology through interactive coding courses, scholarships, and community support." },
    { question: "Are the courses free?", answer: "Yes, all our HTML, CSS, and Arduino courses are completely free. We believe tech education should be accessible to everyone." },
    { question: "What age do I need to be to start?", answer: "Our courses are designed for girls aged 12-18, but anyone who wants to learn coding is welcome." },
    { question: "Do I need prior coding experience?", answer: "No! Our courses start from the absolute basics. You'll learn everything step by step." },
  ];
  
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: scholarships, isLoading: scholarshipsLoading } = useQuery<Scholarship[]>({
    queryKey: ["/api/scholarships"],
  });

  const featuredCourses = courses?.slice(0, 3) || [];
  const featuredScholarships = scholarships?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={language === "sq" ? "MsoSTEM - Mëso Programim & Gjej Bursa për Vajzat e Reja" : "MsoSTEM - Learn Programming & Find Scholarships for Young Women"}
        description={language === "sq" ? "Fuqizo udhëtimin tënd në teknologji me MsoSTEM. Kurse interaktive kodimi në HTML dhe CSS, bursa të vërteta, dhe komunitet mbështetës për vajzat e reja që mësojnë të kodojnë." : "Empower your tech journey with MsoSTEM. Interactive coding courses in HTML and CSS, real scholarships, and supportive community for young women learning to code."}
        keywords={language === "sq" ? "kodim, programim, HTML, CSS, bursa, vajza në teknologji, arsim STEM, kurse teknologjie" : "coding, programming, HTML, CSS, scholarships, women in tech, STEM education, tech courses, girls who code"}
        canonicalUrl="https://msostem.replit.app"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema questions={faqQuestions} />
      <Navbar />
      <HeroSection />
      
      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.home.courses.title.replace(t.home.courses.titleHighlight, '')} <span className="gradient-text">{t.home.courses.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.courses.subtitle}
            </p>
          </div>
          
          {/* Learning Path Overview */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-12 text-white animate-slide-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-3">{t.home.courses.pathTitle}</h3>
              <p className="text-white/90 text-lg">{t.home.courses.pathSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center animate-float" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-lg mb-2">{t.home.courses.step1Title}</div>
                <div className="text-white/80">{t.home.courses.step1Desc}</div>
              </div>
              <div className="text-center animate-float" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <div className="text-2xl">🎨</div>
                </div>
                <div className="font-semibold text-lg mb-2">{t.home.courses.step2Title}</div>
                <div className="text-white/80">{t.home.courses.step2Desc}</div>
              </div>
              <div className="text-center animate-float" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-lg mb-2">{t.home.courses.step3Title}</div>
                <div className="text-white/80">{t.home.courses.step3Desc}</div>
              </div>
            </div>
          </div>
          
          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => {
                const courseContent = (t.courseContent as any)[course.id];
                const displayTitle = courseContent?.title || course.title;
                const displayDescription = courseContent?.description || course.description;
                const durationParts = course.duration.split(' ');
                const translatedDuration = `${durationParts[0]} ${durationParts[1] === 'weeks' ? t.home.courses.weeks : durationParts[1]}`;
                
                return (
                <Card key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.imageUrl || ""} 
                      alt={displayTitle}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.level === 'beginner' ? 'bg-primary bg-opacity-10 text-primary' :
                        course.level === 'intermediate' ? 'bg-secondary bg-opacity-10 text-secondary' :
                        'bg-accent bg-opacity-10 text-accent'
                      }`}>
                        {course.level === 'beginner' ? t.common.beginner : course.level === 'intermediate' ? t.common.intermediate : t.common.advanced}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{translatedDuration}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{displayTitle}</h3>
                    <p className="text-gray-600 mb-4">{displayDescription}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <Play className="w-4 h-4 mr-2" />
                        <span className="text-sm">{course.lessonsCount} {t.home.courses.lessons}</span>
                      </div>
                      <Link href={`/course/${course.id}`}>
                        <Button className={`${
                          course.level === 'beginner' ? 'bg-primary hover:bg-primary/90' :
                          course.level === 'intermediate' ? 'bg-secondary hover:bg-secondary/90' :
                          'bg-accent hover:bg-accent/90'
                        } text-white`} data-testid={`button-continue-${course.id}`}>
                          {t.home.courses.continue}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          )}
          
          {/* Interactive Code Playground Preview */}
          <div className="mt-16 bg-gray-900 rounded-2xl p-8 relative overflow-hidden animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              <div className="text-white animate-slide-in-left">
                <h3 className="text-3xl font-bold mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mr-3 animate-pulse">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  {t.home.courses.playgroundTitle}
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  {t.home.courses.playgroundDesc}
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    {t.home.courses.playgroundFeature1}
                  </li>
                  <li className="flex items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    {t.home.courses.playgroundFeature2}
                  </li>
                  <li className="flex items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    {t.home.courses.playgroundFeature3}
                  </li>
                  <li className="flex items-center animate-fade-in" style={{animationDelay: '0.8s'}}>
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    {t.home.courses.playgroundFeature4}
                  </li>
                </ul>
                <Link href="/playground">
                  <Button className="mt-6 bg-primary text-white hover:bg-primary/90 font-semibold" data-testid="button-try-playground">
                    {t.home.courses.tryPlayground}
                  </Button>
                </Link>
              </div>
              
              <div className="code-block animate-slide-in-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-80">
                  {/* HTML Editor */}
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300">
                    <div className="text-gray-400 text-sm mb-2 flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                      HTML
                    </div>
                    <div className="font-mono text-sm text-gray-300 space-y-1">
                      <div className="animate-fade-in" style={{animationDelay: '1s'}}><span className="text-blue-400">&lt;div</span> <span className="text-yellow-300">class=</span><span className="text-green-400">"card"</span><span className="text-blue-400">&gt;</span></div>
                      <div className="ml-4 animate-fade-in" style={{animationDelay: '1.2s'}}><span className="text-blue-400">&lt;h2&gt;</span><span className="text-white">My Project</span><span className="text-blue-400">&lt;/h2&gt;</span></div>
                      <div className="ml-4 animate-fade-in" style={{animationDelay: '1.4s'}}><span className="text-blue-400">&lt;p&gt;</span><span className="text-white">Learning is fun!</span><span className="text-blue-400">&lt;/p&gt;</span></div>
                      <div className="animate-fade-in" style={{animationDelay: '1.6s'}}><span className="text-blue-400">&lt;/div&gt;</span></div>
                    </div>
                  </div>
                  
                  {/* CSS Editor */}
                  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300">
                    <div className="text-gray-400 text-sm mb-2 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                      CSS
                    </div>
                    <div className="font-mono text-sm text-gray-300 space-y-1">
                      <div className="animate-fade-in" style={{animationDelay: '1.8s'}}><span className="text-yellow-300">.card</span> <span className="text-white">{`{`}</span></div>
                      <div className="ml-4 animate-fade-in" style={{animationDelay: '2s'}}><span className="text-blue-400">background:</span> <span className="text-green-400">#8B5CF6</span><span className="text-white">;</span></div>
                      <div className="ml-4 animate-fade-in" style={{animationDelay: '2.2s'}}><span className="text-blue-400">padding:</span> <span className="text-green-400">20px</span><span className="text-white">;</span></div>
                      <div className="ml-4 animate-fade-in" style={{animationDelay: '2.4s'}}><span className="text-blue-400">border-radius:</span> <span className="text-green-400">10px</span><span className="text-white">;</span></div>
                      <div className="animate-fade-in" style={{animationDelay: '2.6s'}}><span className="text-white">{`}`}</span></div>
                    </div>
                  </div>
                </div>
                
                {/* Live Preview */}
                <div className="mt-4 bg-white rounded-lg p-4 animate-fade-in border-2 border-transparent hover:border-primary/20 transition-colors duration-300" style={{animationDelay: '2.8s'}}>
                  <div className="text-gray-600 text-sm mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-primary" />
                    Live Preview
                  </div>
                  <div className="bg-primary text-white p-5 rounded-lg transform hover:scale-105 transition-transform duration-300 animate-bounce-in" style={{animationDelay: '3s'}}>
                    <h2 className="text-xl font-bold mb-2">My Project</h2>
                    <p>Learning is fun!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scholarships Section */}
      <section id="scholarships" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative">
            <div className="absolute left-1/4 top-0 w-6 h-6 bg-secondary/10 rounded-full animate-float"></div>
            <div className="absolute right-1/3 top-8 w-4 h-4 bg-primary/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
              {t.home.scholarships.title.replace(t.home.scholarships.titleHighlight, '')} <span className="gradient-text">{t.home.scholarships.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
              {t.home.scholarships.subtitle}
            </p>
          </div>
          
          {scholarshipsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredScholarships.map((scholarship, index) => {
                const scholarshipContent = (t.scholarshipContent as any)[scholarship.id];
                const displayTitle = scholarshipContent?.title || scholarship.title;
                const displayDescription = scholarshipContent?.description || scholarship.description;
                const displayField = scholarshipContent?.field || scholarship.field;
                const displayLocation = scholarshipContent?.location || scholarship.location;
                
                return (
                <Card key={scholarship.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden animate-slide-up group" style={{animationDelay: `${index * 0.15}s`}}>
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">${scholarship.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{t.home.scholarships.amount}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{displayTitle}</h3>
                    <p className="text-gray-600 mb-4">{displayDescription}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-calendar-alt mr-2 text-primary w-4"></i>
                        <span>{t.home.scholarships.deadline}: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                        <span>{displayField}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-map-marker-alt mr-2 text-primary w-4"></i>
                        <span>{displayLocation}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scholarship.status === 'open' ? 'bg-green-100 text-green-800' :
                        scholarship.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        scholarship.status === 'closing_soon' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {scholarship.status === 'open' ? t.home.scholarships.statusOpen :
                         scholarship.status === 'upcoming' ? t.home.scholarships.statusUpcoming :
                         scholarship.status === 'closing_soon' ? t.home.scholarships.statusClosingSoon :
                         t.home.scholarships.statusClosed}
                      </span>
                      <Link href={`/scholarships/${scholarship.id}`}>
                        <span className="bg-primary text-white hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer" data-testid={`button-view-scholarship-${scholarship.id}`}>
                          {t.home.scholarships.viewDetails}
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/scholarships">
              <Button className="bg-primary text-white px-8 py-3 hover:bg-primary/90 font-semibold" data-testid="button-view-all-scholarships">
                {t.home.scholarships.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            {t.home.cta.title} 
            <span className="block animate-fade-in" style={{animationDelay: '0.3s'}}>{t.home.cta.titleLine2}</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
            {t.home.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '0.9s'}}>
            <Link href="/courses">
              <Button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-bounce-in" style={{animationDelay: '1.2s'}}>
                <Rocket className="w-5 h-5 mr-3" />
                {t.home.cta.btnStartLearning}
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button className="glass-morphism text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 animate-bounce-in" style={{animationDelay: '1.4s'}}>
                <Search className="w-5 h-5 mr-3" />
                {t.home.cta.btnFindScholarships}
              </Button>
            </Link>
          </div>
          
          {/* Floating Animation Elements */}
          <div className="mt-12 relative">
            <div className="absolute left-1/4 animate-float w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
            <div className="absolute right-1/3 animate-float w-4 h-4 bg-white bg-opacity-30 rounded-full" style={{animationDelay: '1s'}}></div>
            <div className="absolute left-1/3 animate-float w-8 h-8 bg-white bg-opacity-10 rounded-full" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
