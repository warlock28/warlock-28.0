
// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { blogPosts, BlogPost, getFeaturedPosts } from '@/data/blog';
// import { Badge } from '@/components/ui/badge';
// import { Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
// type BlogVariant = 'full' | 'featured';

// interface BlogProps {
//   variant?: BlogVariant;
//   featuredLimit?: number;
//   ctaHref?: string;
//   ctaLabel?: string;
//   sectionId?: string;
// }

// const Blog = ({
//   variant = 'full',
//   featuredLimit = 3,
//   ctaHref = '/blog',
//   ctaLabel = 'View all articles',
//   sectionId = 'blog',
// }: BlogProps) => {
//   const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const isFeaturedVariant = variant === 'featured';

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   const featuredPosts = getFeaturedPosts().slice(0, featuredLimit);
//   const basePosts = isFeaturedVariant ? featuredPosts : blogPosts;
//   const filteredPosts = isFeaturedVariant
//     ? basePosts
//     : basePosts.filter(post => {
//         const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesTag = !selectedTag || post.tags.includes(selectedTag);
//         return matchesSearch && matchesTag;
//       });

//   const allTags = Array.from(new Set(basePosts.flatMap(post => post.tags)));

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6
//       }
//     }
//   };

//   if (!isFeaturedVariant && selectedPost) {
//     return (
//       <section id={sectionId} className="py-14 sm:py-16 lg:py-20 px-4 min-h-screen relative overflow-hidden">
//         <div className="max-w-4xl mx-auto">
//           <Button 
//             onClick={() => setSelectedPost(null)}
//             variant="outline" 
//             className="mb-8"
//           >
//             ← Back to Blog
//           </Button>
          
//           <motion.article
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="glassmorphism rounded-2xl p-8"
//           >
//             <div className="mb-6">
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {selectedPost.tags.map((tag) => (
//                   <Badge key={tag} variant="secondary">{tag}</Badge>
//                 ))}
//               </div>
//               <h1 className="text-4xl font-bold mb-4 gradient-text">{selectedPost.title}</h1>
//               <div className="flex items-center gap-4 text-muted-foreground mb-6">
//                 <span>{selectedPost.date}</span>
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>{selectedPost.readTime} min read</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="prose prose-lg max-w-none dark:prose-invert">
//               <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
//             </div>
//           </motion.article>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id={sectionId} className="py-14 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
//             {isFeaturedVariant ? 'Latest on the Blog' : 'Blog & Insights'}
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             {isFeaturedVariant
//               ? 'A snapshot of recent writing—dive deeper via the full blog archive.'
//               : 'Sharing knowledge, tutorials, and insights about web development and cybersecurity'}
//           </p>
//         </motion.div>

//         {/* Search and Filter */}
//         {!isFeaturedVariant && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-8"
//           >
//             <div className="glassmorphism rounded-xl p-6 mb-6">
//               <div className="relative mb-4">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search posts..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//               </div>
              
//               <div className="flex flex-wrap gap-2">
//                 <Button
//                   variant={selectedTag === null ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedTag(null)}
//                 >
//                   All
//                 </Button>
//                 {allTags.map((tag) => (
//                   <Button
//                     key={tag}
//                     variant={selectedTag === tag ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => setSelectedTag(tag)}
//                   >
//                     {tag}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Blog Posts Section with Navigation */}
//         <div className="relative">
//           {/* Navigation Buttons - Mobile Only */}
//           <div className="flex md:hidden justify-between items-center mb-4">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={scrollLeft}
//               className="glassmorphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <span className="text-sm text-muted-foreground px-4">
//               Swipe to explore posts
//             </span>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={scrollRight}
//               className="glassmorphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Blog Posts Container */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
//           >
//             {/* Mobile Horizontal Scroll Container */}
//             <div 
//               ref={scrollRef}
//               className="flex md:hidden gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
//               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//             >
//               {filteredPosts.map((post) => (
//                 <motion.div
//                   key={post.id}
//                   variants={itemVariants}
//                   className={`group ${isFeaturedVariant ? 'cursor-default' : 'cursor-pointer'} flex-shrink-0 w-[80vw] max-w-[320px] snap-center card-shell`}
//                   onClick={() => {
//                     if (!isFeaturedVariant) {
//                       setSelectedPost(post);
//                     }
//                   }}
//                 >
//                   <Card className="bg-card/95 border border-border/40 rounded-2xl h-full overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden rounded-t-xl">
//                       <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-full h-48 object-cover"
//                         style={{ transition: 'transform 0.3s ease-out' }}
//                       />
//                       {post.featured && (
//                         <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
//                       )}
//                     </div>
                    
//                     <CardHeader>
//                       <div className="flex flex-wrap gap-1 mb-2">
//                         {post.tags.slice(0, 2).map((tag) => (
//                           <Badge key={tag} variant="secondary" className="text-xs">
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                       <CardTitle className="text-xl group-hover:text-primary" style={{ transition: 'color 0.2s ease-out' }}>
//                         {post.title}
//                       </CardTitle>
//                       <CardDescription className="line-clamp-3">
//                         {post.excerpt}
//                       </CardDescription>
//                     </CardHeader>
                    
//                     <CardContent>
//                       <div className="flex items-center justify-between text-sm text-muted-foreground">
//                         <span>{post.date}</span>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{post.readTime} min</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Desktop Grid Layout */}
//             <div className="hidden md:contents">
//               {filteredPosts.map((post) => (
//                 <motion.div
//                   key={post.id}
//                   variants={itemVariants}
//                   className={`group ${isFeaturedVariant ? 'cursor-default' : 'cursor-pointer'} card-shell`}
//                   onClick={() => {
//                     if (!isFeaturedVariant) {
//                       setSelectedPost(post);
//                     }
//                   }}
//                 >
//                   <Card className="bg-card/95 border border-border/40 rounded-2xl h-full overflow-hidden transition-all duration-300">
//                     <div className="relative overflow-hidden rounded-t-xl">
//                       <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-full h-48 object-cover"
//                         style={{ transition: 'transform 0.3s ease-out' }}
//                       />
//                       {post.featured && (
//                         <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
//                       )}
//                     </div>
                    
//                     <CardHeader>
//                       <div className="flex flex-wrap gap-1 mb-2">
//                         {post.tags.slice(0, 2).map((tag) => (
//                           <Badge key={tag} variant="secondary" className="text-xs">
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                       <CardTitle className="text-xl group-hover:text-primary" style={{ transition: 'color 0.2s ease-out' }}>
//                         {post.title}
//                       </CardTitle>
//                       <CardDescription className="line-clamp-3">
//                         {post.excerpt}
//                       </CardDescription>
//                     </CardHeader>
                    
//                     <CardContent>
//                       <div className="flex items-center justify-between text-sm text-muted-foreground">
//                         <span>{post.date}</span>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{post.readTime} min</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {isFeaturedVariant && filteredPosts.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex justify-center mt-12"
//           >
//             <Button
//               variant="outline"
//               size="lg"
//               className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm"
//               asChild
//             >
//               <Link to={ctaHref}>{ctaLabel}</Link>
//             </Button>
//           </motion.div>
//         )}

//         {filteredPosts.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Blog;
