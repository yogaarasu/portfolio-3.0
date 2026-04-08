import type { Message, Visit } from '../types'
import { ADMIN_TOKEN_STORAGE_KEY, API_BASE_URL } from '../config/auth'

const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || ''

const getAdminHeaders = () => ({
  Authorization: `Bearer ${getAdminToken()}`,
  'Content-Type': 'application/json',
})

export async function getMessages(): Promise<Message[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: getAdminHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }
    
    const messages = await response.json()
    return messages.map((message: any) => ({
      id: message._id ?? message.id,
      name: message.name,
      email: message.email,
      phone: message.phone ?? '',
      message: message.message,
      createdAt: message.createdAt,
    }))
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
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(),
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
    const response = await fetch(`${API_BASE_URL}/visits`, {
      headers: getAdminHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch visits')
    }
    
    const visits = await response.json()
    return visits.map((visit: any) => ({
      id: visit.id ?? visit._id,
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


