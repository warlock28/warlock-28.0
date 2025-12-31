

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string; // Optional: Detailed description
  image: string; // Path: /images/projects/your-image.jpg
  technologies: string[]; // Tech stack used
  category: 'fullstack' | 'frontend' | 'backend' | 'security' | 'mobile' | 'other';
  demoUrl?: string; // Optional: Live demo link
  githubUrl?: string; // Optional: GitHub repo link
  featured: boolean; // Show in featured section?
  date?: string; // Optional: Project date
}

export const projects: Project[] = [
  {
    id: 1,
    title: " creator-direct marketplace ",
    description: "India's first creator-direct marketplace connecting brands with verified influencers. No middlemen, transparent pricing, secure payments.",
    longDescription: "A revolutionary platform that directly connects brands with verified influencers, eliminating intermediaries to ensure transparent pricing and secure payments. Features include influencer discovery, campaign management, real-time analytics, and seamless communication tools.",
    image: "/images/projects/creatorhub.webp", // Add your image to public/images/projects/
    technologies: ["React", "TypeScript", "Shadcn/ui", "Framer-motion", "Redux"],
    category: "frontend",
    demoUrl: "https://creator-hub-ecru.vercel.app/",
    githubUrl: "https://github.com/warlock28",
    featured: true,
    date: "2025-12"
  },
  {
    id: 2,
    title: "LawEdu personalized learning platform",
    description: "Custom study plans, 1-on-1 coaching sessions, and adaptive practice tests tailored to your specific needs.",
    longDescription: "An innovative learning platform offering personalized study plans, one-on-one coaching sessions, and adaptive practice tests designed to meet individual learning needs. Features include progress tracking, interactive content, and expert guidance to help learners achieve their goals effectively.",
    image: "/images/projects/lawedu.webp",
    technologies: ["React", "TypeScript", "Shadcn/ui", "Framer-motion", "Redux"],
    category: "frontend",
    demoUrl: "https://warlock-law-edu.vercel.app/",
    githubUrl: "https://github.com/warlock28",
    featured: true,
    date: "2025-11"
  },
  {
    id: 3,
    title: "India's First virtual assembly platform",
    description: "A platform for virtual community assembly and governance",
    longDescription: "A revolutionary platform enabling virtual community assemblies and democratic governance through digital participation.",
    image: "/images/projects/samajhub.webp",
    technologies: ["React", "TypeScript", "Shadcn/ui", "Framer-motion", "Redux"],
    category: "frontend",
    demoUrl: "https://warlock-samaj-community-hub-b4fc9d.netlify.app/",
    githubUrl: "",
    featured: true,
    date: "2025-10"
  },
  // {
  //   id: 4,
  //   title: "AI Portfolio Analyzer",
  //   description: "LLM-powered analyst that reviews investment portfolios and surfaces actionable insights in minutes.",
  //   longDescription: "Combines OpenAI functions, Pinecone vector search, and Next.js to let wealth advisors benchmark portfolios, detect risk drift, and export compliance-friendly PDFs.",
  //   image: "/images/projects/a1-samaj.webp",
  //   technologies: ["Next.js", "TypeScript", "OpenAI", "Pinecone", "TailwindCSS"],
  //   category: "fullstack",
  //   demoUrl: "https://ai-portfolio.example.com",
  //   githubUrl: "https://github.com/nitin/ai-portfolio-analyzer",
  //   featured: false,
  //   date: "2024-07"
  // },
  // {
  //   id: 5,
  //   title: "DevOps Monitoring Suite",
  //   description: "Unified observability dashboard aggregating logs, traces, and uptime checks.",
  //   longDescription: "Ships a Grafana-inspired interface with custom webhooks, PagerDuty integration, and anomaly detection to keep SRE teams proactive.",
  //   image: "/images/projects/old-portfolio.webp",
  //   technologies: ["React", "Go", "gRPC", "Grafana", "Docker"],
  //   category: "backend",
  //   demoUrl: "https://monitoring.example.com",
  //   githubUrl: "https://github.com/nitin/devops-monitoring-suite",
  //   featured: false,
  //   date: "2024-03"
  // },
  // {
  //   id: 6,
  //   title: "Mobile Fitness Tracker",
  //   description: "Cross-platform fitness coaching app with real-time insights and wearable sync.",
  //   longDescription: "Uses React Native, Supabase, and sensor fusion to deliver adaptive workout plans, macros tracking, and shared leaderboards.",
  //   image: "/images/projects/fitness.webp",
  //   technologies: ["React Native", "Supabase", "Expo", "Redux Toolkit"],
  //   category: "mobile",
  //   demoUrl: "https://fitness.example.com",
  //   githubUrl: "https://github.com/nitin/mobile-fitness-tracker",
  //   featured: false,
  //   date: "2024-05"
  // },
 
  
  /* 
   * TO ADD MORE PROJECTS:
   * Copy the template below, uncomment it, and fill in your details
   */
  
  /*
  {
    id: 5, // Increment the ID
    title: "Your Project Name",
    description: "Short description (1-2 sentences)",
    longDescription: "Detailed description of your project, features, and achievements",
    image: "/images/projects/your-image.jpg", // Add image to public/images/projects/
    technologies: ["Tech1", "Tech2", "Tech3"], // List all technologies used
    category: "fullstack", // Choose: fullstack, frontend, backend, security, mobile, other
    demoUrl: "https://your-demo.com", // Optional: remove if no demo
    githubUrl: "https://github.com/your-repo", // Optional: remove if no repo
    featured: true, // true = show in featured section, false = show in all projects
    date: "2024-01" // Optional: YYYY-MM format
  },
  */
];

// Filter functions for easy querying
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => 
  projects.filter(p => p.category === category);
export const getProjectById = (id: number) => projects.find(p => p.id === id);
