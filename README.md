# 🩸 CycleCrave - Period-Friendly Meal & Craving Tracker

A beautiful, mobile-first Progressive Web App designed to help women understand their cravings, symptoms, and food patterns across their menstrual cycle.

## 🌟 Features

### Core Functionality

- **📝 Craving Tracker** - Log what you're craving, intensity level, and personal notes
- **⚕️ Symptom Tracker** - Monitor fatigue, headaches, bloating, mood swings, and more
- **🍽️ Meal Logger** - Track meals with water intake and helpfulness ratings
- **📊 Insights & Analytics** - Visualize patterns and get smart recommendations
- **🏠 Dashboard** - Quick overview with phase information and daily summaries

### Menstrual Cycle Information

- **Menstrual Phase (🩸)** - Days 1-5: Energy support and iron-rich food suggestions
- **Follicular Phase (🌸)** - Days 6-13: Increased energy, fresh food recommendations
- **Ovulation Phase (✨)** - Days 14-16: Peak energy and lean protein suggestions
- **Luteal Phase (🌙)** - Days 17-28: Magnesium-rich foods and mood support

### PWA Features

- ✅ **Installable** - Add to home screen like a native app
- ✅ **Offline Support** - Works without internet connection
- ✅ **Fast & Responsive** - Mobile-first design optimized for speed
- ✅ **Cross-Device** - Works on all mobile devices
- ✅ **App Shortcuts** - Quick access to logging functions

## 🎯 User Goals Supported

- Reduce cravings
- Improve energy levels
- Reduce bloating
- Improve mood
- Better sleep
- Reduce fatigue

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS 4
- **State Management**: Zustand
- **Database**: PostgreSQL + Drizzle ORM
- **PWA**: Service Worker, Web Manifest, Offline Support
- **Authentication**: Built-in (demo mode available)

## 📱 Installation

### For Users (PWA Installation)

1. **Visit the app** in your mobile browser
2. **Tap the menu** (three dots or share icon)
3. **Select "Add to Home Screen"** or "Install App"
4. **Enjoy** - It's installed like a native app!

### For Developers

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Authentication

The app includes a simple authentication system:

- **Sign Up**: Create account with email, password, and personalization
- **Login**: Access your data securely
- **Demo Mode**: Use `demo@example.com` / `demo123` for quick testing

## 💾 Data Storage

All user data is stored locally in browser storage (localStorage) and can optionally be synced to a PostgreSQL database.

### Stored Data Types

- **User Profile**: Name, email, age, food preferences, allergies, goals
- **Cycle Phases**: Current phase selection and history
- **Cravings**: Type, intensity, timestamp, notes
- **Symptoms**: Type, severity, timestamp, notes
- **Meals**: Type, description, water intake, helpfulness rating
- **Daily Notes**: Energy level, mood, general observations

## 🎨 Design Features

- **Soft Pink & Purple Palette** - Calming, feminine design
- **Rounded Cards** - Friendly, modern interface
- **Smooth Animations** - Polished user experience
- **Mobile-First Layout** - Optimized for all screen sizes
- **Safe Area Support** - Works with phone notches
- **Dark Mode Ready** - Theme support included

## 🚀 Quick Start

### For Demo Users

1. Go to login page
2. Tap **"Use Demo Account"** button
3. Explore with test data

### Create Account

1. Tap **"Sign Up"**
2. Enter your details (name, email, password)
3. Select age range and food preference
4. Choose your goals
5. Add any allergies
6. Start logging!

## 📊 Key Features Explained

### Dashboard (Home Tab)

- Welcome message personalized with your name
- Current cycle phase with tips and recommendations
- Quick action buttons (Log Craving, Log Symptom, etc.)
- Energy level and mood tracking
- Phase selector for easy navigation

### Craving Tracker

- Choose from predefined craving types or add custom ones
- Set intensity level (Mild, Medium, Strong)
- Add optional notes for context
- View most common cravings
- Track patterns over time

### Symptom Tracker

- Log symptoms specific to your cycle phase
- Rate severity (Low, Moderate, Severe)
- Add detailed notes
- See which symptoms are most common
- Get phase-specific recommendations

### Meal Tracker

- Log meals with detailed descriptions
- Track water intake with each meal
- Rate helpfulness of meals
- See water intake statistics
- Connect foods to symptom improvements

### Insights Dashboard

- **Statistics**: Total cravings, symptoms, meals logged
- **Patterns**: Most common craving, symptom, meal type
- **Metrics**: Helpful meal percentage, average water intake
- **Recommendations**: Smart suggestions based on your data
- **Trends**: Visual representation of your patterns

