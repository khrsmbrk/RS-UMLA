/// <reference types="vite/client" />
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || 'rs-umla-secure-aes-256-key-2026!@#';

export const encryptData = (data: any): string => {
  try {
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
  } catch (error) {
    console.error('Encryption failed', error);
    return '';
  }
};

export const decryptData = (encryptedData: string): any => {
  try {
    if (!encryptedData) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      return null;
    }
    
    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    // console.error('Decryption failed', error);
    return null;
  }
};

export const secureLocalStorage = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, encryptData(value));
  },
  getItem: (key: string): string | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    // Attempt decryption first
    const decrypted = decryptData(item);
    if (decrypted !== null) {
      // CreateJSONStorage from zustand expects string, so stringify if obj
      return typeof decrypted === 'string' ? decrypted : JSON.stringify(decrypted);
    }

    // Fallback if the data in localStorage was not encrypted
    return item;
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};
