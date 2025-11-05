/**
 * BLOG POSTS CONTENT
 * 
 * Easy to add/edit blog posts manually
 * 
 * HOW TO ADD A NEW BLOG POST:
 * 1. Add featured image to: public/images/blog/your-post-image.jpg
 * 2. Copy one of the blog post objects below
 * 3. Update all fields (id, title, slug, excerpt, content, etc.)
 * 4. Save this file
 * 
 * IMAGE RECOMMENDATIONS:
 * - Size: 1200x630px (ideal for social sharing)
 * - Format: .jpg, .png, or .webp
 * - Use relevant, high-quality images
 */

export interface BlogPost {
  id: number;
  title: string;
  slug: string; // URL-friendly version: "my-blog-post"
  excerpt: string; // Short summary (1-2 sentences)
  content: string; // Full blog content (supports markdown)
  image: string; // Featured image path
  author: string;
  date: string; // YYYY-MM-DD format (renamed from publishedDate)
  readTime: number; // Estimated read time in minutes
  category: string; // e.g., "Tutorial", "News", "Opinion"
  tags: string[]; // e.g., ["React", "TypeScript", "Web Development"]
  published: boolean; // true = show on site, false = hide (draft)
  featured?: boolean; // Optional: show in featured section (for backwards compatibility)
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Secure Web Applications with React",
    slug: "building-secure-web-applications-react",
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
    image: "/images/blog/malware.png", // Add to public/images/blog/
    author: "Nitin Kumar",
    date: "2024-01-15",
    readTime: 8,
    category: "Security",
    tags: ["React", "Security", "Authentication", "Best Practices"],
    published: true,
    featured: true
  },
  {
    id: 2,
    title: "Mastering Modern CSS: Grid vs Flexbox",
    slug: "mastering-modern-css-grid-vs-flexbox",
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
    image: "/images/blog/malware.png",
    author: "Nitin Kumar",
    date: "2024-01-08",
    readTime: 6,
    category: "Tutorial",
    tags: ["CSS", "Frontend", "Layout", "Design"],
    published: true,
    featured: false
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals for Developers",
    slug: "cybersecurity-fundamentals-for-developers",
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
    image: "/images/blog/malware.png",
    author: "Nitin Kumar",
    date: "2023-12-20",
    readTime: 10,
    category: "Security",
    tags: ["Cybersecurity", "Security", "Best Practices", "Development"],
    published: true,
    featured: true
  },
  
  /* 
   * TO ADD MORE BLOG POSTS:
   * Copy the template below, uncomment it, and fill in your details
   */
  
  /*
  {
    id: 4, // Increment the ID
    title: "Your Blog Post Title",
    slug: "your-blog-post-title", // URL-friendly (lowercase, hyphens)
    excerpt: "A short summary of your blog post in 1-2 sentences.",
    content: `
# Your Blog Post Title

Write your full blog content here. You can use markdown formatting:

## Subheadings

- Bullet points
- More points

### Code examples

\`\`\`javascript
const example = "code";
\`\`\`

**Bold text** and *italic text*

[Links](https://example.com)
    `,
    image: "/images/blog/your-image.jpg", // Add to public/images/blog/
    author: "Your Name",
    date: "2024-01-20", // YYYY-MM-DD
    readTime: 7, // Estimated minutes
    category: "Tutorial", // Tutorial, News, Opinion, etc.
    tags: ["Tag1", "Tag2", "Tag3"],
    published: true, // true = visible, false = draft
    featured: false // Optional: show in featured section
  },
  */
];

// Helper functions
export const getPublishedPosts = () => blogPosts.filter(post => post.published);

export const getPostBySlug = (slug: string) => 
  blogPosts.find(post => post.slug === slug);

export const getPostsByCategory = (category: string) => 
  blogPosts.filter(post => post.category === category && post.published);

export const getPostsByTag = (tag: string) => 
  blogPosts.filter(post => post.tags.includes(tag) && post.published);

export const getRecentPosts = (limit: number = 3) => 
  getPublishedPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

// Backwards compatibility: expose publishedDate for existing components
export type BlogPostWithPublishedDate = BlogPost & { publishedDate: string };

export const getBlogPostsWithPublishedDate = (): BlogPostWithPublishedDate[] => 
  blogPosts.map(post => ({ ...post, publishedDate: post.date }));
