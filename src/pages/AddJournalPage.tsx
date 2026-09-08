import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/components/shared/ToastContext'
import { JournalEntryForm } from '@/features/journal/components/JournalEntryForm'
import { useJournalEntries } from '@/features/journal/hooks/useJournalEntries'
import { getTodayLocalDate } from '@/utils/dateUtils'
import type { JournalEntryInput } from '@/features/journal/services/journalService'

export function AddJournalPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { entries, addOrUpdateEntry } = useJournalEntries()
  const { showToast } = useToast()

  const targetDate = searchParams.get('date') ?? getTodayLocalDate()
  const existingEntry = useMemo(
    () => entries.find((entry) => entry.date === targetDate),
    [entries, targetDate],
  )

  function handleSubmit(input: JournalEntryInput) {
    addOrUpdateEntry(input)
    showToast(existingEntry ? 'Journal updated successfully.' : 'Journal saved successfully.')
    navigate('/journals')
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-semibold text-text">
          {existingEntry ? 'Edit journal entry' : 'Add new journal'}
        </h1>
        <p className="text-text-muted">
          {existingEntry
            ? 'You already have an entry for this date. Saving will update it.'
            : 'Each day can have one journal entry.'}
        </p>
      </header>

      <JournalEntryForm
        key={targetDate}
        initialDate={targetDate}
        initialMoodId={existingEntry?.moodId}
        initialContent={existingEntry?.content}
        isEditing={Boolean(existingEntry)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
