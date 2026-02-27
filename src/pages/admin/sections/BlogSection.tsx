import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Upload, Eye, EyeOff, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBlog } from '@/hooks/useBlog';
import { useToast } from '@/hooks/use-toast';
import type { BlogPost } from '@/types/database';

type BlogFormData = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

const EMPTY: BlogFormData = {
    title: '', slug: '', excerpt: '', content: '', cover_image_url: '',
    tags: [], published: false, published_at: null, read_time_minutes: 5,
};

const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const BlogSection = () => {
    const { posts, loading, addPost, updatePost, deletePost, togglePublish } = useBlog();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState<BlogFormData>(EMPTY);
    const [tagInput, setTagInput] = useState('');
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const openAdd = () => { setForm(EMPTY); setEditId(null); setCoverFile(null); setCoverPreview(null); setTagInput(''); setOpen(true); };
    const openEdit = (p: BlogPost) => {
        setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, cover_image_url: p.cover_image_url ?? '', tags: [...(p.tags ?? [])], published: p.published, published_at: p.published_at ?? null, read_time_minutes: p.read_time_minutes });
        setEditId(p.id); setCoverFile(null); setCoverPreview(null); setTagInput(''); setOpen(true);
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setCoverFile(file); setCoverPreview(URL.createObjectURL(file));
    };

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !(form.tags ?? []).includes(t)) setForm(f => ({ ...f, tags: [...(f.tags ?? []), t] }));
        setTagInput('');
    };
    const removeTag = (t: string) => setForm(f => ({ ...f, tags: (f.tags ?? []).filter(x => x !== t) }));

    const handleSave = async () => {
        setSaving(true);
        const { error } = editId
            ? await updatePost(editId, form, coverFile ?? undefined)
            : await addPost(form, coverFile ?? undefined);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else { toast({ title: editId ? 'Post updated' : 'Post created' }); setOpen(false); }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        const { error } = await deletePost(id);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else toast({ title: 'Post deleted' });
        setDeletingId(null);
    };

    const handleTogglePublish = async (id: string, published: boolean) => {
        setTogglingId(id);
        const { error } = await togglePublish(id, !published);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else toast({ title: published ? 'Post unpublished' : 'Post published' });
        setTogglingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Blog Posts <span className="ml-2 text-sm font-normal text-muted-foreground">({posts.length})</span></h3>
                <Button onClick={openAdd} size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-1.5">
                    <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New Post</span><span className="sm:hidden">New</span>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16 bg-card/30 rounded-2xl border border-border/40 border-dashed">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <h4 className="text-base font-medium">No blog posts yet</h4>
                    <p className="text-sm text-muted-foreground mt-1">Start writing your first post.</p>
                </div>
            ) : (
                <>
                    {/* Desktop table (hidden below md) */}
                    <div className="hidden md:block glassmorphism rounded-2xl border border-border/40 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border/40 hover:bg-transparent">
                                    <TableHead>Title</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead>Read Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {posts.map((p) => (
                                        <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="border-border/40 hover:bg-muted/20 transition-colors">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} className="h-10 w-14 rounded-lg object-cover border border-border/40" />}
                                                    <div>
                                                        <p className="font-medium text-sm">{p.title}</p>
                                                        <p className="text-xs text-muted-foreground">/{p.slug}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1 max-w-40">
                                                    {(p.tags ?? []).slice(0, 2).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                                                    {(p.tags ?? []).length > 2 && <Badge variant="secondary" className="text-xs">+{(p.tags ?? []).length - 2}</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{p.read_time_minutes} min</TableCell>
                                            <TableCell>
                                                <Badge className={p.published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-muted text-muted-foreground'}>
                                                    {p.published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleTogglePublish(p.id, p.published)} disabled={togglingId === p.id}>
                                                        {togglingId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : p.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}>
                                                        {deletingId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile card view (hidden md+) */}
                    <div className="md:hidden grid gap-3">
                        <AnimatePresence>
                            {posts.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glassmorphism rounded-xl border border-border/40 p-4 space-y-3"
                                >
                                    <div className="flex items-start gap-3">
                                        {p.cover_image_url && (
                                            <img src={p.cover_image_url} alt={p.title} className="h-14 w-20 rounded-lg object-cover border border-border/40 flex-shrink-0" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="font-semibold text-sm leading-tight">{p.title}</p>
                                                <Badge className={`shrink-0 text-[10px] ${p.published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-muted text-muted-foreground'}`}>
                                                    {p.published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">/{p.slug} · {p.read_time_minutes} min read</p>
                                        </div>
                                    </div>

                                    {(p.tags ?? []).length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            {(p.tags ?? []).slice(0, 3).map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                                            {(p.tags ?? []).length > 3 && <Badge variant="secondary" className="text-[10px]">+{(p.tags ?? []).length - 3}</Badge>}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-end gap-1 pt-1 border-t border-border/30">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5" onClick={() => handleTogglePublish(p.id, p.published)} disabled={togglingId === p.id}>
                                            {togglingId === p.id ? <Loader2 className="h-3 w-3 animate-spin" /> : p.published ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                            {p.published ? 'Unpublish' : 'Publish'}
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5" onClick={() => openEdit(p)}>
                                            <Pencil className="h-3 w-3" /> Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}>
                                            {deletingId === p.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                            Delete
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-h-[85vh] w-[calc(100%-2rem)] sm:w-full">
                    <DialogHeader><DialogTitle>{editId ? 'Edit Post' : 'New Blog Post'}</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="col-span-2 space-y-1.5">
                            <Label>Title *</Label>
                            <Input value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) })); }} placeholder="Post title" />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Slug</Label>
                            <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="my-post-slug" />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Excerpt</Label>
                            <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary shown in cards…" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Content (Markdown)</Label>
                            <textarea rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write your post in markdown…" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>Read Time (minutes)</Label>
                                <Input type="number" min={1} value={form.read_time_minutes} onChange={e => setForm(f => ({ ...f, read_time_minutes: Number(e.target.value) }))} />
                            </div>
                            <div className="flex items-end gap-3 pb-0.5">
                                <input type="checkbox" id="publish-now" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="h-4 w-4 accent-primary" />
                                <Label htmlFor="publish-now" className="cursor-pointer font-normal">Publish immediately</Label>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Tags</Label>
                            <div className="flex gap-2">
                                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag and press Enter" />
                                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {(form.tags ?? []).map(t => <Badge key={t} variant="secondary" className="cursor-pointer gap-1" onClick={() => removeTag(t)}>{t}</Badge>)}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Cover Image</Label>
                            <div className="flex items-center gap-4">
                                {(coverPreview ?? form.cover_image_url) && <img src={coverPreview ?? form.cover_image_url} alt="" className="h-14 w-20 rounded-lg object-cover border border-border/40" />}
                                <Label htmlFor="cover-img" className="cursor-pointer"><Button variant="outline" size="sm" asChild><span><Upload className="h-4 w-4 mr-2" /> Upload</span></Button></Label>
                                <input id="cover-img" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                                <Input value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))} placeholder="or paste URL" className="text-xs" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                            {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving…</> : 'Save Post'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BlogSection;
