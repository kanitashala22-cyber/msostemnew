import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = (path: string) => location === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/favicon.png" 
              alt="MsoSTEM Logo" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-bold gradient-text">MsoSTEM</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className={`font-medium transition-colors duration-300 ${
              isActive('/courses') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`} data-testid="link-courses">
              {t.nav.courses}
            </Link>
            <Link href="/scholarships" className={`font-medium transition-colors duration-300 ${
              isActive('/scholarships') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`} data-testid="link-scholarships">
              {t.nav.scholarships}
            </Link>
            <Link href="/playground" className={`font-medium transition-colors duration-300 ${
              isActive('/playground') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`} data-testid="link-playground">
              {t.nav.playground}
            </Link>
            <Link href="/about" className={`font-medium transition-colors duration-300 ${
              isActive('/about') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`} data-testid="link-about">
              {t.nav.about}
            </Link>
            <Link href="/blog" className={`font-medium transition-colors duration-300 ${
              isActive('/blog') 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`} data-testid="link-blog">
              {t.nav.blog || "Blog"}
            </Link>
            <LanguageSwitcher />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg" data-testid="button-start-learning">
              {t.course.startCourse}
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link 
              href="/courses"
              className={`block font-medium transition-colors duration-300 ${
                isActive('/courses') 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="link-courses-mobile"
            >
              {t.nav.courses}
            </Link>
            <Link 
              href="/scholarships"
              className={`block font-medium transition-colors duration-300 ${
                isActive('/scholarships') 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="link-scholarships-mobile"
            >
              {t.nav.scholarships}
            </Link>
            <Link 
              href="/playground"
              className={`block font-medium transition-colors duration-300 ${
                isActive('/playground') 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="link-playground-mobile"
            >
              {t.nav.playground}
            </Link>
            <Link 
              href="/about"
              className={`block font-medium transition-colors duration-300 ${
                isActive('/about') 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="link-about-mobile"
            >
              {t.nav.about}
            </Link>
            <Link 
              href="/blog"
              className={`block font-medium transition-colors duration-300 ${
                isActive('/blog') 
                  ? 'text-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsMenuOpen(false)}
              data-testid="link-blog-mobile"
            >
              {t.nav.blog || "Blog"}
            </Link>
            <LanguageSwitcher />
            <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300" data-testid="button-start-learning-mobile">
              {t.course.startCourse}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
