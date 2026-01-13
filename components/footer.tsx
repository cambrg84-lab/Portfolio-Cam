import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Portfolio</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designer créatif spécialisé en photographie, illustration et design graphique.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/#work" className="text-sm text-slate-600 hover:text-[#A8D0FC] transition-colors">
                Projets
              </Link>
              <Link href="/#about" className="text-sm text-slate-600 hover:text-[#A8D0FC] transition-colors">
                À propos
              </Link>
              <Link href="/#contact" className="text-sm text-slate-600 hover:text-[#A8D0FC] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Réseaux sociaux</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/cam_era253/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-[#A8D0FC] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>s
              <a
                href="mailto:cam.brg84@gmail.com"
                className="text-slate-600 hover:text-[#A8D0FC] transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Portfolio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
