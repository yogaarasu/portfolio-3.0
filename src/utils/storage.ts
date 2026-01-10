import type { Message, Visit } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function getMessages(): Promise<Message[]> {
  try {
    const adminPassword = localStorage.getItem('portfolio-admin-token') || ''
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: {
        'Authorization': `Bearer ${adminPassword}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function saveMessage(message: Omit<Message, 'id' | 'createdAt'>): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to save message')
    }
  } catch (error) {
    console.error('Error saving message:', error)
    throw error
  }
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    const adminPassword = localStorage.getItem('portfolio-admin-token') || ''
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminPassword}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete message')
    }
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

export async function getVisits(): Promise<Visit[]> {
  try {
    const adminPassword = localStorage.getItem('portfolio-admin-token') || ''
    const response = await fetch(`${API_BASE_URL}/visits`, {
      headers: {
        'Authorization': `Bearer ${adminPassword}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch visits')
    }
    
    const visits = await response.json()
    return visits.map((visit: any) => ({
      id: visit._id,
      timestamp: visit.timestamp,
    }))
  } catch (error) {
    console.error('Error fetching visits:', error)
    return []
  }
}

export async function incrementVisit(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error recording visit:', error)
    // Silently fail for visit tracking to not disrupt user experience
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


