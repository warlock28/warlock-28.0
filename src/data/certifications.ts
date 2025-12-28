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
    credentialUrl: "https://aws.amazon.com/verification",
    image: "/images/certifications/aws.webp", // Add your badge to public/images/certifications/
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda", "RDS"],
    description: "Validates expertise in designing distributed systems and applications on AWS",
    featured: true
  },
  
  {
    id: 2,
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2022",
    credentialId: "CEH-789012",
    credentialUrl: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
    image: "/images/certifications/cyber-security-foundation.webp",
    skills: ["Penetration Testing", "Network Security", "Ethical Hacking", "Security Assessment"],
    description: "Industry-leading certification for ethical hacking and penetration testing",
    featured: true
  },
  {
    id: 3,
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2021",
    credentialUrl: "https://developers.facebook.com/developercircles/",
    image: "/images/certifications/defronix-internship.webp",
    skills: ["React", "JavaScript", "Component Design", "State Management"],
    description: "Demonstrates proficiency in building React applications and understanding modern web development",
    featured: true
  },
  {
    id: 4,
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2023",
    expiryDate: "2025",
    credentialId: "GCP-PCA-345678",
    credentialUrl: "https://cloud.google.com/certification",
    image: "/images/certifications/dcci-certificate.webp",
    skills: ["Google Cloud", "Cloud Architecture", "Kubernetes", "BigQuery"],
    description: "Validates ability to design, develop, and manage robust cloud solutions on GCP",
    featured: false
  },
  
  {
    id: 5,
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    date: "2022",
    credentialId: "AZ-400-556677",
    credentialUrl: "https://learn.microsoft.com/azure/certifications/devops-engineer",
    image: "/images/certifications/itenglish.webp",
    skills: ["Azure DevOps", "CI/CD", "Infrastructure as Code", "Monitoring"],
    description: "Highlights mastery in orchestrating CI/CD pipelines, IaC, and release governance across Azure environments.",
    featured: false
  },
  {
    id: 6,
    name: "Offensive Security Web Expert (OSWE)",
    issuer: "Offensive Security",
    date: "2024",
    credentialUrl: "https://www.offsec.com/courses/web-300/",
    image: "/images/certifications/generative-ai.webp",
    skills: ["Advanced Web Exploitation", "Secure Coding", "Security Automation"],
    description: "Proves the ability to discover and weaponize complex modern web vulnerabilities through custom exploits.",
    featured: true
  },
  {
    id: 7,
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "The Linux Foundation",
    date: "2023",
    credentialUrl: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
    image: "/images/certifications/introduction-cybersurity.webp",
    skills: ["Kubernetes", "Containers", "Networking", "Observability"],
    description: "Demonstrates end-to-end mastery of Kubernetes cluster administration, troubleshooting, and security hardening.",
    featured: false
  },
  {
    id: 8,
    name: "ISC2 Certified Cloud Security Professional (CCSP)",
    issuer: "ISC2",
    date: "2024",
    credentialId: "CCSP-998877",
    credentialUrl: "https://www.isc2.org/certifications/ccsp",
    image: "/images/certifications/malware.webp",
    skills: ["Cloud Security", "Governance", "Risk Management", "Data Protection"],
    description: "Validates cloud architecture governance, compliance, and advanced data protection strategies across multi-cloud estates.",
    featured: true
  },
  {
    id: 9,
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "2023",
    credentialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    image: "/images/certifications/operating-system.webp",
    skills: ["Terraform", "IaC", "Cloud Provisioning"],
    description: "Demonstrates the ability to automate multi-cloud infrastructure deployments with Terraform best practices.",
    featured: false
  },
  {
    id: 10,
    name: "Snowflake SnowPro Advanced: Architect",
    issuer: "Snowflake",
    date: "2024",
    credentialUrl: "https://www.snowflake.com/certifications/",
    image: "/images/certifications/pythonessenstial.webp",
    skills: ["Data Engineering", "Snowflake", "Cost Optimization", "Security"],
    description: "Validates expertise in designing secure, performant Snowflake data platforms for enterprise workloads.",
    featured: true
  },

  {
    id: 11,
    name: "ISC2 Certified Cloud Security Professional (CCSP)",
    issuer: "ISC2",
    date: "2024",
    credentialId: "CCSP-998877",
    credentialUrl: "https://www.isc2.org/certifications/ccsp",
    image: "/images/certifications/react-next.webp",
    skills: ["Cloud Security", "Governance", "Risk Management", "Data Protection"],
    description: "Validates cloud architecture governance, compliance, and advanced data protection strategies across multi-cloud estates.",
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
