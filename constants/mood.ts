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

export const MOOD_LABELS: Record<MoodRating, string> = {
  [MoodRating.EXTREMELY_SAD]: 'Extremely Sad',
  [MoodRating.VERY_SAD]: 'Very Sad',
  [MoodRating.SAD]: 'Sad',
  [MoodRating.SOMEWHAT_SAD]: 'Somewhat Sad',
  [MoodRating.AVERAGE]: 'Average',
  [MoodRating.SOMEWHAT_HAPPY]: 'Somewhat Happy',
  [MoodRating.HAPPY]: 'Happy',
  [MoodRating.VERY_HAPPY]: 'Very Happy',
  [MoodRating.EXTREMELY_HAPPY]: 'Extremely Happy',
  [MoodRating.PERFECT]: 'Perfect',
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

export function getMoodLabel(rating: number): string {
  return MOOD_LABELS[rating as MoodRating] || 'Unknown';
}

export function getMoodColor(
  rating: number,
  colorScheme: 'light' | 'dark' | null = 'light'
): string {
  const colors = colorScheme === 'dark' ? MOOD_COLORS_DARK : MOOD_COLORS_LIGHT;
  return colors[rating as MoodRating] || (colorScheme === 'dark' ? '#60a5fa' : '#2563eb');
}
