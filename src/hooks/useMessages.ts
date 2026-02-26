import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Message } from '@/types/database';

export function useMessages() {
    const queryClient = useQueryClient();

    const { data: messages, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            if (!isSupabaseConfigured) return [];
            const { data, error: err } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (err) throw err;
            return (data as Message[]) || [];
        },
        staleTime: 5 * 60 * 1000,
    });

    // Send a new message (for public contact form)
    const sendMessage = async (messageData: Omit<Message, 'id' | 'created_at' | 'is_read'>) => {
        if (!isSupabaseConfigured) {
            throw new Error('Supabase is not configured.');
        }

        const { error: err } = await supabase
            .from('messages')
            .insert(messageData as any);

        if (err) {
            console.error('[Messages] error sending message:', err);
            throw new Error(err.message || 'Failed to send message');
        }
        await queryClient.invalidateQueries({ queryKey: ['messages'] });
    };

    // Mark a message as read (for admin dashboard)
    const markAsRead = async (id: string, isRead: boolean = true) => {
        if (!isSupabaseConfigured) return;

        try {
            const { error: err } = await supabase
                .from('messages')
                .update({ is_read: isRead })
                .eq('id', id);

            if (err) throw err;

            // Optimistic update
            queryClient.setQueryData(['messages'], (old: Message[] | undefined) =>
                old ? old.map(msg => msg.id === id ? { ...msg, is_read: isRead } : msg) : old
            );
        } catch (err: any) {
            console.error('[Messages] error marking as read:', err);
        }
    };

    // Delete a message (for admin dashboard)
    const deleteMessage = async (id: string) => {
        if (!isSupabaseConfigured) return;

        try {
            const { error: err } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (err) throw err;
            await queryClient.invalidateQueries({ queryKey: ['messages'] });
        } catch (err: any) {
            console.error('[Messages] error deleting message:', err);
            throw new Error(err.message || 'Failed to delete message');
        }
    };

    return {
        messages: messages ?? [],
        loading: isLoading,
        error: queryError instanceof Error ? queryError.message : (queryError ? String(queryError) : null),
        fetchMessages: refetch,
        sendMessage,
        markAsRead,
        deleteMessage
    };
}
