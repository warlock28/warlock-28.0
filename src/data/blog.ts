
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedDate: string;
  readTime: number;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Secure Web Applications with React",
    excerpt: "Learn how to implement security best practices in modern React applications, from authentication to data validation.",
    content: `
# Building Secure Web Applications with React

Security should be a top priority when building web applications. Here are some essential practices:

## Authentication & Authorization
- Implement JWT tokens securely
- Use secure HTTP-only cookies
- Validate user permissions on every request

## Input Validation
- Always validate user input on both client and server
- Use libraries like Zod for TypeScript validation
- Sanitize data before processing

## HTTPS & CSP
- Always use HTTPS in production
- Implement Content Security Policy headers
- Use secure headers to prevent common attacks

Remember: Security is not a feature, it's a foundation.
    `,
    tags: ["React", "Security", "Authentication", "Best Practices"],
    publishedDate: "2024-01-15",
    readTime: 8,
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    title: "Mastering Modern CSS: Grid vs Flexbox",
    excerpt: "Understanding when to use CSS Grid and when to use Flexbox for optimal layout design.",
    content: `
# Mastering Modern CSS: Grid vs Flexbox

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes:

## When to Use Flexbox
- One-dimensional layouts (rows or columns)
- Component-level layouts
- Aligning items within containers

## When to Use CSS Grid
- Two-dimensional layouts
- Page-level layouts
- Complex grid systems

## Practical Examples
Here are some real-world scenarios where each excels...
    `,
    tags: ["CSS", "Frontend", "Layout", "Design"],
    publishedDate: "2024-01-08",
    readTime: 6,
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals for Developers",
    excerpt: "Essential cybersecurity concepts every developer should know to build secure applications.",
    content: `
# Cybersecurity Fundamentals for Developers

As developers, understanding cybersecurity is crucial for building robust applications:

## Common Vulnerabilities
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Insecure Direct Object References

## Prevention Strategies
- Use parameterized queries
- Validate and sanitize all inputs
- Implement proper authentication
- Keep dependencies updated

Security is everyone's responsibility in the development process.
    `,
    tags: ["Cybersecurity", "Security", "Best Practices", "Development"],
    publishedDate: "2023-12-20",
    readTime: 10,
    image: "/placeholder.svg",
    featured: true
  }
];
