"use client"

import { useEffect, useState } from "react"

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    "meduse.jpg.JPG",
    "citrouille.JPG",
    "lum.jpg.JPG",
    "nuit.JPG",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-30" : "opacity-0"
          }`}
        >
          <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Gradient overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/50 to-slate-900/60" />
    </div>
  )
}
