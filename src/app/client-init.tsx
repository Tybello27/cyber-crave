'use client';

import { useEffect } from 'react';

export function ClientInit() {
  useEffect(() => {
    // Register service worker for PWA functionality
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('ServiceWorker registration failed:', err);
      });
    }

    // Handle PWA install prompt
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show custom install button if needed
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'block';
      }
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'none';
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Expose install function globally
    (window as any).installPWA = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
      }
    };

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return null;
}
