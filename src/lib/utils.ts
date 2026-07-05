export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDateOnly(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function daysAgo(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDaysInCycle(cycleLength: number): number[] {
  return Array.from({ length: cycleLength }, (_, i) => i + 1);
}

export function calculatePhaseDay(
  currentDay: number,
  cycleLength: number,
): { phase: string; day: number } {
  const dayInCycle = (currentDay - 1) % cycleLength + 1;

  if (dayInCycle <= 5) {
    return { phase: 'menstrual', day: dayInCycle };
  } else if (dayInCycle <= 13) {
    return { phase: 'follicular', day: dayInCycle - 5 };
  } else if (dayInCycle <= 16) {
    return { phase: 'ovulation', day: dayInCycle - 13 };
  } else {
    return { phase: 'luteal', day: dayInCycle - 16 };
  }
}

export function getPhaseEmoji(phase: string): string {
  const emojis: Record<string, string> = {
    menstrual: '🩸',
    follicular: '🌸',
    ovulation: '✨',
    luteal: '🌙',
  };
  return emojis[phase] || '❓';
}

export function getPhaseName(phase: string): string {
  const names: Record<string, string> = {
    menstrual: 'Menstrual Phase',
    follicular: 'Follicular Phase',
    ovulation: 'Ovulation Phase',
    luteal: 'Luteal Phase',
  };
  return names[phase] || 'Unknown Phase';
}

export function calculateCravingPercentage(
  items: any[],
  predicate: (item: any) => boolean,
): number {
  if (items.length === 0) return 0;
  const matching = items.filter(predicate).length;
  return Math.round((matching / items.length) * 100);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
