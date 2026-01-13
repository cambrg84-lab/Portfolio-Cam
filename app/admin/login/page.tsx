"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("Erreur : " + error.message)
    else router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-[2rem] border border-white/10 w-full max-w-md space-y-6">
        <h1 className="font-serif text-3xl text-white italic text-center">Connexion Admin</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10" />
        <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/5 border-white/10" />
        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6">Se connecter</Button>
      </form>
    </div>
  )
}