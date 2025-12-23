import { useState } from 'react'
import * as React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import { useAdmin } from '../contexts/AdminContext'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated } = useAdmin()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false })
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  // Toggle class on body when menu is open/closed
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800/60 shadow-sm animate-fade-down">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 via-primary-500 to-accent-500 shadow-lg flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
            Y
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight sm:text-base text-slate-900 dark:text-white transition-colors">
              Yogaarasu
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs font-medium">
              Full Stack Developer
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="relative rounded-lg px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                      `relative rounded-lg px-4 py-2 transition-all duration-200 font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-accent-500 text-white shadow-md'
                          : 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-slate-800/70'
                      }`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:border-primary-300 hover:scale-105 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:border-primary-600"
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ul className="flex flex-col gap-2 text-sm font-medium">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="flex w-full items-center rounded-xl px-5 py-3.5 text-slate-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-700 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-primary-300 transition-all duration-200 font-semibold hover:shadow-md hover:scale-[1.02]"
                  style={{
                    animationDelay: open ? `${index * 0.05}s` : '0s',
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex w-full items-center rounded-xl px-5 py-3.5 transition-all duration-200 font-semibold ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-accent-500 text-white shadow-lg'
                        : 'text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:shadow-md hover:scale-[1.02] dark:text-primary-400 dark:hover:bg-slate-800/80'
                    }`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}


