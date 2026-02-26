/**
 * Blog component — currently disabled via BLOG_ENABLED feature flag.
 * Placeholder export keeps lazy-import in Index.tsx from crashing.
 */

interface BlogProps {
  variant?: 'full' | 'featured';
  ctaHref?: string;
  ctaLabel?: string;
  sectionId?: string;
}

const Blog = (_props: BlogProps) => null;

export default Blog;
