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
    image: "/images/certifications/dcci.jpg", // Add your badge to public/images/certifications/
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda", "RDS"],
    description: "Validates expertise in designing distributed systems and applications on AWS"
  },
  {
    id: 2,
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2022",
    credentialId: "CEH-789012",
    credentialUrl: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
    image: "/images/certifications/dcci.jpg",
    skills: ["Penetration Testing", "Network Security", "Ethical Hacking", "Security Assessment"],
    description: "Industry-leading certification for ethical hacking and penetration testing"
  },
  {
    id: 3,
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2021",
    credentialUrl: "https://developers.facebook.com/developercircles/",
    image: "/images/certifications/dcci.jpg",
    skills: ["React", "JavaScript", "Component Design", "State Management"],
    description: "Demonstrates proficiency in building React applications and understanding modern web development"
  },
  {
    id: 4,
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2023",
    expiryDate: "2025",
    credentialId: "GCP-PCA-345678",
    credentialUrl: "https://cloud.google.com/certification",
    image: "/images/certifications/dcci.jpg",
    skills: ["Google Cloud", "Cloud Architecture", "Kubernetes", "BigQuery"],
    description: "Validates ability to design, develop, and manage robust cloud solutions on GCP"
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
