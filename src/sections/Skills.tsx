import { useState } from 'react'
import {
  frontendSkills,
  backendSkills,
  languageDbSkills,
} from '../data/skills'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCardScrollAnimation } from '../hooks/useCardScrollAnimation'

type SkillItem = {
  id: string
  name: string
  iconUrl: string
  hoverColor?: string
}

function SkillGroup({
  title,
  items,
}: {
  title: string
  items: SkillItem[]
}) {
  const { ref, isVisible } = useCardScrollAnimation<HTMLDivElement>()
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div
      ref={ref}
      className={`${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-7 text-center">
        {title}
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {items.map((skill) => {
          const active = activeId === skill.id
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => {
                setActiveId(skill.id)
                setTimeout(() => setActiveId(null), 200)
              }}
              className={`group flex flex-col items-center rounded-xl border-2 bg-white/95 backdrop-blur-sm p-4 text-xs font-semibold text-slate-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 ${
                active ? 'scale-95 shadow-xl' : 'border-slate-200/80 dark:border-slate-700/80'
              }`}
              style={{
                borderColor: active && skill.hoverColor ? skill.hoverColor : undefined,
                ...(skill.hoverColor ? {
                  '--hover-border-color': skill.hoverColor,
                } as React.CSSProperties & { '--hover-border-color': string } : {}),
              }}
              onMouseEnter={(e) => {
                if (skill.hoverColor) {
                  e.currentTarget.style.borderColor = skill.hoverColor
                  e.currentTarget.style.boxShadow = `0 0 20px ${skill.hoverColor}40, 0 0 40px ${skill.hoverColor}30`
                  e.currentTarget.style.transition = 'border-color 0.5s ease-out, box-shadow 0.5s ease-out'
                }
              }}
              onMouseLeave={(e) => {
                if (!active && skill.hoverColor) {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.transition = 'border-color 2.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-visible transition-transform duration-300 group-hover:scale-110">
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="h-12 w-12 object-contain transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs font-semibold text-slate-500">${skill.name}</span>`
                    }
                  }}
                />
              </div>
              <span className="mt-3 text-sm">{skill.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SkillsHeader() {
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
        Skills
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Tech stack I work with
      </h2>
      <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        I&apos;m comfortable across the full stack — from HTML/CSS and modern
        React frontends to Node.js backends and databases.
      </p>
    </div>
  )
}

export function Skills() {
  return (
    <div className="space-y-10">
      <SkillsHeader />

      <div className="space-y-10">
        <SkillGroup title="Frontend" items={frontendSkills} />
        <SkillGroup title="Backend" items={backendSkills} />
        <SkillGroup title="Languages & Databases" items={languageDbSkills} />
      </div>
    </div>
  )
}


