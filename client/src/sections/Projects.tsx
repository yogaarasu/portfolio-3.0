import { useMemo, useState, useEffect, startTransition } from 'react'
import { projects } from '../data/projects'
import type { ProjectLevel } from '../types'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCardScrollAnimation } from '../hooks/useCardScrollAnimation'

const filters: (ProjectLevel | 'All')[] = ['All', 'Advanced', 'Intermediate', 'Basic']

function ProjectsHeader() {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`text-center ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
        Projects
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Selected work
      </h2>
      <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        A mix of advanced, intermediate, and foundational projects that
        highlight my skills across the stack.
      </p>
    </div>
  )
}

function FilterButtons({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: (typeof filters)[number]
  onFilterChange: (filter: (typeof filters)[number]) => void
}) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-3 justify-center ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        transitionDelay: '0.1s',
      }}
    >
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onFilterChange(f)}
          className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all duration-200 ${
            activeFilter === f
              ? 'border-primary-600 bg-gradient-to-r from-orange-500 to-accent-500 text-white shadow-lg hover:shadow-xl'
              : 'border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:border-primary-300 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-950/50'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.level === activeFilter)
  }, [activeFilter])

  // Reset page when filter changes
  useEffect(() => {
    startTransition(() => {
      setPage(0)
    })
  }, [activeFilter])

  const pageSize = 3
  const start = page * pageSize
  const current = filtered.slice(start, start + pageSize)
  const hasMore = start + pageSize < filtered.length

  return (
    <div className="space-y-10">
      <ProjectsHeader />
      <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {current.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No projects in this category yet. Please choose a different filter.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {current.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-slate-700 shadow-md transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-950/50"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const { ref, isVisible } = useCardScrollAnimation<HTMLElement>()
  return (
    <article
      ref={ref}
      className={`group flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900/95 ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
              <div className="relative h-48 overflow-hidden bg-slate-900/80">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-orange-500 to-accent-500 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  {project.level}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-950/50 animate-float-horizontal"
                    style={{ animationDelay: '0s' }}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-accent-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:from-orange-600 hover:to-accent-600 animate-float-horizontal"
                    style={{ animationDelay: '0.5s' }}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
  )
}


