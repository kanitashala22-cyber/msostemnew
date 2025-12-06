import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  canonicalUrl?: string;
  articlePublishedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage = "https://msostem.replit.app/favicon.png",
  ogType = "website",
  canonicalUrl,
  articlePublishedTime,
  articleAuthor,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateMeta("description", description);
    if (keywords) {
      updateMeta("keywords", keywords);
    }
    
    if (noindex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      updateMeta("robots", "index, follow");
    }
    
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);
    
    if (canonicalUrl) {
      updateLink("canonical", canonicalUrl);
      updateMeta("og:url", canonicalUrl, true);
    }
    
    if (articlePublishedTime) {
      updateMeta("article:published_time", articlePublishedTime, true);
    }
    if (articleAuthor) {
      updateMeta("article:author", articleAuthor, true);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, articlePublishedTime, articleAuthor, noindex]);

  return null;
}

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
}

export function OrganizationSchema({
  name = "MsoSTEM",
  description = "Empowering young women in technology through interactive coding courses, scholarships, and community support.",
  url = "https://msostem.replit.app",
  logo = "https://msostem.replit.app/favicon.png",
}: OrganizationSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name,
      description,
      url,
      logo,
      sameAs: [],
      foundingDate: "2024",
      areaServed: "Worldwide",
      serviceType: "STEM Education",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "Young Women",
      },
    };

    let script = document.querySelector('script[data-schema="organization"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "organization");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [name, description, url, logo]);

  return null;
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url?: string;
  courseLevel?: string;
  numberOfLessons?: number;
}

export function CourseSchema({
  name,
  description,
  provider = "MsoSTEM",
  url,
  courseLevel = "Beginner",
  numberOfLessons,
}: CourseSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      name,
      description,
      provider: {
        "@type": "Organization",
        name: provider,
        url: "https://msostem.replit.app",
      },
      url,
      courseMode: "Online",
      isAccessibleForFree: true,
      educationalLevel: courseLevel,
      numberOfCredits: numberOfLessons,
      teaches: name.includes("HTML") ? "HTML and CSS programming" : name.includes("Arduino") ? "Arduino programming and electronics" : "Programming",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
    };

    const scriptId = `course-${name.replace(/\s+/g, "-").toLowerCase()}`;
    let script = document.querySelector(`script[data-schema="${scriptId}"]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", scriptId);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [name, description, provider, url, courseLevel, numberOfLessons]);

  return null;
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  wordCount?: number;
}

export function ArticleSchema({
  headline,
  description,
  author = "MsoSTEM Team",
  datePublished,
  dateModified,
  image,
  url,
  wordCount,
}: ArticleSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description,
      author: {
        "@type": "Organization",
        name: author,
        url: "https://msostem.replit.app",
      },
      publisher: {
        "@type": "Organization",
        name: "MsoSTEM",
        logo: {
          "@type": "ImageObject",
          url: "https://msostem.replit.app/favicon.png",
        },
      },
      datePublished,
      dateModified: dateModified || datePublished,
      image: image || "https://msostem.replit.app/favicon.png",
      url,
      wordCount,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    };

    const scriptId = `article-${headline.replace(/\s+/g, "-").toLowerCase().slice(0, 30)}`;
    let script = document.querySelector(`script[data-schema="${scriptId}"]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", scriptId);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [headline, description, author, datePublished, dateModified, image, url, wordCount]);

  return null;
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    let script = document.querySelector('script[data-schema="breadcrumb"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "breadcrumb");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [items]);

  return null;
}

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    let script = document.querySelector('script[data-schema="faq"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "faq");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [questions]);

  return null;
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebsiteSchema({
  name = "MsoSTEM",
  url = "https://msostem.replit.app",
  description = "Empowering young women in technology through interactive coding courses and scholarships.",
}: WebsiteSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
      url,
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${url}/blog?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    let script = document.querySelector('script[data-schema="website"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "website");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    
    return () => {
      script?.remove();
    };
  }, [name, url, description]);

  return null;
}
