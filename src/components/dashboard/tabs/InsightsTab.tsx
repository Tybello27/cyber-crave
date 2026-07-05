'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';

interface Craving {
  id: string;
  type: string;
  intensity: string;
  time: string;
  notes: string;
}

interface Symptom {
  id: string;
  type: string;
  severity: string;
  time: string;
  notes: string;
}

interface Meal {
  id: string;
  date: string;
  mealType: string;
  description: string;
  water: number;
  helpfulness: string;
}

export default function InsightsTab() {
  const { profile } = useUserStore();
  const [cravings, setCravings] = useState<Craving[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mounted, setMounted] = useState(false);
  const [notifChoice, setNotifChoice] = useState<string>('Mood');

  useEffect(() => {
    setMounted(true);
    const c = localStorage.getItem('allCravings');
    const s = localStorage.getItem('allSymptoms');
    const m = localStorage.getItem('allMeals');
    if (c) setCravings(JSON.parse(c));
    if (s) setSymptoms(JSON.parse(s));
    if (m) setMeals(JSON.parse(m));
  }, []);

  if (!mounted) return null;

  const displayName = profile.name || 'Kishi';

  const getMostCommon = <T,>(arr: T[], key: keyof T): { name: string; count: number } | null => {
    if (arr.length === 0) return null;
    const counts: Record<string, number> = {};
    arr.forEach((item) => {
      const v = String(item[key]);
      counts[v] = (counts[v] || 0) + 1;
    });
    const [name, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || [null, 0];
    return name ? { name, count } : null;
  };

  const topCraving = getMostCommon(cravings, 'type');
  const topSymptom = getMostCommon(symptoms, 'type');
  const helpfulMeals = meals.filter((m) => m.helpfulness === 'helped').length;
  const helpfulPct = meals.length > 0 ? Math.round((helpfulMeals / meals.length) * 100) : 0;

  // Chart data — symptoms over the 4 cycle phases
  const generateChartData = () => {
    const phases = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
    return phases.map((phase, i) => ({
      phase,
      moodValue: 30 + Math.sin(i * 1.2) * 20 + (topSymptom ? topSymptom.count * 3 : 15),
      energyValue: 40 + Math.cos(i * 1.3) * 25 + (topCraving ? topCraving.count * 4 : 20),
    }));
  };

  const chartData = generateChartData();
  const chartMax = Math.max(...chartData.flatMap((d) => [d.moodValue, d.energyValue])) + 10;

  return (
    <div className="space-y-5 animate-fade-in pb-4">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5B8B0] to-[#F0A199] flex items-center justify-center text-lg shadow-md ring-2 ring-white">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <circle cx="20" cy="15" r="6" fill="#3D2E2E" opacity="0.85" />
              <path d="M8 32 Q 20 22 32 32 L 32 40 L 8 40 Z" fill="#3D2E2E" opacity="0.85" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97369]">
              Name:
            </span>
            <h1 className="font-serif-display text-xl font-bold text-[#3D2E2E] leading-tight">
              {displayName}
            </h1>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-white border border-[#FADEDE] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6B5555]">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Log Common Cravings Card */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#6B5555] px-1">Log Common Cravings</p>
        <div className="bg-white rounded-[24px] p-4 border border-[#FADEDE]/60 flex items-center gap-3">
          <div className="flex -space-x-1.5">
            <div className="w-8 h-8 rounded-full bg-[#FADEDE] flex items-center justify-center text-sm ring-2 ring-white">
              🍫
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FDE8B0] flex items-center justify-center text-sm ring-2 ring-white">
              🍭
            </div>
            <div className="w-8 h-8 rounded-full bg-[#E8EEE0] flex items-center justify-center text-sm ring-2 ring-white">
              🥨
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FADEDE] px-2.5 py-1 rounded-full">
              <span className="text-[10px] font-bold text-[#B85952]">
                {topCraving?.name || 'Fresh Fruit Feelings'}
              </span>
            </div>
            <p className="text-[10px] text-[#9A8080] mt-1">
              {topCraving ? `Logged ${topCraving.count}x` : '2 items'}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Food Card */}
      <div className="bg-white rounded-[24px] overflow-hidden border border-[#FADEDE]/60">
        {/* Food image simulation with gradient */}
        <div className="relative h-32 bg-gradient-to-br from-[#F5E1D9] via-[#FADEDE] to-[#EFE6F5] flex items-center justify-center">
          <div className="flex gap-2 text-4xl">
            🥣<span>🫐</span>🍓
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-bold text-[#D97369] uppercase tracking-wider mb-1">
            FOOD NAME:
          </p>
          <p className="text-sm font-bold text-[#3D2E2E] font-serif-display">
            Oatmeal with Fresh Blueberries
          </p>
          <p className="text-[11px] text-[#9A8080] mt-1.5 leading-relaxed">
            Short Explanation: Provides antioxidants to stabilize levels during the Follicular phase.
          </p>
        </div>
      </div>

      {/* Symptoms Ratings — Chart */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">
          Symptoms Ratings
        </p>
        <div className="bg-white rounded-[24px] p-4 border border-[#FADEDE]/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#F0A199]"></div>
                <span className="text-[#6B5555] font-medium">Mood</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#A8B89A]"></div>
                <span className="text-[#6B5555] font-medium">Energy</span>
              </div>
            </div>
            <span className="text-[10px] text-[#9A8080]">Cycle Phase</span>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-32">
            <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 30, 60, 90, 120].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke="#F5EDE0"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
              ))}

              {/* Mood line */}
              <polyline
                points={chartData
                  .map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 300;
                    const y = 120 - (d.moodValue / chartMax) * 120;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#F0A199"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Mood dots */}
              {chartData.map((d, i) => {
                const x = (i / (chartData.length - 1)) * 300;
                const y = 120 - (d.moodValue / chartMax) * 120;
                return (
                  <circle
                    key={`m-${i}`}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#F0A199"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Energy line */}
              <polyline
                points={chartData
                  .map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 300;
                    const y = 120 - (d.energyValue / chartMax) * 120;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#A8B89A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Energy dots */}
              {chartData.map((d, i) => {
                const x = (i / (chartData.length - 1)) * 300;
                const y = 120 - (d.energyValue / chartMax) * 120;
                return (
                  <circle
                    key={`e-${i}`}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#A8B89A"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[9px] text-[#9A8080] mt-2 pt-2 border-t border-[#F5EDE0] font-medium">
            {chartData.map((d) => (
              <span key={d.phase}>{d.phase.slice(0, 4)}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Wellness by Cycle Phase — Stats */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">
          Wellness by Cycle Phase
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#FADEDE] rounded-2xl p-3 text-center">
            <p className="text-[9px] text-[#D97369] font-bold uppercase tracking-wider">Cravings</p>
            <p className="font-serif-display text-2xl font-bold text-[#B85952] mt-0.5">
              {cravings.length}
            </p>
          </div>
          <div className="bg-[#E8EEE0] rounded-2xl p-3 text-center">
            <p className="text-[9px] text-[#4A5A3D] font-bold uppercase tracking-wider">Symptoms</p>
            <p className="font-serif-display text-2xl font-bold text-[#6E8262] mt-0.5">
              {symptoms.length}
            </p>
          </div>
          <div className="bg-[#EFE6F5] rounded-2xl p-3 text-center">
            <p className="text-[9px] text-[#6B4E7F] font-bold uppercase tracking-wider">Meals</p>
            <p className="font-serif-display text-2xl font-bold text-[#6B4E7F] mt-0.5">
              {meals.length}
            </p>
          </div>
        </div>
      </div>

      {/* Weekly/Monthly Wellness Trends */}
      <div className="bg-[#F7F0E4] rounded-[24px] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#3D2E2E] font-serif-display">
            Weekly/Monthly Trends
          </p>
          <span className="text-[10px] text-[#8A6B2C] bg-[#FDE8B0] px-2 py-0.5 rounded-full font-bold">
            {helpfulPct}% Helpful
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F0A199]"></div>
            <span className="text-[#6B5555] font-medium">Weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#A8B89A]"></div>
            <span className="text-[#6B5555] font-medium">Monthly</span>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">
          Notification Settings
        </p>
        <div className="flex gap-2">
          {['Light', 'Mood', 'Cravings'].map((option) => (
            <button
              key={option}
              onClick={() => setNotifChoice(option)}
              className={`flex-1 py-2.5 px-3 rounded-full text-xs font-semibold transition-all ${
                notifChoice === option
                  ? 'bg-[#F0A199] text-white shadow-sm'
                  : 'bg-white text-[#6B5555] border border-[#FADEDE]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E] px-1 font-serif-display">About App</p>
        <div className="bg-white rounded-2xl p-4 border border-[#FADEDE]/60">
          <p className="text-xs text-[#3D2E2E] font-semibold mb-1">
            CycleCrave v1.0
          </p>
          <p className="text-[11px] text-[#9A8080] leading-relaxed">
            Empowering your cycle journey with mindful nutrition and daily body-tuning insights.
          </p>
        </div>
      </div>
    </div>
  );
}
