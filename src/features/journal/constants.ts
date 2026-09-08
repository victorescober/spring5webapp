import type { Mood } from '@/types'

export const MOODS: Mood[] = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😡', label: 'Angry' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
]

export function getMoodById(moodId: string): Mood | undefined {
  return MOODS.find((mood) => mood.id === moodId)
}
