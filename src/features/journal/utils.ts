import type { JournalEntry } from '@/types'

export function sortEntriesByDateDesc(entries: JournalEntry[]): JournalEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date))
}
