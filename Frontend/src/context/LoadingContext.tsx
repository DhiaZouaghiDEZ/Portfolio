import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback,
    type ReactNode,
} from 'react';

interface LoadingContextValue {
    startLoading: () => void;
    stopLoading: () => void;
    initialLoading: boolean;
    loadingCount: number;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loadingCount, setLoadingCount] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const MIN_LOADING_TIME = 2000;

    useEffect(() => {
        if (initialLoading && loadingCount === 0) {
            const timeout = window.setTimeout(() => {
                setInitialLoading(false);
            }, MIN_LOADING_TIME);

            return () => window.clearTimeout(timeout);
        }
    }, [initialLoading, loadingCount]);

    const startLoading = useCallback(() => {
        setLoadingCount((c) => c + 1);
    }, []);

    const stopLoading = useCallback(() => {
        setLoadingCount((c) => Math.max(0, c - 1));
    }, []);

    const value = useMemo(
        () => ({
            startLoading,
            stopLoading,
            initialLoading,
            loadingCount,
        }),
        [startLoading, stopLoading, initialLoading, loadingCount]
    );

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
