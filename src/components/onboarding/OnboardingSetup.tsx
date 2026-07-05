'use client';

import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { FOOD_PREFERENCES, GOALS } from '@/lib/constants';

export default function OnboardingSetup() {
  const { profile, completeOnboarding } = useUserStore();
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome');

  const [name, setName] = useState(profile.name || '');
  const [cycleLength, setCycleLength] = useState<number>(profile.cycleLength || 28);
  const [foodPreference, setFoodPreference] = useState(profile.foodPreference || 'Regular');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    profile.goals.length > 0 ? profile.goals : ['Reduce Cravings']
  );

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    completeOnboarding({
      name: name.trim() || 'Kishi',
      cycleLength: Number(cycleLength) || 28,
      foodPreference,
      goals: selectedGoals.length > 0 ? selectedGoals : ['Reduce Cravings'],
    });
  };

  const handleQuickStart = () => {
    completeOnboarding({
      name: 'Kishi',
      cycleLength: 28,
      foodPreference: 'Regular',
      goals: ['Reduce Cravings', 'Improve Energy'],
    });
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-[#FAF5EB] flex items-center justify-center p-5">
        <div className="w-full max-w-md">
          {/* Coral illustration card */}
          <div className="relative bg-gradient-to-br from-[#F5B8B0] via-[#F0A199] to-[#EDA5A0] rounded-[36px] p-6 pb-8 overflow-hidden shadow-[0_20px_50px_-10px_rgba(240,161,153,0.4)]">
            {/* Decorative background leaves */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <svg viewBox="0 0 400 500" className="w-full h-full">
                {/* Lavender leaves left */}
                <ellipse cx="60" cy="130" rx="35" ry="70" fill="#C5A9D4" transform="rotate(-30 60 130)" />
                <ellipse cx="30" cy="180" rx="28" ry="60" fill="#B896C7" transform="rotate(-15 30 180)" />
                <ellipse cx="70" cy="230" rx="30" ry="55" fill="#D4BDE0" transform="rotate(20 70 230)" />
                {/* Sage leaves right */}
                <ellipse cx="340" cy="140" rx="35" ry="75" fill="#A8B89A" transform="rotate(35 340 140)" />
                <ellipse cx="360" cy="210" rx="28" ry="55" fill="#B8C6A8" transform="rotate(15 360 210)" />
                <ellipse cx="330" cy="270" rx="30" ry="50" fill="#96A888" transform="rotate(-25 330 270)" />
                {/* Small flowers/dots */}
                <circle cx="90" cy="80" r="8" fill="#FDE8B0" />
                <circle cx="330" cy="90" r="6" fill="#FDE8B0" />
                <circle cx="50" cy="290" r="6" fill="#FFE0DC" />
                <circle cx="350" cy="320" r="8" fill="#FFE0DC" />
              </svg>
            </div>

            {/* Yoga woman illustration */}
            <div className="relative z-10 flex justify-center mb-6 mt-4">
              <svg viewBox="0 0 240 260" className="w-56 h-60">
                {/* Meditation cushion */}
                <ellipse cx="120" cy="240" rx="80" ry="10" fill="#8B6B5A" opacity="0.3" />

                {/* Body - sage green outfit */}
                <path
                  d="M 60 200 Q 60 175 80 165 L 100 155 Q 120 150 140 155 L 160 165 Q 180 175 180 200 L 180 235 Q 120 245 60 235 Z"
                  fill="#A8B89A"
                />
                {/* Arms in meditation pose */}
                <ellipse cx="70" cy="200" rx="18" ry="30" fill="#A8B89A" transform="rotate(-20 70 200)" />
                <ellipse cx="170" cy="200" rx="18" ry="30" fill="#A8B89A" transform="rotate(20 170 200)" />
                {/* Hands */}
                <circle cx="60" cy="220" r="12" fill="#EBC5A8" />
                <circle cx="180" cy="220" r="12" fill="#EBC5A8" />
                {/* Legs crossed */}
                <ellipse cx="90" cy="240" rx="30" ry="15" fill="#A8B89A" transform="rotate(-15 90 240)" />
                <ellipse cx="150" cy="240" rx="30" ry="15" fill="#A8B89A" transform="rotate(15 150 240)" />

                {/* Neck */}
                <rect x="112" y="128" width="16" height="20" fill="#EBC5A8" />

                {/* Head */}
                <circle cx="120" cy="105" r="32" fill="#EBC5A8" />
                {/* Hair */}
                <path
                  d="M 90 105 Q 88 75 120 68 Q 152 75 150 105 Q 155 130 145 155 L 135 155 Q 148 130 145 108 Q 142 90 120 88 Q 98 90 95 108 Q 92 130 105 155 L 95 155 Q 85 130 90 105 Z"
                  fill="#3D2E2E"
                />
                {/* Eyes closed (peaceful) */}
                <path d="M 108 105 Q 112 108 116 105" stroke="#3D2E2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 124 105 Q 128 108 132 105" stroke="#3D2E2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Smile */}
                <path d="M 116 118 Q 120 121 124 118" stroke="#3D2E2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Cheek blush */}
                <circle cx="103" cy="115" r="4" fill="#F0A199" opacity="0.5" />
                <circle cx="137" cy="115" r="4" fill="#F0A199" opacity="0.5" />
              </svg>
            </div>

            {/* Welcome text */}
            <div className="relative z-10 text-center space-y-2">
              <h1 className="font-serif-display text-3xl font-bold text-white leading-tight">
                Welcome to
                <br />
                CycleCrave
              </h1>
              <p className="text-xs text-white/90 font-light max-w-[240px] mx-auto leading-relaxed">
                Track your cycle, nourish your body,
                <br />
                empower your days
              </p>
            </div>

            {/* Get Started Button */}
            <div className="relative z-10 mt-6 flex justify-center">
              <button
                onClick={() => setStep('setup')}
                className="px-10 py-3 bg-white text-[#D97369] rounded-full font-semibold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Quick start */}
          <div className="mt-6 text-center">
            <button
              onClick={handleQuickStart}
              className="text-xs text-[#9A8080] hover:text-[#D97369] font-medium transition-colors"
            >
              ⚡ Skip setup — Continue as Kishi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5EB] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-5">
        {/* Header */}
        <div className="text-center px-2">
          <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#D97369] mb-1">
            PERSONALIZE YOUR JOURNEY
          </span>
          <h2 className="font-serif-display text-2xl font-bold text-[#3D2E2E]">
            Let's get to know you
          </h2>
          <p className="text-xs text-[#9A8080] mt-1">
            Quick setup to personalize your experience
          </p>
        </div>

        {/* Setup card */}
        <div className="bg-[#F7F0E4] rounded-[32px] p-6 space-y-4">
          <form onSubmit={handleFinish} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#6B5555] mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kishi"
                className="w-full px-4 py-3 bg-white border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#6B5555] mb-2">
                  Cycle Length
                </label>
                <div className="flex items-center gap-1.5 bg-white border-2 border-[#FADEDE] rounded-2xl px-4 py-3">
                  <input
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                    min="20"
                    max="45"
                    className="w-full bg-transparent text-sm text-[#3D2E2E] font-semibold focus:outline-none p-0 border-none"
                  />
                  <span className="text-xs text-[#9A8080] font-medium">days</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#6B5555] mb-2">
                  Diet
                </label>
                <select
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value)}
                  className="w-full px-3 py-3 bg-white border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
                >
                  {FOOD_PREFERENCES.map((pref) => (
                    <option key={pref} value={pref}>
                      {pref}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#6B5555] mb-2">
                Wellness Goals
              </label>
              <div className="flex flex-wrap gap-2">
                {GOALS.slice(0, 4).map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#F0A199] text-white shadow-sm'
                          : 'bg-white text-[#6B5555] border border-[#FADEDE]'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-[#F0A199] to-[#E88B82] text-white py-3.5 rounded-full font-semibold text-sm shadow-[0_6px_20px_-4px_rgba(232,139,130,0.4)] active:scale-[0.99] transition-all"
            >
              Enter CycleCrave
            </button>
          </form>

          <button
            type="button"
            onClick={() => setStep('welcome')}
            className="w-full text-xs text-[#9A8080] hover:text-[#3D2E2E] font-medium"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
