import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, LogOut, User, Briefcase, Award, BookOpen, LayoutDashboard, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const ProfileSection = lazy(() => import('./sections/ProfileSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'));
const BlogSection = lazy(() => import('./sections/BlogSection'));

const SectionLoader = () => (
    <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

const TABS = [
    { value: 'profile', label: 'Profile', icon: User },
    { value: 'projects', label: 'Projects', icon: Briefcase },
    { value: 'certifications', label: 'Certifications', icon: Award },
    { value: 'blog', label: 'Blog', icon: BookOpen },
] as const;

const AdminDashboard = () => {
    // ── All hooks MUST come before any conditional return ──
    const { user, isAdmin, loading, signOut } = useAdminAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        if (!loading && !isAdmin) navigate('/admin', { replace: true });
    }, [isAdmin, loading, navigate]);

    const handleSignOut = useCallback(async () => {
        setSigningOut(true);
        try {
            await signOut();
            navigate('/admin', { replace: true });
        } catch {
            setSigningOut(false);
        }
    }, [signOut, navigate]);

    // ── Early return AFTER all hooks ──
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Top Bar */}
            <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold leading-none">Portfolio Admin</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                                View Site <ChevronRight className="h-3 w-3" />
                            </Button>
                        </a>
                        <Button variant="outline" size="sm" onClick={handleSignOut} disabled={signingOut} className="gap-2">
                            {signingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Welcome Strip */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-5 rounded-2xl glassmorphism border border-border/40 flex items-center gap-4"
                >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <LayoutDashboard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold gradient-text">Welcome back!</h2>
                        <p className="text-sm text-muted-foreground">Manage your portfolio content from here. Changes are live instantly.</p>
                    </div>
                </motion.div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-8 glassmorphism border border-border/40 p-1 rounded-xl h-auto gap-1">
                        {TABS.map(({ value, label, icon: Icon }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="profile">
                        <Suspense fallback={<SectionLoader />}>
                            <ProfileSection />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Suspense fallback={<SectionLoader />}>
                            <ProjectsSection />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="certifications">
                        <Suspense fallback={<SectionLoader />}>
                            <CertificationsSection />
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="blog">
                        <Suspense fallback={<SectionLoader />}>
                            <BlogSection />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default AdminDashboard;
