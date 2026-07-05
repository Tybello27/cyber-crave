export const CYCLE_PHASES = {
  MENSTRUAL: "menstrual",
  FOLLICULAR: "follicular",
  OVULATION: "ovulation",
  LUTEAL: "luteal",
};

export const CRAVING_TYPES = [
  "Chocolate",
  "Sugar",
  "Salty Food",
  "Fast Food",
  "Spicy Food",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Carbs",
  "Protein",
  "Caffeine",
  "Other",
];

export const SYMPTOM_TYPES = [
  "Fatigue",
  "Headache",
  "Bloating",
  "Mood Swings",
  "Anxiety",
  "Low Energy",
  "Cramps",
  "Acne",
  "Irritability",
  "Water Retention",
  "Breast Tenderness",
];

export const SEVERITY_LEVELS = ["Low", "Moderate", "Severe"];

export const INTENSITY_LEVELS = ["Mild", "Medium", "Strong"];

export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

export const FOOD_PREFERENCES = ["Vegetarian", "Vegan", "Regular", "High-Protein"];

export const AGE_RANGES = ["13-18", "19-25", "26-35", "36-45", "45+"];

export const GOALS = [
  "Reduce Cravings",
  "Improve Energy",
  "Reduce Bloating",
  "Improve Mood",
  "Better Sleep",
  "Reduce Fatigue",
];

// Phase-specific information
export const PHASE_INFO = {
  menstrual: {
    name: "Menstrual Phase",
    emoji: "🩸",
    duration: "3-7 days",
    commonCravings: ["Iron-rich foods", "Chocolate", "Red meat", "Dark leafy greens"],
    commonSymptoms: ["Cramps", "Fatigue", "Low energy", "Mood swings"],
    recommendedFoods: [
      "Red meat or spinach (iron)",
      "Dark chocolate",
      "Red fruits (berries, pomegranate)",
      "Legumes",
      "Fortified cereals",
    ],
    tips: "Your body needs iron and magnesium. Focus on warm, comforting foods.",
  },
  follicular: {
    name: "Follicular Phase",
    emoji: "🌸",
    duration: "7-10 days",
    commonCravings: ["Light meals", "Fruits", "Vegetables"],
    commonSymptoms: ["Energy increase", "Improved mood", "Better focus"],
    recommendedFoods: [
      "Fresh vegetables",
      "Lean proteins",
      "Whole grains",
      "Fruits",
      "Light salads",
    ],
    tips: "Embrace this phase of energy! Try new recipes and more active workouts.",
  },
  ovulation: {
    name: "Ovulation Phase",
    emoji: "✨",
    duration: "3-4 days",
    commonCravings: ["Fruits", "Vegetables", "Lean proteins"],
    commonSymptoms: ["Peak energy", "Confidence", "Social mood"],
    recommendedFoods: [
      "Grilled chicken",
      "Fresh salads",
      "Colorful vegetables",
      "Berries",
      "Nuts",
    ],
    tips: "Peak energy phase! You'll feel your best. Great for social activities.",
  },
  luteal: {
    name: "Luteal Phase",
    emoji: "🌙",
    duration: "10-14 days",
    commonCravings: ["Chocolate", "Carbs", "Sweets", "Comfort food"],
    commonSymptoms: ["Fatigue", "Bloating", "Mood changes", "Anxiety"],
    recommendedFoods: [
      "Dark chocolate",
      "Bananas (magnesium & potassium)",
      "Oats",
      "Sweet potatoes",
      "Yogurt",
      "Whole grain pasta",
      "Nuts and seeds",
    ],
    tips: "Your magnesium levels drop. Prioritize magnesium-rich foods and rest.",
  },
};

// Food recommendations based on symptoms
export const FOOD_REMEDIES = {
  fatigue: {
    foods: ["Oats", "Eggs", "Bananas", "Almonds", "Dark chocolate", "Red meat"],
    reason: "Iron, B vitamins, and carbs help boost energy",
  },
  bloating: {
    foods: ["Ginger tea", "Watermelon", "Cucumber", "Herbal tea", "Yogurt"],
    reason: "Anti-inflammatory and hydrating foods reduce bloating",
  },
  moodSwings: {
    foods: [
      "Dark chocolate",
      "Bananas",
      "Walnuts",
      "Salmon",
      "Chickpeas",
      "Berries",
    ],
    reason: "Serotonin-boosting foods improve mood",
  },
  anxiety: {
    foods: ["Leafy greens", "Nuts", "Seeds", "Whole grains", "Herbal tea"],
    reason: "Magnesium and omega-3s calm the nervous system",
  },
  headache: {
    foods: ["Water", "Magnesium-rich foods", "Ginger", "Berries", "Dark chocolate"],
    reason: "Hydration and magnesium prevent headaches",
  },
  lowEnergy: {
    foods: ["Quinoa", "Lentils", "Sweet potato", "Honey", "Dried fruits"],
    reason: "Complex carbs and protein sustain energy",
  },
};
