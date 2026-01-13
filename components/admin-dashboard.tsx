"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, LogOut, X } from "lucide-react"
import type { User } from "@supabase/supabase-js"

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

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "photography",
    image_url: "",
    project_url: "",
    featured: false,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const supabase = createClient()
    const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching projects:", error)
    } else {
      setProjects(data || [])
    }
    setIsLoading(false)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  function openForm(project?: Project) {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description || "",
        category: project.category,
        image_url: project.image_url,
        project_url: project.project_url || "",
        featured: project.featured,
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        category: "photography",
        image_url: "",
        project_url: "",
        featured: false,
      })
    }
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
            image_url: formData.image_url,
            project_url: formData.project_url || null,
            featured: formData.featured,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProject.id)

        if (error) throw error
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert({
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          image_url: formData.image_url,
          project_url: formData.project_url || null,
          featured: formData.featured,
          order_index: projects.length,
        })

        if (error) throw error
      }

      closeForm()
      fetchProjects()
    } catch (error) {
      console.error("[v0] Error saving project:", error)
      alert("Erreur lors de la sauvegarde du projet")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return

    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting project:", error)
      alert("Erreur lors de la suppression")
    } else {
      fetchProjects()
    }
  }

  const categoryLabels: Record<string, string> = {
    photography: "Photographie",
    illustration: "Illustration",
    graphic_design: "Design Graphique",
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="font-serif text-2xl font-bold text-slate-900">Tableau de bord Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Gestion des projets</h2>
            <p className="text-slate-600 mt-1">Créez, modifiez et supprimez vos projets portfolio</p>
          </div>
          <Button onClick={() => openForm()} className="bg-blue-300 hover:bg-blue-400 gap-2">
            <Plus className="h-4 w-4" />
            Nouveau projet
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-slate-600">Chargement...</p>
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600">Aucun projet. Créez-en un pour commencer.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 bg-slate-200 flex-shrink-0">
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-[#A8D0FC] uppercase tracking-wider">
                            {categoryLabels[project.category]}
                          </span>
                          {project.featured && (
                            <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              En vedette
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900">{project.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => openForm(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-slate-600 mb-2 leading-relaxed">{project.description}</p>
                    )}
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#A8D0FC] hover:underline"
                      >
                        {project.project_url}
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif text-2xl">
                    {editingProject ? "Modifier le projet" : "Nouveau projet"}
                  </CardTitle>
                  <CardDescription>Remplissez les informations du projet</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={closeForm}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nom du projet"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description du projet"
                    rows={4}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photography">Photographie</SelectItem>
                      <SelectItem value="illustration">Illustration</SelectItem>
                      <SelectItem value="graphic_design">Design Graphique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image_url">URL de l'image *</Label>
                  <Input
                    id="image_url"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="project_url">URL du projet</Label>
                  <Input
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://example.com/project"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-[#A8D0FC] focus:ring-[#A8D0FC]"
                  />
                  <Label htmlFor="featured" className="font-normal">
                    Mettre en vedette ce projet
                  </Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-300 hover:bg-blue-400">
                    {editingProject ? "Mettre à jour" : "Créer le projet"}
                  </Button>
                  <Button type="button" variant="outline" onClick={closeForm}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
