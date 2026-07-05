import { pgTable, text, integer, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  ageRange: varchar('age_range'),
  cycleLength: integer('cycle_length').default(28),
  foodPreference: varchar('food_preference'), // vegetarian, vegan, regular, high-protein
  allergies: text('allergies'),
  goal: text('goal'), // JSON array of goals
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Cycle phase tracking
export const cyclePhases = pgTable('cycle_phases', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  phase: varchar('phase').notNull(), // menstrual, follicular, ovulation, luteal
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cravings tracker
export const cravings = pgTable('cravings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  cravingType: varchar('craving_type').notNull(), // chocolate, sugar, salty, fastfood, spicy, etc
  intensity: varchar('intensity').notNull(), // mild, medium, strong
  timestamp: timestamp('timestamp').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Symptoms tracker
export const symptoms = pgTable('symptoms', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  symptomType: varchar('symptom_type').notNull(), // fatigue, headache, bloating, mood_swings, etc
  severity: varchar('severity').notNull(), // low, moderate, severe
  timestamp: timestamp('timestamp').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Meal logs
export const mealLogs = pgTable('meal_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  date: timestamp('date').notNull(),
  mealType: varchar('meal_type').notNull(), // breakfast, lunch, dinner, snack
  description: text('description').notNull(),
  foodItems: text('food_items'), // JSON array
  waterIntake: integer('water_intake').default(0), // in cups
  createdAt: timestamp('created_at').defaultNow(),
});

// Food effectiveness tracking
export const foodEffectiveness = pgTable('food_effectiveness', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  foodItem: text('food_item').notNull(),
  cravingId: text('craving_id').references(() => cravings.id),
  mealLogId: text('meal_log_id').references(() => mealLogs.id),
  helpedOverall: boolean('helped_overall'),
  energyImproved: boolean('energy_improved'),
  cravingsReduced: boolean('cravings_reduced'),
  moodImproved: boolean('mood_improved'),
  rating: integer('rating'), // 1-5 scale
  timestamp: timestamp('timestamp').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Daily insights/notes
export const dailyNotes = pgTable('daily_notes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  date: timestamp('date').notNull(),
  energyLevel: varchar('energy_level'), // low, medium, high
  moodTrend: varchar('mood_trend'), // low, neutral, positive
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CyclePhase = typeof cyclePhases.$inferSelect;
export type Craving = typeof cravings.$inferSelect;
export type Symptom = typeof symptoms.$inferSelect;
export type MealLog = typeof mealLogs.$inferSelect;
export type FoodEffectiveness = typeof foodEffectiveness.$inferSelect;
export type DailyNote = typeof dailyNotes.$inferSelect;
