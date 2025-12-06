import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertScholarshipSchema, insertUserProgressSchema, insertCodeProjectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ message: "Invalid course data" });
    }
  });

  // Scholarships
  app.get("/api/scholarships", async (req, res) => {
    try {
      const { field, amount, deadline, search } = req.query;
      const filters = {
        field: field as string,
        amount: amount as string,
        deadline: deadline as string,
        search: search as string,
      };
      
      // If no filters, get all scholarships
      const hasFilters = Object.values(filters).some(filter => filter && filter !== "");
      const scholarships = hasFilters 
        ? await storage.filterScholarships(filters)
        : await storage.getScholarships();
      
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scholarships" });
    }
  });

  app.get("/api/scholarships/:id", async (req, res) => {
    try {
      const scholarship = await storage.getScholarship(req.params.id);
      if (!scholarship) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scholarship" });
    }
  });

  app.post("/api/scholarships", async (req, res) => {
    try {
      const scholarshipData = insertScholarshipSchema.parse(req.body);
      const scholarship = await storage.createScholarship(scholarshipData);
      res.status(201).json(scholarship);
    } catch (error) {
      res.status(400).json({ message: "Invalid scholarship data" });
    }
  });

  // User Progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/:userId/:courseId", async (req, res) => {
    try {
      const progress = await storage.getUserCourseProgress(req.params.userId, req.params.courseId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Code Projects
  app.get("/api/projects/:userId", async (req, res) => {
    try {
      const projects = await storage.getUserProjects(req.params.userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/project/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertCodeProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Failed to update project" });
    }
  });

  // Blog Posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // SEO: Sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = "https://msostem.replit.app";
      const blogPosts = await storage.getBlogPosts();
      const courses = await storage.getCourses();
      const scholarships = await storage.getScholarships();
      
      const staticPages = [
        { url: "/", priority: "1.0", changefreq: "weekly" },
        { url: "/courses", priority: "0.9", changefreq: "weekly" },
        { url: "/scholarships", priority: "0.9", changefreq: "weekly" },
        { url: "/playground", priority: "0.8", changefreq: "monthly" },
        { url: "/about", priority: "0.7", changefreq: "monthly" },
        { url: "/blog", priority: "0.9", changefreq: "daily" },
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

      // Static pages
      for (const page of staticPages) {
        sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
      }

      // Blog posts
      for (const post of blogPosts) {
        const lastmod = post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }

      // Course pages
      for (const course of courses) {
        sitemap += `  <url>
    <loc>${baseUrl}/course/${course.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }

      // Scholarship pages
      for (const scholarship of scholarships) {
        sitemap += `  <url>
    <loc>${baseUrl}/scholarships/${scholarship.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }

      sitemap += `</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate sitemap" });
    }
  });

  // SEO: robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `# robots.txt for MsoSTEM
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://msostem.replit.app/sitemap.xml

# Crawl-delay (optional, for well-behaved bots)
Crawl-delay: 1

# Disallow admin/api paths from indexing
Disallow: /api/
`;
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
