import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Helper to check if localStorage or sessionStorage is available
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

type Transformer<T> = {
  parse: (value: string) => T;
  serialize: (value: T) => string;
};

// Generic useStorage hook
export function useStorage<T>(
  key: string,
  defaultValue: T,
  storageType: 'localStorage' | 'sessionStorage' | 'cookie',
  expiryDays?: number, // Only for cookies
  transformer: Transformer<T> = {
    parse: (value: string) => JSON.parse(value) as T,
    serialize: (value: T) => JSON.stringify(value),
  }
): [T, (value: T) => void, () => void, boolean] {
  const storageAvailable = storageType !== 'cookie' && isStorageAvailable(storageType);

  const getInitialValue = (): T => {
    if (!storageAvailable && storageType !== 'cookie') return defaultValue;

    let storedValue: string | null = null;
    if (storageType === 'cookie') {
      const cookieValue = Cookies.get(key);
      storedValue = cookieValue !== undefined ? cookieValue : null;
    } else if (storageAvailable) {
      const storage = window[storageType];
      storedValue = storage.getItem(key);
    }

    return storedValue !== null ? transformer.parse(storedValue) : defaultValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    const serializedValue = transformer.serialize(value);

    if (storageType === 'cookie') {
      Cookies.set(key, serializedValue, { expires: expiryDays || 365 });
    } else if (storageAvailable) {
      const storage = window[storageType];
      storage.setItem(key, serializedValue);
    }
  }, [key, value, storageType, storageAvailable, expiryDays, transformer]);

  const removeValue = () => {
    if (storageType === 'cookie') {
      Cookies.remove(key);
    } else if (storageAvailable) {
      const storage = window[storageType];
      storage.removeItem(key);
    }

    setValue(defaultValue);
  };

  return [value, setValue, removeValue, storageAvailable] as const;
}
