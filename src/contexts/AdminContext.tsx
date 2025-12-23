import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const ADMIN_STORAGE_KEY = 'portfolio-admin-authenticated'
const ADMIN_PASSWORD = 'Yogaarasu@2005'

type AdminContextValue = {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(ADMIN_STORAGE_KEY)
    setIsAuthenticated(stored === 'true')
  }, [])

  const login = (password: string) => {
    const ok = password === ADMIN_PASSWORD
    if (ok) {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
      setIsAuthenticated(true)
    }
    return ok
  }

  const logout = () => {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider')
  return ctx
}


