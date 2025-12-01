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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private scholarships: Map<string, Scholarship>;
  private userProgress: Map<string, UserProgress>;
  private codeProjects: Map<string, CodeProject>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.scholarships = new Map();
    this.userProgress = new Map();
    this.codeProjects = new Map();

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
          "A global network of 18 selective international schools in countries spanning five continents. UWC offers the prestigious International Baccalaureate (IB) curriculum combined with a unique educational philosophy emphasizing international cooperation, environmental sustainability, and responsible global citizenship. Study for 2 years at one of these elite institutions with students from 180+ countries, developing leadership skills, cross-cultural understanding, and solutions to global challenges.",
        amount: 50000,
        deadline: new Date("2025-12-31"),
        field: "International Education, Leadership, Global Citizenship, Environmental Studies",
        location: "Multiple campuses worldwide (Singapore, Canada, Costa Rica, Thailand, India, Kenya, Jordan, Wales, China, USA, and more)",
        eligibility:
          "High school students (ages 16-19) with strong academic records and demonstrated leadership potential. Competitive admission through national selection committees. Fluency in English required.",
        status: "upcoming",
        organizationName: "United World Colleges International",
        applicationUrl: "https://www.uwc.org",
        createdAt: new Date(),
      },
    ];

    scholarships.forEach((scholarship) =>
      this.scholarships.set(scholarship.id, scholarship),
    );
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
}

export const storage = new MemStorage();
