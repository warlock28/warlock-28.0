import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
    Mail, MailOpen, Trash2, Search, AlertCircle,
    RefreshCcw, Loader2, CheckCircle2, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useMessages } from '@/hooks/useMessages';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const MessagesSection = () => {
    const { messages, loading, fetchMessages, markAsRead, deleteMessage } = useMessages();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewMessage = (msg: typeof messages[0]) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            markAsRead(msg.id, true);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this message?')) return;

        setIsDeleting(id);
        try {
            await deleteMessage(id);
            toast.success('Message deleted successfully');
            if (selectedMessage?.id === id) setSelectedMessage(null);
        } catch {
            toast.error('Failed to delete message');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleMarkAsUnread = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        markAsRead(id, false);
        toast.success('Marked as unread');
    };

    if (loading && messages.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 glassmorphism p-3 sm:p-4 rounded-xl border border-border/40">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/20 text-sm"
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchMessages}
                    disabled={loading}
                    className="gap-2 w-full sm:w-auto whitespace-nowrap"
                >
                    <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {filteredMessages.length === 0 ? (
                <div className="text-center py-16 bg-card/30 rounded-2xl border border-border/40 border-dashed">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <h4 className="text-base font-medium text-foreground">No messages found</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        {searchQuery ? "Try adjusting your search criteria." : "When someone contacts you, their message will appear here."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredMessages.map((msg, idx) => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                onClick={() => handleViewMessage(msg)}
                                className={`
                                    group flex flex-col sm:flex-row gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                                    ${msg.is_read
                                        ? 'bg-card/40 border-border/40 hover:bg-card/80 hover:border-border/60'
                                        : 'bg-primary/5 border-primary/20 shadow-sm hover:bg-primary/10 hover:border-primary/30'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'
                                        }`}>
                                        {msg.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <div className="flex items-center gap-2 truncate">
                                                <h4 className={`truncate ${msg.is_read ? 'font-medium text-foreground/80' : 'font-semibold text-foreground'}`}>
                                                    {msg.name}
                                                </h4>
                                                {!msg.is_read && (
                                                    <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-0 h-5 px-1.5 text-[10px] uppercase font-bold tracking-wider">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                                                {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                                            </span>
                                        </div>
                                        <p className={`text-sm mb-1 truncate ${msg.is_read ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col justify-end gap-2 shrink-0 border-t sm:border-t-0 border-border/50 pt-3 sm:pt-0 sm:pl-3 sm:border-l opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    {msg.is_read && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs text-muted-foreground hover:text-foreground"
                                            onClick={(e) => handleMarkAsUnread(e, msg.id)}
                                        >
                                            Mark unread
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => handleDelete(e, msg.id)}
                                        disabled={isDeleting === msg.id}
                                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        {isDeleting === msg.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5 mr-1" />}
                                        Delete
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Read Message Dialog */}
            <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
                <DialogContent className="max-w-2xl bg-card border-border/50 w-[calc(100%-2rem)] sm:w-full">
                    {selectedMessage && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <DialogTitle className="text-xl font-bold mb-2">
                                            {selectedMessage.subject}
                                        </DialogTitle>
                                        <DialogDescription className="flex items-center gap-2">
                                            <span className="font-medium text-foreground">From:</span> {selectedMessage.name}
                                            <span className="text-muted-foreground">({selectedMessage.email})</span>
                                        </DialogDescription>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-xs text-muted-foreground block">
                                            {format(new Date(selectedMessage.created_at), 'MMMM d, yyyy')}
                                        </span>
                                        <span className="text-xs text-muted-foreground block">
                                            {format(new Date(selectedMessage.created_at), 'h:mm a')}
                                        </span>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="mt-4 p-5 rounded-lg bg-background/50 border border-border/50 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                                {selectedMessage.message}
                            </div>

                            <div className="mt-6 flex justify-between items-center sm:hidden">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={(e) => handleDelete(e, selectedMessage.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MessagesSection;
