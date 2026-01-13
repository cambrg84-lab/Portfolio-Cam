"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trash2, Plus, LogOut, Image as ImageIcon, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/admin/login")
      } else {
        fetchProjects()
      }
    }
    checkUser()
  }, [router, supabase])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return alert("Le titre et l'image sont obligatoires.")

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('cam')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('cam')
        .getPublicUrl(fileName)

      const { error: insertError } = await supabase
        .from('projects')
        .insert([{ 
          title, 
          category, 
          description, 
          image_url: publicUrl,
          order_index: 0 
        }])

      if (insertError) throw insertError

      setTitle("")
      setCategory("")
      setDescription("")
      setFile(null)
      fetchProjects()
      alert("Projet ajouté avec succès !")
      
    } catch (err: any) {
      alert("Erreur: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function deleteProject(id: string) {
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      const { error } = await supabase.from("projects").delete().eq("id", id)
      if (error) {
        alert("Erreur lors de la suppression : " + error.message)
      } else {
        fetchProjects()
      }
    }
  }

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white/20" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-20 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-6">
          <div>
            <h1 className="font-serif text-5xl font-bold italic tracking-tighter text-white">Studio Admin.</h1>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mt-2 ml-1">Gestion du contenu</p>
          </div>
          <Button 
            onClick={async () => {
              await supabase.auth.signOut()
              router.push("/")
            }}
            variant="ghost" 
            className="rounded-full border border-white/10 hover:bg-white hover:text-black transition-all px-8 py-6"
          >
            <LogOut className="mr-2 h-4 w-4" /> Quitter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <form onSubmit={handleAddProject} className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl space-y-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl italic">Nouveau Projet</h2>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-zinc-500 text-xs uppercase tracking-widest ml-1">Titre</Label>
                    <Input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      className="bg-white/5 border-white/10 rounded-2xl h-14 focus:border-white/30 transition-all text-white" 
                      placeholder="Nom de l'œuvre" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-500 text-xs uppercase tracking-widest ml-1">Catégorie</Label>
                    <Input 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      className="bg-white/5 border-white/10 rounded-2xl h-14 focus:border-white/30 transition-all text-white" 
                      placeholder="Photographie, UX/UI..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-500 text-xs uppercase tracking-widest ml-1">Description</Label>
                    <Textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      className="bg-white/5 border-white/10 rounded-2xl min-h-[120px] resize-none focus:border-white/30 transition-all text-white" 
                      placeholder="Détails du projet..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-500 text-xs uppercase tracking-widest ml-1">Visuel</Label>
                    <div className="relative group">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)} 
                        className="cursor-pointer bg-white/5 border-white/10 file:hidden text-transparent h-14 rounded-2xl w-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-400 group-hover:text-white transition-colors">
                        <ImageIcon className="mr-2 h-4 w-4" /> 
                        <span className="text-sm truncate px-4">{file ? file.name : "Sélectionner un fichier"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  disabled={uploading} 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 py-8 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95"
                >
                  {uploading ? "Publication en cours..." : "Publier sur le portfolio"}
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl italic mb-10 text-white/40 uppercase tracking-tighter">Projets Actuels ({projects.length})</h2>
            
            <div className="grid gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group bg-zinc-900/20 border border-white/5 p-5 rounded-[2rem] flex items-center gap-6 hover:border-white/20 transition-all hover:bg-zinc-900/40"
                >
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-800 border border-white/5">
                    <img src={project.image_url} alt="" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl text-white group-hover:translate-x-1 transition-transform">{project.title}</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{project.category}</p>
                  </div>

                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="h-12 w-12 flex items-center justify-center rounded-full text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {projects.length === 0 && !loading && (
                <div className="text-center py-32 border border-dashed border-white/5 rounded-[2.5rem] text-zinc-700 italic font-serif text-xl">
                  Le portfolio est vide pour le moment.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}