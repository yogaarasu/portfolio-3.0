import * as React from 'react'
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa'
import { 
  SiTypescript, 
  SiMongodb, 
  SiJavascript,
  SiExpress,
  SiGit,
} from 'react-icons/si'

const profileUrl = '/images/profile.jpeg' // Profile image in public folder

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Software Engineer',
  'Full Stack Developer',
]

export function Hero() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0)
  const [displayText, setDisplayText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText.length < currentRole.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
      }, 100)
    } else if (!isDeleting && displayText.length === currentRole.length) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
      }, 50)
    } else if (isDeleting && displayText.length === 0) {
      // Finished deleting, move to next role
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRoleIndex])

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
      <div className="space-y-8 animate-fade-in-up relative">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Hello
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white leading-tight">
          I&apos;m{' '}
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Yogaarasu
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-500 bg-clip-text text-transparent inline-block leading-normal">
            {displayText}
            <span className="animate-blink border-r-2 border-orange-500 ml-1">|</span>
          </span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          I build modern, responsive web applications with clean architecture,
          smooth animations, and delightful user experiences across devices.
          I love turning complex ideas into elegant, scalable solutions.
        </p>

        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-slate-200/80 bg-white/90 backdrop-blur-sm p-5 shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-slate-700/80 dark:bg-slate-900/90">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
              Last Degree
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              B.Sc Computer Science
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Government Arts College, Coimbatore
            </p>
          </div>
          <div className="rounded-2xl border-2 border-slate-200/80 bg-white/90 backdrop-blur-sm p-5 shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-slate-700/80 dark:bg-slate-900/90">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
              Contact
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
              Phone:{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                +91-8248586511
              </span>
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Email:{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-50">
                yogaarasu465@gmail.com
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-orange-600 hover:to-accent-600 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 animate-float-horizontal"
          >
            Download Resume
          </a>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Available for internships, full‑time roles & freelance projects.
          </p>
        </div>
      </div>

      <div className="order-first md:order-last">
        {/* Outer container with padding to accommodate floating icons */}
        <div className="relative mx-auto px-8 sm:px-12 md:px-0">
          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500 via-primary-500 to-accent-500 opacity-60 blur-3xl animate-pulse-glow" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border-2 border-slate-200/80 bg-slate-50 shadow-2xl dark:border-slate-700/80 dark:bg-slate-900/90 backdrop-blur-sm z-10">
              <img
                src={profileUrl}
                alt="Yogaarasu profile"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-full w-full text-slate-500">Profile Image</div>'
                  }
                }}
              />
            </div>

            {/* Floating icons with real colors, different sizes, gaps from profile, and smooth slow animation - hidden when scrolled or menu is open - responsive positioning */}
            <FaReact size={56} className={`floating-icon pointer-events-none absolute -left-8 -top-4 sm:-left-16 sm:-top-6 text-[#61DAFB] drop-shadow-2xl animate-float-smooth-slow z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} style={{ animationDelay: '0s', filter: 'drop-shadow(0 0 15px rgba(97, 218, 251, 0.6))' }} />
            <FaNodeJs size={40} className={`floating-icon pointer-events-none absolute left-10 top-36 sm:left-12 sm:top-40 text-[#339933] drop-shadow-2xl animate-float-smooth-slow z-0 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-90'}`} style={{ animationDelay: '0.8s', filter: 'drop-shadow(0 0 10px rgba(51, 153, 51, 0.5))' }} />
            <FaHtml5 size={44} className={`floating-icon pointer-events-none absolute -right-8 bottom-20 sm:-right-14 sm:bottom-24 text-[#E34F26] drop-shadow-2xl animate-float-smooth-slow z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} style={{ animationDelay: '1.6s', filter: 'drop-shadow(0 0 12px rgba(227, 79, 38, 0.5))' }} />
            <FaCss3Alt size={36} className={`floating-icon pointer-events-none absolute right-8 bottom-8 sm:right-10 sm:bottom-10 text-[#1572B6] drop-shadow-2xl animate-float-smooth-slow z-0 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-90'}`} style={{ animationDelay: '2.4s', filter: 'drop-shadow(0 0 8px rgba(21, 114, 182, 0.4))' }} />
            <SiTypescript size={42} className={`floating-icon pointer-events-none absolute -right-8 top-12 sm:-right-12 sm:top-14 text-[#3178C6] drop-shadow-2xl animate-float-smooth-slow z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} style={{ animationDelay: '1.2s', filter: 'drop-shadow(0 0 10px rgba(49, 120, 198, 0.5))' }} />
            <SiMongodb size={38} className={`floating-icon pointer-events-none absolute -left-4 bottom-0 sm:-left-12 sm:-bottom-6 text-[#47A248] drop-shadow-2xl animate-float-smooth-slow z-0 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-90'}`} style={{ animationDelay: '2.0s', filter: 'drop-shadow(0 0 8px rgba(71, 162, 72, 0.4))' }} />
            <SiJavascript size={40} className={`floating-icon pointer-events-none absolute -left-8 top-[45%] -translate-y-1/2 sm:-left-16 sm:top-1/2 text-[#F7DF1E] drop-shadow-2xl animate-float-smooth-slow z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} style={{ animationDelay: '0.4s', filter: 'drop-shadow(0 0 10px rgba(247, 223, 30, 0.6))' }} />
            <SiExpress size={36} className={`floating-icon pointer-events-none absolute left-1/2 -translate-x-1/2 -top-10 sm:-top-14 text-white drop-shadow-2xl animate-float-smooth-slow z-30 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} style={{ animationDelay: '3.2s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }} />
            <SiGit size={40} className={`floating-icon pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-10 sm:-bottom-14 text-[#F05032] drop-shadow-2xl animate-float-smooth-slow z-0 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-90'}`} style={{ animationDelay: '3.6s', filter: 'drop-shadow(0 0 10px rgba(240, 80, 50, 0.5))' }} />
          </div>
        </div>
      </div>
    </div>
  )
}


