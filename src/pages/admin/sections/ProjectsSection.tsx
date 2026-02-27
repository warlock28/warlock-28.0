import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Upload, X, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useProjects } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/types/database';

type FormData = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

const EMPTY_FORM: FormData = {
    title: '', description: '', long_description: '', image_url: '',
    technologies: [], category: 'fullstack', demo_url: '', github_url: '',
    featured: false, date: '', sort_order: 0,
};

const CATEGORIES = ['fullstack', 'frontend', 'backend', 'security', 'mobile', 'other'] as const;

const ProjectsSection = () => {
    const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [techInput, setTechInput] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setImageFile(null); setImagePreview(null); setOpen(true); };
    const openEdit = (p: Project) => {
        setForm({ title: p.title, description: p.description, long_description: p.long_description ?? '', image_url: p.image_url ?? '', technologies: [...p.technologies], category: p.category, demo_url: p.demo_url ?? '', github_url: p.github_url ?? '', featured: p.featured, date: p.date ?? '', sort_order: p.sort_order });
        setEditId(p.id); setImageFile(null); setImagePreview(null); setOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setImageFile(file); setImagePreview(URL.createObjectURL(file));
    };

    const addTech = () => {
        const t = techInput.trim();
        if (t && !form.technologies.includes(t)) { setForm(f => ({ ...f, technologies: [...f.technologies, t] })); }
        setTechInput('');
    };
    const removeTech = (t: string) => setForm(f => ({ ...f, technologies: f.technologies.filter(x => x !== t) }));

    const handleSave = async () => {
        setSaving(true);
        const { error } = editId
            ? await updateProject(editId, form, imageFile ?? undefined)
            : await addProject(form, imageFile ?? undefined);
        if (error) { toast({ title: 'Error', description: error, variant: 'destructive' }); }
        else { toast({ title: editId ? 'Project updated' : 'Project added', description: 'Changes saved.' }); setOpen(false); }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        const { error } = await deleteProject(id);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else toast({ title: 'Project deleted' });
        setDeletingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Projects <span className="ml-2 text-sm font-normal text-muted-foreground">({projects.length})</span></h3>
                <Button onClick={openAdd} size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-1.5">
                    <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add Project</span><span className="sm:hidden">Add</span>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 bg-card/30 rounded-2xl border border-border/40 border-dashed">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <h4 className="text-base font-medium">No projects yet</h4>
                    <p className="text-sm text-muted-foreground mt-1">Click "Add Project" to get started.</p>
                </div>
            ) : (
                <>
                    {/* Desktop table view (hidden below md) */}
                    <div className="hidden md:block glassmorphism rounded-2xl border border-border/40 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border/40 hover:bg-transparent">
                                    <TableHead>Project</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Technologies</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {projects.map((p) => (
                                        <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="border-border/40 hover:bg-muted/20 transition-colors">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {p.image_url && <img src={p.image_url} alt={p.title} className="h-10 w-14 rounded-lg object-cover border border-border/40" />}
                                                    <div>
                                                        <p className="font-medium text-sm">{p.title}</p>
                                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-48">{p.description}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge variant="outline" className="capitalize text-xs">{p.category}</Badge></TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1 max-w-48">
                                                    {p.technologies.slice(0, 3).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                                                    {p.technologies.length > 3 && <Badge variant="secondary" className="text-xs">+{p.technologies.length - 3}</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge className={p.featured ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}>{p.featured ? 'Yes' : 'No'}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer"><Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-3.5 w-3.5" /></Button></a>}
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
                            {projects.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glassmorphism rounded-xl border border-border/40 p-4 space-y-3"
                                >
                                    {/* Header row with image + title */}
                                    <div className="flex items-start gap-3">
                                        {p.image_url && (
                                            <img src={p.image_url} alt={p.title} className="h-14 w-20 rounded-lg object-cover border border-border/40 flex-shrink-0" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="font-semibold text-sm leading-tight">{p.title}</p>
                                                {p.featured && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] shrink-0">Featured</Badge>}
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                                        </div>
                                    </div>

                                    {/* Meta row */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <Badge variant="outline" className="capitalize text-[10px]">{p.category}</Badge>
                                        {p.technologies.slice(0, 3).map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                                        {p.technologies.length > 3 && <Badge variant="secondary" className="text-[10px]">+{p.technologies.length - 3}</Badge>}
                                    </div>

                                    {/* Actions row */}
                                    <div className="flex items-center justify-end gap-1 pt-1 border-t border-border/30">
                                        {p.demo_url && (
                                            <a href={p.demo_url} target="_blank" rel="noreferrer">
                                                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                                                    <ExternalLink className="h-3 w-3" /> Demo
                                                </Button>
                                            </a>
                                        )}
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

            {/* Add/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-h-[85vh] w-[calc(100%-2rem)] sm:w-full">
                    <DialogHeader>
                        <DialogTitle>{editId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1.5">
                                <Label>Title *</Label>
                                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project name" />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Short Description *</Label>
                                <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="One-liner description" />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Full Description</Label>
                                <textarea rows={3} value={form.long_description} onChange={e => setForm(f => ({ ...f, long_description: e.target.value }))} placeholder="Detailed description…" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Category</Label>
                                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Project['category'] }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label>Date (YYYY-MM)</Label>
                                <Input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="2025-01" />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Demo URL</Label>
                                <Input value={form.demo_url} onChange={e => setForm(f => ({ ...f, demo_url: e.target.value }))} placeholder="https://..." />
                            </div>
                            <div className="space-y-1.5">
                                <Label>GitHub URL</Label>
                                <Input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} placeholder="https://github.com/..." />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Technologies</Label>
                                <div className="flex gap-2">
                                    <Input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Add tech and press Enter" />
                                    <Button type="button" variant="outline" onClick={addTech}>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {form.technologies.map(t => (
                                        <Badge key={t} variant="secondary" className="cursor-pointer gap-1" onClick={() => removeTech(t)}>{t} <X className="h-3 w-3" /></Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Cover Image</Label>
                                <div className="flex items-center gap-4">
                                    {(imagePreview ?? form.image_url) && <img src={imagePreview ?? form.image_url} alt="" className="h-16 w-24 rounded-lg object-cover border border-border/40" />}
                                    <Label htmlFor="proj-img" className="cursor-pointer"><Button variant="outline" size="sm" asChild><span><Upload className="h-4 w-4 mr-2" /> Upload Image</span></Button></Label>
                                    <input id="proj-img" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="or paste image URL" className="text-xs" />
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center gap-3">
                                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="h-4 w-4 accent-primary" />
                                <Label htmlFor="featured" className="cursor-pointer font-normal">Show in featured section on homepage</Label>
                            </div>
                            <div className="space-y-1.5">
                                <Label>Sort Order</Label>
                                <Input type="number" min={0} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} placeholder="0" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                            {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving…</> : 'Save Project'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectsSection;
