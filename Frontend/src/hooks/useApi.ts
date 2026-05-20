import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T>(fetchFn: () => Promise<T>): ApiState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        let cancelled = false;

        startLoading();
        setLoading(true);

        fetchFn()
            .then((result) => {
                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            })
            .catch((err: any) => {
                if (!cancelled) {
                    setError(err?.message ?? 'Unknown error');
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                    stopLoading();
                }
            });

        return () => {
            cancelled = true;
            stopLoading();
        };
    }, [fetchFn, startLoading, stopLoading]);

    return { data, loading, error };
}
