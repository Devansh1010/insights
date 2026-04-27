"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScroll = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 h-0.5 bg-primary z-60 transition-all duration-150 ease-out"
      style={{ width: `${completion}%` }}
    />
  )
}