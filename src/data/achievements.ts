import { Achievement, UserProgress } from '../types';

export const INITIAL_ACHIEVEMENTS: Omit<Achievement, 'isUnlocked' | 'currentCount'>[] = [
  {
    id: 'ach_first_word',
    titleDe: 'Erstes Wort!',
    titleEn: 'First Word!',
    descriptionDe: 'Du hast dein allererstes deutsches Wort gelernt!',
    descriptionEn: 'You took your first step into the German language!',
    icon: '🌱',
    targetCount: 1,
  },
  {
    id: 'ach_alphabet',
    titleDe: 'Alphabet-Entdecker',
    titleEn: 'Alphabet Explorer',
    descriptionDe: 'Erkunde mindestens 5 Buchstaben des Alphabets!',
    descriptionEn: 'Explored letters and sounds of the German alphabet!',
    icon: '🔤',
    targetCount: 5,
  },
  {
    id: 'ach_animal',
    titleDe: 'Tier-Experte',
    titleEn: 'Animal Expert',
    descriptionDe: 'Lerne mindestens 4 tolle Tiere auf Deutsch!',
    descriptionEn: 'Mastered friendly German animal names!',
    icon: '🦁',
    targetCount: 4,
  },
  {
    id: 'ach_color',
    titleDe: 'Farben-Champion',
    titleEn: 'Color Champion',
    descriptionDe: 'Erkenne bunte Regenbogenfarben auf Deutsch!',
    descriptionEn: 'Identified colorful German rainbow shades!',
    icon: '🎨',
    targetCount: 4,
  },
  {
    id: 'ach_numbers',
    titleDe: 'Zahlen-Star',
    titleEn: 'Number Star',
    descriptionDe: 'Zähle laut von eins bis fünf!',
    descriptionEn: 'Counted numbers 1 to 5 with Leo!',
    icon: '🔢',
    targetCount: 5,
  },
  {
    id: 'ach_story',
    titleDe: 'Geschichten-Freund',
    titleEn: 'Story Reader',
    descriptionDe: 'Lies ein deutsches Bilderbuch mit Leo!',
    descriptionEn: 'Read an illustrated German storybook!',
    icon: '📖',
    targetCount: 1,
  },
  {
    id: 'ach_listening',
    titleDe: 'Hör-Held',
    titleEn: 'Listening Hero',
    descriptionDe: 'Höre dir 10 deutsche Wörter genau an!',
    descriptionEn: 'Listened carefully to 10 German audio pronunciations!',
    icon: '🎧',
    targetCount: 10,
  },
  {
    id: 'ach_seven_lessons',
    titleDe: 'Meister-Lerner',
    titleEn: 'Seven Lessons Hero',
    descriptionDe: 'Schließe 7 spannende Lektionen erfolgreich ab!',
    descriptionEn: 'Completed 7 full interactive lessons!',
    icon: '🏆',
    targetCount: 7,
  },
];

export function computeAchievements(progress: UserProgress): Achievement[] {
  return INITIAL_ACHIEVEMENTS.map((ach) => {
    let currentCount = 0;
    if (ach.id === 'ach_first_word') {
      currentCount = progress.wordsLearned.length;
    } else if (ach.id === 'ach_alphabet') {
      currentCount = progress.completedLessons.includes('lesson-2') ? 5 : Math.min(progress.wordsLearned.length, 5);
    } else if (ach.id === 'ach_animal') {
      currentCount = progress.completedLessons.includes('lesson-5') ? 4 : 2;
    } else if (ach.id === 'ach_color') {
      currentCount = progress.completedLessons.includes('lesson-4') ? 4 : 2;
    } else if (ach.id === 'ach_numbers') {
      currentCount = progress.completedLessons.includes('lesson-3') ? 5 : 2;
    } else if (ach.id === 'ach_story') {
      currentCount = progress.storiesReadCount;
    } else if (ach.id === 'ach_listening') {
      currentCount = progress.wordsLearned.length;
    } else if (ach.id === 'ach_seven_lessons') {
      currentCount = progress.completedLessons.length;
    }

    const isUnlocked = currentCount >= ach.targetCount;
    return {
      ...ach,
      currentCount,
      isUnlocked,
    };
  });
}
