'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { generateId } from '@/lib/utils';

interface Craving {
  id: string;
  type: string;
  intensity: string;
  intensityScore: number;
  time: string;
  notes: string;
}

const QUICK_CRAVINGS = [
  { type: 'Chocolate', emoji: '🍫', bg: '#F5E1D9', accent: '#B85952' },
  { type: 'Sweet', emoji: '🍭', bg: '#FADEDE', accent: '#D97369' },
  { type: 'Salty', emoji: '🥨', bg: '#FDE8B0', accent: '#8A6B2C' },
];

export default function CravingsTab() {
  const { profile } = useUserStore();
  const [cravings, setCravings] = useState<Craving[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState('Chocolate');
  const [intensityScore, setIntensityScore] = useState(3);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('allCravings');
    if (stored) setCravings(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('allCravings', JSON.stringify(cravings));
  }, [cravings, mounted]);

  const displayName = profile.name || 'Kishi';

  const getIntensityLabel = (score: number) => {
    if (score <= 2) return 'Mild';
    if (score <= 3) return 'Moderate';
    return 'Intense';
  };

  const handleSave = () => {
    const newCraving: Craving = {
      id: generateId(),
      type: selectedType,
      intensity: getIntensityLabel(intensityScore),
      intensityScore,
      notes,
      time: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setCravings([newCraving, ...cravings]);
    setNotes('');
    setIntensityScore(3);
  };

  const deleteCraving = (id: string) => {
    setCravings(cravings.filter((c) => c.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-xl font-bold text-[#3D2E2E]">
            Track Your Cravings, <span className="text-[#D97369]">{displayName}</span>
          </h1>
        </div>
        <button className="w-9 h-9 rounded-full bg-white border border-[#FADEDE] flex items-center justify-center hover:bg-[#FADEDE]/50 transition-all">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6B5555]">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Big Emoji Craving Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_CRAVINGS.map((craving) => {
          const isSelected = selectedType === craving.type;
          return (
            <button
              key={craving.type}
              onClick={() => setSelectedType(craving.type)}
              className={`rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                isSelected
                  ? 'shadow-[0_8px_20px_-4px_rgba(240,161,153,0.4)] scale-[1.02] border-2'
                  : 'border-2 border-transparent'
              }`}
              style={{
                backgroundColor: craving.bg,
                borderColor: isSelected ? craving.accent : 'transparent',
              }}
            >
              <div className="text-4xl">{craving.emoji}</div>
              <span
                className="text-xs font-bold"
                style={{ color: craving.accent }}
              >
                {craving.type}
              </span>
            </button>
          );
        })}
      </div>

      {/* Craving Intensity Slider */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-[#3D2E2E]">Craving Intensity</p>

        <div className="bg-white rounded-[24px] p-5 border border-[#FADEDE]/60 space-y-4">
          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="1"
              max="5"
              value={intensityScore}
              onChange={(e) => setIntensityScore(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-[#9A8080] font-medium mt-2">
              <span>Mild</span>
              <span>Intense</span>
            </div>
          </div>

          {/* Numbered dots 1-5 */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((num) => {
                const isActive = num === intensityScore;
                const isPassed = num < intensityScore;
                return (
                  <button
                    key={num}
                    onClick={() => setIntensityScore(num)}
                    className={`flex flex-col items-center gap-2`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#F0A199] text-white shadow-md scale-110'
                          : isPassed
                          ? 'bg-[#F5B8B0]/40 text-[#B85952]'
                          : 'bg-[#F5EDE0] text-[#9A8080]'
                      }`}
                    >
                      {num}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Connecting line */}
            <div className="relative -mt-6 mx-4 h-0.5 bg-[#F5EDE0] rounded-full -z-10">
              <div
                className="h-full bg-gradient-to-r from-[#F5D690] via-[#F0A199] to-[#D97369] rounded-full transition-all duration-300"
                style={{ width: `${((intensityScore - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Tip text */}
          <p className="text-[11px] text-[#9A8080] italic leading-relaxed pt-2 border-t border-[#F5EDE0]">
            Try incorporating iron-rich foods like spinach to
            <br />
            support your energy during the {selectedType.toLowerCase()} craving phase.
          </p>
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E]">Notes</p>
        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this craving..."
            className="w-full px-4 py-3.5 bg-white border border-[#FADEDE] rounded-[20px] text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199] resize-none min-h-[80px]"
          />
          {/* Chocolate & berries decoration */}
          <div className="absolute -bottom-2 -right-2 text-2xl opacity-80">
            🍫🍓
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 bg-gradient-to-r from-[#F5B8B0] to-[#F0A199] text-white rounded-full font-semibold text-sm shadow-[0_6px_20px_-4px_rgba(240,161,153,0.5)] hover:shadow-xl active:scale-[0.99] transition-all"
      >
        Save
      </button>

      {/* History */}
      {cravings.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-[#6B5555] px-1 uppercase tracking-wider">Recent</p>
          {cravings.slice(0, 5).map((craving) => (
            <div
              key={craving.id}
              className="bg-white rounded-2xl p-3.5 border border-[#FADEDE]/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">
                  {craving.type === 'Chocolate' ? '🍫' : craving.type === 'Sweet' ? '🍭' : craving.type === 'Salty' ? '🥨' : '🍽️'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3D2E2E]">{craving.type}</p>
                  <p className="text-[11px] text-[#9A8080]">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase mr-1.5 ${
                      craving.intensity === 'Mild'
                        ? 'bg-[#FDE8B0] text-[#8A6B2C]'
                        : craving.intensity === 'Moderate'
                        ? 'bg-[#FADEDE] text-[#D97369]'
                        : 'bg-[#F5B8B0] text-[#B85952]'
                    }`}>
                      {craving.intensity}
                    </span>
                    {craving.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteCraving(craving.id)}
                className="w-7 h-7 rounded-full bg-[#F5EDE0] text-[#9A8080] hover:text-[#D97369] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
