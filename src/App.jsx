import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp.jsx'
import Hero from './components/sections/Hero.jsx'
import Categorias from './components/sections/Categorias.jsx'
import PorQueNosotros from './components/sections/PorQueNosotros.jsx'
import Destacados from './components/sections/Destacados.jsx'
import Marcas from './components/sections/Marcas.jsx'
import Testimonios from './components/sections/Testimonios.jsx'
import FAQ from './components/sections/FAQ.jsx'
import CTAFinal from './components/sections/CTAFinal.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categorias />
        <PorQueNosotros />
        <Destacados />
        <Marcas />
        <Testimonios />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
