import {
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Scholarship,
  type InsertScholarship,
  type UserProgress,
  type InsertUserProgress,
  type CodeProject,
  type InsertCodeProject,
  type BlogPost,
  type InsertBlogPost,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Scholarships
  getScholarships(): Promise<Scholarship[]>;
  getScholarship(id: string): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  filterScholarships(filters: {
    field?: string;
    amount?: string;
    deadline?: string;
    search?: string;
  }): Promise<Scholarship[]>;

  // User Progress
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserCourseProgress(
    userId: string,
    courseId: string,
  ): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Code Projects
  getUserProjects(userId: string): Promise<CodeProject[]>;
  getProject(id: string): Promise<CodeProject | undefined>;
  createProject(project: InsertCodeProject): Promise<CodeProject>;
  updateProject(
    id: string,
    project: Partial<CodeProject>,
  ): Promise<CodeProject>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private scholarships: Map<string, Scholarship>;
  private userProgress: Map<string, UserProgress>;
  private codeProjects: Map<string, CodeProject>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.scholarships = new Map();
    this.userProgress = new Map();
    this.codeProjects = new Map();
    this.blogPosts = new Map();

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Courses
    const courses: Course[] = [
      {
        id: "course-1",
        title: "HTML Fundamentals",
        description:
          "Master the building blocks of the web with comprehensive, beginner-friendly HTML lessons and hands-on interactive projects. Learn everything from basic tags to advanced HTML5 features!",
        level: "beginner",
        duration: "6 weeks",
        lessonsCount: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "html",
        content: {
          lessons: [
            {
              id: 1,
              title: "What is HTML? Your First Web Page",
              completed: false,
            },
            {
              id: 2,
              title: "HTML Document Structure & DOCTYPE",
              completed: false,
            },
            { id: 3, title: "Headings and Text Formatting", completed: false },
            {
              id: 4,
              title: "Paragraphs, Line Breaks & Spacing",
              completed: false,
            },
            {
              id: 5,
              title: "Lists - Organized Content Made Easy",
              completed: false,
            },
            {
              id: 6,
              title: "Links - Connecting the Web Together",
              completed: false,
            },
            {
              id: 7,
              title: "Images - Adding Visual Content",
              completed: false,
            },
            {
              id: 8,
              title: "Tables - Organizing Data in Rows & Columns",
              completed: false,
            },
            { id: 9, title: "HTML5 Semantic Elements", completed: false },
            {
              id: 10,
              title: "Forms - Collecting User Input",
              completed: false,
            },
            {
              id: 11,
              title: "Form Input Types & Validation",
              completed: false,
            },
            {
              id: 12,
              title: "Divs, Spans & Container Elements",
              completed: false,
            },
            {
              id: 13,
              title: "HTML Attributes - Adding Extra Information",
              completed: false,
            },
            {
              id: 14,
              title: "Classes and IDs - Naming Your Elements",
              completed: false,
            },
            {
              id: 15,
              title: "Audio and Video - Multimedia Content",
              completed: false,
            },
            {
              id: 16,
              title: "Accessibility - Making Websites for Everyone",
              completed: false,
            },
            {
              id: 17,
              title: "Meta Tags - Information About Your Page",
              completed: false,
            },
            {
              id: 18,
              title: "Character Entities & Special Symbols",
              completed: false,
            },
            {
              id: 19,
              title: "Comments - Notes for Developers",
              completed: false,
            },
            { id: 20, title: "Inline vs Block Elements", completed: false },
            { id: 21, title: "Building a Complete Web Page", completed: false },
            {
              id: 22,
              title: "HTML Best Practices & Code Organization",
              completed: false,
            },
            {
              id: 23,
              title: "Responsive Images & Modern HTML",
              completed: false,
            },
            { id: 24, title: "SEO-Friendly HTML Structure", completed: false },
            {
              id: 25,
              title: "Final Project - Your Personal Website",
              completed: false,
            },
          ],
        },
        createdAt: new Date(),
      },
      {
        id: "course-2",
        title: "CSS Styling & Design",
        description:
          "Master the art of beautiful web design! Learn CSS from basics to advanced techniques including animations, layouts, and modern design principles that make websites stunning and professional.",
        level: "beginner",
        duration: "5 weeks",
        lessonsCount: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "css",
        content: {
          lessons: [
            {
              id: 1,
              title: "What is CSS? - Styling Your First Page",
              completed: false,
            },
            {
              id: 2,
              title: "CSS Selectors - Targeting HTML Elements",
              completed: false,
            },
            {
              id: 3,
              title: "Colors, Backgrounds & Typography",
              completed: false,
            },
            {
              id: 4,
              title: "The Box Model - Spacing and Sizing",
              completed: false,
            },
            {
              id: 5,
              title: "Flexbox - Modern Layout Made Easy",
              completed: false,
            },
            {
              id: 6,
              title: "CSS Grid - Advanced Layout Control",
              completed: false,
            },
            {
              id: 7,
              title: "Responsive Design & Media Queries",
              completed: false,
            },
            { id: 8, title: "CSS Animations & Transitions", completed: false },
            { id: 9, title: "Positioning & Z-Index", completed: false },
            {
              id: 10,
              title: "CSS Variables & Modern Features",
              completed: false,
            },
            {
              id: 11,
              title: "Forms Styling & User Experience",
              completed: false,
            },
            {
              id: 12,
              title: "Final Project - Complete Website Design",
              completed: false,
            },
          ],
        },
        createdAt: new Date(),
      },
       {
        id: "course-3",
        title: "Arduino Microprocessors Starter Kit",
        description:
          "Learn to program Arduino microprocessors from scratch! Build exciting projects with easy-to-follow code examples, wiring diagrams, and interactive visuals.",
        level: "beginner",
        duration: "4 weeks",
        lessonsCount: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1553406830-ef2513450d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "hardware",
        content: {
          lessons: [
            { id: 1, title: "Getting Started with Arduino Uno", completed: false },
            { id: 2, title: "LED Blink - Your First Arduino Program", completed: false },
            { id: 3, title: "Understanding Digital Inputs & Buttons", completed: false },
            { id: 4, title: "Analog Sensors & Reading Data", completed: false },
            { id: 5, title: "Controlling Motors & Movement", completed: false },
            { id: 6, title: "Working with LCD Displays", completed: false },
            { id: 7, title: "Building a Temperature Monitor", completed: false },
            { id: 8, title: "Servo Motors & Precise Control", completed: false },
            { id: 9, title: "Ultrasonic Distance Sensors", completed: false },
            { id: 10, title: "Piezo Buzzers & Sound Generation", completed: false },
            { id: 11, title: "Photoresistors & Light Sensing", completed: false },
            { id: 12, title: "Final Project - Smart Home Automation", completed: false },
          ],
        },
        createdAt: new Date(),
      }, 
    ];

    courses.forEach((course) => this.courses.set(course.id, course));

    // Sample Scholarships
    const scholarships: Scholarship[] = [
      {
        id: "scholarship-1",
        title: "TechGirls",
        description:
          "Fully-funded U.S. State Department program empowering young women (ages 15-17) to pursue STEM careers through an intensive summer exchange program in the United States.",
        amount: 25000, // Estimated full program value including travel, accommodation, and education
        deadline: new Date("2025-12-06"), // Next application cycle
        field:
          "Science, Technology, Engineering, Mathematics, STEM, Leadership",
        location: "Virginia Tech University + U.S. Cities",
        eligibility:
          "Young women ages 15-17 from 37 eligible countries with strong interest in STEM fields",
        status: "upcoming", // 2026 cycle will open Fall 2025
        organizationName: "U.S. Department of State",
        applicationUrl: "https://techgirlsglobal.org/apply/",
        createdAt: new Date(),
      },
      {
        id: "scholarship-2",
        title: "Benjamin Franklin Transatlantic Fellowship",
        description:
          "Fully-funded 4-week intensive exchange program at Purdue University empowering European youth (ages 16-18) to explore diplomacy, leadership, and transatlantic relations in the United States.",
        amount: 15000, // Estimated full program value including travel, accommodation, education, and stipend
        deadline: new Date("2025-02-23"), // Application deadline varies by country, using latest deadline
        field: "Diplomacy, Leadership, International Relations, Civil Society",
        location: "Purdue University, West Lafayette, Indiana",
        eligibility:
          "European citizens ages 16-18 with strong academic achievement and leadership potential",
        status: "upcoming", // 2025 applications typically open January/February
        organizationName: "U.S. Department of State",
        applicationUrl:
          "https://exchanges.state.gov/us/program/benjamin-franklin-summer-institutes",
        createdAt: new Date(),
      },
      {
        id: "scholarship-3",
        title: "Kennedy-Lugar Youth Exchange & Study (YES)",
        description:
          "Competitive merit-based scholarship program bringing high school students from countries with significant Muslim populations to study for a full academic year in the United States, living with host families.",
        amount: 30000, // Estimated full program value including travel, accommodation, education, and stipend
        deadline: new Date("2025-03-31"), // Application deadlines vary by country, typically fall-winter
        field: "Cultural Exchange, Leadership",
        location: "United States (Various High Schools)",
        eligibility:
          "High school students ages 15-18 from 45+ participating countries with significant Muslim populations",
        status: "upcoming", // 2025-26 applications typically open in fall
        organizationName: "U.S. Department of State",
        applicationUrl:
          "https://exchanges.state.gov/non-us/program/kennedy-lugar-youth-exchange-study-yes",
        createdAt: new Date(),
      },
      {
        id: "scholarship-4",
        title: "Future Leaders Exchange (FLEX)",
        description:
          "Competitive merit-based scholarship program bringing high school students from Europe, Eurasia, and Central Asia to live with American host families and attend U.S. high schools for a full academic year.",
        amount: 35000, // Estimated full program value including travel, accommodation, education, and activities
        deadline: new Date("2025-09-30"), // Applications typically open in fall
        field: "Cultural Exchange, Leadership, Democracy",
        location: "United States (Various High Schools)",
        eligibility:
          "High school students ages 15-17 from 22 participating countries in Europe, Eurasia, and Central Asia",
        status: "upcoming", // 2025-26 applications open in fall
        organizationName: "U.S. Department of State",
        applicationUrl:
          "https://exchanges.state.gov/non-us/program/future-leaders-exchange/details",
        createdAt: new Date(),
      },
      {
        id: "scholarship-5",
        title: "AFS Global You™ Adventurer",
        description:
          "A 5-week interactive virtual exchange program, open to teens (aged 14-17) anywhere in the world, to develop key 21st-century global skills and build bridges across cultures.",
        amount: 7500,
        deadline: new Date("2025-06-30"),
        field: "Civil Society, Leadership, Cultural Exchange",
        location: "Virtual",
        eligibility: "Students aged from 14-17 years old all over the world.",
        status: "open",
        organizationName: "AFS",
        applicationUrl: "https://afs.org/adventurer/",
        createdAt: new Date(),
      },
      {
        id: "scholarship-6",
        title: "United World Colleges (UWC)",
        description:
          "A transformative 2-year experience at one of 18 selective international schools. Study the International Baccalaureate (IB) curriculum with 3,500+ students from 180+ countries. Join a global movement dedicated to peace and sustainable development.",
        amount: 50000,
        deadline: new Date("2025-12-31"),
        field: "International Education, Leadership, Global Citizenship, Environmental Studies",
        location: "Multiple campuses worldwide (Singapore, Canada, Costa Rica, Thailand, India, Kenya, Jordan, Wales, China, USA, and more)",
        eligibility:
          "High school students (ages 16-19) with strong academic records and demonstrated leadership potential. Must be in top 10-15% academically. Competitive admission through national selection committees. Fluency in English required. Commitment to UWC principles of international cooperation and service to community essential.",
        status: "upcoming",
        organizationName: "United World Colleges International",
        applicationUrl: "https://www.uwc.org",
        createdAt: new Date(),
      },
    ];

    scholarships.forEach((scholarship) =>
      this.scholarships.set(scholarship.id, scholarship),
    );

    // Sample Blog Posts
    const blogPosts: BlogPost[] = [
      {
        id: "blog-1",
        slug: "why-girls-should-learn-coding",
        title: "Why Every Girl Should Learn to Code in 2025",
        excerpt: "Discover how coding opens doors to countless opportunities and why starting early gives girls a competitive advantage in the tech industry.",
        content: `# Why Every Girl Should Learn to Code in 2025

The tech industry is one of the fastest-growing sectors globally, yet women remain significantly underrepresented. Learning to code isn't just about getting a job—it's about developing critical thinking, problem-solving skills, and the confidence to shape the future of technology. In this comprehensive guide, we'll explore why coding is essential for every young woman and how you can start your journey today.

## The Current State of Women in Tech

According to recent statistics, women hold only 28% of computing jobs in the United States, and this number is even lower in many other countries. This gender gap represents both a challenge and an enormous opportunity. Companies are actively seeking to diversify their workforce, and women who enter the tech field now will find themselves in high demand.

The lack of diversity in tech isn't just a numbers problem—it affects the products and services that shape our daily lives. When development teams lack diverse perspectives, they create solutions that may not serve everyone equally. By learning to code, you become part of the solution, bringing fresh ideas and viewpoints to the industry.

## The Growing Demand for Tech Skills

By 2025, there will be over 3.5 million computing jobs available, but only enough graduates to fill 17% of them. This gap represents a massive opportunity for young women entering the field. The Bureau of Labor Statistics projects that software development jobs will grow 22% between 2020 and 2030—much faster than the average for all occupations.

But it's not just traditional tech companies that need coders. Every industry—from healthcare and finance to entertainment and agriculture—is being transformed by technology. Understanding how to code gives you a competitive advantage regardless of which field you ultimately choose to pursue.

## Benefits of Learning to Code Early

**1. Develops Problem-Solving Skills**
Coding teaches you to break down complex problems into smaller, manageable pieces. When you write a program, you must think logically and systematically about how to achieve your goal. This computational thinking transfers to every aspect of life, from planning a project to making important decisions. You'll find yourself approaching challenges with greater confidence and clarity.

**2. Builds Confidence and Independence**
Creating something from nothing—whether it's a website, app, or game—is incredibly empowering. Every line of code you write is an act of creation. When you see your first webpage come to life or your first program run successfully, you'll experience a sense of accomplishment that builds lasting confidence. This self-assurance extends beyond coding into all areas of your life.

**3. Opens Career Doors Across Industries**
From healthcare and education to entertainment and finance, every industry needs people who understand technology. As a coder, you won't be limited to working at tech companies. You could develop apps that help patients manage their health, create educational tools that make learning more accessible, or build systems that make businesses more efficient. The possibilities are truly endless.

**4. Financial Independence and Security**
Tech jobs consistently rank among the highest-paying careers, with excellent work-life balance options. According to Glassdoor, the average software developer salary in the US is over $100,000 per year. Many tech roles also offer flexible working arrangements, including remote work options, which provide greater control over your life and schedule.

**5. Creative Expression**
Many people don't realize that coding is a creative endeavor. Just as an artist uses paint to create a masterpiece, a programmer uses code to bring ideas to life. Whether you're designing a beautiful website, creating an interactive game, or building an app that solves a real-world problem, coding allows you to express your creativity in powerful ways.

**6. Global Community and Collaboration**
When you learn to code, you join a global community of developers who share knowledge, collaborate on projects, and support each other's growth. Open-source projects, coding forums, and developer communities provide opportunities to connect with like-minded individuals from around the world.

## Breaking Down the Barriers

Many girls hesitate to pursue coding because of stereotypes and misconceptions. Let's address some common myths:

**Myth 1: "Coding is only for math geniuses"**
Reality: While logical thinking helps, coding is more about creativity and persistence. Many successful programmers weren't math prodigies—they simply loved solving problems and were willing to learn.

**Myth 2: "It's too late to start"**
Reality: It's never too late! Many successful developers started coding in their teens, twenties, or even later. The key is to begin and stay consistent.

**Myth 3: "Tech culture isn't welcoming to women"**
Reality: While challenges exist, the industry is actively working to become more inclusive. Organizations like MsoSTEM, Girls Who Code, and many others are creating supportive communities for women in tech.

## Getting Started with MsoSTEM

The best time to start learning to code is now. With resources like MsoSTEM, you can begin your journey with structured lessons designed specifically for beginners. Our platform offers:

- Interactive HTML and CSS courses with hands-on projects
- A live code playground where you can experiment and see results instantly
- Scholarship opportunities to support your education
- A supportive community of fellow learners

Start with HTML and CSS—they're the building blocks of the web and a gentle introduction to programming concepts. You'll be amazed at how quickly you can create your first webpage!

## Your Journey Starts Today

Remember, every expert was once a beginner. The most important step is the first one. Don't worry about being perfect—focus on learning, experimenting, and having fun. With dedication and the right resources, you can develop skills that will serve you throughout your life and career.

Join thousands of young women who are already on their coding journey. Your future in tech awaits!`,
        category: "Education",
        imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 12,
        published: true,
        createdAt: new Date("2025-01-15"),
      },
      {
        id: "blog-2",
        slug: "html-css-basics-beginners-guide",
        title: "HTML & CSS Basics: A Complete Beginner's Guide",
        excerpt: "Master the fundamentals of web development with this comprehensive guide to HTML and CSS. Perfect for absolute beginners!",
        content: `# HTML & CSS Basics: A Complete Beginner's Guide

Welcome to the world of web development! If you've ever wondered how websites are built, you're in the right place. This comprehensive guide will take you from complete beginner to confidently creating your own web pages. By the end of this article, you'll understand the fundamental building blocks of the web and be ready to start creating your own projects.

## Understanding the Web

Before we dive into coding, let's understand how websites work. When you visit a website, your browser downloads files from a server and displays them on your screen. These files typically include HTML (structure), CSS (styling), and JavaScript (interactivity). Today, we'll focus on the first two.

## What is HTML?

HTML (HyperText Markup Language) is the skeleton of every webpage. It defines the structure and content—headings, paragraphs, images, links, and more. HTML uses "tags" to mark up content and tell the browser how to display it.

### Understanding HTML Tags

HTML tags are like labels that tell the browser what type of content something is. Most tags come in pairs: an opening tag and a closing tag. For example:

- \`<h1>Title</h1>\` - Creates a main heading
- \`<p>Text</p>\` - Creates a paragraph
- \`<a href="url">Link</a>\` - Creates a clickable link
- \`<img src="image.jpg" alt="description">\` - Displays an image

### Your First HTML Document

Every HTML document follows a basic structure. Here's a complete example:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>Hello! I'm learning to code with MsoSTEM.</p>
      <p>Web development is exciting because I can create anything I imagine!</p>
    </section>
    
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Email: myemail@example.com</p>
    </section>
  </main>
  
  <footer>
    <p>© 2025 My Website. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

### Essential HTML Tags You Should Know

**Headings**: HTML has six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important).

**Text Formatting**:
- \`<strong>\` - Bold text (important content)
- \`<em>\` - Italic text (emphasized content)
- \`<br>\` - Line break
- \`<hr>\` - Horizontal rule (divider line)

**Lists**:
- \`<ul>\` - Unordered (bullet) list
- \`<ol>\` - Ordered (numbered) list
- \`<li>\` - List item

**Links and Images**:
- \`<a href="url">\` - Creates hyperlinks
- \`<img src="path" alt="description">\` - Embeds images

**Containers**:
- \`<div>\` - Generic container for grouping elements
- \`<span>\` - Inline container for styling small pieces of text

## What is CSS?

CSS (Cascading Style Sheets) is the styling language that makes websites beautiful. While HTML provides structure, CSS controls the visual presentation—colors, fonts, spacing, layouts, and even animations. Without CSS, websites would be plain black text on white backgrounds!

### How CSS Works

CSS works by selecting HTML elements and applying styles to them. There are three main parts to a CSS rule:

1. **Selector**: Which elements to style
2. **Property**: What aspect to change
3. **Value**: The new setting

\`\`\`css
selector {
  property: value;
  another-property: another-value;
}
\`\`\`

### Ways to Add CSS to Your Page

**1. External Stylesheet (Recommended)**
Create a separate .css file and link it in your HTML:
\`\`\`html
<link rel="stylesheet" href="styles.css">
\`\`\`

**2. Internal Styles**
Add styles in the \`<head>\` section:
\`\`\`html
<style>
  h1 { color: purple; }
</style>
\`\`\`

**3. Inline Styles**
Add styles directly to elements (not recommended for large projects):
\`\`\`html
<h1 style="color: purple;">Hello</h1>
\`\`\`

### Essential CSS Properties

**Colors and Backgrounds**:
\`\`\`css
body {
  background-color: #f5f5f5;
  color: #333333;
}

.highlight {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: white;
}
\`\`\`

**Typography**:
\`\`\`css
body {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
\`\`\`

**Spacing (Margin and Padding)**:
\`\`\`css
.card {
  margin: 20px;        /* Space outside the element */
  padding: 30px;       /* Space inside the element */
  border: 1px solid #ddd;
  border-radius: 10px; /* Rounded corners */
}
\`\`\`

**Layout with Flexbox**:
\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* Horizontal alignment */
  align-items: center;      /* Vertical alignment */
  gap: 20px;                /* Space between items */
}
\`\`\`

### A Complete CSS Example

\`\`\`css
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #212529;
  line-height: 1.6;
}

header {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
}

nav a:hover {
  text-decoration: underline;
}

main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

h2 {
  color: #8B5CF6;
  margin-bottom: 15px;
}

footer {
  text-align: center;
  padding: 20px;
  background: #212529;
  color: white;
}
\`\`\`

## Practice Makes Perfect

The best way to learn is by doing. Here are some exercises to try:

1. **Create a Personal Bio Page**: Include your name, a description, and your hobbies
2. **Build a Photo Gallery**: Display images in a grid layout
3. **Design a Recipe Card**: Show ingredients and instructions with nice styling
4. **Make a Contact Form**: Practice form elements and styling

## Next Steps

Now that you understand the basics, here's how to continue learning:

1. **Use MsoSTEM's Code Playground**: Experiment with code in real-time
2. **Build Small Projects**: Apply what you learn immediately
3. **Learn Responsive Design**: Make websites work on all screen sizes
4. **Explore JavaScript**: Add interactivity to your pages

Remember, every expert developer started exactly where you are now. Keep practicing, stay curious, and don't be afraid to make mistakes—that's how we learn!`,
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 15,
        published: true,
        createdAt: new Date("2025-01-10"),
      },
      {
        id: "blog-3",
        slug: "exchange-programs-for-stem-students",
        title: "Top Exchange Programs for STEM Students in 2025",
        excerpt: "Explore the best fully-funded exchange programs available for students passionate about science, technology, engineering, and mathematics.",
        content: `# Top Exchange Programs for STEM Students in 2025

Exchange programs offer life-changing opportunities to study abroad, gain international experience, and build a global network. For students passionate about science, technology, engineering, and mathematics (STEM), these programs can open doors to world-class education, mentorship, and career opportunities that might otherwise seem out of reach.

In this comprehensive guide, we'll explore the best fully-funded exchange programs available for STEM students, including detailed information about eligibility, application processes, and what makes each program unique.

## Why Apply for Exchange Programs?

Before diving into specific programs, let's understand why exchange programs are so valuable:

**1. World-Class Education**
Many exchange programs provide access to top universities and institutions that offer cutting-edge STEM education, state-of-the-art laboratories, and renowned faculty members.

**2. Cultural Immersion**
Living in a different country expands your worldview, improves language skills, and helps you develop cultural sensitivity—all essential skills in today's globalized workforce.

**3. Professional Networking**
You'll meet students, professors, and professionals from around the world, building connections that can benefit your career for decades to come.

**4. Personal Growth**
Navigating life in a new country builds independence, resilience, and problem-solving skills that employers value highly.

**5. Financial Support**
Most programs covered here are fully funded, meaning your travel, accommodation, meals, and educational costs are covered. This makes international experience accessible regardless of your family's financial situation.

## TechGirls

The flagship program for young women in STEM! This U.S. Department of State initiative brings girls aged 15-17 from 37 countries to the United States for intensive technology training at Virginia Tech.

### Program Overview
- **Duration**: 23 days (typically July)
- **Location**: Virginia Tech campus, Blacksburg, Virginia, USA
- **Cost to Participants**: Fully funded (all expenses covered)
- **Age Requirement**: 15-17 years old

### What You'll Experience
During the program, participants engage in:
- Hands-on technology workshops and coding bootcamps
- Site visits to leading tech companies
- Leadership and professional development sessions
- Cultural activities and community service projects
- Mentorship from women working in technology

### Eligibility Requirements
- Female students aged 15-17
- Citizens of eligible countries (check the official website for the current list)
- Demonstrated interest in STEM fields
- Strong English proficiency
- No previous travel to the United States on a Department of State-funded program

### Application Tips
- Highlight your passion for technology with specific examples
- Describe leadership activities in your school or community
- Explain how you plan to share what you learn with others
- Show your commitment to empowering other girls in STEM

## Benjamin Franklin Transatlantic Fellowship

Perfect for European students interested in the intersection of technology, diplomacy, and international relations. This program brings together young leaders from across Europe and the United States.

### Program Overview
- **Duration**: 4 weeks (typically June-July)
- **Location**: Purdue University, Indiana, USA (plus travel to Washington, D.C.)
- **Cost to Participants**: Fully funded
- **Age Requirement**: 16-18 years old

### What You'll Experience
- Academic sessions on transatlantic relations and global challenges
- Leadership workshops and team-building activities
- Visits to government institutions in Washington, D.C.
- Cultural exchange activities with American peers
- Collaborative projects addressing real-world issues

### Eligibility Requirements
- Citizens of eligible European countries
- Strong academic record
- Demonstrated interest in civic engagement and leadership
- Excellent English language skills
- Commitment to community service

### Why This Program Matters for STEM Students
While not exclusively STEM-focused, this program is excellent for students interested in how technology policy shapes international relations, cybersecurity, climate change solutions, and the role of innovation in diplomacy.

## Youth Exchange and Study (YES) Program

One of the longest-running exchange programs, YES brings high school students from countries with significant Muslim populations to the United States for a full academic year.

### Program Overview
- **Duration**: Full academic year (10-11 months)
- **Location**: Various cities across the United States
- **Cost to Participants**: Fully funded
- **Age Requirement**: 15-17 years old

### What You'll Experience
- Full immersion in American high school
- Living with a host family
- Community service requirements
- Cultural and educational activities
- Opportunity to take STEM courses at American schools

### Benefits for STEM Students
American high schools often offer advanced STEM courses, robotics clubs, science fairs, and access to technology that may not be available in your home country. This year-long experience allows deep engagement with these opportunities.

## Future Leaders Exchange (FLEX) Program

Similar to YES, FLEX focuses on students from Eurasia and provides a full academic year in the United States.

### Program Overview
- **Duration**: Full academic year
- **Location**: Various cities across the United States
- **Cost to Participants**: Fully funded
- **Age Requirement**: 15-17 years old

### Eligibility Countries
Students from Armenia, Azerbaijan, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Mongolia, Montenegro, North Macedonia, Serbia, Tajikistan, Turkmenistan, and Ukraine are eligible.

### STEM Opportunities
FLEX students often join robotics teams, participate in science olympiads, and take advanced math and science courses during their exchange year.

## United World Colleges (UWC)

A transformative 2-year experience at one of 18 selective international schools worldwide. UWC is unique because it's not just an exchange—it's a complete high school education alongside students from 180+ countries.

### Program Overview
- **Duration**: 2 years (completing the International Baccalaureate diploma)
- **Locations**: 18 campuses worldwide (UK, USA, Canada, Costa Rica, India, Singapore, and more)
- **Scholarships**: Full and partial scholarships available based on need

### Why UWC is Special for STEM Students
- International Baccalaureate curriculum with strong STEM options
- Access to research opportunities and advanced laboratories
- Collaboration with students from diverse backgrounds
- Many UWC graduates go on to top universities like MIT, Stanford, and Oxford

### The Application Process
1. Apply through your national committee (each country has its own selection process)
2. Submit essays, academic records, and references
3. Participate in interviews and selection events
4. If selected, you'll be matched with a UWC school

## AFS Intercultural Programs

AFS offers various exchange opportunities, from short-term summer programs to full academic years, in over 50 countries.

### Program Types
- **Year Programs**: Full academic year abroad
- **Semester Programs**: Half-year exchange
- **Summer Programs**: 4-8 week cultural immersion

### Scholarships
AFS offers numerous scholarships, and many local chapters have additional funding available. The organization is committed to making exchange accessible to students from all backgrounds.

## How to Prepare a Winning Application

Regardless of which program you apply to, here are strategies to strengthen your application:

### 1. Start Early
Most programs have deadlines 6-12 months before the program starts. Begin researching and preparing at least a year in advance.

### 2. Focus on Leadership
Every program wants students who will make an impact. Document your leadership experiences:
- School clubs and organizations you've led
- Community service projects you've organized
- Mentoring or tutoring you've done

### 3. Demonstrate STEM Passion
Show concrete examples of your interest in STEM:
- Personal projects you've built
- Courses or online learning you've completed
- Science fairs or competitions you've participated in
- How you've shared STEM knowledge with others

### 4. Practice Your English
Strong English skills are essential for most programs. If English isn't your first language:
- Take practice tests (TOEFL, IELTS)
- Watch English-language media
- Practice speaking with native speakers online
- Read English books and articles about STEM topics

### 5. Be Authentic
Selection committees read hundreds of applications. What makes you unique? Share your genuine story, challenges you've overcome, and your specific vision for how the program will help you achieve your goals.

### 6. Get Strong Recommendations
Ask teachers or mentors who know you well and can speak to your character, academic abilities, and potential. Give them plenty of time to write thoughtful letters.

## After the Program: Giving Back

One of the most important aspects of exchange programs is the commitment to share what you've learned. Successful alumni often:
- Start STEM clubs in their schools
- Mentor younger students applying to programs
- Organize community workshops on technology
- Become ambassadors for international understanding

Your exchange experience is just the beginning. The real impact comes from how you use that experience to help others.

## Start Your Journey Today

These programs have transformed the lives of thousands of students. They could transform yours too. Start researching, prepare your applications carefully, and don't be discouraged by the competitive nature of these programs. Every successful applicant once wondered if they had a chance.

At MsoSTEM, we're here to support you on this journey. Explore our resources, connect with alumni, and take the first step toward an incredible international experience!`,
        category: "Opportunities",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 18,
        published: true,
        createdAt: new Date("2025-01-05"),
      },
      {
        id: "blog-4",
        slug: "building-your-first-website",
        title: "Building Your First Website: Step-by-Step Project",
        excerpt: "Follow along as we build a complete personal portfolio website from scratch using HTML and CSS.",
        content: `# Building Your First Website: Step-by-Step Project

Let's build something real! In this comprehensive tutorial, we'll create a beautiful, professional personal portfolio website from scratch using only HTML and CSS. By the end of this guide, you'll have a fully functional website that you can customize and use to showcase your skills and projects.

## Why Build a Portfolio Website?

Before we start coding, let's understand why a portfolio website is so valuable:

**1. First Impressions Matter**
In the digital age, your online presence is often the first thing potential employers, collaborators, or clients see. A well-designed portfolio immediately demonstrates your skills.

**2. Showcase Your Work**
A portfolio gives you a dedicated space to display your best projects, achievements, and what makes you unique.

**3. Learn By Doing**
Building your own website is the best way to practice HTML and CSS. You'll encounter real challenges and learn how to solve them.

**4. Stand Out**
While many people have resumes, fewer have custom-built portfolio websites. This sets you apart from the crowd.

## Project Overview

We'll create a complete portfolio with these sections:
- **Navigation Bar**: Easy access to all sections
- **Hero Section**: Your name, title, and a compelling introduction
- **About Section**: Your story and what makes you unique
- **Skills Section**: Technologies and abilities you've mastered
- **Projects Section**: Showcase of your best work
- **Contact Section**: How people can reach you
- **Footer**: Social links and copyright

## Step 1: Setting Up Your Project

First, create two files in a folder:
- \`index.html\` - Your webpage structure
- \`style.css\` - Your styling

### The Complete HTML Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Portfolio</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="logo">YourName</a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero" id="home">
    <div class="hero-content">
      <p class="hero-greeting">Hello, I'm</p>
      <h1 class="hero-name">Your Name</h1>
      <p class="hero-title">Future Web Developer & Tech Enthusiast</p>
      <p class="hero-description">
        I'm passionate about creating beautiful, functional websites 
        and learning new technologies. Currently studying web development 
        with MsoSTEM and building my skills one project at a time.
      </p>
      <div class="hero-buttons">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-secondary">Get In Touch</a>
      </div>
    </div>
  </header>

  <!-- About Section -->
  <section class="about" id="about">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-image">
          <div class="image-placeholder">Your Photo</div>
        </div>
        <div class="about-text">
          <p>
            Hi there! I'm a high school student with a passion for technology 
            and a dream of becoming a software developer. My journey into coding 
            started when I discovered MsoSTEM and realized that I could actually 
            create the websites I use every day.
          </p>
          <p>
            When I'm not coding, you can find me reading about the latest tech 
            trends, participating in my school's robotics club, or teaching 
            younger students about programming. I believe that technology has 
            the power to change lives, and I want to be part of that change.
          </p>
          <p>
            My goal is to earn a scholarship to study computer science at a 
            top university and eventually work at a company where I can build 
            products that help people around the world.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="skills" id="skills">
    <div class="container">
      <h2 class="section-title">My Skills</h2>
      <div class="skills-grid">
        <div class="skill-card">
          <div class="skill-icon">📝</div>
          <h3>HTML5</h3>
          <p>Building semantic, accessible web page structures</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon">🎨</div>
          <h3>CSS3</h3>
          <p>Creating beautiful, responsive designs with modern CSS</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon">⚡</div>
          <h3>JavaScript</h3>
          <p>Adding interactivity and dynamic features (learning)</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon">🔧</div>
          <h3>Problem Solving</h3>
          <p>Breaking down complex challenges into manageable steps</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects" id="projects">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-image">Project 1</div>
          <div class="project-info">
            <h3>Personal Portfolio</h3>
            <p>My first website! Built with HTML and CSS to showcase my journey in web development.</p>
            <div class="project-tags">
              <span>HTML</span>
              <span>CSS</span>
            </div>
          </div>
        </div>
        <div class="project-card">
          <div class="project-image">Project 2</div>
          <div class="project-info">
            <h3>Recipe Collection</h3>
            <p>A beautifully designed recipe website featuring my family's favorite dishes.</p>
            <div class="project-tags">
              <span>HTML</span>
              <span>CSS</span>
            </div>
          </div>
        </div>
        <div class="project-card">
          <div class="project-image">Project 3</div>
          <div class="project-info">
            <h3>School Club Page</h3>
            <p>Website for my school's coding club to share resources and announcements.</p>
            <div class="project-tags">
              <span>HTML</span>
              <span>CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact" id="contact">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <p class="contact-description">
        I'm always excited to connect with fellow learners, potential mentors, 
        or anyone interested in technology. Feel free to reach out!
      </p>
      <div class="contact-info">
        <div class="contact-item">
          <span class="contact-icon">📧</span>
          <span>your.email@example.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📍</span>
          <span>Your City, Country</span>
        </div>
      </div>
      <a href="mailto:your.email@example.com" class="btn btn-primary">Send Email</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>© 2025 Your Name. Built with ❤️ and lots of learning.</p>
      <p class="footer-credit">Created while learning with MsoSTEM</p>
    </div>
  </footer>
</body>
</html>
\`\`\`

## Step 2: Base Styles and Variables

Now let's create the CSS. We'll start with base styles and CSS variables for easy customization:

\`\`\`css
/* CSS Variables for Easy Customization */
:root {
  --primary-color: #8B5CF6;
  --secondary-color: #EC4899;
  --text-dark: #1F2937;
  --text-light: #6B7280;
  --background: #F9FAFB;
  --white: #FFFFFF;
  --gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
  color: var(--text-dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: var(--gradient);
  margin: 15px auto 0;
  border-radius: 2px;
}
\`\`\`

## Step 3: Navigation Styles

\`\`\`css
/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-color);
}
\`\`\`

## Step 4: Hero Section Styles

\`\`\`css
/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient);
  padding: 100px 20px;
  text-align: center;
}

.hero-content {
  max-width: 700px;
  color: var(--white);
}

.hero-greeting {
  font-size: 1.25rem;
  margin-bottom: 10px;
  opacity: 0.9;
}

.hero-name {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.hero-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  opacity: 0.95;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: var(--white);
  color: var(--primary-color);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-secondary:hover {
  background: var(--white);
  color: var(--primary-color);
}
\`\`\`

## Step 5: About, Skills, Projects, and Contact Styles

\`\`\`css
/* About Section */
.about {
  padding: 100px 0;
  background: var(--white);
}

.about-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 50px;
  align-items: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background: var(--gradient);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 600;
}

.about-text p {
  margin-bottom: 20px;
  color: var(--text-light);
}

/* Skills Section */
.skills {
  padding: 100px 0;
  background: var(--background);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.skill-card {
  background: var(--white);
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.skill-card:hover {
  transform: translateY(-10px);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.skill-card h3 {
  margin-bottom: 10px;
  color: var(--text-dark);
}

.skill-card p {
  color: var(--text-light);
  font-size: 0.95rem;
}

/* Projects Section */
.projects {
  padding: 100px 0;
  background: var(--white);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.project-card {
  background: var(--background);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-image {
  height: 200px;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 600;
  font-size: 1.2rem;
}

.project-info {
  padding: 25px;
}

.project-info h3 {
  margin-bottom: 10px;
}

.project-info p {
  color: var(--text-light);
  margin-bottom: 15px;
}

.project-tags {
  display: flex;
  gap: 10px;
}

.project-tags span {
  background: var(--primary-color);
  color: var(--white);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
}

/* Contact Section */
.contact {
  padding: 100px 0;
  background: var(--background);
  text-align: center;
}

.contact-description {
  max-width: 600px;
  margin: 0 auto 40px;
  color: var(--text-light);
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-icon {
  font-size: 1.5rem;
}

/* Footer */
.footer {
  background: var(--text-dark);
  color: var(--white);
  padding: 40px 0;
  text-align: center;
}

.footer-credit {
  margin-top: 10px;
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-name {
    font-size: 2.5rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .image-placeholder {
    margin: 0 auto;
  }
  
  .nav-links {
    display: none; /* Add hamburger menu for mobile */
  }
}
\`\`\`

## Customization Tips

Now that you have a working portfolio, here's how to make it yours:

1. **Change Colors**: Update the CSS variables in \`:root\` to match your preferred color scheme
2. **Add Your Photo**: Replace the image placeholder with an actual image using \`<img>\`
3. **Update Content**: Replace all placeholder text with your real information
4. **Add Real Projects**: Take screenshots of your work and link to live demos
5. **Custom Domain**: When you're ready, you can host this on GitHub Pages for free!

## What You've Learned

Congratulations! By completing this project, you've practiced:
- Semantic HTML structure
- CSS Flexbox and Grid layouts
- CSS variables and custom properties
- Hover effects and transitions
- Responsive design basics
- Organizing a multi-section webpage

Keep building, keep learning, and remember—this is just the beginning of your web development journey!`,
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 20,
        published: true,
        createdAt: new Date("2025-01-01"),
      },
      {
        id: "blog-5",
        slug: "women-in-tech-success-stories",
        title: "Inspiring Women in Tech: Success Stories to Motivate You",
        excerpt: "Read about remarkable women who broke barriers in technology and learn from their journeys to success.",
        content: `# Inspiring Women in Tech: Success Stories to Motivate You

Throughout history, women have made groundbreaking contributions to technology, often overcoming significant barriers and societal expectations. These remarkable individuals prove that there are no limits to what you can achieve in the tech industry. Their stories of perseverance, innovation, and impact continue to inspire new generations of women to pursue careers in STEM.

In this article, we'll explore the lives and achievements of pioneering women who shaped the technology landscape, as well as contemporary leaders who are continuing to push boundaries today.

## The Pioneers: Women Who Laid the Foundation

### Ada Lovelace (1815-1852): The First Computer Programmer

Augusta Ada King, Countess of Lovelace, is widely recognized as the world's first computer programmer. In the 1840s—more than a century before electronic computers existed—Ada worked with Charles Babbage on his proposed mechanical general-purpose computer, the Analytical Engine.

**Her Contributions:**
- Wrote the first algorithm designed for implementation on a machine
- Recognized that computers could do more than just calculations—they could create music, art, and more
- Her notes on the Analytical Engine are considered the first complete computer program

**What We Can Learn from Ada:**
Ada was homeschooled and largely self-taught in mathematics. She combined her love of science with creativity, calling her approach "poetical science." Her story shows us that passion and curiosity can lead to revolutionary discoveries, even when working in uncharted territory.

### Grace Hopper (1906-1992): The Queen of Code

Rear Admiral Grace Murray Hopper was a pioneer of computer programming and a United States Navy rear admiral. She was one of the first programmers of the Harvard Mark I computer and developed the first compiler for a computer programming language.

**Her Contributions:**
- Developed COBOL, one of the first high-level programming languages still in use today
- Popularized the idea of machine-independent programming languages
- Coined the term "debugging" after finding an actual moth causing a malfunction in the Mark II computer
- Served in the Navy until age 79, making her one of the oldest serving officers

**Famous Quote:**
"The most dangerous phrase in the language is, 'We've always done it this way.'"

**What We Can Learn from Grace:**
Grace never stopped learning or pushing boundaries. She believed in making technology accessible and was a passionate advocate for young people in computing. She proves that innovation comes from challenging conventional thinking.

### Katherine Johnson (1918-2020): The Human Computer

Katherine Johnson was a mathematician whose calculations of orbital mechanics were critical to the success of early U.S. crewed spaceflights. Her story was featured in the book and movie "Hidden Figures."

**Her Contributions:**
- Calculated the trajectory for the space flight of Alan Shepard, the first American in space
- Verified the calculations of early electronic computers for John Glenn's orbital mission
- Worked on calculations for the Space Shuttle program
- Received the Presidential Medal of Freedom in 2015

**What We Can Learn from Katherine:**
Despite facing discrimination as a Black woman in the 1950s and 60s, Katherine's brilliance was undeniable. She asked to be included in meetings where women weren't typically allowed and earned the trust of astronauts who depended on her calculations for their lives. Her persistence in the face of obstacles is truly inspiring.

### Hedy Lamarr (1914-2000): The Actress Who Invented WiFi

Hedy Lamarr was not only a famous Hollywood actress but also a brilliant inventor. During World War II, she co-invented an early technique for spread spectrum communications—technology that forms the basis for today's WiFi, GPS, and Bluetooth.

**Her Contributions:**
- Co-invented frequency-hopping spread spectrum technology
- Received a patent in 1942, though it wasn't recognized until decades later
- Inducted into the National Inventors Hall of Fame in 2014

**What We Can Learn from Hedy:**
Hedy's story reminds us that brilliance can come from unexpected places. She pursued her passion for invention despite her fame in a completely different field, showing that you don't have to be defined by a single identity or career path.

## Modern Trailblazers: Women Shaping Today's Tech Landscape

### Reshma Saujani: Founder of Girls Who Code

Reshma Saujani founded Girls Who Code in 2012 after running for U.S. Congress and seeing firsthand the gender gap in computing classes. What started as a small summer program has grown into a global movement.

**Her Impact:**
- Girls Who Code has reached over 500,000 girls
- The organization operates in all 50 U.S. states and several countries
- Alumni are pursuing degrees in computer science at 15 times the national average
- Author of "Brave, Not Perfect," encouraging girls to take risks

**Her Message:**
"We have to teach girls to take risks, to be resilient, and to embrace imperfection."

### Fei-Fei Li: AI Pioneer and Advocate for Diversity

Dr. Fei-Fei Li is a Professor at Stanford University and the co-director of Stanford's Human-Centered AI Institute. Her work on ImageNet revolutionized artificial intelligence and computer vision.

**Her Contributions:**
- Created ImageNet, a database of millions of labeled images that transformed AI research
- Her work enabled major breakthroughs in deep learning and image recognition
- Founded AI4ALL, a nonprofit working to increase diversity in AI
- Advocates for human-centered AI development that considers ethical implications

**Her Vision:**
Dr. Li believes that AI development needs diverse perspectives to ensure the technology benefits everyone. She works tirelessly to bring more women and underrepresented minorities into the field.

### Kimberly Bryant: Founder of Black Girls CODE

Kimberly Bryant founded Black Girls CODE in 2011 to address the lack of representation of African-American women in tech. The organization has grown from a small workshop in San Francisco to a global movement.

**Her Impact:**
- Has introduced over 30,000 girls to computer science
- Operates chapters across the United States and in South Africa
- Provides workshops, hackathons, and summer camps
- Named to Business Insider's "25 Most Influential African-Americans in Technology"

**Her Mission:**
"We want to be the girl scouts of technology—not just teaching girls to code, but building a sisterhood."

### Susan Wojcicki: Former CEO of YouTube

Susan Wojcicki was the CEO of YouTube from 2014 to 2023 and one of the most powerful women in tech. She was Google's first marketing manager and was instrumental in Google's acquisition of YouTube.

**Her Journey:**
- Rented her garage to Larry Page and Sergey Brin where they started Google
- Joined Google as employee #16
- Oversaw YouTube's growth to over 2 billion monthly users
- Named one of the most powerful women in business by Fortune multiple times

**Her Advice:**
"Finding your passion isn't just about careers and money. It's about finding your authentic self."

## Rising Stars: Young Women Making an Impact

### Gitanjali Rao: Time's First-Ever Kid of the Year

At just 15 years old, Gitanjali Rao was named Time's first-ever Kid of the Year in 2020. She's invented devices to detect lead in water and combat cyberbullying using AI.

**Her Achievements:**
- Invented Tethys, a device to detect lead contamination in water
- Created Kindly, an app and Chrome extension to detect cyberbullying
- Named to Forbes 30 Under 30 list
- Hosts innovation workshops for students worldwide

**Her Philosophy:**
"If I can do it, you can do it, and anyone can do it."

### Emma Yang: Teenage App Developer

Emma Yang developed the app "Timeless" at age 14 to help her grandmother, who has Alzheimer's disease. The app uses AI and facial recognition to help Alzheimer's patients recognize their loved ones.

**Her Story:**
Emma taught herself to code at age 11 and has since given TED talks, been featured in major publications, and continues to develop technology to help people with Alzheimer's disease.

## Common Threads: What These Women Teach Us

Looking at the stories of these remarkable women, several themes emerge:

**1. Curiosity Drives Innovation**
Every woman featured here started with curiosity—a desire to understand how things work and a vision for how they could work better.

**2. Persistence Overcomes Barriers**
Many of these women faced significant obstacles: gender discrimination, racial prejudice, lack of recognition. Yet they persisted because they believed in their work.

**3. Purpose Fuels Passion**
Whether improving lives through AI, teaching girls to code, or solving global challenges, these women are driven by a desire to make a positive impact.

**4. It's Never Too Early (or Too Late) to Start**
From teenage inventors like Gitanjali Rao to Grace Hopper serving in the Navy until 79, age is no barrier to making meaningful contributions.

**5. Supporting Others Multiplies Impact**
Many of these women have dedicated significant effort to mentoring and creating opportunities for the next generation.

## Your Story Starts Now

These women started just like you—curious, determined, and ready to learn. They didn't wait for permission or perfect circumstances. They saw problems to solve and possibilities to explore.

Your journey in tech begins with a single line of code, a question asked, or a problem you want to solve. You don't need to know everything—you just need to start.

At MsoSTEM, we're here to support you on your journey. Learn coding, explore opportunities, and join a community of young women who are writing the next chapter of women in tech.

Who knows? Maybe one day, your story will inspire future generations of women in technology.`,
        category: "Inspiration",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 15,
        published: true,
        createdAt: new Date("2024-12-28"),
      },
      {
        id: "blog-6",
        slug: "arduino-projects-for-beginners",
        title: "Fun Arduino Projects for Beginners: Getting Started with Electronics",
        excerpt: "Combine coding with electronics! Learn how to start building real-world projects with Arduino microcontrollers.",
        content: `# Fun Arduino Projects for Beginners: Getting Started with Electronics

Arduino is a fantastic way to bridge the gap between code and the physical world. When you learn Arduino, you're not just writing software—you're creating real, tangible projects that interact with the environment around you. This comprehensive guide will introduce you to Arduino and walk you through several beginner-friendly projects that you can build at home.

## What is Arduino?

Arduino is an open-source electronics platform based on easy-to-use hardware and software. It consists of:

**1. Arduino Board**: A small computer (microcontroller) that you can program to control electronic components
**2. Arduino IDE**: Free software where you write and upload code to the board
**3. Components**: LEDs, sensors, motors, buttons, and countless other electronic parts you can connect

### Why Arduino is Perfect for Beginners

- **Affordable**: Starter kits are available for under $30
- **Easy to Learn**: The programming language is simplified and beginner-friendly
- **Huge Community**: Millions of projects, tutorials, and helpful forums
- **Instant Results**: See your code come to life immediately
- **No Soldering Required**: Most beginner projects use breadboards with plug-and-play connections

### Understanding the Arduino Board

The most popular board for beginners is the Arduino Uno. Here's what you'll find on it:

- **USB Port**: Connects to your computer for programming and power
- **Digital Pins (0-13)**: For controlling things (on/off signals)
- **Analog Pins (A0-A5)**: For reading sensors (variable values)
- **Power Pins**: Provide 5V and 3.3V power to components
- **Ground (GND) Pins**: Complete electrical circuits
- **Reset Button**: Restarts your program

## Essential Components for Getting Started

Before diving into projects, let's understand the basic components:

### LEDs (Light Emitting Diodes)
Small lights that come in many colors. They have two legs:
- **Anode (longer leg)**: Connects to positive (power)
- **Cathode (shorter leg)**: Connects to negative (ground)

### Resistors
Limit the flow of electricity to protect components. For most LED projects, you'll use 220Ω or 330Ω resistors.

### Breadboard
A reusable board with holes for connecting components without soldering. The holes are connected in rows and columns internally.

### Jumper Wires
Colored wires for connecting components on the breadboard to the Arduino.

### Push Buttons
Switches that make or break a connection when pressed.

## Project 1: Blinking LED (The "Hello World" of Arduino)

This is where every Arduino journey begins! You'll make an LED blink on and off.

### What You'll Need:
- Arduino Uno
- USB cable
- 1 LED (any color)
- 1 220Ω resistor
- Breadboard
- 2 jumper wires

### Circuit Setup:
1. Insert the LED into the breadboard
2. Connect a wire from Arduino pin 13 to the LED's anode (long leg)
3. Connect a resistor from the LED's cathode (short leg) to another row
4. Connect a wire from that row to Arduino GND

### The Code:

\`\`\`cpp
// Blinking LED - Your First Arduino Project!

// setup() runs once when you power on or reset the Arduino
void setup() {
  // Set pin 13 as an OUTPUT (to send signals)
  pinMode(13, OUTPUT);
}

// loop() runs over and over forever
void loop() {
  digitalWrite(13, HIGH);   // Turn LED ON (HIGH = 5 volts)
  delay(1000);              // Wait 1000 milliseconds (1 second)
  digitalWrite(13, LOW);    // Turn LED OFF (LOW = 0 volts)
  delay(1000);              // Wait another second
}
\`\`\`

### How It Works:
- \`pinMode()\` tells Arduino whether a pin is for input or output
- \`digitalWrite()\` sends power (HIGH) or removes it (LOW)
- \`delay()\` pauses the program for a set number of milliseconds

### Experiments to Try:
- Change the delay values to make the LED blink faster or slower
- Try different patterns (two quick blinks, then a pause)
- Add more LEDs on different pins

## Project 2: Traffic Light Simulator

Create a working traffic light with three LEDs!

### What You'll Need:
- Arduino Uno
- 1 red LED, 1 yellow LED, 1 green LED
- 3 220Ω resistors
- Breadboard
- Jumper wires

### Circuit Setup:
Connect each LED to a different pin:
- Red LED → Pin 8
- Yellow LED → Pin 9
- Green LED → Pin 10
(Remember to add resistors and connect to GND)

### The Code:

\`\`\`cpp
// Traffic Light Simulator

int redPin = 8;
int yellowPin = 9;
int greenPin = 10;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  // Green light
  digitalWrite(greenPin, HIGH);
  digitalWrite(yellowPin, LOW);
  digitalWrite(redPin, LOW);
  delay(5000);  // Green for 5 seconds
  
  // Yellow light
  digitalWrite(greenPin, LOW);
  digitalWrite(yellowPin, HIGH);
  delay(2000);  // Yellow for 2 seconds
  
  // Red light
  digitalWrite(yellowPin, LOW);
  digitalWrite(redPin, HIGH);
  delay(5000);  // Red for 5 seconds
}
\`\`\`

### Make It Better:
- Add a pedestrian button that changes the light
- Add a second traffic light for a cross-street
- Make the yellow light blink before turning green

## Project 3: Button-Controlled LED

Learn to read inputs! Make an LED turn on when you press a button.

### What You'll Need:
- Arduino Uno
- 1 LED
- 1 push button
- 1 220Ω resistor (for LED)
- 1 10kΩ resistor (for button)
- Breadboard
- Jumper wires

### The Code:

\`\`\`cpp
// Button-Controlled LED

int buttonPin = 2;     // Button connected to pin 2
int ledPin = 13;       // LED connected to pin 13
int buttonState = 0;   // Variable to store button state

void setup() {
  pinMode(buttonPin, INPUT);   // Button is an INPUT
  pinMode(ledPin, OUTPUT);     // LED is an OUTPUT
}

void loop() {
  // Read the button state
  buttonState = digitalRead(buttonPin);
  
  // If button is pressed (HIGH), turn on LED
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
\`\`\`

### Key Concepts:
- \`digitalRead()\` checks if a pin is receiving power
- The if/else statement makes decisions based on input
- Variables store information your program can use

## Project 4: Light Sensor Night Light

Create a light that automatically turns on when it gets dark!

### What You'll Need:
- Arduino Uno
- 1 LED
- 1 photoresistor (light sensor)
- 1 10kΩ resistor
- 1 220Ω resistor
- Breadboard
- Jumper wires

### The Code:

\`\`\`cpp
// Automatic Night Light

int sensorPin = A0;    // Photoresistor on analog pin A0
int ledPin = 9;        // LED on pin 9
int sensorValue = 0;   // Variable for sensor reading

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);  // Start serial communication
}

void loop() {
  // Read the light level (0-1023)
  sensorValue = analogRead(sensorPin);
  
  // Print value to Serial Monitor (for debugging)
  Serial.println(sensorValue);
  
  // If it's dark (low reading), turn on LED
  if (sensorValue < 300) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  delay(100);  // Small delay for stability
}
\`\`\`

### What's New Here:
- \`analogRead()\` reads values from 0-1023 (not just HIGH/LOW)
- \`Serial.begin()\` and \`Serial.println()\` let you see values on your computer
- You can adjust the threshold (300) based on your room's lighting

## Project 5: Temperature Monitor

Build a digital thermometer that displays temperature!

### What You'll Need:
- Arduino Uno
- TMP36 temperature sensor
- Breadboard
- Jumper wires

### The Code:

\`\`\`cpp
// Temperature Monitor

int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Read the sensor
  int reading = analogRead(sensorPin);
  
  // Convert to voltage
  float voltage = reading * 5.0 / 1024.0;
  
  // Convert to temperature (Celsius)
  float temperatureC = (voltage - 0.5) * 100;
  
  // Convert to Fahrenheit
  float temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;
  
  // Print results
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.print(" C  /  ");
  Serial.print(temperatureF);
  Serial.println(" F");
  
  delay(1000);  // Update every second
}
\`\`\`

### Next Steps:
- Add an LED that lights up when temperature exceeds a threshold
- Connect an LCD display to show the temperature
- Log temperatures over time

## Tips for Arduino Success

### 1. Start Simple
Don't try to build a complex robot on day one. Master the basics first, then combine skills.

### 2. Read Error Messages
When your code doesn't work, the Arduino IDE shows error messages. They often point directly to the problem.

### 3. Use the Serial Monitor
\`Serial.println()\` is your best debugging friend. Use it to see what values your sensors are reading.

### 4. Double-Check Connections
Most "broken" projects are actually just loose wires. Verify every connection.

### 5. Save Your Projects
Keep your successful code in a folder. You'll reuse pieces in future projects.

### 6. Join the Community
Arduino forums, Reddit, and YouTube are full of helpful people and project ideas.

## Where to Learn More

Now that you've completed these beginner projects, here are ways to continue learning:

1. **Take MsoSTEM's Arduino Course**: Our structured lessons take you from beginner to advanced
2. **Try Project Ideas Online**: Websites like Instructables and Hackster.io have thousands of Arduino projects
3. **Upgrade Your Components**: Add displays, motors, WiFi modules, and more
4. **Enter Competitions**: Many schools and organizations host Arduino/electronics competitions

## The Big Picture

Arduino isn't just about blinking LEDs—it's about understanding how technology works and gaining the power to create solutions to real-world problems. The same principles you learn here apply to:

- Smart home devices
- Robotics
- Environmental monitoring
- Medical devices
- Art installations
- And so much more!

Every professional engineer started exactly where you are now—learning to blink an LED. Keep experimenting, keep learning, and most importantly, have fun building things!

The possibilities are truly endless when you combine coding with electronics. Your Arduino journey is just beginning!`,
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: 18,
        published: true,
        createdAt: new Date("2024-12-20"),
      },
    ];

    blogPosts.forEach((post) => this.blogPosts.set(post.id, post));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }

  // Scholarships
  async getScholarships(): Promise<Scholarship[]> {
    return Array.from(this.scholarships.values());
  }

  async getScholarship(id: string): Promise<Scholarship | undefined> {
    return this.scholarships.get(id);
  }

  async createScholarship(
    insertScholarship: InsertScholarship,
  ): Promise<Scholarship> {
    const id = randomUUID();
    const scholarship: Scholarship = {
      ...insertScholarship,
      id,
      createdAt: new Date(),
    };
    this.scholarships.set(id, scholarship);
    return scholarship;
  }

  async filterScholarships(filters: {
    field?: string;
    amount?: string;
    deadline?: string;
    search?: string;
  }): Promise<Scholarship[]> {
    let scholarships = Array.from(this.scholarships.values());

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      scholarships = scholarships.filter(
        (s) =>
          s.title.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.field.toLowerCase().includes(searchLower),
      );
    }

    if (filters.field && filters.field !== "All Fields") {
      scholarships = scholarships.filter((s) =>
        s.field.includes(filters.field!),
      );
    }

    if (filters.amount && filters.amount !== "Any Amount") {
      scholarships = scholarships.filter((s) => {
        switch (filters.amount) {
          case "$1,000 - $5,000":
            return s.amount >= 1000 && s.amount <= 5000;
          case "$5,000 - $10,000":
            return s.amount >= 5000 && s.amount <= 10000;
          case "$10,000+":
            return s.amount >= 10000;
          default:
            return true;
        }
      });
    }

    if (filters.deadline && filters.deadline !== "All Deadlines") {
      const now = new Date();
      scholarships = scholarships.filter((s) => {
        const daysDiff = Math.ceil(
          (s.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );
        switch (filters.deadline) {
          case "Next 30 days":
            return daysDiff <= 30 && daysDiff > 0;
          case "Next 3 months":
            return daysDiff <= 90 && daysDiff > 0;
          case "Next 6 months":
            return daysDiff <= 180 && daysDiff > 0;
          default:
            return true;
        }
      });
    }

    return scholarships;
  }

  // User Progress
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      (p) => p.userId === userId,
    );
  }

  async getUserCourseProgress(
    userId: string,
    courseId: string,
  ): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      (p) => p.userId === userId && p.courseId === courseId,
    );
  }

  async updateUserProgress(
    insertProgress: InsertUserProgress,
  ): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      ...insertProgress,
      id,
      lastAccessed: new Date(),
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  // Code Projects
  async getUserProjects(userId: string): Promise<CodeProject[]> {
    return Array.from(this.codeProjects.values()).filter(
      (p) => p.userId === userId,
    );
  }

  async getProject(id: string): Promise<CodeProject | undefined> {
    return this.codeProjects.get(id);
  }

  async createProject(insertProject: InsertCodeProject): Promise<CodeProject> {
    const id = randomUUID();
    const project: CodeProject = {
      ...insertProject,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.codeProjects.set(id, project);
    return project;
  }

  async updateProject(
    id: string,
    updateData: Partial<CodeProject>,
  ): Promise<CodeProject> {
    const existing = this.codeProjects.get(id);
    if (!existing) {
      throw new Error("Project not found");
    }
    const updated: CodeProject = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.codeProjects.set(id, updated);
    return updated;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      createdAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }
}

export const storage = new MemStorage();
