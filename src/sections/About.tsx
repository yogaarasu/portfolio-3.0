import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCardScrollAnimation } from '../hooks/useCardScrollAnimation'

const aboutCards = [
  {
    title: 'Professional Summary',
    content: (
      <p className="text-s leading-relaxed text-slate-700 dark:text-slate-300">
       Hello! I'm Yogaarasu, a passionate Computer Science student pursuing my B.Sc. at Government Arts College, Coimbatore.
        I specialize in building modern web applications and solving complex problems through code.
      </p>
    ),
  },
  {
    title: 'Education',
    content: (
      <>
        <p className="text-s font-semibold text-slate-800 dark:text-slate-100">
          B.Sc Computer Science
        </p>
        <p className="text-s font-semibold  text-orange-500 dark:text-orange-400">
         Government Arts College, Coimbatore
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 mb-3">
          2023 - 2026
        </p>
       
        <p className="text-s font-semibold  text-orange-500 dark:text-orange-400">
         Government Higher Secondary School
        </p>
        <p className="text-s font-semibold text-slate-800 dark:text-slate-100">
         Ariyalur
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 mb-3">
          2021 - 2023
        </p>
       
      </>
    ),
  },
  {
    title: 'Experience & Certifications',
    content: (
      <ul className="space-y-2 text-s text-slate-600 dark:text-slate-300 leading-relaxed">
        <li className="flex items-start">
          <span className="text-primary-600 dark:text-primary-400 mr-2 font-bold">•</span>
          <span>Built multiple full‑stack projects with React & Node.js.</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 dark:text-primary-400 mr-2 font-bold">•</span>
          <span>Completed online courses in React, TypeScript, and DSA.</span>
        </li>
        <li className="flex items-start">
          <span className="text-primary-600 dark:text-primary-400 mr-2 font-bold">•</span>
          <span>Contributed to open‑source and college tech communities.</span>
        </li>
      </ul>
    ),
  },
]

function AboutCard({ card }: { card: typeof aboutCards[0] }) {
  const { ref, isVisible } = useCardScrollAnimation<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`group rounded-2xl border-2 border-slate-200/80 bg-white/95 backdrop-blur-sm p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border-slate-700/80 dark:bg-slate-900/95 ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      <h3 className="text-base font-bold text-primary-600 dark:text-primary-400 mb-3">
        {card.title}
      </h3>
      {card.content}
    </div>
  )
}

function AboutCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {aboutCards.map((card) => (
        <AboutCard key={card.title} card={card} />
      ))}
    </div>
  )
}

function AboutHeader() {
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
        About
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        A bit about me
      </h2>
      <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        I&apos;m a full‑stack developer with a strong foundation in computer
        science and a passion for building high‑quality user interfaces and
        scalable backends. I enjoy working across the stack, from crafting
        pixel‑perfect UIs to designing clean APIs and data models.
      </p>
    </div>
  )
}

export function About() {
  return (
    <div className="space-y-10">
      <AboutHeader />
      <AboutCards />
    </div>
  )
}


