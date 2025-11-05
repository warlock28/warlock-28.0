// Re-export from separated data files for backwards compatibility
export { projects, type Project } from './projects';
export { certifications, type Certification } from './certifications';
export { blogPosts, type BlogPost } from './blog';

export const personalInfo = {
  name: "Nitin Kumar",
  title: "Full Stack Developer & Cybersecurity Enthusiast",
  email: "nitin@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications and implementing robust security solutions. I specialize in React, Node.js, and modern cybersecurity practices.",
  profileImage: "/placeholder.svg",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/nitin",
    linkedin: "https://linkedin.com/in/nitin",
    twitter: "https://twitter.com/nitin",
    email: "mailto:nitin@example.com"
  }
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "Framer Motion", level: 80, icon: "🎭" },
      { name: "Vue.js", level: 75, icon: "💚" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "Express.js", level: 90, icon: "🚀" },
      { name: "Django", level: 78, icon: "🎯" },
      { name: "GraphQL", level: 75, icon: "🔗" }
    ]
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "MongoDB", level: 78, icon: "🍃" },
      { name: "Redis", level: 80, icon: "🔴" },
      { name: "MySQL", level: 75, icon: "💾" }
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "Kubernetes", level: 70, icon: "⚙️" },
      { name: "CI/CD", level: 75, icon: "🔄" }
    ]
  },
  {
    category: "Security",
    items: [
      { name: "Penetration Testing", level: 80, icon: "🔒" },
      { name: "Network Security", level: 75, icon: "🛡️" },
      { name: "Web Security", level: 85, icon: "🌐" },
      { name: "Cryptography", level: 70, icon: "🔐" }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 90, icon: "📝" },
      { name: "Linux", level: 88, icon: "🐧" },
      { name: "Figma", level: 70, icon: "🎨" },
      { name: "VS Code", level: 95, icon: "💻" }
    ]
  }
];

export const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Full-stack web applications using modern technologies like React, Node.js, and cloud platforms.",
    icon: "💻",
    features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Modern Tech Stack"]
  },
  {
    id: 2,
    title: "Cybersecurity Consulting",
    description: "Security audits, penetration testing, and implementation of security best practices.",
    icon: "🔒",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment"]
  },
  {
    id: 3,
    title: "API Development",
    description: "RESTful and GraphQL APIs with proper documentation and security implementation.",
    icon: "🔗",
    features: ["RESTful APIs", "GraphQL", "Authentication", "Documentation"]
  },
  {
    id: 4,
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, containerization, and cloud infrastructure setup and management.",
    icon: "⚙️",
    features: ["CI/CD Pipelines", "Docker", "Cloud Deployment", "Monitoring"]
  }
];

export const timeline = [
  {
    year: "2023",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    description: "Led development of multiple high-traffic web applications"
  },
  {
    year: "2021",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    description: "Built the entire platform from scratch using React and Node.js"
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "WebSolutions",
    description: "Developed responsive user interfaces and improved user experience"
  },
  {
    year: "2019",
    title: "Computer Science Graduate",
    company: "University of Technology",
    description: "Bachelor's degree in Computer Science with focus on cybersecurity"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    content: "Nitin delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CTO at StartupXYZ",
    content: "One of the best developers I've worked with. Nitin's full-stack skills and security knowledge are exactly what every team needs.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Security Analyst at CyberShield",
    content: "Nitin's security audit uncovered critical vulnerabilities we didn't know existed. His recommendations were practical and easy to implement.",
    rating: 5
  }
];

