import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Loader2, User, Link, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

const ProfileSection = () => {
    const { profile, loading, updateProfile } = useProfile();
    const { toast } = useToast();
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        resume_url: '',
        github_url: '',
        linkedin_url: '',
        twitter_url: '',
        instagram_url: '',
    });

    // Sync form when profile loads — useEffect prevents render-loop
    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name ?? '',
                title: profile.title ?? '',
                bio: profile.bio ?? '',
                email: profile.email ?? '',
                phone: profile.phone ?? '',
                location: profile.location ?? '',
                resume_url: profile.resume_url ?? '',
                github_url: profile.github_url ?? '',
                linkedin_url: profile.linkedin_url ?? '',
                twitter_url: profile.twitter_url ?? '',
                instagram_url: profile.instagram_url ?? '',
            });
        }
    }, [profile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        setSaving(true);
        const { error } = await updateProfile(form, imageFile ?? undefined);
        if (error) {
            toast({ title: 'Error', description: error, variant: 'destructive' });
        } else {
            toast({ title: 'Profile updated', description: 'Changes saved successfully.' });
            setImageFile(null);
        }
        setSaving(false);
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-8">
            {/* Profile Photo */}
            <div className="glassmorphism rounded-2xl p-6 border border-border/40">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile Photo</h3>
                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary/30 bg-muted flex-shrink-0">
                        <img
                            src={imagePreview ?? profile?.profile_image_url ?? '/images/certifications/remo.webp'}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <Label htmlFor="photo-upload" className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                                <span><Upload className="h-4 w-4 mr-2" /> Upload Photo</span>
                            </Button>
                        </Label>
                        <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG or WEBP · Max 2MB</p>
                    </div>
                </div>
            </div>

            {/* Basic Info */}
            <div className="glassmorphism rounded-2xl p-6 border border-border/40">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { key: 'name', label: 'Full Name', placeholder: 'Nitin Kumar' },
                        { key: 'title', label: 'Title / Role', placeholder: 'Full Stack Developer' },
                        { key: 'email', label: 'Email', placeholder: 'you@example.com' },
                        { key: 'phone', label: 'Phone', placeholder: '+91 9876543210' },
                        { key: 'location', label: 'Location', placeholder: 'Agra, India' },
                        { key: 'resume_url', label: 'Resume URL', placeholder: 'https://drive.google.com/...' },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key} className="space-y-1.5">
                            <Label>{label}</Label>
                            <Input
                                value={form[key as keyof typeof form]}
                                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                placeholder={placeholder}
                                className="bg-background/50"
                            />
                        </div>
                    ))}
                    <div className="md:col-span-2 space-y-1.5">
                        <Label>Bio</Label>
                        <textarea
                            value={form.bio}
                            onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
                            rows={4}
                            placeholder="Write a compelling bio..."
                            className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="glassmorphism rounded-2xl p-6 border border-border/40">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Link className="h-5 w-5 text-primary" /> Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { key: 'github_url', label: 'GitHub URL' },
                        { key: 'linkedin_url', label: 'LinkedIn URL' },
                        { key: 'twitter_url', label: 'Twitter / X URL' },
                        { key: 'instagram_url', label: 'Instagram URL' },
                    ].map(({ key, label }) => (
                        <div key={key} className="space-y-1.5">
                            <Label>{label}</Label>
                            <Input
                                value={form[key as keyof typeof form]}
                                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                placeholder="https://..."
                                className="bg-background/50"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 font-semibold px-8">
                    {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving…</> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                </Button>
            </div>
        </div>
    );
};

export default ProfileSection;
