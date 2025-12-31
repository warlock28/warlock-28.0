import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { certifications, getFeaturedCertifications } from '@/data/certifications';
import { ExternalLink, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

type CertificationsVariant = 'full' | 'featured';

interface CertificationsProps {
  variant?: CertificationsVariant;
  featuredLimit?: number;
  ctaHref?: string;
  ctaLabel?: string;
  sectionId?: string;
}


const Certifications = ({
  variant = 'full',
  featuredLimit = 4,
  ctaHref = '/certifications',
  ctaLabel = 'View all certifications',
  sectionId = 'certifications',
}: CertificationsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isFeaturedVariant = variant === 'featured';
  const displayCertifications = isFeaturedVariant
    ? getFeaturedCertifications().slice(0, featuredLimit)
    : certifications;


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
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Initialize scroll state on mount and when certifications change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);
    
    // Also handle window resize
    const handleResize = () => {
      handleScroll();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [displayCertifications]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 16; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
      setTimeout(handleScroll, 300);
    }
  };


  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 16; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
      setTimeout(handleScroll, 300);
    }
  };


  return (
    <section id={sectionId} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
          {isFeaturedVariant ? 'Featured Certifications' : 'Certifications & Achievements'}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
          {isFeaturedVariant
            ? 'Industry credentials currently highlighted across the portfolio'
            : 'Professional certifications that validate my expertise and commitment to continuous learning'}
        </p>
      </div>


        {/* Mobile: Horizontal Scroll with Navigation */}
<motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block sm:hidden relative px-2"
        >
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 pl-1">
            <Button
              variant="outline"
              size="icon"
              className={`w-9 h-9 rounded-full bg-background/95 backdrop-blur-sm border-primary/30 shadow-lg ${
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:border-primary/50'
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 pr-1">
            <Button
              variant="outline"
              size="icon"
              className={`w-9 h-9 rounded-full bg-background/95 backdrop-blur-sm border-primary/30 shadow-lg ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:border-primary/50'
              }`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>


          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-12 pb-4"
            onScroll={handleScroll}
          >
            {displayCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] card-shell"
              >
                <div className="group perspective-1000 h-64">
                  <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180" style={{ transition: 'transform 0.5s ease-out' }}>
                    {/* Front of card */}
                    <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-2xl backface-hidden">
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
                          Tap to see certificate
                        </p>
                      </CardContent>
                    </Card>


                    {/* Back of card - Certificate Image - CHANGED */}
                    <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-2xl backface-hidden rotate-y-180">
                      <CardContent className="p-0 h-full relative bg-muted/30">
                        {/* Certificate Image */}
                        {cert.image ? (
                          <>
                            <img
                              src={cert.image}
                              alt={`${cert.name} Certificate`}
                              className="w-full h-full object-contain p-2 pb-14"
                            />
                            {/* Overlay with action button - CHANGED */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent flex items-end p-3">
                              {cert.credentialUrl && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  className="w-full group bg-primary/90 hover:bg-primary text-xs h-8"
                                  onClick={() => window.open(cert.credentialUrl, '_blank')}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform" />
                                  View Certificate
                                </Button>
                              )}
                            </div>
                          </>
                        ) : (
                          // Fallback if no image
                          <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                            <Award className="w-12 h-12 text-primary mb-4" />
                            <h4 className="text-base font-semibold mb-2 text-primary">
                              {cert.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Issued by: <span className="font-medium">{cert.issuer}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                              Date: <span className="font-medium">{cert.date}</span>
                            </p>
                            {cert.credentialUrl && (
                              <Button 
                                variant="default" 
                                size="sm"
                                className="w-full group"
                                onClick={() => window.open(cert.credentialUrl, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                View Certificate
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop and Tablet: Enhanced Carousel - CHANGED */}
        <div className="hidden sm:block relative px-4 sm:px-8 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
          <Carousel className="w-full max-w-6xl mx-auto" opts={{ align: "start", loop: false, slidesToScroll: 1, containScroll: "trimSnaps" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayCertifications.map((cert, index) => (
                <CarouselItem key={cert.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div variants={itemVariants} className="h-full">
                    <div className="group perspective-1000 h-80 card-shell">
                      <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180" style={{ transition: 'transform 0.5s ease-out' }}>
                        {/* Front of card */}
                        <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-3xl backface-hidden">
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
                              Hover to see certificate
                            </p>
                          </CardContent>
                        </Card>


                        {/* Back of card - Certificate Image - CHANGED */}
                        <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-3xl backface-hidden rotate-y-180">
                          <CardContent className="p-0 h-full relative bg-muted/30 flex items-center justify-center">
                            {/* Certificate Image */}
                            {cert.image ? (
                              <>
                                <img
                                  src={cert.image}
                                  
                                  className="w-full h-full object-contain pt-4 px-4 pb-20"
                                />
                                {/* Overlay with action button - CHANGED */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6 pb-5">
                                  {cert.credentialUrl && (
                                    <Button 
                                      variant="default" 
                                      className="w-full group bg-primary/90 hover:bg-primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(cert.credentialUrl, '_blank');
                                      }}
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                      View Certificate
                                    </Button>
                                  )}
                                </div>
                              </>
                            ) : (
                              // Fallback if no image
                              <div className="p-6 lg:p-8 h-full flex flex-col justify-center items-center text-center">
                                <Award className="w-16 h-16 text-primary mb-4" />
                                <h4 className="text-lg font-semibold mb-2 text-primary">
                                  {cert.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Issued by: <span className="font-medium">{cert.issuer}</span>
                                </p>
                                <p className="text-sm text-muted-foreground mb-6">
                                  Date: <span className="font-medium">{cert.date}</span>
                                </p>
                                {cert.credentialUrl && (
                                  <Button 
                                    variant="default" 
                                    className="w-full group"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(cert.credentialUrl, '_blank');
                                    }}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                    View Certificate
                                  </Button>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 sm:-left-6 lg:-left-12 w-10 h-10 sm:w-11 sm:h-11 bg-background/95 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-xl shadow-lg transition-all disabled:opacity-30" />
            <CarouselNext className="-right-4 sm:-right-6 lg:-right-12 w-10 h-10 sm:w-11 sm:h-11 bg-background/95 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-xl shadow-lg transition-all disabled:opacity-30" />
          </Carousel>
          </motion.div>
        </div>
      {isFeaturedVariant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12 px-4"
        >
          <Button
            variant="outline"
            size="lg"
            className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm"
            asChild
          >
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </motion.div>
      )}
      {!isFeaturedVariant && (
        <div className="px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="h-full"
              >
                <div className="group perspective-1000 h-80 card-shell">
                  <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180" style={{ transition: 'transform 0.5s ease-out' }}>
                    <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-3xl backface-hidden">
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
                          Hover to see certificate
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="absolute inset-0 w-full h-full bg-card/95 border border-border/40 rounded-3xl backface-hidden rotate-y-180">
                      <CardContent className="p-0 h-full relative bg-muted/30 flex items-center justify-center">
                        {cert.image ? (
                          <>
                            <img
                              src={cert.image}
                              className="w-full h-full object-contain pt-4 px-4 pb-20"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6 pb-5">
                              {cert.credentialUrl && (
                                <Button 
                                  variant="default" 
                                  className="w-full group bg-primary/90 hover:bg-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(cert.credentialUrl, '_blank');
                                  }}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                  View Certificate
                                </Button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="p-6 lg:p-8 h-full flex flex-col justify-center items-center text-center">
                            <Award className="w-16 h-16 text-primary mb-4" />
                            <h4 className="text-lg font-semibold mb-2 text-primary">
                              {cert.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Issued by: <span className="font-medium">{cert.issuer}</span>
                            </p>
                            <p className="text-sm text-muted-foreground mb-6">
                              Date: <span className="font-medium">{cert.date}</span>
                            </p>
                            {cert.credentialUrl && (
                              <Button 
                                variant="default" 
                                className="w-full group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(cert.credentialUrl, '_blank');
                                }}
                              >
                                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                View Certificate
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};


export default Certifications;
