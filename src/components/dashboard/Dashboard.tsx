'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import BottomNav from './BottomNav';
import HomeTab from './tabs/HomeTab';
import CravingsTab from './tabs/CravingsTab';
import SymptomsTab from './tabs/SymptomsTab';
import MealsTab from './tabs/MealsTab';
import InsightsTab from './tabs/InsightsTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'cravings':
        return <CravingsTab />;
      case 'symptoms':
        return <SymptomsTab />;
      case 'meals':
        return <MealsTab />;
      case 'insights':
        return <InsightsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EB] text-[#3D2E2E] pb-28">
      {/* Main Content Container */}
      <main className="max-w-md mx-auto px-4 pt-6 animate-fade-in">
        {renderTab()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
