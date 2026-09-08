import type { AppStorageData } from '@/types'

const STORAGE_KEY = 'daily-journal-app-data'

function createDefaultData(): AppStorageData {
  return { journals: [] }
}

export function loadAppData(): AppStorageData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return createDefaultData()

  try {
    const parsed = JSON.parse(raw) as Partial<AppStorageData>
    return {
      journals: Array.isArray(parsed.journals) ? parsed.journals : [],
    }
  } catch {
    return createDefaultData()
  }
}

export function saveAppData(data: AppStorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
