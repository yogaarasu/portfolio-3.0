import type { Message, Visit } from '../types'

const MESSAGES_KEY = 'portfolio-messages'
const VISITS_KEY = 'portfolio-visits'

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function getMessages(): Message[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(MESSAGES_KEY)
  return safeParse<Message[]>(raw, [])
}

export function saveMessage(message: Message) {
  if (typeof window === 'undefined') return
  const existing = getMessages()
  const next = [message, ...existing]
  window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(next))
}

export function deleteMessage(id: string) {
  if (typeof window === 'undefined') return
  const existing = getMessages()
  const next = existing.filter((m) => m.id !== id)
  window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(next))
}

export function getVisits(): Visit[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(VISITS_KEY)
  return safeParse<Visit[]>(raw, [])
}

export function incrementVisit() {
  if (typeof window === 'undefined') return
  const visits = getVisits()
  const now = new Date()
  const nowISO = now.toISOString()
  
  // Check if a visit was recorded in the last 5 seconds to prevent duplicates
  const fiveSecondsAgo = new Date(now.getTime() - 5 * 1000)
  const recentVisit = visits.find((v) => {
    const visitTime = new Date(v.timestamp)
    return visitTime >= fiveSecondsAgo
  })
  
  // Only add visit if no recent visit exists (within last 5 seconds)
  if (!recentVisit) {
    const visit: Visit = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      timestamp: nowISO,
    }
    window.localStorage.setItem(VISITS_KEY, JSON.stringify([visit, ...visits]))
  }
}

// Helper function to deduplicate visits by exact timestamp
export function deduplicateVisits(visits: Visit[]): Visit[] {
  const seen = new Map<string, Visit>()
  for (const visit of visits) {
    const timeKey = new Date(visit.timestamp).toISOString()
    if (!seen.has(timeKey)) {
      seen.set(timeKey, visit)
    }
  }
  return Array.from(seen.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}


