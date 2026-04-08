import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ADMIN_TOKEN_STORAGE_KEY, API_BASE_URL } from '../config/auth'

type LoginResult = {
  ok: boolean
  error?: string
}

type AdminContextValue = {
  isAuthenticated: boolean
  isCheckingAuth: boolean
  login: (password: string) => Promise<LoginResult>
  logout: () => void
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const verifyStoredToken = async () => {
      if (typeof window === 'undefined') return

      const storedToken = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
      if (!storedToken) {
        setIsAuthenticated(false)
        setIsCheckingAuth(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/admin/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })

        if (!response.ok) {
          window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
          setIsAuthenticated(false)
          setIsCheckingAuth(false)
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error verifying admin session:', error)
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
        setIsAuthenticated(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    verifyStoredToken()
  }, [])

  const login = async (password: string): Promise<LoginResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        return {
          ok: false,
          error: payload?.error || 'Incorrect password. Please try again.',
        }
      }

      const payload = await response.json()
      if (!payload?.token) {
        return {
          ok: false,
          error: 'Invalid login response from server.',
        }
      }

      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, payload.token)
      setIsAuthenticated(true)
      return { ok: true }
    } catch (error) {
      console.error('Admin login failed:', error)
      return {
        ok: false,
        error: 'Unable to reach backend server. Check API URL and backend status.',
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, isCheckingAuth, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider')
  return ctx
}


