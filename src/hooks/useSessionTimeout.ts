import { useEffect, useRef } from 'react';

/**
 * Hook to execute a callback after a specified duration of user inactivity.
 * Resets the timer on common user interactions (mouse movement, clicks, keypress, scroll).
 * 
 * @param onTimeout - Callback function to execute when timeout is reached
 * @param timeoutMs - Duration in milliseconds of inactivity before firing the callback (default 15 minutes)
 */
export function useSessionTimeout(onTimeout: () => void, timeoutMs: number = 15 * 60 * 1000) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear existing timer
        const clearTimer = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };

        // Reset timer, start counting again
        const resetTimer = () => {
            clearTimer();
            timerRef.current = setTimeout(() => {
                onTimeout();
            }, timeoutMs);
        };

        // Initialize the first timer
        resetTimer();

        // Events that reset the inactivity timer
        const events = [
            'mousemove',
            'mousedown',
            'keydown',
            'touchstart',
            'scroll'
        ];

        // Add event listeners to window
        events.forEach(event => window.addEventListener(event, resetTimer));

        // Cleanup on unmount
        return () => {
            clearTimer();
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, [onTimeout, timeoutMs]);
}
