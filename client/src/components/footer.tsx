import { Link } from "wouter";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/favicon.png" 
                alt="MsoSTEM Logo" 
                className="w-12 h-12 rounded-lg"
              />
              <span className="text-3xl font-bold gradient-text">MsoSTEM</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.home.footer.aboutText}
            </p>
            <div className="mb-6">
              <div className="flex items-center text-gray-400 mb-2">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">{t.home.footer.futureCollaboration}:</span>
              </div>
              <a href="tel:+383045141019" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300">
                +383 045 141 019
              </a>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.home.footer.learn}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors duration-300">{t.home.footer.htmlFundamentals}</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors duration-300">{t.home.footer.cssStyling}</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors duration-300">{t.home.footer.responsiveDesign}</Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-white transition-colors duration-300">{t.home.footer.codePlayground}</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors duration-300">{t.home.footer.learningPath}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.home.footer.resources}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/scholarships" className="hover:text-white transition-colors duration-300">{t.home.footer.scholarships}</Link>
              </li>
              <li>
                <Link href="/about#ambassador" className="hover:text-white transition-colors duration-300">{t.home.footer.community}</Link>
              </li>
              <li>
                <a href="#success-stories" className="hover:text-white transition-colors duration-300">{t.home.footer.successStories}</a>
              </li>
              <li>
                <Link href="/about#ambassador" className="hover:text-white transition-colors duration-300">{t.home.footer.mentorship}</Link>
              </li>
              <li>
                <a href="#career-guide" className="hover:text-white transition-colors duration-300">{t.home.footer.careerGuide}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 MsoSTEM. {t.home.footer.rights}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t.home.footer.privacyPolicy}
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t.home.footer.termsOfService}
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t.home.footer.contactUs}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
