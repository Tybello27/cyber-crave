'use client';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9.5z"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            fill={active ? '#FADEDE' : 'none'}
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'cravings',
      label: 'Cravings',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M5 8h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            fill={active ? '#FADEDE' : 'none'}
          />
          <path
            d="M9 8V6a3 3 0 016 0v2M8 12h8M8 15h5"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 'symptoms',
      label: 'Symptoms',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M12 21C12 21 4 15 4 9a5 5 0 019-3 5 5 0 019 3c0 6-8 12-8 12z"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            fill={active ? '#FADEDE' : 'none'}
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'meals',
      label: 'Meals',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M6 2v8a3 3 0 006 0V2M9 2v20M18 2v7c0 2 2 3 2 3v10"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'insights',
      label: 'Profile',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <circle
            cx="12"
            cy="8"
            r="4"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            fill={active ? '#FADEDE' : 'none'}
          />
          <path
            d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke={active ? '#D97369' : '#9A8080'}
            strokeWidth="1.8"
            fill={active ? '#FADEDE' : 'none'}
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(240,161,153,0.12)] border border-[#FADEDE]/60 rounded-[28px] py-2 px-2">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-2 px-1 flex flex-col items-center gap-1 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-[#D97369]' : 'text-[#9A8080]'
                }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                >
                  {tab.icon(isActive)}
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-wide ${
                    isActive ? 'text-[#D97369]' : 'text-[#9A8080]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
