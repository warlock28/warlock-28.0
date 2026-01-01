// Re-export from separated data files for backwards compatibility
export { projects, type Project } from './projects';
export { certifications, type Certification } from './certifications';
// export { blogPosts, type BlogPost } from './blog';

export const personalInfo = {
  name: "Nitin Kumar",
  title: "Full Stack Developer & Cybersecurity Enthusiast",
  email: "nitin.kush72800@gmail.com",
  phone: "+91 2828282828",
  location: "Agra, Uttar Pradesh, India",
  bio: "Passionate full-stack developer with 2+ years of experience building scalable web applications and implementing robust security solutions. I specialize in React,Next.js, Node.js, and modern cybersecurity practices.",
  profileImage: "/images/certifications/remo.webp",
  resumeUrl: "https://drive.google.com/file/d/1BjrYnMCdw2yOmj-QEa7lOfp3kUtYiNWd/view?usp=sharing",
  social: {
    github: "https://github.com/warlock28",
    linkedin: "https://www.linkedin.com/in/nitin-kumar-warlock/",
    twitter: "https://x.com/NitinKumar18186",
    instagram: "https://www.instagram.com/mr_nitin.28/",
    email: "nitin.kush72800@gmail.com"
  }
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "🔷" },
      { name: "TypeScript", level: 85, icon: "▲" },
      { name: "JavaScript", level: 92, icon: "🎨" },
      { name: "Tailwind CSS", level: 88, icon: "🌬️" },
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
      { name: "MySQL", level: 75, icon: "💾" },
      { name: "Supabase", level: 85, icon: "🐳" },
      { name: "Firebase", level: 70, icon: "⚙️" },
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
      { name: "cursor", level: 88, icon: "🐧" },
      { name: "warp", level: 70, icon: "🎨" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "bun", level: 88, icon: "🐧" },
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
    year: "2025",
    title: "Aspiring Full Stack & Security Engineer",
    company: "Self-Driven Projects & Research",
    description: "Building modern, secure web platforms using React, TypeScript, Node.js, and cybersecurity best practices. Focused on performance, privacy, and scalable system design."
  },

  {
    year: "2025",
    title: "Cyber Crime Investigator Intern",
    company: "Defronix Cyber Crime Investigation",
    description: "Worked on real-world cyber crime investigation scenarios including digital evidence analysis, online fraud awareness, cyber laws fundamentals, and incident reporting workflows."
  },

  {
    year: "2024",
    title: "Frontend Developer Intern",
    company: "Rajeev Gandhi Computer Saksharta Mission",
    description: "Developed responsive and accessible user interfaces using React, Tailwind CSS, and JavaScript. Improved UI consistency, performance, and user experience across multiple modules."
  },
  {
    year: "2023-2026",
    title: "B.Tech in Cybersecurity",
    company: "IBM Collaboration Program",
    description: "Completed B.Tech with specialization in Cybersecurity. Gained hands-on exposure to network security, web application security, ethical hacking concepts, and secure architecture principles."
  },
  {
    year: "2023",
    title: "Diploma in Computer Science",
    company: "Technical Education Program",
    description: "Completed a diploma covering programming fundamentals, computer networks, databases, operating systems, and basic software development practices."
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

