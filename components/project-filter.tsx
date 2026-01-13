"use client"

import { Button } from "@/components/ui/button"

interface ProjectFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  const filters = [
    { value: "all", label: "Tous" },
    { value: "photography", label: "Photographie" },
    { value: "illustration", label: "Illustration" },
    { value: "graphic_design", label: "Design Graphique" },
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            activeFilter === filter.value
              ? "bg-blue-300 text-white shadow-md hover:bg-blue-400"
              : "bg-white text-slate-700 border-slate-300 hover:border-blue-300 hover:text-[#A8D0FC]"
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
