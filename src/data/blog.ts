

// export interface BlogPost {
//   id: number;
//   title: string;
//   slug: string; // URL-friendly version: "my-blog-post"
//   excerpt: string; // Short summary (1-2 sentences)
//   content: string; // Full blog content (supports markdown)
//   image: string; // Featured image path
//   author: string;
//   date: string; // YYYY-MM-DD format (renamed from publishedDate)
//   readTime: number; // Estimated read time in minutes
//   category: string; // e.g., "Tutorial", "News", "Opinion"
//   tags: string[]; // e.g., ["React", "TypeScript", "Web Development"]
//   published: boolean; // true = show on site, false = hide (draft)
//   featured?: boolean; // Optional: show in featured section (for backwards compatibility)
// }

// export const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "Building Secure Web Applications with React",
//     slug: "building-secure-web-applications-react",
//     excerpt: "Learn how to implement security best practices in modern React applications, from authentication to data validation.",
//     content: `
// # Building Secure Web Applications with React

// Security should be a top priority when building web applications. Here are some essential practices:

// ## Authentication & Authorization
// - Implement JWT tokens securely
// - Use secure HTTP-only cookies
// - Validate user permissions on every request

// ## Input Validation
// - Always validate user input on both client and server
// - Use libraries like Zod for TypeScript validation
// - Sanitize data before processing

// ## HTTPS & CSP
// - Always use HTTPS in production
// - Implement Content Security Policy headers
// - Use secure headers to prevent common attacks

// Remember: Security is not a feature, it's a foundation.
//     `,
//     image: "/images/blog/malware.png", // Add to public/images/blog/
//     author: "Nitin Kumar",
//     date: "2024-01-15",
//     readTime: 8,
//     category: "Security",
//     tags: ["React", "Security", "Authentication", "Best Practices"],
//     published: true,
//     featured: true
//   },
//   {
//     id: 2,
//     title: "Mastering Modern CSS: Grid vs Flexbox",
//     slug: "mastering-modern-css-grid-vs-flexbox",
//     excerpt: "Understanding when to use CSS Grid and when to use Flexbox for optimal layout design.",
//     content: `
// # Mastering Modern CSS: Grid vs Flexbox

// Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes:

// ## When to Use Flexbox
// - One-dimensional layouts (rows or columns)
// - Component-level layouts
// - Aligning items within containers

// ## When to Use CSS Grid
// - Two-dimensional layouts
// - Page-level layouts
// - Complex grid systems

// ## Practical Examples
// Here are some real-world scenarios where each excels...
//     `,
//     image: "/images/blog/malware.png",
//     author: "Nitin Kumar",
//     date: "2024-01-08",
//     readTime: 6,
//     category: "Tutorial",
//     tags: ["CSS", "Frontend", "Layout", "Design"],
//     published: true,
//     featured: false
//   },
//   {
//     id: 3,
//     title: "Cybersecurity Fundamentals for Developers",
//     slug: "cybersecurity-fundamentals-for-developers",
//     excerpt: "Essential cybersecurity concepts every developer should know to build secure applications.",
//     content: `
// # Cybersecurity Fundamentals for Developers

// As developers, understanding cybersecurity is crucial for building robust applications:

// ## Common Vulnerabilities
// - SQL Injection
// - Cross-Site Scripting (XSS)
// - Cross-Site Request Forgery (CSRF)
// - Insecure Direct Object References

// ## Prevention Strategies
// - Use parameterized queries
// - Validate and sanitize all inputs
// - Implement proper authentication
// - Keep dependencies updated

// Security is everyone's responsibility in the development process.
//     `,
//     image: "/images/blog/malware.webp",
//     author: "Nitin Kumar",
//     date: "2023-12-20",
//     readTime: 10,
//     category: "Security",
//     tags: ["Cybersecurity", "Security", "Best Practices", "Development"],
//     published: true,
//     featured: true
//   },
//   {
//     id: 4,
//     title: "Design Systems that Scale",
//     slug: "design-systems-that-scale",
//     excerpt: "Practical lessons from building an enterprise design system that supports dozens of product squads.",
//     content: `
// # Design Systems that Scale

// In this article I break down the governance model, token strategy, and automation that helped us ship a multi-brand system:

// ## Start with Accessibility
// - Contrast tokens
// - Keyboard-first patterns

// ## Automation
// - Visual regression testing via Chromatic
// - Automated changelog with Semantic Release

// Reusable systems are living products—treat them with roadmaps, metrics, and retrospectives.
//     `,
//     image: "/images/blog/design-system.webp",
//     author: "Nitin Kumar",
//     date: "2024-02-12",
//     readTime: 7,
//     category: "Product",
//     tags: ["Design Systems", "Accessibility", "Frontend"],
//     published: true,
//     featured: false
//   },
//   {
//     id: 5,
//     title: "Ship Faster with Supabase Edge Functions",
//     slug: "ship-faster-with-supabase-edge-functions",
//     excerpt: "How I replaced a legacy Lambda fleet with Supabase edge functions and cut cold starts to milliseconds.",
//     content: `
// # Ship Faster with Supabase Edge Functions

// Edge functions sit close to your data, so latency plummets. Key tips:

// - Co-locate logic with the Supabase project
// - Use row level security helpers
// - Keep secrets in Vault-managed configs

// Finally, automate deployments with GitHub Actions + Supabase CLI for painless rollouts.
//     `,
//     image: "/images/blog/supabase.webp",
//     author: "Nitin Kumar",
//     date: "2024-03-05",
//     readTime: 5,
//     category: "Tutorial",
//     tags: ["Supabase", "Serverless", "Edge"],
//     published: true,
//     featured: true
//   },
//   {
//     id: 6,
//     title: "Incident Response Playbook for Startups",
//     slug: "incident-response-playbook-for-startups",
//     excerpt: "Lightweight tooling and rituals that help small teams stay calm during production fires.",
//     content: `
// # Incident Response Playbook

// 1. **Detect**: centralize alerts with PagerDuty + Slack.
// 2. **Diagnose**: use a shared debug doc and assign clear roles.
// 3. **Document**: retro within 48 hours, categorize action items.

// You don't need a massive SRE org—just discipline, templates, and communication.
//     `,
//     image: "/images/blog/incident.webp",
//     author: "Nitin Kumar",
//     date: "2024-04-18",
//     readTime: 9,
//     category: "Operations",
//     tags: ["DevOps", "SRE", "Process"],
//     published: true,
//     featured: true
//   }
// ];

// // Helper functions
// export const getPublishedPosts = () => blogPosts.filter(post => post.published);

// export const getPostBySlug = (slug: string) => 
//   blogPosts.find(post => post.slug === slug);

// export const getPostsByCategory = (category: string) => 
//   blogPosts.filter(post => post.category === category && post.published);

// export const getPostsByTag = (tag: string) => 
//   blogPosts.filter(post => post.tags.includes(tag) && post.published);

// export const getRecentPosts = (limit: number = 3) => 
//   getPublishedPosts()
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, limit);

// export const getFeaturedPosts = () =>
//   getPublishedPosts().filter(post => post.featured);

// // Backwards compatibility: expose publishedDate for existing components
// export type BlogPostWithPublishedDate = BlogPost & { publishedDate: string };

// export const getBlogPostsWithPublishedDate = (): BlogPostWithPublishedDate[] => 
//   blogPosts.map(post => ({ ...post, publishedDate: post.date }));
