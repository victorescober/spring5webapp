import { Link } from 'react-router-dom'
import { getMoodById } from '@/features/journal/constants'
import { formatDateForDisplay } from '@/utils/dateUtils'
import type { JournalEntry } from '@/types'

interface JournalCardProps {
  entry: JournalEntry
  onDelete: (entry: JournalEntry) => void
}

export function JournalCard({ entry, onDelete }: JournalCardProps) {
  const mood = getMoodById(entry.moodId)

  return (
    <article className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted">{formatDateForDisplay(entry.date)}</p>
          <p className="mt-1 text-2xl" aria-label={mood?.label}>
            {mood?.emoji}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/journal/new?date=${entry.date}`}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
          >
            ✏️ Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(entry)}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger/10"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm text-text">{entry.content}</p>
    </article>
  )
}
