import { useEffect, useRef, useState } from 'react'

export function useCardScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isVisible }
}

