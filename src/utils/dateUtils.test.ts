import { describe, expect, it } from 'vitest'
import { formatDateForDisplay, toLocalDateString } from './dateUtils'

describe('dateUtils', () => {
  it('formats a date object as a local YYYY-MM-DD string', () => {
    const date = new Date(2026, 0, 5)
    expect(toLocalDateString(date)).toBe('2026-01-05')
  })

  it('formats a date string for display', () => {
    const formatted = formatDateForDisplay('2026-01-05')
    expect(formatted).toContain('2026')
    expect(formatted).toContain('January')
  })
})
