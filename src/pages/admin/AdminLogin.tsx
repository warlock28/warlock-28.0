import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';

// ─────────────────────────────────────────────────────────────
// AdminLogin — ALL hooks at top level, ZERO conditional returns
// ─────────────────────────────────────────────────────────────
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // All hooks unconditionally called — no exceptions
    const { signIn, isAdmin, loading } = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAdmin) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAdmin, loading, navigate]);

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        // ── Client-side validation ──
        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) {
            setErrorMsg('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setErrorMsg('Please enter your password.');
            return;
        }
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }

        // ── Supabase sign-in ──
        setIsSubmitting(true);
        try {
            const { error } = await signIn(trimmedEmail, password);
            if (error) {
                // Map Supabase errors to user-friendly messages
                if (error.includes('Invalid login credentials')) {
                    setErrorMsg('Invalid email or password. Please check your credentials or create an account in Supabase Dashboard → Authentication → Users.');
                } else if (error.includes('Email not confirmed')) {
                    setErrorMsg('Email not confirmed. Please check your inbox or enable Auto Confirm in Supabase.');
                } else if (error.includes('not configured')) {
                    setErrorMsg(error);
                } else {
                    setErrorMsg(error);
                }
            } else {
                navigate('/admin/dashboard', { replace: true });
            }
        } catch {
            setErrorMsg('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    }, [email, password, signIn, navigate]);

    // ── Render: use conditional JSX, NOT early returns ──
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

            <AnimatePresence mode="wait">
                {loading ? (
                    // Loading spinner — INSIDE the return, not an early return
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center"
                    >
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="relative w-full max-w-md mx-4"
                    >
                        <div className="glassmorphism rounded-2xl p-8 border border-border/40 shadow-2xl">
                            {/* Header */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                    <Shield className="h-7 w-7 text-primary" />
                                </div>
                                <h1 className="text-2xl font-bold gradient-text">Admin Portal</h1>
                                <p className="text-sm text-muted-foreground mt-1">Portfolio Dashboard</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-background/50 border-border/60 focus:border-primary/60"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-background/50 border-border/60 focus:border-primary/60 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {errorMsg && (
                                        <motion.p
                                            key="error"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="text-sm text-destructive text-center bg-destructive/10 rounded-lg py-2 px-3"
                                        >
                                            {errorMsg}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in…</>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </form>

                            <p className="text-xs text-muted-foreground text-center mt-6">
                                This portal is for portfolio owner only.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLogin;
