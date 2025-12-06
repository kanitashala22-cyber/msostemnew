import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Users, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingAmbassadorButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [location] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed || location === "/about") return null;

  const buttonText = language === "sq" 
    ? "Bëhu Ambasador MsoSTEM" 
    : "Become a MsoSTEM Ambassador";

  return (
    <div
      className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="relative group">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          aria-label="Dismiss"
          data-testid="button-dismiss-ambassador"
        >
          <X className="w-3 h-3" />
        </button>
        
        <Link href="/about#ambassador">
          <button
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
            data-testid="button-floating-ambassador"
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">{language === "sq" ? "Ambasador" : "Ambassador"}</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