## 🔔 Smart Features

### Phase-Based Recommendations

Based on your cycle phase, the app recommends:

- **Specific foods** to eat for energy, mood, and bloating relief
- **Common symptoms** to expect
- **Typical cravings** patterns
- **Nutritional tips** for that phase

### Food Remedies Database

The app includes smart food suggestions for common symptoms:

- **Fatigue**: Oats, eggs, bananas, almonds, dark chocolate
- **Bloating**: Ginger tea, watermelon, cucumber, yogurt
- **Mood Swings**: Dark chocolate, bananas, walnuts, salmon
- **Anxiety**: Leafy greens, nuts, seeds, whole grains
- **Headaches**: Water, magnesium-rich foods, ginger, berries

### Pattern Recognition

The app learns from your data:

- Identifies your most common cravings
- Tracks symptom severity patterns
- Learns which foods help most
- Provides personalized insights

## 🛠️ Development

### Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   ├── globals.css          # Global styles
│   ├── client-init.tsx      # PWA initialization
│   └── api/
│       └── health/
│           └── route.ts     # Health check endpoint
├── components/
│   ├── auth/
│   │   ├── AuthPage.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   └── dashboard/
│       ├── Dashboard.tsx
│       ├── BottomNav.tsx
│       └── tabs/
│           ├── HomeTab.tsx
│           ├── CravingsTab.tsx
│           ├── SymptomsTab.tsx
│           ├── MealsTab.tsx
│           └── InsightsTab.tsx
├── lib/
│   ├── constants.ts         # App constants
│   ├── store.ts            # Zustand stores
│   └── utils.ts            # Utility functions
└── db/
    ├── schema.ts           # Drizzle schema
    └── index.ts            # DB connection
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/app_db
```

## 🌐 PWA Configuration

### Service Worker (`/public/sw.js`)

- Caches essential assets
- Provides offline fallback
- Handles fetch requests with network-first strategy
- Cleans up old caches

### Manifest (`/public/manifest.json`)

- App name and description
- Home screen icon
- Theme colors
- Display mode (standalone)
- App shortcuts
- Category: health/lifestyle

### Browser Support

- ✅ Chrome/Edge (desktop & mobile)
- ✅ Firefox (mobile)
- ✅ Safari iOS 16.4+
- ✅ Samsung Internet

## 📈 Analytics & Insights

The app provides:

- **Bar Charts**: Most common cravings and symptoms
- **Progress Bars**: Water intake and meal effectiveness
- **Statistics Cards**: Total entries and success rates
- **Trend Insights**: Pattern-based recommendations
- **Personalized Tips**: Based on your unique data

## 🔒 Privacy & Security

- **Local First**: All data stored on your device first
- **No Tracking**: No analytics or user tracking
- **Offline Access**: Works without internet
- **User Control**: Delete data anytime
- **Secure Auth**: Password-protected accounts (optional)

## 🎓 Educational Content

The app includes information about:

- Menstrual cycle phases and duration
- Common symptoms at each phase
- Typical cravings patterns
- Foods that help with specific symptoms
- Nutritional science behind recommendations

## 💡 Tips for Users

1. **Log consistently** - More data = better insights
2. **Add notes** - Context helps identify patterns
3. **Rate meal helpfulness** - Train the app about what works for you
4. **Stay hydrated** - Water intake matters!
5. **Monitor phases** - Select your phase for accurate recommendations

## 🐛 Troubleshooting

### App won't install as PWA
- Ensure using HTTPS or localhost
- Check manifest.json is valid
- Service worker must be registered

### Data not saving
- Check browser storage is enabled
- Ensure localStorage has available space
- Check browser console for errors

### Service worker issues
- Clear browser cache and data
- Unregister old service workers
- Refresh the page

## 🚀 Future Features

- **Predictions**: Predict cycle dates based on history
- **Notifications**: Reminders to log data
- **Export Data**: Download your history as CSV/PDF
- **Health Integration**: Connect to health apps
- **AI Insights**: Advanced pattern recognition
- **Multi-language**: Support more languages
- **Community**: Share tips with other users

## 📞 Support

For issues or suggestions:

1. Check the app's built-in help
2. Review your browser's console for errors
3. Ensure all data is properly saved
4. Try clearing cache and re-installing

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with care for women's health and wellness. Inspired by the intersection of nutrition, cycle tracking, and empowerment.

---

**Remember**: This app is a food and craving tracker, not a medical diagnosis tool. Always consult healthcare professionals for medical concerns.

**Made with 💜 for women everywhere** 🩸
