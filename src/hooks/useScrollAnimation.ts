import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optionally disconnect after first animation to prevent re-animation
          // observer.disconnect()
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, isVisible }
}

