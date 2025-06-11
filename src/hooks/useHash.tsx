
import { useState, useEffect } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    // Function to extract hash from URL
    const extractHash = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hashFromUrl = urlParams.get('hash');
      
      if (hashFromUrl) {
        setHash(hashFromUrl);
        localStorage.setItem('partner_hash', hashFromUrl);
        console.log('Hash captured from URL:', hashFromUrl);
      } else {
        // Try to get from localStorage if not in URL
        const storedHash = localStorage.getItem('partner_hash');
        if (storedHash) {
          setHash(storedHash);
          console.log('Hash loaded from localStorage:', storedHash);
        }
      }
    };

    extractHash();

    // Listen for URL changes
    const handleLocationChange = () => {
      extractHash();
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const clearHash = () => {
    setHash(null);
    localStorage.removeItem('partner_hash');
  };

  const updateHash = (newHash: string) => {
    setHash(newHash);
    localStorage.setItem('partner_hash', newHash);
  };

  return {
    hash,
    clearHash,
    updateHash,
    hasHash: Boolean(hash)
  };
};
