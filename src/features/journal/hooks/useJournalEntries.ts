import { useCallback, useEffect, useState } from 'react'
import {
  deleteEntry,
  getAllEntries,
  saveEntry,
  type JournalEntryInput,
} from '@/features/journal/services/journalService'
import type { JournalEntry } from '@/types'

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  const refresh = useCallback(() => {
    setEntries(getAllEntries())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addOrUpdateEntry = useCallback(
    (input: JournalEntryInput) => {
      const savedEntry = saveEntry(input)
      refresh()
      return savedEntry
    },
    [refresh],
  )

  const removeEntry = useCallback(
    (id: string) => {
      deleteEntry(id)
      refresh()
    },
    [refresh],
  )

  return { entries, addOrUpdateEntry, removeEntry, refresh }
}
