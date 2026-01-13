"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-900 hover:text-[#A8D0FC] transition-colors"
        >
          <Image
            src="/logo.png.png"
            alt="Logo"
            width={88}
            height={88}
            className="h-[88px] w-[88px] object-contain"
          />
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors">
            Accueil
          </Link>
          <Link href="/#work" className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors">
            Projets
          </Link>
          <Link href="/#about" className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors">
            À propos
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/#work"
              className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projets
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-slate-700 hover:text-[#A8D0FC] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
