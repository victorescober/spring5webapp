import { loadAppData, saveAppData } from '@/services/storageService'
import type { JournalEntry, MoodId } from '@/types'

export interface JournalEntryInput {
  date: string
  moodId: MoodId
  content: string
}

export function getAllEntries(): JournalEntry[] {
  return loadAppData().journals
}

export function getEntryByDate(date: string): JournalEntry | undefined {
  return getAllEntries().find((entry) => entry.date === date)
}

export function getEntryById(id: string): JournalEntry | undefined {
  return getAllEntries().find((entry) => entry.id === id)
}

// Enforces one entry per calendar day: creates a new entry, or updates the existing one for that date.
export function saveEntry(input: JournalEntryInput): JournalEntry {
  const data = loadAppData()
  const now = new Date().toISOString()
  const existing = data.journals.find((entry) => entry.date === input.date)

  let savedEntry: JournalEntry
  let journals: JournalEntry[]

  if (existing) {
    savedEntry = { ...existing, moodId: input.moodId, content: input.content, updatedAt: now }
    journals = data.journals.map((entry) => (entry.id === existing.id ? savedEntry : entry))
  } else {
    savedEntry = {
      id: crypto.randomUUID(),
      date: input.date,
      moodId: input.moodId,
      content: input.content,
      createdAt: now,
      updatedAt: now,
    }
    journals = [...data.journals, savedEntry]
  }

  saveAppData({ journals })
  return savedEntry
}

export function deleteEntry(id: string): void {
  const data = loadAppData()
  saveAppData({ journals: data.journals.filter((entry) => entry.id !== id) })
}
