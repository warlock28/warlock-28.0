import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2, LogOut, User, Briefcase, Award, BookOpen,
    LayoutDashboard, ChevronRight, Mail, Menu, X, ExternalLink, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { toast } from 'sonner';

// Lazy-loaded section panels
const ProfileSection = lazy(() => import('./sections/ProfileSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const BlogSection = lazy(() => import('./sections/BlogSection'));
const MessagesSection = lazy(() => import('./sections/MessagesSection'));

// Loading placeholder for lazy sections
const SectionLoader = () => (
    <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

// Navigation items for sidebar
const NAV_ITEMS = [
    { value: 'profile', label: 'Profile', icon: User, description: 'Your personal info' },
    { value: 'projects', label: 'Projects', icon: Briefcase, description: 'Manage portfolio' },
    { value: 'services', label: 'Services', icon: Layers, description: 'Manage services' },
    { value: 'certifications', label: 'Certifications', icon: Award, description: 'Credentials & badges' },
    { value: 'blog', label: 'Blog', icon: BookOpen, description: 'Write & publish' },
    { value: 'messages', label: 'Messages', icon: Mail, description: 'Contact inbox' },
] as const;

// Section content renderer
const SectionContent = ({ activeSection }: { activeSection: string }) => {
    switch (activeSection) {
        case 'profile': return <Suspense fallback={<SectionLoader />}><ProfileSection /></Suspense>;
        case 'projects': return <Suspense fallback={<SectionLoader />}><ProjectsSection /></Suspense>;
        case 'services': return <Suspense fallback={<SectionLoader />}><ServicesSection /></Suspense>;
        case 'certifications': return <Suspense fallback={<SectionLoader />}><CertificationsSection /></Suspense>;
        case 'blog': return <Suspense fallback={<SectionLoader />}><BlogSection /></Suspense>;
        case 'messages': return <Suspense fallback={<SectionLoader />}><MessagesSection /></Suspense>;
        default: return null;
    }
};

const AdminDashboard = () => {
    const { user, isAdmin, loading, signOut } = useAdminAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>('profile');
    const [signingOut, setSigningOut] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading && !isAdmin) navigate('/admin', { replace: true });
    }, [isAdmin, loading, navigate]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleSignOut = useCallback(async () => {
        setSigningOut(true);
        try {
            await signOut();
            navigate('/admin', { replace: true });
        } catch {
            setSigningOut(false);
        }
    }, [signOut, navigate]);

    const handleNavClick = (value: string) => {
        setActiveSection(value);
        setMobileMenuOpen(false);
    };

    // 15 min session timeout
    useSessionTimeout(() => {
        if (isAdmin) {
            toast.error("Session Expired", {
                description: "You have been logged out due to inactivity for security reasons.",
            });
            handleSignOut();
        }
    }, 15 * 60 * 1000);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading dashboard…</p>
                </div>
            </div>
        );
    }

    // Active section label for header
    const activeMeta = NAV_ITEMS.find(i => i.value === activeSection);

    return (
        <div className="min-h-screen bg-background">
            {/* ────────── Top Header Bar ────────── */}
            <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
                    {/* Left: hamburger + brand */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden h-9 w-9 rounded-lg border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-semibold leading-none">Portfolio Admin</h1>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[180px]">{user?.email}</p>
                        </div>
                    </div>

                    {/* Right: actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a href="/" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="sm" className="text-xs gap-1.5 hidden sm:inline-flex">
                                <ExternalLink className="h-3 w-3" /> View Site
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </a>
                        <Button variant="outline" size="sm" onClick={handleSignOut} disabled={signingOut} className="gap-2 text-xs">
                            {signingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
                            <span className="hidden sm:inline">Sign Out</span>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
                {/* ────────── Desktop Sidebar ────────── */}
                <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-border/40 bg-background/50 sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]">
                    {/* Welcome card in sidebar */}
                    <div className="p-4 border-b border-border/30">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                            <p className="text-sm font-semibold">Welcome back! 👋</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Changes go live instantly.</p>
                        </div>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        {NAV_ITEMS.map(({ value, label, icon: Icon, description }) => (
                            <button
                                key={value}
                                onClick={() => handleNavClick(value)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${activeSection === value
                                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent'
                                    }`}
                            >
                                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeSection === value
                                    ? 'bg-primary/15 text-primary'
                                    : 'bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                                    }`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-sm font-medium truncate ${activeSection === value ? 'text-primary' : ''}`}>{label}</p>
                                    <p className="text-[11px] text-muted-foreground truncate">{description}</p>
                                </div>
                            </button>
                        ))}
                    </nav>

                    {/* Sidebar footer */}
                    <div className="p-4 border-t border-border/30">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                <User className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium truncate">{user?.email}</p>
                                <p className="text-[10px] text-muted-foreground">Administrator</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ────────── Mobile Slide-out Menu ────────── */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                                style={{ top: '3.5rem' }}
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="fixed left-0 z-50 w-72 bg-background border-r border-border/40 shadow-2xl lg:hidden flex flex-col"
                                style={{ top: '3.5rem', height: 'calc(100vh - 3.5rem)' }}
                            >
                                {/* Welcome */}
                                <div className="p-4 border-b border-border/30">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                                        <p className="text-sm font-semibold">Welcome back! 👋</p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">Manage your portfolio.</p>
                                    </div>
                                </div>

                                {/* Nav items */}
                                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                                    {NAV_ITEMS.map(({ value, label, icon: Icon, description }) => (
                                        <button
                                            key={value}
                                            onClick={() => handleNavClick(value)}
                                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${activeSection === value
                                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                                                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent'
                                                }`}
                                        >
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeSection === value
                                                ? 'bg-primary/15 text-primary'
                                                : 'bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                                                }`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`text-sm font-medium ${activeSection === value ? 'text-primary' : ''}`}>{label}</p>
                                                <p className="text-[11px] text-muted-foreground">{description}</p>
                                            </div>
                                            {activeSection === value && (
                                                <ChevronRight className="h-4 w-4 ml-auto text-primary flex-shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </nav>

                                {/* Footer */}
                                <div className="p-4 border-t border-border/30">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                            <User className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium truncate">{user?.email}</p>
                                            <p className="text-[10px] text-muted-foreground">Administrator</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ────────── Main Content Area ────────── */}
                <main className="flex-1 min-w-0">
                    {/* Section header */}
                    <div className="border-b border-border/30 bg-background/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            {activeMeta && (
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/15 flex items-center justify-center flex-shrink-0">
                                    <activeMeta.icon className="h-5 w-5 text-primary" />
                                </div>
                            )}
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold">{activeMeta?.label}</h2>
                                <p className="text-xs sm:text-sm text-muted-foreground">{activeMeta?.description}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile-only bottom quick-nav (scrollable pills) */}
                    <div className="lg:hidden border-b border-border/30 bg-background/50 px-4 py-2.5 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-2 min-w-max">
                            {NAV_ITEMS.map(({ value, label, icon: Icon }) => (
                                <button
                                    key={value}
                                    onClick={() => handleNavClick(value)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSection === value
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <SectionContent activeSection={activeSection} />
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
