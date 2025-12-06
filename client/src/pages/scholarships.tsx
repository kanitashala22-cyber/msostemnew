import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import ScholarshipCard from "@/components/scholarship-card";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import type { Scholarship } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO, BreadcrumbSchema } from "@/components/seo";

export default function Scholarships() {
  const { language } = useLanguage();
  
  const breadcrumbItems = [
    { name: "Home", url: "https://msostem.replit.app" },
    { name: language === "sq" ? "Programet e Shkëmbimit" : "Exchange Programs", url: "https://msostem.replit.app/scholarships" },
  ];
  const [filters, setFilters] = useState({
    search: "",
    field: "All Fields",
    amount: "Any Amount",
    deadline: "All Deadlines",
  });

  const {
    data: scholarships,
    isLoading,
    refetch,
  } = useQuery<Scholarship[]>({
    queryKey: ["/api/scholarships"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  // Debug: log received data
  console.log("Scholarships data received:", scholarships);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      field: "All Fields",
      amount: "Any Amount",
      deadline: "All Deadlines",
    });
    refetch();
  };

  // Helper: robustly parse an amount field from a scholarship
  const parseAmount = (s: any): number | null => {
    if (s == null) return null;
    if (typeof s === "number") return s;
    if (typeof s === "string") {
      // remove non-digit/dot characters
      const cleaned = s.replace(/[,\$\s]/g, "");
      const num = parseFloat(cleaned);
      return Number.isFinite(num) ? num : null;
    }
    return null;
  };

  // Helper: get deadline Date from scholarship (try a few common fields)
  const parseDeadline = (s: any): Date | null => {
    if (!s) return null;
    // expect ISO string or Date
    if (s instanceof Date) return s;
    if (typeof s === "string") {
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  };

  const now = useMemo(() => new Date(), []);

  // Apply filters to scholarships list
  const filteredScholarships = useMemo(() => {
    if (!Array.isArray(scholarships)) return [];

    const searchTerm = filters.search.trim().toLowerCase();

    // amount ranges used for filtering
    const amountRanges: Record<string, [number | null, number | null] | null> =
      {
        "Any Amount": null,
        "$1,000 - $5,000": [1000, 5000],
        "$5,000 - $10,000": [5000, 10000],
        "$10,000+": [10000, null],
      };

    // deadline windows in days
    const deadlineWindows: Record<string, number | null> = {
      "All Deadlines": null,
      "Next 30 days": 30,
      "Next 3 months": 90,
      "Next 6 months": 180,
    };

    return scholarships.filter((sch: any) => {
      // 1) Search: check title, name, description, organization, and field-like props
      if (searchTerm) {
        const candidates = [
          sch.title,
          sch.name,
          sch.description,
          sch.summary,
          sch.organization,
          sch.field,
          sch.fieldOfStudy,
          sch.category,
        ];
        const anyMatch = candidates
          .filter(Boolean)
          .some((c: any) => String(c).toLowerCase().includes(searchTerm));
        if (!anyMatch) return false;
      }

      // 2) Field of study filter
      if (filters.field && filters.field !== "All Fields") {
        const matchesField = (() => {
          const target = filters.field.toLowerCase();
          const candidates = [
            sch.field,
            sch.fieldOfStudy,
            sch.category,
            sch.tags,
          ];

          for (const c of candidates) {
            if (!c) continue;

            // If it's an array, check each item (and split comma/semicolon-separated values inside items)
            if (Array.isArray(c)) {
              for (const it of c) {
                if (!it) continue;
                const parts = String(it)
                  .split(/[,;|]/)
                  .map((s) => s.trim().toLowerCase())
                  .filter(Boolean);
                if (parts.includes(target)) return true;
                // allow partial matches (e.g., filter "Data" matching "Data Science")
                if (parts.some((p) => p.includes(target))) return true;
              }
            } else {
              // If it's a string like "Cultural Exchange, Leadership Development"
              const parts = String(c)
                .split(/[,;|]/)
                .map((s) => s.trim().toLowerCase())
                .filter(Boolean);
              if (parts.includes(target)) return true;
              if (parts.some((p) => p.includes(target))) return true;
            }
          }

          return false;
        })();
        if (!matchesField) return false;
      }

      // 3) Amount filter
      const range = amountRanges[filters.amount];
      if (range) {
        const amount = parseAmount(
          sch.amount ?? sch.award ?? sch.awardAmount ?? sch.prize ?? sch.value,
        );
        if (amount == null) return false; // if scholarship has no amount info, exclude when user applied an amount filter
        const [min, max] = range;
        if (min != null && amount < min) return false;
        if (max != null && amount > max) return false;
      }

      // 4) Deadline filter
      const days = deadlineWindows[filters.deadline];
      if (days != null) {
        const deadline = parseDeadline(
          sch.deadline ?? sch.applicationDeadline ?? sch.dueDate,
        );
        if (!deadline) return false; // exclude items without a deadline when filtering for upcoming deadlines
        const diffMs = deadline.getTime() - now.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (diffDays < 0 || diffDays > days) return false;
      }

      return true;
    });
  }, [scholarships, filters, now]);

  const filteredCount = filteredScholarships.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={language === "sq" ? "Programet e Shkëmbimit - TechGirls, FLEX, YES dhe Më Shumë | MsoSTEM" : "Exchange Programs - TechGirls, FLEX, YES and More | MsoSTEM"}
        description={language === "sq" ? "Zbulo programet e shkëmbimit si TechGirls, FLEX, YES, Benjamin Franklin dhe UWC. Mundësi unike për të studiuar jashtë dhe për të zhvilluar aftësitë e lidershipit." : "Discover exchange programs like TechGirls, FLEX, YES, Benjamin Franklin and UWC. Unique opportunities to study abroad and develop leadership skills."}
        keywords={language === "sq" ? "programe shkëmbimi, TechGirls, FLEX, YES, Benjamin Franklin, UWC, studime jashtë, bursa" : "exchange programs, TechGirls, FLEX, YES, Benjamin Franklin, UWC, study abroad, scholarships, girls in tech"}
        canonicalUrl="https://msostem.replit.app/scholarships"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tech <span className="gradient-text">Scholarships</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Discover funding opportunities that can help you pursue your
              dreams in technology and computer science.
            </p>
          </div>

          {/* Scholarship Filters */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search
                  </Label>
                  <div className="relative">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search scholarships..."
                      value={filters.search}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      className="pl-10"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </Label>
                  <Select
                    value={filters.field}
                    onValueChange={(value) =>
                      handleFilterChange("field", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Fields" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Fields">All Fields</SelectItem>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="Engineering">
                        Engineering
                      </SelectItem>
                      <SelectItem value="Leadership">
                        Leadership
                      </SelectItem>
                      <SelectItem value="Cultural Exchange">Cultural Exchange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Award Amount
                  </Label>
                  <Select
                    value={filters.amount}
                    onValueChange={(value) =>
                      handleFilterChange("amount", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any Amount">Any Amount</SelectItem>
                      <SelectItem value="$1,000 - $5,000">
                        $1,000 - $5,000
                      </SelectItem>
                      <SelectItem value="$5,000 - $10,000">
                        $5,000 - $10,000
                      </SelectItem>
                      <SelectItem value="$10,000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </Label>
                  <Select
                    value={filters.deadline}
                    onValueChange={(value) =>
                      handleFilterChange("deadline", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Deadlines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Deadlines">
                        All Deadlines
                      </SelectItem>
                      <SelectItem value="Next 30 days">Next 30 days</SelectItem>
                      <SelectItem value="Next 3 months">
                        Next 3 months
                      </SelectItem>
                      <SelectItem value="Next 6 months">
                        Next 6 months
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {filteredCount} scholarships
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button variant="outline" onClick={() => refetch()}>
                    Refresh Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((scholarship: any) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No scholarships found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to find more opportunities.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
