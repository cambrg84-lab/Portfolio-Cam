"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// 1. DESCRIPTIONS POUR LES PROJETS HORS PHOTOS
const PROJECT_DESCRIPTIONS: Record<string, string> = {
  "cef9f18c-b077-4656-b38c-580064bc1640": "Série de logos (Basil, Aura et Trucks), tentatives et choix finaux pour des connaissances et des projets personnels.",
  "0de63b68-9385-427f-9fa3-e7596bb08408": "Diorama 3D effectué sur Blender, inspiré d'une théière et d'une ambiance féérique.",
  "04d2ef89-112a-4543-801e-6ba37679d3ac": "Création numérique d'une affiche de théâtre et d'une affiche de scénario sur le logiciel Procreate.",
  "20e91508-c9cc-475c-9db7-d8e01cd81d9d": "Travail de création visuelle pour l'univers du jeu, incluant décors et assets.",
  "297a998e-2000-4758-bf84-481f2e40ec26": "Character design d'une série (projet personnel intitulé : Rosier), effectué sur Procreate.",
  "a3ceac29-1356-4bb9-b80a-cb185c517e53": "Animation et motion design : Je décrocherai la Lune pour toi, inspirée de l'Etrange Noël de monsieur Jack."
}

// 2. TOUTES TES PHOTOS
const PROJECT_GALLERIES: Record<string, string[]> = {
  "5b549daa-d8bf-4b20-acf2-cfbac8d4da5a": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0136.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0576.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0730.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_2456.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1657.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0625.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6067.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_4832.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_8336.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9722.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_8391.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6541.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6273.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0908.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1082.JPG",
  ],
  "628a9726-752c-401a-a15e-01b7f6a99aa8": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0727.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0734.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0709.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_3287.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_3293.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_3344.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_0054.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_00601.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_00450.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6273.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6281.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_6745.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_2859.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_2907.JPG",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_2926.JPG",
  ],
  "b84fd3f4-74c2-4376-8c2d-e0acb323bb80": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9718%20(2).jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9716.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9715%20(1).jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9720.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9721.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9722.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_9713%20(1).jpeg",
  ],
  "cef9f18c-b077-4656-b38c-580064bc1640": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1433.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1431%20(2).jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1429.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1422.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1421.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1420.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1448.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1446.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1447.jpeg",
  ],
  "0de63b68-9385-427f-9fa3-e7596bb08408": ["https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/untitled.png"],
  "04d2ef89-112a-4543-801e-6ba37679d3ac": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1435.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1426.jpeg"
  ],
  "297a998e-2000-4758-bf84-481f2e40ec26": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1438.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1439.jpeg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1436.jpeg",
  ],
  "a3ceac29-1356-4bb9-b80a-cb185c517e53": ["https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/IMG_1449.gif"],
  "20e91508-c9cc-475c-9db7-d8e01cd81d9d": [
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/jeu1%20(2).jpg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/jeu1%20(3).jpg",
    "https://isbblputfyiydxyznugf.supabase.co/storage/v1/object/public/cam/jeu1%20(1).jpg",
  ],
}

// 3. SEULS CES IDs DÉFILENT (MODE SHOOTING)
const SCROLL_PROJECTS = [
  "5b549daa-d8bf-4b20-acf2-cfbac8d4da5a",
  "628a9726-752c-401a-a15e-01b7f6a99aa8",
  "b84fd3f4-74c2-4376-8c2d-e0acb323bb80"
];

function ProjectGalleryContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || ""
  const photos = PROJECT_GALLERIES[id] || []
  const description = PROJECT_DESCRIPTIONS[id] || "Détails et processus créatif de ce projet."
  const shouldScroll = SCROLL_PROJECTS.includes(id)

  return (
    <main className="flex-grow flex flex-col py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()} 
          className="mb-8 bg-white/10 text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </div>

      {shouldScroll ? (
        /* --- MODE DÉFILANT (SHOOTING) --- */
        <div className="overflow-hidden">
          <div className="container mx-auto px-4 mb-16 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white italic tracking-tight uppercase">Projets</h1>
          </div>
          <div className="relative flex items-center h-[600px] w-full">
            <motion.div 
              className="flex gap-8 px-4"
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ ease: "linear", duration: photos.length * 6, repeat: Infinity }}
              whileHover={{ animationPlayState: "paused" }} 
            >
              {[...photos, ...photos].map((url, index) => (
                <div key={index} className="relative flex-shrink-0 w-[300px] md:w-[450px] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-zinc-800">
                  <img src={url} alt="Visuel" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="container mx-auto px-4 mt-12">
            <p className="text-white/20 font-serif italic uppercase tracking-[0.3em] text-xs">Passez la souris pour figer l'image</p>
          </div>
        </div>
      ) : (
        /* --- MODE ÉTUDE DE CAS (COULEUR / ILLUSTRATION) --- */
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight uppercase">Projets</h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-white/40 to-transparent"></div>
              <p className="text-zinc-400 text-xl leading-relaxed font-light italic">
                {description}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-20">
              {photos.map((url, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  key={index} 
                  className="group relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] bg-zinc-900 border border-white/5"
                >
                  <img src={url} alt={`Détail ${index}`} className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.02]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function DetailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white selection:bg-white/20">
      <Header />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center font-serif italic text-white/40">Chargement de la galerie...</div>}>
        <ProjectGalleryContent />
      </Suspense>
      <Footer />
    </div>
  )
}