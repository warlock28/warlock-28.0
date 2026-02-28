import { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, LayoutGrid, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { ServiceDialog } from '@/components/admin/ServiceDialog';
import { useToast } from '@/hooks/use-toast';
import type { Service } from '@/types/database';

export default function ServicesSection() {
    const { services, loading, deleteService, addService, updateService } = useServices();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | undefined>();

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedService(undefined);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            const { error } = await deleteService(id);
            if (error) {
                toast({ title: 'Error', description: 'Failed to delete service', variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'Service deleted successfully' });
            }
        }
    };

    const handleSave = async (serviceData: Partial<Service>) => {
        let error;
        if (selectedService) {
            const { error: updateErr } = await updateService(selectedService.id, serviceData);
            error = updateErr;
        } else {
            const { error: addErr } = await addService(serviceData as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
            error = addErr;
        }

        if (error) {
            toast({ title: 'Error', description: 'Failed to save service', variant: 'destructive' });
            throw error;
        } else {
            toast({ title: 'Success', description: 'Service saved successfully' });
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading services...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Services</h2>
                    <p className="text-muted-foreground">Manage your services offerings here.</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </Button>
            </div>

            <div className="grid gap-4">
                {services.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-card/50">
                        <LayoutGrid className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">No services found. Add your first service to get started.</p>
                    </div>
                ) : (
                    services.map((service) => (
                        <div
                            key={service.id}
                            className="flex items-start sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors flex-col sm:flex-row gap-4"
                        >
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{service.title}</h3>
                                    {service.featured && (
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                            Featured
                                        </span>
                                    )}
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border flex items-center gap-1">
                                        <ArrowUpDown className="w-3 h-3" /> {service.sort_order}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                                <div className="flex gap-2 flex-wrap pt-1">
                                    {service.features.map((opt, i) => (
                                        <span key={i} className="text-xs flex items-center gap-1 text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-md">
                                            <CheckCircle2 className="w-3 h-3" /> {opt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ServiceDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                service={selectedService}
                onSave={handleSave}
            />
        </div>
    );
}
