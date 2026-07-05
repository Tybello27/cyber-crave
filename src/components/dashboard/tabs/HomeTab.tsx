'use client';

import { useState, useEffect } from 'react';
import { useUserStore, useAppStore } from '@/lib/store';
import { CYCLE_PHASES, PHASE_INFO } from '@/lib/constants';

interface CravingLog {
  id: string;
  type: string;
  intensity: string;
  time: string;
}

interface SymptomLog {
  id: string;
  type: string;
  severity: string;
  time: string;
}

export default function HomeTab() {
  const { profile } = useUserStore();
  const { currentPhase, setCurrentPhase } = useAppStore();
  const [cravings, setCravings] = useState<CravingLog[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [mounted, setMounted] = useState(false);
  const [energyLevel, setEnergyLevel] = useState('Moderate');
  const [selectedMood, setSelectedMood] = useState('Calm');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedCravings = localStorage.getItem('todayCravings');
    const storedSymptoms = localStorage.getItem('todaySymptoms');
    const storedPhase = localStorage.getItem('currentPhase');

    if (storedCravings) setCravings(JSON.parse(storedCravings));
    if (storedSymptoms) setSymptoms(JSON.parse(storedSymptoms));
    if (storedPhase) setCurrentPhase(storedPhase);
    else if (!currentPhase) setCurrentPhase('follicular');
  }, [setCurrentPhase, currentPhase]);

  const displayName = profile.name || 'Kishi';
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const phaseInfo = currentPhase ? PHASE_INFO[currentPhase as keyof typeof PHASE_INFO] : PHASE_INFO.follicular;

  if (!mounted) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Greeting Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif-display text-2xl font-bold text-[#3D2E2E] leading-tight">
            {greeting}, {displayName} <span className="inline-block animate-float-soft">👋</span>
          </h1>
          <p className="text-xs text-[#9A8080] mt-1">Today's Date: {today}</p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="w-9 h-9 rounded-full bg-white border border-[#FADEDE] flex items-center justify-center hover:bg-[#FADEDE]/50 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6B5555]">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Current Cycle Phase Card */}
      <div className="bg-[#F8E4E1] rounded-[24px] p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#B85952] font-medium mb-1">Current Cycle Phase:</p>
            <h2 className="font-serif-display text-xl font-bold text-[#3D2E2E] capitalize">
              {phaseInfo?.name || 'Follicular'}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center text-2xl">
            {currentPhase === 'menstrual' && '🩸'}
            {currentPhase === 'follicular' && '🌿'}
            {currentPhase === 'ovulation' && '✨'}
            {currentPhase === 'luteal' && '🌙'}
          </div>
        </div>
      </div>

      {/* Energy Level Indicator */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#6B5555] px-1">Energy Level Indicator</p>
        <div className="bg-white rounded-[24px] p-4 border border-[#FADEDE]/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#3D2E2E]">Mood Summary</span>
            <span className="text-xs text-[#9A8080] font-medium">{energyLevel}</span>
          </div>
          {/* Energy bar */}
          <div className="relative h-2 bg-[#F5EDE0] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{
                width: energyLevel === 'Low' ? '33%' : energyLevel === 'Moderate' ? '66%' : '100%',
                background: 'linear-gradient(to right, #F5D690, #F0A199, #B896C7)',
              }}
            />
          </div>
          <div className="flex gap-2 pt-1">
            {[
              { emoji: '😊', label: 'Calm' },
              { emoji: '😌', label: 'Calm' },
              { emoji: '🥰', label: 'Happy' },
            ].map((mood, i) => (
              <button
                key={i}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedMood === mood.label && i === 0
                    ? 'bg-[#FADEDE] text-[#B85952]'
                    : 'bg-[#F5EDE0] text-[#6B5555]'
                }`}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Cravings */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#6B5555] px-1">Today's Cravings</p>
        <div className="bg-white rounded-full px-4 py-3 border border-[#FADEDE]/60 flex items-center gap-2">
          <span className="text-lg">🍫</span>
          <span className="text-sm text-[#3D2E2E] font-medium">
            {cravings.length > 0
              ? cravings.slice(0, 3).map((c) => c.type).join(', ')
              : 'Chocolate, Sweet'}
          </span>
        </div>
      </div>

      {/* Cycle Trackings */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#6B5555] px-1">Cycle Trackings:</p>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-coral">Energy</span>
          <span className="chip chip-lavender">Mood</span>
          <span className="chip chip-yellow">7-Debt</span>
          <span className="chip chip-coral">Cramps</span>
        </div>
      </div>

      {/* Food Preferences */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">Food Preferences</p>
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-lavender">Vegetarian</span>
          <span className="chip chip-lavender">Gluten-Free</span>
          <span className="chip chip-lavender">Vitamin</span>
          <span className="chip chip-lavender">Bone-Free</span>
          <span className="chip chip-lavender">Cravings</span>
        </div>
      </div>

      {/* Wellness Goals */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">Wellness Goals</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3.5 border border-[#FADEDE]/60">
            <p className="text-xs font-semibold text-[#3D2E2E]">Reduce Cravings</p>
            <p className="text-[10px] text-[#9A8080] mt-1">Boost Energy</p>
          </div>
          <div className="bg-white rounded-2xl p-3.5 border border-[#FADEDE]/60">
            <p className="text-xs font-semibold text-[#3D2E2E]">Anti-Suggestions</p>
            <p className="text-[10px] text-[#9A8080] mt-1">Boost Energy</p>
          </div>
        </div>
      </div>

      {/* Phase Selector - Save Button */}
      <div className="pt-2">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {Object.entries(CYCLE_PHASES).map(([, phase]) => {
            const isActive = currentPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => {
                  setCurrentPhase(phase);
                  localStorage.setItem('currentPhase', phase);
                }}
                className={`p-2 rounded-2xl text-[10px] font-semibold capitalize transition-all ${
                  isActive
                    ? 'bg-[#F0A199] text-white shadow-sm'
                    : 'bg-white text-[#6B5555] border border-[#FADEDE]'
                }`}
              >
                {phase}
              </button>
            );
          })}
        </div>
        <button className="w-full py-3.5 bg-[#F5B8B0] text-white rounded-full font-semibold text-sm shadow-[0_6px_16px_-4px_rgba(240,161,153,0.4)] hover:shadow-lg active:scale-[0.99] transition-all">
          Save
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const { profile, updateProfile } = useUserStore();

  return (
    <div className="fixed inset-0 bg-[#3D2E2E]/40 backdrop-blur-md flex items-end justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center pb-3 border-b border-[#FADEDE]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97369]">
              PREFERENCES
            </span>
            <h3 className="font-serif-display text-xl font-bold text-[#3D2E2E]">Edit Profile</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5EDE0] text-[#9A8080] flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B5555] mb-1.5">Your Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full px-4 py-3 bg-[#FAF5EB] border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B5555] mb-1.5">Cycle Length (days)</label>
          <input
            type="number"
            value={profile.cycleLength}
            onChange={(e) => updateProfile({ cycleLength: parseInt(e.target.value) || 28 })}
            className="w-full px-4 py-3 bg-[#FAF5EB] border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B5555] mb-1.5">Food Preference</label>
          <select
            value={profile.foodPreference}
            onChange={(e) => updateProfile({ foodPreference: e.target.value })}
            className="w-full px-4 py-3 bg-[#FAF5EB] border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
          >
            <option value="Regular">Regular</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="High-Protein">High-Protein</option>
          </select>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#F0A199] to-[#E88B82] text-white py-3.5 rounded-full font-semibold text-sm shadow-md mt-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}
