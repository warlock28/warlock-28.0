import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ServicesProps {
    variant?: 'full' | 'featured';
    featuredLimit?: number;
    ctaHref?: string;
    ctaLabel?: string;
    sectionId?: string;
}

const Services = ({
    variant = 'full',
    featuredLimit = 3,
    ctaHref = '/services',
    ctaLabel = 'Explore all services',
    sectionId = 'services',
}: ServicesProps) => {
    const isFeaturedVariant = variant === 'featured';
    const { services, loading, error } = useServices(isFeaturedVariant);
    const displayServices = isFeaturedVariant ? services.slice(0, featuredLimit) : services;

    // Helper function to render lucide-react icons dynamically
    const renderIcon = (iconName: string | undefined, className: string = "") => {
        if (!iconName) return null;
        const IconComponent = (Icons as any)[iconName];
        if (!IconComponent) return null;
        return <IconComponent className={className} />;
    };

    return (
        <section id={sectionId} className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16 px-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        {isFeaturedVariant ? 'Featured' : 'My'}{' '}
                        <span className="gradient-text">Services</span>
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-primary mx-auto mb-5 rounded-full" />
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {isFeaturedVariant
                            ? 'Specialized solutions to bring your ideas to life'
                            : 'Comprehensive technical and strategic services tailored for your needs'}
                    </p>
                </motion.div>

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground text-sm">Loading services…</p>
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
                        <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
                        <p className="text-muted-foreground">Failed to load services. Please try again later.</p>
                    </div>
                )}

                {/* Services grid */}
                {!loading && !error && displayServices.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
                        {displayServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Card className="card-shell h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/5 transition-all duration-300 group ring-1 ring-border/50">
                                    <CardHeader className="p-6 sm:p-8 pb-4 relative overflow-hidden">
                                        {/* Background decoration */}
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 scale-150 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                                            {renderIcon(service.icon, "w-64 h-64")}
                                        </div>

                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-500 relative z-10 text-primary">
                                            {renderIcon(service.icon, "w-7 h-7 sm:w-8 sm:h-8")}
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold font-heading mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                                            {service.title}
                                        </CardTitle>
                                        <CardDescription className="text-base sm:text-[1.05rem] text-muted-foreground leading-relaxed relative z-10">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="p-6 sm:p-8 pt-0 flex-1 flex flex-col relative z-10">
                                        {service.features && service.features.length > 0 && (
                                            <div className="mt-4 flex-1">
                                                <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4">What's included</h4>
                                                <ul className="space-y-3">
                                                    {service.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                            <span className="text-[0.95rem] text-muted-foreground leading-snug">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {!isFeaturedVariant && (
                                            <Button variant="outline" className="w-full mt-8 group/btn hover:bg-primary/5">
                                                Contact to Discuss <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && displayServices.length === 0 && (
                    <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
                        <Icons.BriefcaseBusiness className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                        <p className="text-lg font-medium text-muted-foreground mb-1">
                            {isFeaturedVariant ? 'No featured services' : 'No services available'}
                        </p>
                    </div>
                )}

                {/* CTA button */}
                {isFeaturedVariant && !loading && !error && displayServices.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex justify-center mt-12 px-4"
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm hover:-translate-y-0.5 transition-all duration-300 border-primary/20 hover:border-primary/50"
                            asChild
                        >
                            <Link to={ctaHref}>
                                {ctaLabel} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Services;
