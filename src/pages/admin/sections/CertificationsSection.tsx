import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCertifications } from '@/hooks/useCertifications';
import { useToast } from '@/hooks/use-toast';
import type { Certification } from '@/types/database';

type FormData = Omit<Certification, 'id' | 'created_at' | 'updated_at'>;

const EMPTY: FormData = {
    name: '', issuer: '', date: '', expiry_date: '', credential_id: '',
    credential_url: '', image_url: '', skills: [], description: '', featured: false, sort_order: 0,
};

const CertificationsSection = () => {
    const { certifications, loading, addCertification, updateCertification, deleteCertification } = useCertifications();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState<FormData>(EMPTY);
    const [skillInput, setSkillInput] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const openAdd = () => { setForm(EMPTY); setEditId(null); setImageFile(null); setImagePreview(null); setSkillInput(''); setOpen(true); };
    const openEdit = (c: Certification) => {
        setForm({ name: c.name, issuer: c.issuer, date: c.date, expiry_date: c.expiry_date ?? '', credential_id: c.credential_id ?? '', credential_url: c.credential_url ?? '', image_url: c.image_url ?? '', skills: [...(c.skills ?? [])], description: c.description ?? '', featured: c.featured ?? false, sort_order: c.sort_order });
        setEditId(c.id); setImageFile(null); setImagePreview(null); setSkillInput(''); setOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setImageFile(file); setImagePreview(URL.createObjectURL(file));
    };

    const addSkill = () => {
        const s = skillInput.trim();
        if (s && !(form.skills ?? []).includes(s)) setForm(f => ({ ...f, skills: [...(f.skills ?? []), s] }));
        setSkillInput('');
    };
    const removeSkill = (s: string) => setForm(f => ({ ...f, skills: (f.skills ?? []).filter(x => x !== s) }));

    const handleSave = async () => {
        setSaving(true);
        const { error } = editId
            ? await updateCertification(editId, form, imageFile ?? undefined)
            : await addCertification(form, imageFile ?? undefined);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else { toast({ title: editId ? 'Certification updated' : 'Certification added' }); setOpen(false); }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        const { error } = await deleteCertification(id);
        if (error) toast({ title: 'Error', description: error, variant: 'destructive' });
        else toast({ title: 'Certification deleted' });
        setDeletingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Certifications <span className="ml-2 text-sm font-normal text-muted-foreground">({certifications.length})</span></h3>
                <Button onClick={openAdd} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" /> Add Certification
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
                <div className="glassmorphism rounded-2xl border border-border/40 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border/40 hover:bg-transparent">
                                <TableHead>Certification</TableHead>
                                <TableHead>Issuer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {certifications.map((c) => (
                                    <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="border-border/40 hover:bg-muted/20 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {c.image_url && <img src={c.image_url} alt={c.name} className="h-10 w-10 rounded-lg object-contain border border-border/40 bg-muted/30 p-1" />}
                                                <p className="font-medium text-sm">{c.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{c.issuer}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{c.date}</TableCell>
                                        <TableCell><Badge className={c.featured ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}>{c.featured ? 'Yes' : 'No'}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {c.credential_url && <a href={c.credential_url} target="_blank" rel="noreferrer"><Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-3.5 w-3.5" /></Button></a>}
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(c.id)} disabled={deletingId === c.id}>
                                                    {deletingId === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {certifications.length === 0 && (
                                <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No certifications yet.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>{editId ? 'Edit Certification' : 'Add Certification'}</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1.5"><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. AWS Solutions Architect" /></div>
                            <div className="space-y-1.5"><Label>Issuer *</Label><Input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} placeholder="Amazon Web Services" /></div>
                            <div className="space-y-1.5"><Label>Date (YYYY or YYYY-MM)</Label><Input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="2024-03" /></div>
                            <div className="space-y-1.5"><Label>Expiry Date</Label><Input value={form.expiry_date} onChange={e => setForm(f => ({ ...f, expiry_date: e.target.value }))} placeholder="2027-03" /></div>
                            <div className="space-y-1.5"><Label>Credential ID</Label><Input value={form.credential_id} onChange={e => setForm(f => ({ ...f, credential_id: e.target.value }))} placeholder="AWS-SAA-123456" /></div>
                            <div className="col-span-2 space-y-1.5"><Label>Credential URL</Label><Input value={form.credential_url} onChange={e => setForm(f => ({ ...f, credential_url: e.target.value }))} placeholder="https://..." /></div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Description</Label>
                                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What this certification covers…" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Skills Covered</Label>
                                <div className="flex gap-2">
                                    <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add skill and press Enter" />
                                    <Button type="button" variant="outline" onClick={addSkill}>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {(form.skills ?? []).map(s => <Badge key={s} variant="secondary" className="cursor-pointer gap-1" onClick={() => removeSkill(s)}>{s}<X className="h-3 w-3" /></Badge>)}
                                </div>
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <Label>Badge Image</Label>
                                <div className="flex items-center gap-4">
                                    {(imagePreview ?? form.image_url) && <img src={imagePreview ?? form.image_url} alt="" className="h-14 w-14 rounded-lg object-contain border border-border/40 bg-muted/30 p-1" />}
                                    <Label htmlFor="cert-img" className="cursor-pointer"><Button variant="outline" size="sm" asChild><span><Upload className="h-4 w-4 mr-2" /> Upload</span></Button></Label>
                                    <input id="cert-img" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="or paste image URL" className="text-xs" />
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center gap-3">
                                <input type="checkbox" id="cert-featured" checked={form.featured ?? false} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="h-4 w-4 accent-primary" />
                                <Label htmlFor="cert-featured" className="cursor-pointer font-normal">Show in featured section on homepage</Label>
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
                            {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving…</> : 'Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CertificationsSection;
