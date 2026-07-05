'use client';

import { useState, useEffect } from 'react';

export default function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showAndroidPopup, setShowAndroidPopup] = useState<boolean>(false);
  const [showIOSBanner, setShowIOSBanner] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(standalone);
    if (standalone) return;

    const userAgent = window.navigator.userAgent || '';
    const iosDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(iosDevice);

    if (iosDevice) {
      const iosDismissed = sessionStorage.getItem('cyclecrave_ios_banner_dismissed');
      if (!iosDismissed) {
        const timer = setTimeout(() => setShowIOSBanner(true), 1000);
        return () => clearTimeout(timer);
      }
    } else {
      const dismissed = sessionStorage.getItem('cyclecrave_android_popup_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShowAndroidPopup(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone && !isIOS) setShowAndroidPopup(true);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setShowAndroidPopup(false);
      setShowIOSBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone, isIOS]);

  const handleAndroidInstall = async () => {
    setIsInstalling(true);
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsStandalone(true);
          setShowAndroidPopup(false);
        }
      } catch (err) {
        console.error('Install error:', err);
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      setIsInstalling(false);
      alert('To install CycleCrave, tap the browser menu (⋮) and select "Install app".');
    }
  };

  const handleDismissAndroid = () => {
    setShowAndroidPopup(false);
    sessionStorage.setItem('cyclecrave_android_popup_dismissed', 'true');
  };

  const handleDismissIOS = () => {
    setShowIOSBanner(false);
    sessionStorage.setItem('cyclecrave_ios_banner_dismissed', 'true');
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Android / Chrome Install Modal */}
      {showAndroidPopup && !isIOS && (
        <div className="fixed inset-0 z-[100] bg-[#3D2E2E]/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-[36px] sm:rounded-[36px] p-6 sm:p-7 shadow-2xl space-y-5 text-center relative overflow-hidden animate-slide-up">
            {/* Ambient coral glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-32 bg-[#FADEDE] rounded-full filter blur-3xl opacity-70 pointer-events-none"></div>

            {/* App Icon */}
            <div className="relative z-10 flex justify-center">
              <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#F5B8B0] via-[#F0A199] to-[#E88B82] flex items-center justify-center text-4xl shadow-lg ring-4 ring-white">
                🌸
              </div>
            </div>

            <div className="relative z-10 space-y-1.5">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#D97369]">
                INSTALLABLE APP
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#3D2E2E]">
                Get <span className="italic text-[#D97369]">CycleCrave</span>
              </h2>
              <p className="text-xs text-[#9A8080] font-normal max-w-xs mx-auto leading-relaxed pt-1">
                Save CycleCrave directly to your home screen for offline access and native app performance.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="relative z-10 bg-[#F7F0E4] rounded-2xl p-3 grid grid-cols-3 gap-2 text-center text-[10px] text-[#6B5555] font-medium">
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#FADEDE] flex items-center justify-center text-sm">⚡</div>
                <span>Instant</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#E8EEE0] flex items-center justify-center text-sm">📱</div>
                <span>Native App</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#EFE6F5] flex items-center justify-center text-sm">🔒</div>
                <span>Offline</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="relative z-10 space-y-2 pt-1">
              <button
                onClick={handleAndroidInstall}
                disabled={isInstalling}
                className="w-full bg-gradient-to-r from-[#F0A199] to-[#E88B82] text-white py-4 rounded-full font-semibold text-sm shadow-[0_8px_20px_-4px_rgba(232,139,130,0.5)] hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>📥</span>
                <span>{isInstalling ? 'Installing...' : 'Install App'}</span>
              </button>

              <button
                onClick={handleDismissAndroid}
                className="w-full text-xs text-[#9A8080] hover:text-[#3D2E2E] py-2 font-medium transition-colors"
              >
                Continue in Browser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Banner */}
      {showIOSBanner && isIOS && (
        <div className="fixed bottom-3 left-3 right-3 z-[100] max-w-md mx-auto animate-slide-up">
          <div className="bg-white/95 backdrop-blur-2xl border border-[#F5B8B0] rounded-[28px] p-5 shadow-[0_20px_40px_rgba(240,161,153,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FADEDE] rounded-full filter blur-xl opacity-70 pointer-events-none"></div>

            <button
              onClick={handleDismissIOS}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-[#F5EDE0] text-[#9A8080] hover:text-[#3D2E2E] flex items-center justify-center text-xs font-bold transition-all"
            >
              ✕
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5B8B0] to-[#F0A199] shadow-sm flex-shrink-0 flex items-center justify-center text-2xl ring-2 ring-white">
                🌸
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="inline-block text-[9px] font-bold tracking-[0.2em] uppercase text-[#D97369]">
                  INSTALL ON IPHONE
                </span>
                <h3 className="text-sm font-serif-display font-bold text-[#3D2E2E] leading-tight">
                  Install CycleCrave
                </h3>
                <p className="text-xs text-[#6B5555] leading-relaxed font-normal">
                  Tap the{' '}
                  <span className="font-semibold text-[#3D2E2E] inline-flex items-center gap-1 bg-[#FADEDE] px-1.5 py-0.5 rounded border border-[#F5B8B0]">
                    Share
                    <svg className="w-3.5 h-3.5 text-[#D97369]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </span>{' '}
                  icon below, then{' '}
                  <strong className="text-[#B85952]">'Add to Home Screen'</strong>.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#FADEDE] flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-[#D97369] font-semibold">
                <span className="animate-bounce inline-block">👇</span>
                <span>Tap Share at bottom</span>
              </span>
              <button
                onClick={handleDismissIOS}
                className="px-3 py-1 bg-[#FADEDE] border border-[#F5B8B0] text-[#B85952] rounded-full text-[10px] font-bold hover:bg-[#F5B8B0]/40 transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
