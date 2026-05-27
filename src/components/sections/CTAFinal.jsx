import { MessageCircle, Phone, CheckCircle2, ArrowRight, Camera, Tag } from 'lucide-react'
import Container from '../layout/Container.jsx'
import { ctaFinal, business } from '../../data/content.js'
import { whatsappUrl, telUrl, hasPhone } from '../../lib/whatsapp.js'

export default function CTAFinal() {
  const phoneActive = hasPhone()

  return (
    <section id="whatsapp" className="section-y bg-white">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-brand-ink text-white px-6 py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 xl:px-24 xl:py-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 25%, rgba(201,162,39,0.4), transparent 50%), radial-gradient(circle at 85% 80%, rgba(16,185,129,0.22), transparent 50%)',
            }}
          />
          <div
            aria-hidden
            className="absolute -right-12 -top-12 w-72 h-72 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="absolute -right-24 -bottom-24 w-[420px] h-[420px] rounded-full border border-white/5"
          />

          <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
                {ctaFinal.eyebrow}
              </p>
              <h2 className="heading-cta mt-3 font-display font-semibold text-white">
                {ctaFinal.headline}
              </h2>
              <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                {ctaFinal.subhead}
              </p>

              <ul className="mt-8 space-y-2.5">
                {ctaFinal.reassurance.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm md:text-base text-slate-200"
                  >
                    <CheckCircle2
                      className="w-4 h-4 md:w-5 md:h-5 text-brand-accent shrink-0"
                      strokeWidth={2.25}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Botón principal — el más importante de la página */}
                <a
                  href={whatsappUrl(
                    'Hola, busco un electrodoméstico (lavadora / secadora / estufa / refrigerador). ¿Pueden mostrarme las opciones disponibles?'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-base md:text-lg font-semibold shadow-lift transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-lg ring-2 ring-emerald-400/40 animate-pulse"
                  />
                  <MessageCircle className="relative w-5 h-5 md:w-6 md:h-6" strokeWidth={2.25} />
                  <span className="relative">{ctaFinal.primaryCta.label}</span>
                  <ArrowRight className="relative w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                {phoneActive && (
                  <a
                    href={telUrl()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-sm font-medium border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 min-h-[44px]"
                  >
                    <Phone className="w-4 h-4" />
                    {ctaFinal.secondaryCta.label}
                  </a>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-300 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {ctaFinal.reassuranceUnderCta}
              </p>
            </div>

            {/* Simulación de chat */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto lg:ml-auto lg:mr-0">
                <div className="bg-white/[0.06] backdrop-blur-md rounded-card ring-1 ring-white/15 p-6 shadow-lift">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <MessageCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{business.name}</p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        En línea
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="bg-white/[0.08] rounded-lg rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Hola, busco una lavadora de 9 kg. ¿Tienen fotos y precio?
                      </p>
                    </div>
                    <div className="bg-emerald-500/90 text-white rounded-lg rounded-tr-sm px-3.5 py-2.5 max-w-[85%] ml-auto">
                      <p className="text-xs leading-relaxed font-medium">
                        ¡Hola! Te paso varias opciones según inventario con foto y precio.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-w-[85%] ml-auto justify-end">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-200">
                        <Camera className="w-3 h-3" /> Fotos reales
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-200">
                        <Tag className="w-3 h-3" /> Precio final
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center pt-1">
                      Respuestas reales, no automáticas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
