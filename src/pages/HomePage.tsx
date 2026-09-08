import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { useToast } from '@/components/shared/ToastContext'
import { JournalCard } from '@/features/journal/components/JournalCard'
import { useJournalEntries } from '@/features/journal/hooks/useJournalEntries'
import { sortEntriesByDateDesc } from '@/features/journal/utils'
import { getTodayLocalDate } from '@/utils/dateUtils'
import type { JournalEntry } from '@/types'

const RECENT_ENTRIES_COUNT = 3

export function HomePage() {
  const { entries, removeEntry } = useJournalEntries()
  const { showToast } = useToast()
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null)

  const todayEntry = entries.find((entry) => entry.date === getTodayLocalDate())
  const recentEntries = sortEntriesByDateDesc(entries).slice(0, RECENT_ENTRIES_COUNT)

  function handleConfirmDelete() {
    if (!entryToDelete) return
    removeEntry(entryToDelete.id)
    showToast('Journal deleted.')
    setEntryToDelete(null)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-text">Daily Journal</h1>
        <p className="text-text-muted">A calm space to reflect on your day.</p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">Today</h2>
        {todayEntry ? (
          <div className="mt-4">
            <JournalCard entry={todayEntry} onDelete={setEntryToDelete} />
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-start gap-3">
            <p className="text-sm text-text-muted">You haven't written a journal entry for today yet.</p>
            <Link
              to="/journal/new"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              ✏️ Write today's entry
            </Link>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Recent entries</h2>
          <Link to="/journals" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {recentEntries.length === 0 ? (
          <p className="text-sm text-text-muted">No journal entries yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} onDelete={setEntryToDelete} />
            ))}
          </div>
        )}
      </section>

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
