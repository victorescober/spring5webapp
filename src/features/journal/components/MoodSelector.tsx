import { MOODS } from '@/features/journal/constants'
import type { MoodId } from '@/types'

interface MoodSelectorProps {
  selectedMoodId: MoodId | null
  onSelect: (moodId: MoodId) => void
}

export function MoodSelector({ selectedMoodId, onSelect }: MoodSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select your mood" className="flex flex-wrap gap-3">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          type="button"
          role="radio"
          aria-checked={selectedMoodId === mood.id}
          onClick={() => onSelect(mood.id)}
          className={`flex flex-col items-center gap-1 rounded-xl border px-4 py-3 text-sm transition-colors ${
            selectedMoodId === mood.id
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-surface text-text-muted hover:border-primary/50'
          }`}
        >
          <span className="text-2xl" aria-hidden="true">
            {mood.emoji}
          </span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
