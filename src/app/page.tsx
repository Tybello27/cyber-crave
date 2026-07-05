'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/lib/store';
import Dashboard from '@/components/dashboard/Dashboard';
import OnboardingSetup from '@/components/onboarding/OnboardingSetup';

export default function Home() {
  const { hasCompletedOnboarding } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF7F2]">
        <div className="text-center space-y-3 animate-pulse">
          <div className="w-14 h-14 rounded-full bg-[#FCF5F5] border border-[#E2B2B5]/50 flex items-center justify-center text-2xl mx-auto">
            ✨
          </div>
          <p className="text-xs font-semibold text-[#C87A80] tracking-widest uppercase">CycleCrave</p>
        </div>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingSetup />;
  }

  return <Dashboard />;
}
