'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { MEAL_TYPES, FOOD_REMEDIES } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface Meal {
  id: string;
  date: string;
  mealType: string;
  description: string;
  water: number;
  helpfulness: string;
}

const MEAL_STYLES: Record<string, { emoji: string; bg: string; accent: string }> = {
  Breakfast: { emoji: '🥣', bg: '#FDE8B0', accent: '#8A6B2C' },
  Lunch: { emoji: '🥗', bg: '#E8EEE0', accent: '#6E8262' },
  Dinner: { emoji: '🍲', bg: '#FADEDE', accent: '#D97369' },
  Snack: { emoji: '🍓', bg: '#EFE6F5', accent: '#6B4E7F' },
};

export default function MealsTab() {
  const { profile } = useUserStore();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ mealType: 'Breakfast', description: '', water: 0 });

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('allMeals');
    if (stored) setMeals(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('allMeals', JSON.stringify(meals));
  }, [meals, mounted]);

  const displayName = profile.name || 'Kishi';

  const handleAddMeal = () => {
    if (formData.mealType && formData.description) {
      const newMeal: Meal = {
        id: generateId(),
        mealType: formData.mealType,
        description: formData.description,
        water: formData.water,
        date: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        helpfulness: '',
      };
      setMeals([newMeal, ...meals]);
      setFormData({ mealType: 'Breakfast', description: '', water: 0 });
      setShowModal(false);
    }
  };

  const deleteMeal = (id: string) => setMeals(meals.filter((m) => m.id !== id));
  const updateHelpfulness = (id: string, helpfulness: string) => {
    setMeals(meals.map((m) => (m.id === id ? { ...m, helpfulness } : m)));
  };
  const getWaterIntake = () => meals.reduce((sum, m) => sum + m.water, 0);

  if (!mounted) return null;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-serif-display text-xl font-bold text-[#3D2E2E]">
          Nourish, <span className="text-[#D97369]">{displayName}</span>
        </h1>
        <p className="text-xs text-[#9A8080] mt-1">Log meals & remedies for your body</p>
      </div>

      {/* Hydration Card */}
      <div className="bg-gradient-to-br from-[#E8EEE0] to-[#D0DCC0] rounded-[24px] p-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#4A5A3D] mb-1">
            Daily Hydration
          </p>
          <p className="font-serif-display text-2xl font-bold text-[#3D2E2E]">
            {getWaterIntake()}
            <span className="text-xs font-sans font-normal text-[#6E8262]"> / 8 cups</span>
          </p>
          <p className="text-[10px] text-[#6E8262] mt-1">Helps reduce bloating & fatigue</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center text-3xl">
          💧
        </div>
      </div>

      {/* Meal Type Quick Cards */}
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(MEAL_STYLES).map(([type, style]) => (
          <button
            key={type}
            onClick={() => {
              setFormData({ ...formData, mealType: type });
              setShowModal(true);
            }}
            className="rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ backgroundColor: style.bg }}
          >
            <div className="text-2xl">{style.emoji}</div>
            <span className="text-[10px] font-bold" style={{ color: style.accent }}>
              {type}
            </span>
          </button>
        ))}
      </div>

      {/* Add Meal Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-3.5 bg-gradient-to-r from-[#F0A199] to-[#E88B82] text-white rounded-full font-semibold text-sm shadow-[0_6px_20px_-4px_rgba(240,161,153,0.5)] hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <span>+</span>
        <span>Log New Meal</span>
      </button>

      {/* Smart Food Suggestions */}
      <div className="bg-[#F7F0E4] rounded-[24px] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <p className="text-sm font-bold text-[#3D2E2E] font-serif-display">Smart Food Remedies</p>
        </div>
        <div className="space-y-2">
          {Object.entries(FOOD_REMEDIES).slice(0, 3).map(([symptom, { foods, reason }]) => (
            <div key={symptom} className="bg-white rounded-2xl p-3 border border-[#FADEDE]/60">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-[#B85952] capitalize">
                  For {symptom.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <span className="text-[9px] font-bold text-[#8A6B2C] bg-[#FDE8B0] px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-xs font-semibold text-[#3D2E2E] mb-1">
                {foods.slice(0, 4).join(' • ')}
              </p>
              <p className="text-[10px] text-[#9A8080] italic">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meal History */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#6B5555] px-1 uppercase tracking-wider">Recent Meals</p>
        {meals.length === 0 ? (
          <div className="text-center py-8 bg-white/60 rounded-[24px] border border-dashed border-[#FADEDE]">
            <p className="text-3xl mb-2">🥗</p>
            <p className="text-sm font-semibold text-[#3D2E2E]">No meals logged yet</p>
            <p className="text-xs text-[#9A8080] mt-1">Start tracking to see food patterns</p>
          </div>
        ) : (
          meals.slice(0, 6).map((meal) => {
            const style = MEAL_STYLES[meal.mealType] || MEAL_STYLES.Snack;
            return (
              <div
                key={meal.id}
                className="bg-white rounded-2xl p-3.5 border border-[#FADEDE]/60 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: style.bg }}
                    >
                      {style.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: style.accent }}
                        >
                          {meal.mealType}
                        </span>
                        <span className="text-[10px] text-[#9A8080]">{meal.date}</span>
                      </div>
                      <p className="text-xs text-[#3D2E2E] font-medium leading-snug">
                        {meal.description}
                      </p>
                      {meal.water > 0 && (
                        <p className="text-[10px] text-[#6E8262] font-medium mt-1">
                          💧 {meal.water} cups water
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="w-6 h-6 rounded-full bg-[#F5EDE0] text-[#9A8080] hover:text-[#D97369] flex items-center justify-center text-xs flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>

                {!meal.helpfulness ? (
                  <div className="flex items-center gap-2 pt-2 border-t border-[#F5EDE0]">
                    <span className="text-[10px] text-[#9A8080] font-medium">Did it help?</span>
                    <button
                      onClick={() => updateHelpfulness(meal.id, 'helped')}
                      className="text-[10px] px-2.5 py-1 bg-[#E8EEE0] text-[#4A5A3D] rounded-full font-bold hover:bg-[#D0DCC0] transition-colors"
                    >
                      ✓ Yes
                    </button>
                    <button
                      onClick={() => updateHelpfulness(meal.id, 'didnthelp')}
                      className="text-[10px] px-2.5 py-1 bg-[#F5EDE0] text-[#6B5555] rounded-full font-medium hover:bg-[#F5B8B0]/30"
                    >
                      ✕ Not really
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-[#F5EDE0]">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        meal.helpfulness === 'helped'
                          ? 'bg-[#E8EEE0] text-[#4A5A3D]'
                          : 'bg-[#F5EDE0] text-[#6B5555]'
                      }`}
                    >
                      {meal.helpfulness === 'helped' ? '✓ Helped my body' : '✕ Neutral effect'}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#3D2E2E]/40 backdrop-blur-md flex items-end justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center pb-3 border-b border-[#FADEDE]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97369]">
                  NOURISHMENT
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#3D2E2E]">Log Meal</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5EDE0] text-[#9A8080] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B5555] mb-2">Meal Type</label>
              <div className="grid grid-cols-4 gap-2">
                {MEAL_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, mealType: type })}
                    className={`p-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      formData.mealType === type
                        ? 'bg-[#F0A199] text-white shadow-sm'
                        : 'bg-[#FAF5EB] text-[#6B5555] border border-[#FADEDE]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B5555] mb-1.5">What did you eat?</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Oatmeal with berries, dark chocolate..."
                className="w-full px-4 py-3 bg-[#FAF5EB] border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6B5555] mb-1.5">Water (cups)</label>
              <input
                type="number"
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: parseInt(e.target.value) || 0 })}
                min="0"
                max="10"
                className="w-full px-4 py-3 bg-[#FAF5EB] border-2 border-[#FADEDE] rounded-2xl text-sm text-[#3D2E2E] focus:outline-none focus:border-[#F0A199]"
              />
            </div>

            <button
              onClick={handleAddMeal}
              disabled={!formData.description}
              className="w-full bg-gradient-to-r from-[#F0A199] to-[#E88B82] text-white py-3.5 rounded-full font-semibold text-sm shadow-md disabled:opacity-40"
            >
              Save Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
