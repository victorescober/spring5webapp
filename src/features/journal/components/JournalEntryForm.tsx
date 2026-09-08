import { useState, type FormEvent } from 'react'
import { Button } from '@/components/shared/Button'
import { MoodSelector } from '@/features/journal/components/MoodSelector'
import type { JournalEntryInput } from '@/features/journal/services/journalService'
import type { MoodId } from '@/types'

const MAX_CONTENT_LENGTH = 5000

interface JournalEntryFormProps {
  initialDate: string
  initialMoodId?: MoodId
  initialContent?: string
  isEditing: boolean
  onSubmit: (input: JournalEntryInput) => void
}

export function JournalEntryForm({
  initialDate,
  initialMoodId,
  initialContent = '',
  isEditing,
  onSubmit,
}: JournalEntryFormProps) {
  const [date, setDate] = useState(initialDate)
  const [moodId, setMoodId] = useState<MoodId | null>(initialMoodId ?? null)
  const [content, setContent] = useState(initialContent)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!date) {
      setError('Please select a date.')
      return
    }
    if (!moodId) {
      setError('Please select a mood.')
      return
    }
    if (!content.trim()) {
      setError('Please write something before saving.')
      return
    }

    setError(null)
    onSubmit({ date, moodId, content: content.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p role="alert" className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="entry-date" className="text-sm font-medium text-text">
          Date
        </label>
        <input
          id="entry-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          disabled={isEditing}
          className="w-full max-w-xs rounded-lg border border-border px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-text-muted"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text">Mood</span>
        <MoodSelector selectedMoodId={moodId} onSelect={setMoodId} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="entry-content" className="text-sm font-medium text-text">
          Journal entry
        </label>
        <textarea
          id="entry-content"
          value={content}
          onChange={(event) => setContent(event.target.value.slice(0, MAX_CONTENT_LENGTH))}
          rows={10}
          placeholder="How was your day?"
          className="w-full resize-y rounded-lg border border-border px-3 py-2 text-sm leading-relaxed"
        />
        <span className="text-xs text-text-muted">
          {content.length} / {MAX_CONTENT_LENGTH} characters
        </span>
      </div>

      <Button type="submit" className="self-start px-6 py-2.5">
        💾 {isEditing ? 'Update entry' : 'Save entry'}
      </Button>
    </form>
  )
}
