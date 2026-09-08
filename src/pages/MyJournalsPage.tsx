import { useState } from 'react'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { useToast } from '@/components/shared/ToastContext'
import { JournalCard } from '@/features/journal/components/JournalCard'
import { useJournalEntries } from '@/features/journal/hooks/useJournalEntries'
import { sortEntriesByDateDesc } from '@/features/journal/utils'
import type { JournalEntry } from '@/types'

export function MyJournalsPage() {
  const { entries, removeEntry } = useJournalEntries()
  const { showToast } = useToast()
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null)

  const sortedEntries = sortEntriesByDateDesc(entries)

  function handleConfirmDelete() {
    if (!entryToDelete) return
    removeEntry(entryToDelete.id)
    showToast('Journal deleted.')
    setEntryToDelete(null)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-semibold text-text">My Journals</h1>
        <p className="text-text-muted">Browse, edit, or delete your past entries.</p>
      </header>

      {sortedEntries.length === 0 ? (
        <p className="text-sm text-text-muted">You haven't written any journal entries yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} onDelete={setEntryToDelete} />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={entryToDelete !== null}
        title="Delete journal entry"
        message="This will permanently delete this journal entry. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setEntryToDelete(null)}
      />
    </div>
  )
}
