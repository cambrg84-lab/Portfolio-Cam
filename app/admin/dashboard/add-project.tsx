"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return alert("Le titre et l'image sont requis")

    setLoading(true)
    try {
      // 1. Upload de l'image
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('cam') // Nom de ton bucket
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Récupérer l'URL publique de l'image
      const { data: { publicUrl } } = supabase.storage
        .from('cam')
        .getPublicUrl(filePath)

      // 3. Insérer les données dans la table "projects"
      const { error: insertError } = await supabase
        .from('projects')
        .insert([
          {
            title,
            category,
            description,
            image_url: publicUrl,
            order_index: 0 // Tu pourras gérer l'ordre plus tard
          }
        ])

      if (insertError) throw insertError

      // Réinitialiser le formulaire
      setTitle("")
      setCategory("")
      setDescription("")
      setFile(null)
      alert("Projet ajouté avec succès !")
      onProjectAdded() // Rafraîchit la liste des projets

    } catch (error: any) {
      alert("Erreur : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/10 space-y-6 mb-16 shadow-2xl">
      <h2 className="font-serif text-2xl italic text-white mb-4">Nouveau Projet</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-zinc-400">Titre du projet</Label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ex: Shooting Mode" 
            className="bg-white/5 border-white/10 text-white rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-zinc-400">Catégorie</Label>
          <Input 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Ex: Photographie" 
            className="bg-white/5 border-white/10 text-white rounded-xl h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-400">Description</Label>
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Détails du projet..." 
          className="bg-white/5 border-white/10 text-white rounded-xl resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-400">Image principale</Label>
        <Input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          className="bg-white/5 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:rounded-lg file:mr-4 file:px-4 cursor-pointer"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-white text-black hover:bg-zinc-200 py-7 rounded-2xl font-bold uppercase tracking-widest transition-all"
      >
        {loading ? "Envoi en cours..." : "Publier le projet"}
      </Button>
    </form>
  )
}