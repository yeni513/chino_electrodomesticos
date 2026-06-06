import ContainerScroll from '../ui/ContainerScroll.jsx'

export default function Showcase() {
  return (
    <section className="bg-white overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Calidad que puedes ver
            </p>
            <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
              Equipos revisados, listos para tu casa
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg text-slate-600 leading-relaxed">
              Cada electrodoméstico pasa una revisión de encendido y estética antes de
              salir. Lo que ves es lo que entregamos — sin sorpresas.
            </p>
          </>
        }
      >
        <img
          src="/showcase/lineup.webp"
          alt="Refrigerador, lavadora, secadora y estufa revisados en Trusted Appliances Cleveland"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="mx-auto h-full w-full object-cover object-center"
        />
      </ContainerScroll>
    </section>
  )
}
