"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string | null
  category: string
  image_url: string 
  project_url: string | null
  featured: boolean
  order_index: number
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true })

        if (error) throw error
        
        setProjects(data || [])
        setFilteredProjects(data || [])
      } catch (error) {
        console.error("Erreur de chargement:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase()))
    }
  }, [activeFilter, projects])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white/20">
      <Header />

      {/* Hero Section - Sombre avec Overlay */}
      <section className="relative flex items-center justify-center min-h-[95vh] overflow-hidden">
        <HeroCarousel />
        {/* Overlay pour assombrir le carousel et faire ressortir le texte */}
        <div className="absolute inset-0 bg-black/50 z-[5]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter italic">
            Cam <br />
            <span className="text-zinc-400 not-italic font-sans text-4xl md:text-6xl tracking-widest uppercase">Portfolio</span>
          </h1>
          <Button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-black hover:bg-zinc-200 px-10 py-7 text-lg rounded-full shadow-2xl transition-all transform hover:scale-105"
          >
            Explorer mes univers
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Section Work - Dégradé Noir / Zinc */}
      <section id="work" className="py-32 bg-gradient-to-b from-black via-zinc-950 to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 italic">Mes Projets</h2>
              <div className="h-1 w-20 bg-white/20"></div>
            </div>
            <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-zinc-500 font-serif italic">Création de la galerie...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group">
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    imageUrl={project.image_url}
                    projectUrl={project.project_url}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section About - Gris très foncé */}
      <section id="about" className="py-32 bg-zinc-900 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-5xl font-bold text-white italic">À Propos</h2>
              <p className="text-zinc-400 text-xl leading-relaxed font-light italic">
                {`Moi, c'est Camille mais tout le monde m'appelle Cam.

                Je suis étudiante en master UX/UI, passionnée de photographie.

                J'ai eu une licence cinéma et audiovisuel et j'aime beaucoup tout ce qui touche à l'écriture et au dessin.`}
              </p>
              <div className="flex gap-4 pt-4 text-zinc-500 text-sm uppercase tracking-widest">
                <span>UX/UI</span> — <span>Photo</span> — <span>Cinéma</span>
              </div>
            </div>
      
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group">
              <img 
                src="https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9670.JPG" 
                alt="Portrait" 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact - Noir profond */}
      <section id="contact" className="py-32 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-white mb-4 italic">Contact</h2>
            <p className="text-zinc-500">Une idée, un projet ou juste pour discuter ?</p>
          </div>
          
          <form className="space-y-6 bg-zinc-900/50 p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Label className="text-zinc-300 ml-1">Nom</Label>
                <Input placeholder="Votre nom" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 transition-all py-6 rounded-xl" />
              </div>
              <div className="grid gap-3">
                <Label className="text-zinc-300 ml-1">Email</Label>
                <Input type="email" placeholder="votre@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 transition-all py-6 rounded-xl" />
              </div>
            </div>
            <div className="grid gap-3">
              <Label className="text-zinc-300 ml-1">Message</Label>
              <Textarea placeholder="Votre message..." rows={5} className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 transition-all rounded-xl" />
            </div>
            <Button className="w-full bg-white hover:bg-zinc-200 text-black py-7 text-lg font-bold rounded-2xl transition-all shadow-xl">
              Envoyer le message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}