import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isClient = typeof window !== 'undefined';

  const getStoredValue = useCallback((): T => {
    if (!isClient) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue, isClient]);

  const [value, setValueState] = useState<T>(getStoredValue);

  const setValue = useCallback(
    (val: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(val));
        setValueState(val);
      } catch {}
    },
    [key],
  );

  const updateValue = useCallback(
    (partial: Partial<T>) => {
      setValueState((prev: T) => {
        const newValue = { ...prev, ...partial };
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch {}
        return newValue;
      });
    },
    [key],
  );

  // Sync with localStorage changes (like another tab updating it)
  useEffect(() => {
    if (!isClient) return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValueState(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, isClient]);

  return { value, setValue, updateValue };
}
