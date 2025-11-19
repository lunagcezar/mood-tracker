export enum MoodRating {
  EXTREMELY_SAD = 1,
  VERY_SAD = 2,
  SAD = 3,
  SOMEWHAT_SAD = 4,
  AVERAGE = 5,
  SOMEWHAT_HAPPY = 6,
  HAPPY = 7,
  VERY_HAPPY = 8,
  EXTREMELY_HAPPY = 9,
  PERFECT = 10,
}

// Mapping for translation keys
export const MOOD_LABEL_KEYS: Record<MoodRating, string> = {
  [MoodRating.EXTREMELY_SAD]: 'mood.extremelySad',
  [MoodRating.VERY_SAD]: 'mood.verySad',
  [MoodRating.SAD]: 'mood.sad',
  [MoodRating.SOMEWHAT_SAD]: 'mood.somewhatSad',
  [MoodRating.AVERAGE]: 'mood.average',
  [MoodRating.SOMEWHAT_HAPPY]: 'mood.somewhatHappy',
  [MoodRating.HAPPY]: 'mood.happy',
  [MoodRating.VERY_HAPPY]: 'mood.veryHappy',
  [MoodRating.EXTREMELY_HAPPY]: 'mood.extremelyHappy',
  [MoodRating.PERFECT]: 'mood.perfect',
};

export const MOOD_COLORS_LIGHT: Record<MoodRating, string> = {
  [MoodRating.EXTREMELY_SAD]: '#ef4444',
  [MoodRating.VERY_SAD]: '#ef4444',
  [MoodRating.SAD]: '#f59e42',
  [MoodRating.SOMEWHAT_SAD]: '#f59e42',
  [MoodRating.AVERAGE]: '#fbbf24',
  [MoodRating.SOMEWHAT_HAPPY]: '#22d3ee',
  [MoodRating.HAPPY]: '#22d3ee',
  [MoodRating.VERY_HAPPY]: '#22c55e',
  [MoodRating.EXTREMELY_HAPPY]: '#22c55e',
  [MoodRating.PERFECT]: '#a3e635',
};

export const MOOD_COLORS_DARK: Record<MoodRating, string> = {
  [MoodRating.EXTREMELY_SAD]: '#f87171',
  [MoodRating.VERY_SAD]: '#f87171',
  [MoodRating.SAD]: '#fdba74',
  [MoodRating.SOMEWHAT_SAD]: '#fdba74',
  [MoodRating.AVERAGE]: '#fde047',
  [MoodRating.SOMEWHAT_HAPPY]: '#67e8f9',
  [MoodRating.HAPPY]: '#67e8f9',
  [MoodRating.VERY_HAPPY]: '#4ade80',
  [MoodRating.EXTREMELY_HAPPY]: '#4ade80',
  [MoodRating.PERFECT]: '#bef264',
};

export const MOOD_RATINGS = Object.values(MoodRating).filter(
  (value) => typeof value === 'number'
) as number[];

export const MIN_MOOD_RATING = 1;
export const MAX_MOOD_RATING = 10;

export function getMoodLabelKey(rating: number): string {
  return MOOD_LABEL_KEYS[rating as MoodRating] || 'mood.average';
}

export function getMoodColor(
  rating: number,
  colorScheme: 'light' | 'dark' | null = 'light'
): string {
  const colors = colorScheme === 'dark' ? MOOD_COLORS_DARK : MOOD_COLORS_LIGHT;
  return colors[rating as MoodRating] || (colorScheme === 'dark' ? '#60a5fa' : '#2563eb');
}
