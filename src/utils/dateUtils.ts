function getTwoDigit(value: number): string {
  return String(value).padStart(2, '0')
}

export function toLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = getTwoDigit(date.getMonth() + 1)
  const day = getTwoDigit(date.getDate())
  return `${year}-${month}-${day}`
}

export function getTodayLocalDate(): string {
  return toLocalDateString(new Date())
}

export function formatDateForDisplay(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
