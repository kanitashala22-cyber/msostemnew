import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, BookOpen, Award, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function About() {
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = "MsoSTEM - About Us";
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>

          {/* Founder Section */}
          <Card className="mb-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.founderTitle}</h2>
                <div className="w-32 h-32 mx-auto mb-4 text-6xl">👩‍💼</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.about.founderName}</h3>
                <p className="text-lg text-primary font-semibold mb-4">{t.about.founderRole}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{t.about.founderBio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Mission Statement */}
          <Card className="mb-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t.about.aboutMsoStem}</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.msoStemDescription}
              </p>
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{t.about.ourMission}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{t.about.missionText}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-secondary mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{t.about.ourVision}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{t.about.visionText}</p>
              </CardContent>
            </Card>
          </div>

          {/* Why We Exist */}
          <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.whyWeExist}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{t.about.existText}</p>
            </CardContent>
          </Card>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.about.whatWeDo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.about.feature1}</h3>
                  <p className="text-gray-600">
                    {t.about.feature1Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.about.feature2}</h3>
                  <p className="text-gray-600">
                    {t.about.feature2Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.about.feature3}</h3>
                  <p className="text-gray-600">
                    {t.about.feature3Desc}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.about.feature4}</h3>
                  <p className="text-gray-600">
                    {t.about.feature4Desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Community Growing */}
          <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.communityGrowing}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{t.about.communityText}</p>
            </CardContent>
          </Card>

          {/* Ambassadors Section */}
          <Card className="mb-16 bg-gradient-to-r from-orange-50 to-pink-50 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{t.about.ambassadorTitle}</h2>
                <p className="text-2xl text-primary font-semibold mb-4">{t.about.ambassadorSubtitle}</p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                  {t.about.ambassadorDesc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {t.about.ambassadorFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-3xl font-bold text-primary mb-2">{index + 1}</div>
                    <p className="text-gray-700 font-semibold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfdo4Ve5k26qF4pwISa528uNWXTPyN7ysj0xyAjrXTthXPjNw/viewform?usp=header" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-lg px-8 py-6" data-testid="button-ambassador-apply">
                    {t.about.becomeAmbassador}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary to-secondary border-none shadow-lg text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{t.about.joinUs}</h2>
              <p className="text-lg mb-6 opacity-90">{t.about.joinText}</p>
              <Link href="/courses">
                <Button className="bg-white text-primary hover:bg-white/90">
                  {t.about.startLearning}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}