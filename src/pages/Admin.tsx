import { useState, useEffect, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../contexts/AdminContext'
import { getMessages, getVisits, deleteMessage, deduplicateVisits } from '../utils/storage'
import type { Message, Visit } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'

export function Admin() {
  const { isAuthenticated, login, logout } = useAdmin()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [visits, setVisits] = useState<Visit[]>([])

  // Load data when authenticated status changes
  useEffect(() => {
    if (isAuthenticated) {
      // Load data from API when authenticated
      const loadData = async () => {
        try {
          const [currentMessages, currentVisits] = await Promise.all([
            getMessages(),
            getVisits()
          ])
          startTransition(() => {
            setMessages(currentMessages)
            setVisits(currentVisits)
          })
        } catch (error) {
          console.error('Error loading admin data:', error)
        }
      }
      loadData()
    }
  }, [isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = login(password)
    if (!ok) {
      setError('Incorrect password. Please try again.')
    } else {
      setError(null)
      setPassword('')
      // Load data after successful login
      try {
        const [currentMessages, currentVisits] = await Promise.all([
          getMessages(),
          getVisits()
        ])
        setMessages(currentMessages)
        setVisits(currentVisits)
      } catch (error) {
        console.error('Error loading admin data:', error)
      }
      navigate('/admin')
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-24 dark:bg-slate-950">
              <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-accent-500 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              This area is password‑protected. Only you should have access.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full"
                />
              </div>
              {error && (
                <div className="rounded-xl bg-red-50 border-2 border-red-200 p-3 dark:bg-red-950/30 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </p>
                </div>
              )}
              <Button type="submit" className="w-full" size="md">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    )
  }

  // Deduplicate visits by timestamp first, then sort
  const deduplicatedVisits = deduplicateVisits(visits)
  const visitsSorted = deduplicatedVisits.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  // Group visits by date for better display (only show unique times)
  const visitsByDate = visitsSorted.reduce((acc, visit) => {
    const date = new Date(visit.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(visit)
    return acc
  }, {} as Record<string, Visit[]>)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 pt-24 pb-8 sm:pt-28 sm:px-6 md:px-8 lg:px-12 overflow-x-hidden">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8 w-full">
        <header className="flex flex-col gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl border-2 border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 via-primary-500 to-accent-500 bg-clip-text text-transparent mb-3">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              View contact messages and visitor analytics. Data is stored locally in your browser.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-full sm:w-auto border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-400 dark:hover:border-red-600 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Logout
          </Button>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] w-full">
          <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-2 border-slate-200/60 dark:border-slate-700/60 shadow-xl p-5 sm:p-6 md:p-8 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">Messages</CardTitle>
              <span className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-accent-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                {messages.length} total
              </span>
            </div>
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No messages yet. When someone submits the contact form, it will appear here.
                </p>
              </div>
            ) : (
              <ul className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 overflow-x-hidden">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-xl border-2 border-slate-200/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-50 mb-1 break-words">
                          {m.name}
                        </p>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 hover:underline dark:text-primary-400 font-medium break-all"
                        >
                          {m.email}
                        </a>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap self-start sm:self-auto">
                        {new Date(m.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3 sm:mb-4 break-words">
                      {m.message}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <a
                          href={`mailto:${m.email}?subject=Re:%20Your%20message&body=Hi%20${encodeURIComponent(
                            m.name,
                          )},%0D%0A%0D%0A`}
                        >
                          Reply
                        </a>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        onClick={async () => {
                          try {
                            await deleteMessage(m.id)
                            setMessages((prev) =>
                              prev.filter((msg) => msg.id !== m.id),
                            )
                          } catch (error) {
                            console.error('Error deleting message:', error)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <section className="space-y-6 w-full">
            <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-2 border-slate-200/60 dark:border-slate-700/60 shadow-xl p-5 sm:p-6 md:p-8 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">Visitor Analytics</CardTitle>
                  <span className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-accent-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    {visitsSorted.length} visits
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {visitsSorted.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      No visits recorded yet. Opening the site will automatically record visits in local storage.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-[350px] sm:max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2 overflow-x-hidden w-full">
                    {Object.entries(visitsByDate).map(([date, dateVisits]) => (
                      <div key={date} className="space-y-2">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-50 sticky top-0 bg-white dark:bg-slate-950 py-2 border-b-2 border-slate-200 dark:border-slate-800">
                          {date}
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 ml-2">
                          {dateVisits.map((v) => {
                            const dt = new Date(v.timestamp)
                            return (
                              <div
                                key={v.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 rounded-lg bg-slate-50/80 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-slate-100/80 dark:bg-slate-900/80 dark:border-slate-700 dark:hover:bg-slate-800/80 transition-colors"
                              >
                                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                                  {dt.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                  })}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Visit #{visitsSorted.findIndex(visit => visit.id === v.id) + 1}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}


