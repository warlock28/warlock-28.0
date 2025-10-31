
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { certifications } from '@/data/portfolio';
import { ExternalLink, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const Certifications = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certifications" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            Certifications & Achievements
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll with Navigation */}
        <div className="block sm:hidden relative">
          {/* Navigation Buttons */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className={`w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className={`w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 ${
                !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'
              }`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-4"
            onScroll={handleScroll}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px]"
              >
                <div className="group perspective-1000 h-64">
                  <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front of card */}
                    <Card className="absolute inset-0 w-full h-full glassmorphism bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 backface-hidden">
                      <CardContent className="p-4 h-full flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 gradient-text">
                          {cert.name}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {cert.issuer}
                        </p>
                        
                        <Badge variant="secondary" className="mb-3 text-xs">
                          {cert.date}
                        </Badge>
                        
                        <p className="text-xs text-muted-foreground">
                          Tap to see details
                        </p>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card className="absolute inset-0 w-full h-full glassmorphism bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 backface-hidden rotate-y-180">
                      <CardContent className="p-4 h-full flex flex-col justify-center">
                        <div className="mb-4">
                          <h4 className="text-base font-semibold mb-2 text-primary">
                            Certification Details
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            Issued by: <span className="font-medium">{cert.issuer}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Date: <span className="font-medium">{cert.date}</span>
                          </p>
                        </div>
                        
                        <div className="space-y-2 mt-auto">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="w-full group"
                            onClick={() => window.open(cert.credentialUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                            View Certificate
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center">
                            Tap to verify credentials
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop and Tablet: Enhanced Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden sm:block relative"
        >
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {certifications.map((cert, index) => (
                <CarouselItem key={cert.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div variants={itemVariants} className="h-full">
                    <div className="group perspective-1000 h-80">
                      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                        {/* Front of card */}
                        <Card className="absolute inset-0 w-full h-full glassmorphism bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 backface-hidden">
                          <CardContent className="p-6 lg:p-8 h-full flex flex-col justify-center items-center text-center">
                            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                              <Award className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 gradient-text">
                              {cert.name}
                            </h3>
                            
                            <p className="text-muted-foreground mb-4">
                              {cert.issuer}
                            </p>
                            
                            <Badge variant="secondary" className="mb-4">
                              {cert.date}
                            </Badge>
                            
                            <p className="text-sm text-muted-foreground">
                              Hover to see details
                            </p>
                          </CardContent>
                        </Card>

                        {/* Back of card */}
                        <Card className="absolute inset-0 w-full h-full glassmorphism bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 backface-hidden rotate-y-180">
                          <CardContent className="p-6 lg:p-8 h-full flex flex-col justify-center">
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold mb-2 text-primary">
                                Certification Details
                              </h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                Issued by: <span className="font-medium">{cert.issuer}</span>
                              </p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Date: <span className="font-medium">{cert.date}</span>
                              </p>
                            </div>
                            
                            <div className="space-y-3 mt-auto">
                              <Button 
                                variant="default" 
                                className="w-full group"
                                onClick={() => window.open(cert.credentialUrl, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                View Certificate
                              </Button>
                              
                              <p className="text-xs text-muted-foreground text-center">
                                Click to verify credentials
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4 w-10 h-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10" />
            <CarouselNext className="right-2 sm:right-4 w-10 h-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
