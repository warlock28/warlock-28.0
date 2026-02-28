import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import NetworkBackground from '@/components/NetworkBackground';

const ServicesPage = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col pt-20 relative bg-background">
            <NetworkBackground />
            <Navbar />

            <main className="flex-1 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pb-12"
                >
                    {/* We pass variant="full" and hide the CTA by omitting ctaHref */}
                    <Services variant="full" sectionId="all-services" />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
