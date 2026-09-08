export type MoodId = 'happy' | 'neutral' | 'sad' | 'angry' | 'tired'

export interface Mood {
  id: MoodId
  emoji: string
  label: string
}

export interface JournalEntry {
  id: string
  /** Local calendar date in 'YYYY-MM-DD' format. Unique per entry. */
  date: string
  moodId: MoodId
  content: string
  createdAt: string
  updatedAt: string
}

export interface AppStorageData {
  journals: JournalEntry[]
}
