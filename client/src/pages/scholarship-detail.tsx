import { useParams } from "wouter"; //
import { useQuery } from "@tanstack/react-query"; //
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; //
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Users,
  ExternalLink,
  CheckCircle,
  Globe,
} from "lucide-react";
import type { Scholarship } from "@shared/schema"; //
import techGirlsImage from "@assets/generated_images/techgirlstg.jpg";
import uwcImage from "@assets/stock_images/international_studen_43973f10.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ScholarshipDetail() {
  const { id } = useParams();
  const { t } = useLanguage();

  const { data: scholarship, isLoading } = useQuery<Scholarship>({
    queryKey: ["/api/scholarships", id],
  });

  useEffect(() => {
    if (scholarship) {
      document.title = `MsoSTEM - ${scholarship.title}`;
    }
  }, [scholarship]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Scholarship Not Found
          </h1>
          <p className="text-gray-600">
            The scholarship you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Program specific content
  const isTechGirls = scholarship.id === "scholarship-1";
  const isBenjaminFranklin = scholarship.id === "scholarship-2";
  const isYES = scholarship.id === "scholarship-3";
  const isFLEX = scholarship.id === "scholarship-4";
  const isAFS = scholarship.id === "scholarship-5";
  const isUWC = scholarship.id === "scholarship-6";
  
  // Get translated content with proper type assertion
  const scholarshipContent = (t.scholarshipContent as any)[scholarship.id];
  const displayTitle = scholarshipContent?.title || scholarship.title;
  const displayDescription = scholarshipContent?.description || scholarship.description;
  const displayField = scholarshipContent?.field || scholarship.field;
  const displayLocation = scholarshipContent?.location || scholarship.location;
  const displayEligibility = scholarshipContent?.eligibility || scholarship.eligibility;
  const displayOrganization = scholarshipContent?.organizationName || scholarship.organizationName;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Badge
              className={`mb-4 ${
                scholarship.status === "open"
                  ? "bg-green-100 text-green-800"
                  : scholarship.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {scholarship.status === "open"
                ? (scholarshipContent?.badgeText?.open || "Open for Applications")
                : scholarship.status === "upcoming"
                  ? (scholarshipContent?.badgeText?.upcoming || "Upcoming Application Period")
                  : (scholarshipContent?.badgeText?.closingSoon || "Closing Soon")}
            </Badge>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {displayTitle}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {displayDescription}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  ${scholarship.amount.toLocaleString()} Value
                </span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>
                  Deadline:{" "}
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{displayLocation}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{displayOrganization}</span>
              </div>
            </div>
          </div>

          {/* Program Image */}
          {isTechGirls && (
            <div className="mb-8">
              <img
                src={techGirlsImage}
                alt="TechGirls program participants working on STEM projects"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* TechGirls Specific Content */}
          {isTechGirls ? (
            <div className="space-y-8">
              {/* Program Overview */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.aboutProgram?.title || "About TechGirls Program"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {scholarshipContent?.aboutProgram?.description || "TechGirls is a prestigious, fully-funded U.S. Department of State exchange program that empowers young women from around the world to pursue careers in science, technology, engineering, and mathematics (STEM). This life-changing opportunity combines intensive technology training at Virginia Tech University with cultural immersion across the United States."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programHighlights?.title || "Program Highlights"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programHighlights?.items || [
                          "23-day intensive experience in the United States",
                          "38 hours of cutting-edge STEM coursework",
                          "Technology camp at Virginia Tech University",
                          "Host family cultural immersion experience",
                          "7-month mentoring program post-exchange"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.whatsIncluded?.title || "What's Included"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.whatsIncluded?.items || [
                          "Round-trip international airfare",
                          "All accommodation and meals",
                          "Educational activities and site visits",
                          "Tech company visits (NASA, Smithsonian)",
                          "Living stipend and cultural activities"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Requirements */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.eligibilityRequirements?.title || "Eligibility Requirements"}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.basicRequirements?.title || "Basic Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.basicRequirements?.items || [
                          "Ages 15-17 at program start",
                          "Citizens/residents of eligible countries",
                          "Strong interest in STEM fields",
                          "Advanced intermediate English proficiency",
                          "Good academic standing",
                          "No prior coding experience required"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.personalQualities?.title || "Personal Qualities"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.personalQualities?.items || [
                          "Demonstrated leadership potential",
                          "Community service experience",
                          "Maturity and open-mindedness",
                          "Commitment to community action project",
                          "Limited prior U.S. experience (preferred)"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.title || "Eligible Countries/Territories (37 total)"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.subSaharanAfrica || "Sub-Saharan Africa: Cameroon, Kenya, Nigeria, Rwanda, South Africa, Zambia"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.eastAsiaPacific || "East Asia & Pacific: Cambodia, Fiji, Indonesia, Mongolia, Taiwan, Vietnam"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.europeEurasia || "Europe & Eurasia: Albania, Cyprus, Greece, Kosovo, Montenegro, Türkiye"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.middleEastNorthAfrica || "Middle East & North Africa: Algeria, Egypt, Jordan, Lebanon, Morocco, Palestinian Territories, Tunisia"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.southCentralAsia || "South & Central Asia: Kazakhstan, Kyrgyzstan, Pakistan, Tajikistan, Turkmenistan, Uzbekistan"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.westernHemisphere || "Western Hemisphere: Brazil, Costa Rica, Ecuador, Panama, Peru, Suriname"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.unitedStates || "United States: U.S. citizens and residents are also eligible"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program Structure */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.programStructure?.title || "Program Structure"}
                  </h2>

                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {scholarshipContent?.programStructure?.phase1?.title || "Phase 1: Tech Camp at Virginia Tech"}
                      </h3>
                      <p className="text-gray-700">
                        {scholarshipContent?.programStructure?.phase1?.description || "Intensive technology camp featuring hands-on STEM training, lab visits, job shadowing with tech professionals, and leadership workshops."}
                      </p>
                    </div>

                    <div className="border-l-4 border-secondary pl-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {scholarshipContent?.programStructure?.phase2?.title || "Phase 2: Community Immersion"}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        {scholarshipContent?.programStructure?.phase2?.description || "Cultural immersion in U.S. cities including Austin, Cincinnati, Denver, Detroit, Kansas City, or Seattle. Experience host family life and visit major tech companies."}
                      </p>
                    </div>

                    <div className="border-l-4 border-accent pl-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {scholarshipContent?.programStructure?.phase3?.title || "Phase 3: Community Action Project"}
                      </h3>
                      <p className="text-gray-700">
                        {scholarshipContent?.programStructure?.phase3?.description || "Upon returning home, implement a community-based STEM project such as starting tech clubs, teaching coding, or organizing career fairs."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Information */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.applicationInfo?.title || "Application Information"}
                  </h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {scholarshipContent?.applicationInfo?.timeline?.title || "2026 Application Timeline"}
                    </h3>
                    <ul className="text-blue-800 space-y-1">
                      {(scholarshipContent?.applicationInfo?.timeline?.items || [
                        "Application Opens: Fall 2025",
                        "Application Deadline: December 2025",
                        "Notification: March 2026",
                        "Program Dates: July 2026"
                      ]).map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.applicationInfo?.requirements?.title || "Application Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.applicationInfo?.requirements?.items || [
                          "Complete online application in English",
                          "Personal portrait/headshot photo",
                          "Most recent academic transcript",
                          "Essays and personal statements",
                          "All responses must be original work"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.applicationInfo?.selectionProcess?.title || "Selection Process"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.applicationInfo?.selectionProcess?.items || [
                          "Independent committee reviews applications",
                          "U.S. embassy interviews for international candidates",
                          "Legacy International interviews for U.S. candidates",
                          "Final selection and notification"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isBenjaminFranklin ? (
            /* Benjamin Franklin Transatlantic Fellowship Content */
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.aboutProgram?.title || "About Benjamin Franklin Transatlantic Fellowship"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {scholarshipContent?.aboutProgram?.description || "The Benjamin Franklin Transatlantic Fellowship (BFTF) is a prestigious 4-week summer exchange program hosted by Purdue University that brings together young European leaders to explore diplomacy, leadership, and transatlantic relations in the United States. This fully-funded U.S. State Department program empowers participants to become future ambassadors of international cooperation."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programHighlights?.title || "Program Highlights"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          {(scholarshipContent?.aboutProgram?.programHighlights?.items || [
                          "4-week intensive program at Purdue University",
                          "Focus on diplomacy and transatlantic relations",
                          "Leadership development workshops",
                          "Cultural immersion in multiple U.S. cities",
                          "Multinational group interactions"
              ]).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programComponents?.title || "Program Components"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programComponents?.items || [
                          "Academic seminars on U.S. foreign policy",
                          "Democracy and civil society discussions",
                          "Communications and advocacy training",
                          "Site visits to government institutions",
                          "Meetings with policy makers and experts"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.eligibilityRequirements?.title || "Eligibility Requirements"}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.basicRequirements?.title || "Basic Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.basicRequirements?.items || [
                          "Ages 16-18 at program start",
                          "European citizenship or legal permanent residency",
                          "Strong academic achievement",
                          "High proficiency in English",
                          "Little to no prior U.S. experience",
                          "Commitment to return home post-program"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.personalQualities?.title || "Personal Qualities"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.personalQualities?.items || [
                          "Demonstrated leadership potential",
                          "Interest in diplomacy and international relations",
                          "Maturity and independence",
                          "Strong social skills and flexibility",
                          "Open-minded and tolerant attitude",
                          "Community service engagement"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.title || "Participating Countries"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.description || "European countries including: Albania, Austria, Belgium, Cyprus, Czech Republic, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Kosovo, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Slovakia, Slovenia, Spain, and others."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isYES ? (
            /* YES Program Content */
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.aboutProgram?.title || "About Kennedy-Lugar Youth Exchange & Study (YES)"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {scholarshipContent?.aboutProgram?.description || "The Kennedy-Lugar Youth Exchange & Study (YES) program is a competitive, merit-based scholarship program funded by the U.S. State Department that brings high school students from countries with significant Muslim populations to the United States for a full academic year. Students live with volunteer American host families and attend U.S. high schools, serving as cultural ambassadors."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programHighlights?.title || "Program Highlights"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programHighlights?.items || [
                          "Full academic year (9-10 months) in the U.S.",
                          "Live with volunteer American host families",
                          "Attend regular U.S. high schools",
                          "Cultural immersion and leadership development",
                          "Serve as youth cultural ambassadors"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.whatsIncluded?.title || "What's Included"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.whatsIncluded?.items || [
                          "Round-trip international airfare",
                          "Room and board with host family",
                          "High school tuition and fees",
                          "Medical benefits and visa fees",
                          "Orientation and ongoing support"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.eligibilityRequirements?.title || "Eligibility Requirements"}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.basicRequirements?.title || "Basic Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.basicRequirements?.items || [
                          "Ages 15-18 (high school students)",
                          "Citizens/residents of participating countries",
                          "Merit-based selection through competition",
                          "Good academic standing",
                          "English language proficiency",
                          "No previous long-term U.S. experience"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.personalQualities?.title || "Personal Qualities"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.personalQualities?.items || [
                          "Leadership potential and maturity",
                          "Cultural curiosity and open-mindedness",
                          "Commitment to cultural exchange",
                          "Community service orientation",
                          "Academic excellence and motivation",
                          "Strong communication skills"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.title || "Participating Countries (45+ countries)"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.southeastAsia || "Southeast Asia: Indonesia, Malaysia, Philippines, Thailand"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.europeEurasia || "Europe & Eurasia: Bosnia and Herzegovina, Bulgaria, Turkey"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.middleEastNorthAfrica || "Middle East & North Africa: Egypt, Jordan, Morocco, Tunisia"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.southCentralAsia || "South & Central Asia: India, Pakistan"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.subSaharanAfrica || "Sub-Saharan Africa: Ghana, Mali, Senegal, South Africa"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.note || "And many other countries with significant Muslim populations."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isFLEX ? (
            /* FLEX Program Content */
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.aboutProgram?.title || "About Future Leaders Exchange (FLEX)"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {scholarshipContent?.aboutProgram?.description || "The Future Leaders Exchange (FLEX) program is a competitive, merit-based scholarship program funded by the U.S. State Department that brings high school students from Europe, Eurasia, and Central Asia to the United States for a full academic year. With over 32,000 alumni since 1993, FLEX promotes mutual understanding and lasting peace through youth exchange."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programHighlights?.title || "Program Highlights"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programHighlights?.items || [
                          "Full academic year (9-10 months) in the U.S.",
                          "Live with volunteer American host families",
                          "Attend regular U.S. public high schools",
                          "Extremely competitive (1 in 50 acceptance rate)",
                          "Focus on democracy and entrepreneurship"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programRequirements?.title || "Program Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programRequirements?.items || [
                          "30+ hours of community service",
                          "Cultural orientation activities",
                          "Leadership development workshops",
                          "Cultural ambassador responsibilities",
                          "Alumni network participation"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.eligibilityRequirements?.title || "Eligibility Requirements"}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.basicRequirements?.title || "Basic Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.basicRequirements?.items || [
                          "Ages 15-17 (some sources say up to 19)",
                          "Citizens of participating countries",
                          "Currently enrolled in high school",
                          "Strong academic performance",
                          "English language proficiency",
                          "No significant prior U.S. experience"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.personalQualities?.title || "Personal Qualities"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.personalQualities?.items || [
                          "Exceptional leadership potential",
                          "Strong character and maturity",
                          "Commitment to community service",
                          "Interest in democracy and free market economy",
                          "Cultural adaptability and openness",
                          "Academic excellence and curiosity"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.title || "Participating Countries (22 countries)"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.easternEurope || "Eastern Europe: Czech Republic, Estonia, Hungary, Latvia, Lithuania, Poland, Romania, Slovakia"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.southeastEurope || "Southeast Europe: Greece, Montenegro, Serbia"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.eurasia || "Eurasia: Armenia, Azerbaijan, Belarus, Georgia, Moldova, Russia, Ukraine"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.centralAsia || "Central Asia: Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan"}
                        <br />
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.regions?.eastAsia || "East Asia: Mongolia"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isAFS ? (
            /* AFS Global You™ Adventurer Content */
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.aboutProgram?.title || "About AFS Global You™ Adventurer"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {scholarshipContent?.aboutProgram?.description || "The AFS Global You™ Adventurer is a unique 5-week online exchange program designed for high school students around the world. This fully immersive, fully-funded program helps participants develop global competence, intercultural communication skills, leadership capacity, and digital collaboration skills. Through engaging activities, interactive discussions, and cross-cultural teamwork, students connect with peers from diverse backgrounds to become more empathetic, open-minded, and prepared to thrive in a globalized world."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programHighlights?.title || "Program Highlights"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programHighlights?.items || [
                          "5-week interactive virtual exchange",
                          "Focus on global citizenship and intercultural skills",
                          "Leadership development and teamwork activities",
                          "Real-world challenges tied to UN Sustainable Development Goals (SDGs)",
                          "Daily online interactions with peers from around the world"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.aboutProgram?.programComponents?.title || "Program Components"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.aboutProgram?.programComponents?.items || [
                          "Global Competence Workshops: Training on communication, empathy, and cultural awareness",
                          "Sustainability Challenges: Projects related to the SDGs",
                          "Intercultural Dialogues: Interactive sessions with international peers",
                          "Leadership Activities: Team-based collaboration across time zones",
                          "Digital Collaboration Tools: Building skills in remote teamwork and problem-solving"
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {scholarshipContent?.eligibilityRequirements?.title || "Eligibility Requirements"}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.basicRequirements?.title || "Basic Requirements"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.basicRequirements?.items || [
                          "Ages 14–17 at the program start",
                          "Open to students anywhere in the world",
                          "Strong interest in global issues, culture, and leadership",
                          "High proficiency in English",
                          "Access to stable internet connection and computer"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {scholarshipContent?.eligibilityRequirements?.personalQualities?.title || "Personal Qualities"}
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        {(scholarshipContent?.eligibilityRequirements?.personalQualities?.items || [
                          "Curiosity and open-mindedness",
                          "Willingness to collaborate with peers from different cultures",
                          "Strong teamwork and communication skills",
                          "Respectful and inclusive attitude",
                          "Open-minded and tolerant attitude",
                          "Desire to become an active global citizen"
                        ]).map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.title || "Participating Countries"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {scholarshipContent?.eligibilityRequirements?.eligibleCountries?.description || "Countries from all over the world are eligible to participate in the AFS Global You Adventurer program."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Generic scholarship content for other scholarships */
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Scholarship Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Field of Study
                    </h3>
                    <p className="text-gray-700">{displayField}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Eligibility
                    </h3>
                    <p className="text-gray-700">{displayEligibility}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Organization
                    </h3>
                    <p className="text-gray-700">
                      {displayOrganization}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              <a
                href={scholarship.applicationUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Apply Now
              </a>
            </Button>

            {isTechGirls && (
              <Button asChild variant="outline" size="lg" className="flex-1">
                <a
                  href="https://techgirlsglobal.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Visit TechGirls Website
                </a>
              </Button>
            )}
          </div>

          {/* Contact Information */}
          {isTechGirls && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-700">
                  For specific country inquiries, contact your local U.S.
                  embassy or consulate. General program questions can be
                  submitted through the TechGirls website contact form.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
