'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { generateId } from '@/lib/utils';

interface Symptom {
  id: string;
  type: string;
  severity: string;
  severityScore: number;
  time: string;
  notes: string;
}

const QUICK_TRIGGERS = [
  { type: 'Remove Salty', emoji: '🧂', bg: '#F5E1D9', accent: '#B85952' },
  { type: 'Spicy', emoji: '🌶️', bg: '#FADEDE', accent: '#D97369' },
  { type: 'Fast Food', emoji: '🍔', bg: '#FDE8B0', accent: '#8A6B2C' },
];

const SYMPTOM_OPTIONS = [
  { name: 'Fatigue', emoji: '😴', color: '#B896C7' },
  { name: 'Bloating', emoji: '🎈', color: '#D4C5E2' },
  { name: 'Headache', emoji: '🤕', color: '#F0A199' },
  { name: 'Mood Swings', emoji: '🎭', color: '#A8B89A' },
  { name: 'Cramps', emoji: '💫', color: '#F5B8B0' },
  { name: 'Anxiety', emoji: '😰', color: '#D4BDE0' },
  { name: 'Low Energy', emoji: '🔋', color: '#F5D690' },
];

export default function SymptomsTab() {
  const { profile } = useUserStore();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [severityScore, setSeverityScore] = useState(2);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('allSymptoms');
    if (stored) setSymptoms(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('allSymptoms', JSON.stringify(symptoms));
  }, [symptoms, mounted]);

  const displayName = profile.name || 'Kishi';

  const toggleSymptom = (name: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const getSeverityLabel = (score: number) => {
    if (score <= 2) return 'Low';
    if (score <= 3) return 'Moderate';
    return 'Severe';
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) return;
    const newSymptoms: Symptom[] = selectedSymptoms.map((type) => ({
      id: generateId(),
      type,
      severity: getSeverityLabel(severityScore),
      severityScore,
      notes,
      time: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
    setSymptoms([...newSymptoms, ...symptoms]);
    setSelectedSymptoms([]);
    setNotes('');
    setSeverityScore(2);
  };

  const deleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-xl font-bold text-[#3D2E2E]">
            Tag Your Symptoms, <span className="text-[#D97369]">{displayName}</span>
          </h1>
        </div>
        <button className="w-9 h-9 rounded-full bg-white border border-[#FADEDE] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6B5555]">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Trigger Quick Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_TRIGGERS.map((trigger) => (
          <div
            key={trigger.type}
            className="rounded-[24px] p-4 flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: trigger.bg }}
          >
            <div className="text-4xl">{trigger.emoji}</div>
            <span
              className="text-[11px] font-bold text-center leading-tight"
              style={{ color: trigger.accent }}
            >
              {trigger.type}
            </span>
          </div>
        ))}
      </div>

      {/* Symptom Dropdown Selectors */}
      <div className="grid grid-cols-2 gap-3">
        {SYMPTOM_OPTIONS.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom.name);
          return (
            <button
              key={symptom.name}
              onClick={() => toggleSymptom(symptom.name)}
              className={`bg-white rounded-full px-3 py-2.5 flex items-center justify-between transition-all border-2 ${
                isSelected
                  ? 'border-[#F0A199] shadow-md'
                  : 'border-[#FADEDE]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ backgroundColor: symptom.color + '40' }}
                >
                  {symptom.emoji}
                </div>
                <span className="text-xs font-semibold text-[#3D2E2E] truncate">
                  {symptom.name}
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`w-3.5 h-3.5 text-[#9A8080] flex-shrink-0 transition-transform ${
                  isSelected ? 'rotate-180' : ''
                }`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Severity Master */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-[#3D2E2E]">Severity Master</p>
        <div className="flex items-center justify-between">
          {[
            { num: 1, bg: '#F5EDE0', text: '#9A8080' },
            { num: 2, bg: '#FDE8B0', text: '#8A6B2C' },
            { num: 3, bg: '#FADEDE', text: '#D97369' },
            { num: 4, bg: '#A8B89A', text: '#FFFFFF' },
            { num: 5, bg: '#B896C7', text: '#FFFFFF' },
          ].map((dot) => {
            const isActive = dot.num === severityScore;
            return (
              <button
                key={dot.num}
                onClick={() => setSeverityScore(dot.num)}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive ? 'scale-110 shadow-lg ring-2 ring-white' : 'shadow-sm'
                }`}
                style={{
                  backgroundColor: dot.bg,
                  color: dot.text,
                }}
              >
                {dot.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes / Novelty */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#3D2E2E]">Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full px-4 py-3.5 bg-white border border-[#FADEDE] rounded-[20px] text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199] resize-none min-h-[90px]"
        />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={selectedSymptoms.length === 0}
        className="w-full py-3.5 bg-gradient-to-r from-[#F5B8B0] to-[#F0A199] text-white rounded-full font-semibold text-sm shadow-[0_6px_20px_-4px_rgba(240,161,153,0.5)] hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-50"
      >
        Save
      </button>

      {/* History */}
      {symptoms.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-[#6B5555] px-1 uppercase tracking-wider">
            Recent Symptoms
          </p>
          {symptoms.slice(0, 5).map((symptom) => (
            <div
              key={symptom.id}
              className="bg-white rounded-2xl p-3.5 border border-[#FADEDE]/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-xl">
                  {SYMPTOM_OPTIONS.find((s) => s.name === symptom.type)?.emoji || '⚕️'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#3D2E2E] truncate">{symptom.type}</p>
                  <p className="text-[11px] text-[#9A8080]">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase mr-1.5 ${
                        symptom.severity === 'Low'
                          ? 'bg-[#FDE8B0] text-[#8A6B2C]'
                          : symptom.severity === 'Moderate'
                          ? 'bg-[#FADEDE] text-[#D97369]'
                          : 'bg-[#F5B8B0] text-[#B85952]'
                      }`}
                    >
                      {symptom.severity}
                    </span>
                    {symptom.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteSymptom(symptom.id)}
                className="w-7 h-7 rounded-full bg-[#F5EDE0] text-[#9A8080] hover:text-[#D97369] flex items-center justify-center text-xs flex-shrink-0"
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
