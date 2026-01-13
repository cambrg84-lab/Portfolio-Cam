"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // C'EST CETTE LIGNE QUI MANQUE
import { useState } from "react"

interface ProjectCardProps {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string
  projectUrl: string | null
}

export function ProjectCard({ id, title, description, category, imageUrl, projectUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryLabels: Record<string, string> = {
    photography: "Photographie",
    illustration: "Illustration",
    graphic_design: "Design Graphique",
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        
        {/* Overlay sombre au survol */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Contenu qui apparaît au survol */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-xs font-medium text-[#A8D0FC] mb-2 uppercase tracking-wider">
            {categoryLabels[category]}
          </span>
          <h3 className="font-serif text-2xl font-bold text-white mb-2 text-balance">{title}</h3>
          {description && <p className="text-sm text-slate-200 line-clamp-2 leading-relaxed">{description}</p>}
          
          
          <Link href={`/projet-detail?id=${id}`}>
            <Button className="w-full bg-blue-500 text-white py-4">
            Voir plus
            </Button>
          </Link>
        </div>
      </div>

      {/* Texte sous l'image (visible tout le temps) */}
      <div className="p-4">
        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
          {categoryLabels[category]}
        </span>
        <h3 className="font-serif text-xl font-bold text-slate-900 mt-2">{title}</h3>
      </div>
    </div>
  )
}