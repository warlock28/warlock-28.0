/**
 * PROJECTS CONTENT
 * 
 * Easy to add/edit projects manually
 * 
 * HOW TO ADD A NEW PROJECT:
 * 1. Add your project image to: public/images/projects/your-image.jpg
 * 2. Copy one of the project objects below
 * 3. Update all fields (id, title, description, image, etc.)
 * 4. Save this file
 * 
 * IMAGE RECOMMENDATIONS:
 * - Size: 1200x800px or 16:9 aspect ratio
 * - Format: .jpg, .png, or .webp
 * - Keep file size under 500KB for fast loading
 */

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
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
    longDescription: "A complete e-commerce platform with user authentication, product management, shopping cart, payment processing, and order tracking. Built with modern technologies and best practices.",
    image: "/images/projects/aws.png", // Add your image to public/images/projects/
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux", "Express"],
    category: "fullstack",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/nitin/ecommerce",
    featured: true,
    date: "2024-01"
  },
  {
    id: 2,
    title: "Security Audit Tool",
    description: "Automated web application security scanner with vulnerability reporting",
    longDescription: "Advanced security tool that performs comprehensive security audits including SQL injection testing, XSS detection, CSRF vulnerability checks, and generates detailed reports with remediation recommendations.",
    image: "/images/projects/aws.png",
    technologies: ["Python", "Django", "SQLite", "BeautifulSoup", "Celery"],
    category: "security",
    demoUrl: "https://security-tool.example.com",
    githubUrl: "https://github.com/nitin/security-scanner",
    featured: true,
    date: "2023-09"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features",
    longDescription: "Modern task management application with real-time collaboration, drag-and-drop interface, team workspaces, calendar integration, and notification system.",
    image: "/images/projects/aws.png",
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    category: "frontend",
    demoUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/nitin/task-manager",
    featured: false,
    date: "2023-06"
  },
 
  
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
