import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, X } from 'lucide-react';
import type { Service } from '@/types/database';

interface ServiceDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    service?: Service;
    onSave: (service: Partial<Service>) => Promise<void>;
}

export function ServiceDialog({ isOpen, onOpenChange, service, onSave }: ServiceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Service>>({
        title: '',
        description: '',
        icon: '',
        features: [],
        featured: false,
        sort_order: 0,
    });

    const [currentFeature, setCurrentFeature] = useState('');

    useEffect(() => {
        if (service) {
            setFormData(service);
        } else {
            setFormData({
                title: '',
                description: '',
                icon: '',
                features: [],
                featured: false,
                sort_order: 0,
            });
        }
        setCurrentFeature('');
    }, [service, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to save service:', error);
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (currentFeature.trim()) {
            setFormData((prev) => ({
                ...prev,
                features: [...(prev.features || []), currentFeature.trim()],
            }));
            setCurrentFeature('');
        }
    };

    const removeFeature = (indexToRemove: number) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features?.filter((_, index) => index !== indexToRemove) || [],
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="h-24"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="icon">Icon Name (Lucide)</Label>
                                <Input
                                    id="icon"
                                    value={formData.icon || ''}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="e.g., Code2, PenTool"
                                />
                            </div>
                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={formData.sort_order || 0}
                                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="featured"
                                checked={formData.featured || false}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                            />
                            <Label htmlFor="featured">Featured Service (Shows on homepage)</Label>
                        </div>

                        <div className="space-y-3">
                            <Label>Included Features</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={currentFeature}
                                    onChange={(e) => setCurrentFeature(e.target.value)}
                                    placeholder="Add a new feature..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addFeature();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addFeature} variant="secondary">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {formData.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                                        <span className="text-sm">{feature}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Service'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
