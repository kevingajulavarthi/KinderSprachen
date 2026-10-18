import { UserProgress, ParentSettings } from '../types';

const PROGRESS_KEY = 'kindersprachen_progress_v1';
const SETTINGS_KEY = 'kindersprachen_settings_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  stars: 5, // Welcome gift of stars to delight the child
  wordsLearned: ['Hallo!', 'Tschüss!'],
  favoriteWords: ['die Katze', 'der Apfel'],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 1,
  dailyGoal: 5,
  dailyWordsCount: 2,
  gamesPlayedCount: 0,
  storiesReadCount: 0,
  speakingPracticedCount: 0,
};

export const DEFAULT_SETTINGS: ParentSettings = {
  speechRate: 0.82,
  speechPitch: 1.05,
  soundEffects: true,
  dailyGoalWords: 5,
  interfaceLanguage: 'en',
};

export function loadStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Could not save progress to localStorage', err);
  }
}

export function loadStoredSettings(): ParentSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: ParentSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Could not save settings to localStorage', err);
  }
}

export function clearAllLearningData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (err) {
    console.warn('Could not reset progress', err);
  }
}
