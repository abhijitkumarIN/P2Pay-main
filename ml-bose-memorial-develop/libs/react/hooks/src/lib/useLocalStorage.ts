import { StorageHelper } from '@aws-amplify/core';

export const useLocalStorage = <T = any>(
  key: string | null,
  defaultValue: any,
): {
  localStorageValue: T;
  setLocalStorageValue: (T) => void;
  removeLocalStorageValue: () => void;
} => {
  const _storage = new StorageHelper().getStorage();
  let localStorageValue;
  try {
    localStorageValue = JSON.parse(_storage.getItem(key) || JSON.stringify(defaultValue));
  } catch (e) {
    localStorageValue = defaultValue;
  }

  const setLocalStorageValue = (value) => {
    if (key) {
      _storage.setItem(key, JSON.stringify(value));
    }
  };

  const removeLocalStorageValue = () => {
    _storage.removeItem(key);
  };

  return { localStorageValue, setLocalStorageValue, removeLocalStorageValue };
};
