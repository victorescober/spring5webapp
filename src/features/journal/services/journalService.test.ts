import { beforeEach, describe, expect, it } from 'vitest'
import { deleteEntry, getAllEntries, getEntryByDate, saveEntry } from './journalService'

describe('journalService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates a new entry when none exists for the date', () => {
    const entry = saveEntry({ date: '2026-01-01', moodId: 'happy', content: 'Great day' })

    expect(entry.date).toBe('2026-01-01')
    expect(getAllEntries()).toHaveLength(1)
  })

  it('updates the existing entry instead of creating a duplicate for the same date', () => {
    saveEntry({ date: '2026-01-01', moodId: 'happy', content: 'Great day' })
    const updated = saveEntry({ date: '2026-01-01', moodId: 'sad', content: 'Actually a rough day' })

    expect(getAllEntries()).toHaveLength(1)
    expect(updated.moodId).toBe('sad')
    expect(getEntryByDate('2026-01-01')?.content).toBe('Actually a rough day')
  })

  it('deletes an entry by id', () => {
    const entry = saveEntry({ date: '2026-01-01', moodId: 'happy', content: 'Great day' })
    deleteEntry(entry.id)

    expect(getAllEntries()).toHaveLength(0)
  })
})
