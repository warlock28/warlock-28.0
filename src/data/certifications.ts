/**
 * CERTIFICATIONS CONTENT
 * 
 * Easy to add/edit certifications manually
 * 
 * HOW TO ADD A NEW CERTIFICATION:
 * 1. Add certificate image/badge to: public/images/certifications/your-cert.jpg
 * 2. Copy one of the certification objects below
 * 3. Update all fields (id, name, issuer, date, etc.)
 * 4. Save this file
 * 
 * IMAGE RECOMMENDATIONS:
 * - Size: 600x400px or certification badge
 * - Format: .jpg, .png, or .svg
 * - Use official certification badges when available
 */

export interface Certification {
  id: number;
  name: string; // Certification name
  issuer: string; // Issuing organization
  date: string; // Year or YYYY-MM format
  expiryDate?: string; // Optional: Expiry date if applicable
  credentialId?: string; // Optional: Credential/Certificate ID
  credentialUrl?: string; // Optional: Verification URL
  image?: string; // Optional: Badge/Certificate image
  skills?: string[]; // Optional: Skills covered
  description?: string; // Optional: What this certification covers
  featured?: boolean; // Optional: flag for homepage highlights
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    expiryDate: "2026",
    credentialId: "AWS-SAA-123456",
    credentialUrl: "https://lnkd.in/gh57Etc2",
    image: "/images/certifications/aws.webp", // Add your badge to public/images/certifications/
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda", "RDS"],
    description: "Validates expertise in designing distributed systems and applications on AWS",
    featured: true
  },
  
  {
    id: 2,
    name: "Cyber Security Foundation Certification",
    issuer: "LinkedIn Learning",
    date: "2024",
    credentialUrl: "https://www.credly.com/users/nitin-kumar.4b42c0d5",
    image: "/images/certifications/cyber-security-foundation.webp",
    skills: ["Penetration Testing", "Network Security", "Ethical Hacking", "Security Assessment"],
    description: "Industry-leading certification for ethical hacking and penetration testing",
    featured: true
  },
  {
    id: 3,
    name: "Cyber Security Investigator Internship (DCCI) at Defronix Academy",
    issuer: "Defronix Academy",
    date: "2025",
    credentialUrl: "https://lnkd.in/gaXkgeCD",
    image: "/images/certifications/defronix-internship.webp",
    skills: ["Cyber Crime Investigation", "Digital Forensics", "Incident Response"],
    description: "Hands-on internship focused on real-world cyber crime investigation techniques and tools.",
    featured: true
  },
  {
    id: 4,
    name: " Certified Cyber Crime Investigator (DCCI) ",
    issuer: "Defronix Academy",
    date: "2025",
    credentialId: "DCCI172",
    credentialUrl: "https://lnkd.in/gaXkgeCD",
    image: "/images/certifications/dcci-certificate.webp",
    skills: ["Cyber Crime Investigation", "Digital Forensics", "Incident Response"],
    description: "Equips professionals with skills to investigate and respond to cyber crimes effectively.",
    featured: false
  },
  
  {
    id: 5,
    name: "It English Advanced Certification",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.credly.com/users/nitin-kumar.4b42c0d5",
    image: "/images/certifications/itenglish.webp",
    skills: ["Technical English", "IT Communication", "Professional Writing"],
    description: "Enhances English communication skills tailored for IT professionals.",
    featured: false
  },
  {
    id: 6,
    name: "Generative AI and Ethics",
    issuer: "Offensive Security",
    date: "2024",
    credentialUrl: "https://www.offsec.com/courses/web-300/",
    image: "/images/certifications/generative-ai.webp",
    skills: ["AI Ethics", "Generative AI", "AI Security"],
    description: "Covers ethical considerations and security implications of deploying generative AI technologies.",
    featured: true
  },
  {
    id: 7,
    name: "Introduction to Cybersecurity",
    issuer: "The Linux Foundation",
    date: "2024",
    credentialUrl: "https://www.credly.com/users/nitin-kumar.4b42c0d5",
    image: "/images/certifications/introduction-cybersurity.webp",
    skills: ["Cybersecurity Basics", "Network Security", "Threat Management"],
    description: "Provides foundational knowledge of cybersecurity principles, practices, and technologies.",
    featured: false
  },
  {
    id: 8,
    name: "Malware Analysis",
    issuer: "ISC2",
    date: "2025",
    credentialUrl: "https://moonshot.scaler.com/s/sl/tx8kAIEfRT",
    image: "/images/certifications/malware.webp",
    skills: ["Malware Analysis", "Reverse Engineering", "Threat Detection"],
    description: "Validates skills in analyzing, detecting, and mitigating malware threats using advanced techniques.",
    featured: true
  },
  {
    id: 9,
    name: "Operating System Basics",
    issuer: "HashiCorp",
    date: "2023",
    credentialUrl: "https://www.credly.com/users/nitin-kumar.4b42c0d5",
    image: "/images/certifications/operating-system.webp",
    skills:["windows","linux","macOS","system administration"],
    description: "Covers fundamental concepts of operating systems including processes, memory management, and file systems.",
    featured: false
  },
  {
    id: 10,
    name: "Python Essential-1",
    issuer: "Cisco Networking Academy",
    date: "2024",
    credentialUrl: "https://www.credly.com/users/nitin-kumar.4b42c0d5",
    image: "/images/certifications/pythonessenstial.webp",
    skills: ["Python", "Programming Basics", "Data Structures"],
    description: "Introduces core Python programming concepts including syntax, control structures, and data handling.",
    featured: true
  },

  {
    id: 11,
    name: "React and Next.js Developer Certification",
    issuer: "UDEMY",
    date: "2025",
    credentialUrl: "https://www.isc2.org/certifications/ccsp",
    image: "/images/certifications/react-next.webp",
    skills: ["React", "Next.js", "TypeScript", "Frontend Development"],
    description: "Validates skills in building modern web applications using React and Next.js frameworks.",
    featured: true
  },
  /* 
   * TO ADD MORE CERTIFICATIONS:
   * Copy the template below, uncomment it, and fill in your details
   */
  
  /*
  {
    id: 5, // Increment the ID
    name: "Your Certification Name",
    issuer: "Issuing Organization",
    date: "2024", // Year or YYYY-MM
    expiryDate: "2027", // Optional: if cert expires
    credentialId: "CERT-123456", // Optional: certificate ID
    credentialUrl: "https://verify-link.com", // Optional: verification link
    image: "/images/certifications/your-badge.png", // Optional: add image to public/images/certifications/
    skills: ["Skill1", "Skill2", "Skill3"], // Optional: skills covered
    description: "What this certification validates or covers" // Optional: brief description
  },
  */
];

// Helper functions
export const getActiveCertifications = () => {
  const now = new Date();
  return certifications.filter(cert => {
    if (!cert.expiryDate) return true; // No expiry = always active
    return new Date(cert.expiryDate) > now;
  });
};

export const getCertificationById = (id: number) => 
  certifications.find(c => c.id === id);

export const getCertificationsByIssuer = (issuer: string) => 
  certifications.filter(c => c.issuer === issuer);

export const getFeaturedCertifications = () =>
  certifications.filter(cert => cert.featured);
