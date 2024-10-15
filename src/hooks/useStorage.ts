import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

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

// Overload definitions for the hook
// 1. For cookies, expiryDays is required
export function useStorage(
  key: string,
  defaultValue: string,
  storageType: 'cookie',
  expiryDays: number
): [string, (value: string) => void, () => void, boolean];

// 2. For localStorage and sessionStorage, expiryDays is not allowed
export function useStorage(
  key: string,
  defaultValue: string,
  storageType: 'localStorage' | 'sessionStorage'
): [string, (value: string) => void, () => void, boolean];

// Implementation signature
export function useStorage(
  key: string,
  defaultValue: string,
  storageType: 'localStorage' | 'sessionStorage' | 'cookie',
  expiryDays?: number // Optional, required only for cookies
): [string, (value: string) => void, () => void, boolean] {
  // Check storage availability for localStorage or sessionStorage
  const storageAvailable = storageType !== 'cookie' && isStorageAvailable(storageType);

  const getInitialValue = (): string => {
    if (!storageAvailable && storageType !== 'cookie') return defaultValue;

    let storedValue: string | null = null;
    if (storageType === 'cookie') {
      const cookieValue = Cookies.get(key); // Returns string | undefined
      storedValue = cookieValue !== undefined ? cookieValue : null; // Handle undefined by converting it to null
    } else if (storageAvailable) {
      const storage = window[storageType];
      storedValue = storage.getItem(key);
    }

    return storedValue !== null ? storedValue : defaultValue;
  };

  const [value, setValue] = useState<string>(getInitialValue);

  // Save the value in the correct storage when it changes
  useEffect(() => {
    if (storageType === 'cookie') {
      Cookies.set(key, value, { expires: expiryDays || 365 }); // Use js-cookie to set cookie value with expiration
    } else if (storageAvailable) {
      const storage = window[storageType];
      storage.setItem(key, value);
    }
  }, [key, value, storageType, storageAvailable, expiryDays]);

  // Function to remove value from storage
  const removeValue = () => {
    if (storageType === 'cookie') {
      Cookies.remove(key); // Use js-cookie to remove the cookie
    } else if (storageAvailable) {
      const storage = window[storageType];
      storage.removeItem(key);
    }

    setValue(defaultValue); // Reset value to default
  };

  return [value, setValue, removeValue, storageAvailable] as const;
}
