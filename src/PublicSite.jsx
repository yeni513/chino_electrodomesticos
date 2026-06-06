import { lazy, Suspense } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp.jsx'
import Hero from './components/sections/Hero.jsx'
import Categorias from './components/sections/Categorias.jsx'
import PorQueNosotros from './components/sections/PorQueNosotros.jsx'
import ComoTrabajamos from './components/sections/ComoTrabajamos.jsx'
import Marcas from './components/sections/Marcas.jsx'
import Showcase from './components/sections/Showcase.jsx'
import CatalogoBand from './components/sections/CatalogoBand.jsx'
import Location from './components/sections/Location.jsx'
import Testimonios from './components/sections/Testimonios.jsx'
import FAQ from './components/sections/FAQ.jsx'
import CTAFinal from './components/sections/CTAFinal.jsx'

// Destacados y Galería arrastran @supabase/supabase-js (leen inventario del
// admin) — lazy-load para sacar Supabase del bundle inicial.
const Destacados = lazy(() => import('./components/sections/Destacados.jsx'))
const Galeria = lazy(() => import('./components/sections/Galeria.jsx'))

function GaleriaFallback() {
  return (
    <section id="galeria" className="section-y bg-white">
      <div className="mx-auto w-full max-w-container px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="h-8 w-40 mx-auto rounded bg-slate-200/70 animate-pulse" />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="aspect-square rounded-card bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}

function DestacadosFallback() {
  return (
    <section id="destacados" className="section-y bg-brand-cream/60">
      <div className="mx-auto w-full max-w-container px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="h-8 w-40 rounded bg-slate-200/70 animate-pulse" />
        <div className="mt-4 h-12 w-2/3 max-w-xl rounded bg-slate-200/70 animate-pulse" />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-card bg-white ring-1 ring-slate-200 overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-slate-200 rounded animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PublicSite() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-brand-accent"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Marcas />
        <Categorias />
        <Suspense fallback={<DestacadosFallback />}>
          <Destacados />
        </Suspense>
        <Showcase />
        <Suspense fallback={<GaleriaFallback />}>
          <Galeria />
        </Suspense>
        <CatalogoBand />
        <ComoTrabajamos />
        <PorQueNosotros />
        <Location />
        <Testimonios />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
