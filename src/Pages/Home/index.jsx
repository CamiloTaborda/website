import { useState, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Reveal from "../../Animations/Reveal";
import SafeVisual from "../../Components/SafeVisual";

// Fuera del componente: un array literal inline creaba una referencia nueva en
// cada render y hacía que LiquidEther reconstruyera toda la escena WebGL.
const LIQUID_COLORS = ['#0071e3', '#2997ff', '#1d1d5f'];

const LiquidEther = lazy(() => import('../../Components/LiquidEther'));
const MyModel = lazy(() => import('../../Components/Viewer'));

const STACK = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js',
  'React Three Fiber', 'model-viewer', 'Tailwind CSS', 'GSAP',
  'Framer Motion', 'Supabase', 'REST APIs', 'Python', 'Git', 'Vercel',
];

const Home = () => {
  const t = useCustomTranslation();
  const [cvOpen, setCvOpen] = useState(false);
  const cvTimer = useRef(null);

  useSeo({
    title: t('seo_home_title'),
    description: t('seo_home_description'),
    path: '/',
  });

  // Pequeño retardo al salir para que el puntero pueda viajar del botón al
  // menú sin que se cierre debajo del cursor.
  const openCv = () => {
    clearTimeout(cvTimer.current);
    setCvOpen(true);
  };
  const closeCv = () => {
    cvTimer.current = setTimeout(() => setCvOpen(false), 160);
  };

  const stats = [1, 2, 3, 4].map((i) => ({
    value: t(`home_stat_${i}_value`),
    label: t(`home_stat_${i}_label`),
  }));

  const caps = [1, 2, 3].map((i) => ({
    title: t(`home_cap_${i}_title`),
    text: t(`home_cap_${i}_text`),
  }));

  return (
    <main className="bg-ink text-white">

      {/* ───────────────────────── HERO ───────────────────────── */}
      {/* Sin overflow-hidden en la sección: recortaba el menú de descarga del
          CV en pantallas de menos de ~700px de alto. La contención la hace
          el contenedor del efecto, que es lo único que puede desbordar. */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-ink" />

        <div className="absolute inset-0 overflow-hidden opacity-70">
          <SafeVisual>
            <Suspense fallback={null}>
              <LiquidEther
                colors={LIQUID_COLORS}
                mouseForce={22}
                cursorSize={130}
                resolution={0.45}
                autoDemo
                autoSpeed={0.38}
                autoIntensity={1.9}
                autoResumeDelay={2600}
              />
            </Suspense>
          </SafeVisual>
        </div>

        {/* Degradado inferior: funde el efecto con la sección siguiente */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl pointer-events-none">
          <p className="eyebrow animate-fade-up mb-7">
            {t('home_eyebrow')}
          </p>

          <h1 className="text-display-2xl text-gradient-light animate-fade-up delay-1">
            {t('home_title_1')}
            <br />
            {t('home_title_2')}
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-ink-200 animate-fade-up delay-2">
            {t('home_subtitle')}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-fade-up delay-3 pointer-events-auto">
            <Link to="/portfolio" className="btn-primary">
              {t('home_cta_primary')}
            </Link>

            <div className="relative" onMouseEnter={openCv} onMouseLeave={closeCv}>
              <button
                type="button"
                className="btn-ghost-light"
                aria-haspopup="true"
                aria-expanded={cvOpen}
                onClick={() => setCvOpen((v) => !v)}
              >
                {t('home_cta_secondary')}
                <svg className={`w-3.5 h-3.5 transition-transform duration-400 ease-smooth ${cvOpen ? 'rotate-180' : ''}`}
                     viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* z-40 explícito: sin él, la sección siguiente (que abre su
                  propio contexto de apilamiento) se dibujaba encima. */}
              {cvOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 z-40 overflow-hidden
                                rounded-2xl border border-white/10 bg-ink-800/95 backdrop-blur-xl
                                shadow-2xl animate-fade-in">
                  <a href="/CV/cv-camilo-taborda-es.pdf" download
                     onClick={() => setCvOpen(false)}
                     className="block px-5 py-3.5 text-[0.9375rem] text-ink-200 hover:bg-white/10 hover:text-white transition-colors">
                    {t('home_cv_es')}
                  </a>
                  <div className="h-px bg-white/10" />
                  <a href="/CV/cv-camilo-taborda.pdf" download
                     onClick={() => setCvOpen(false)}
                     className="block px-5 py-3.5 text-[0.9375rem] text-ink-200 hover:bg-white/10 hover:text-white transition-colors">
                    {t('home_cv_en')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <svg className="w-5 h-5 text-white/40 animate-scroll-hint" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12m0 0l-4.5-4.5M10 16l4.5-4.5" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ──────────────────────── MÉTRICAS ──────────────────────── */}
      <section className="relative border-t border-white/[0.08]">
        <div className="container-page py-20 sm:py-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="flex flex-col gap-3">
                  <span className="text-display-md text-white tabular-nums">{s.value}</span>
                  <span className="text-caption text-ink-400 max-w-[22ch] leading-relaxed">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── CAPACIDADES ─────────────────────── */}
      <section className="bg-ink-50 text-ink-700">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow text-accent mb-6">{t('home_caps_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-dark max-w-4xl">
              {t('home_caps_title')}
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {caps.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <article className="card-light h-full p-9 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <span className="block text-caption tabular-nums text-ink-300 mb-8">
                    0{i + 1}
                  </span>
                  <h3 className="text-display-sm mb-4">{c.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-500">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── 3D ────────────────────────── */}
      {/* El modelo ocupa toda la sección, sin contenedor que lo recorte: a
          pantalla completa tiene aire de sobra y se ve entero. */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden border-t border-white/[0.08] bg-ink">
        <div className="absolute inset-0">
          <SafeVisual>
            <Suspense fallback={null}>
              <MyModel />
            </Suspense>
          </SafeVisual>
        </div>

        {/* Halo azul muy tenue para dar profundidad al fondo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,113,227,0.16) 0%, transparent 70%)',
          }}
        />

        {/* Velo vertical: oscurece arriba y abajo para que el texto se lea,
            dejando el centro despejado para el modelo. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/25 to-ink" />

        <div className="container-page relative z-10">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow mb-6">{t('home_3d_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-light max-w-4xl">
              {t('home_3d_title')}
            </h2>
            <p className="mt-7 max-w-2xl text-body-lg text-ink-200">
              {t('home_3d_text')}
            </p>
            <Link to="/portfolio" className="btn-primary mt-10">
              {t('home_3d_cta')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── STACK ───────────────────────── */}
      <section className="border-t border-white/[0.08]">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow mb-6">{t('home_stack_eyebrow')}</p>
            <h2 className="text-display-md text-gradient-light max-w-3xl">
              {t('home_stack_title')}
            </h2>
            <p className="mt-5 text-body text-ink-400">{t('home_stack_text')}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-14 flex flex-wrap gap-2.5">
              {STACK.map((tech) => (
                <li key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5
                               text-[0.875rem] text-ink-200 transition-colors duration-400 ease-smooth
                               hover:border-white/25 hover:text-white">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── CTA FINAL ─────────────────────── */}
      <section className="border-t border-white/[0.08]">
        <div className="container-page section-y">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="text-display-lg text-gradient-light max-w-2xl">
              {t('home_cta_title')}
            </h2>
            <p className="mt-7 max-w-xl text-body-lg text-ink-300">
              {t('home_cta_text')}
            </p>
            <div className="mt-11 flex flex-col sm:flex-row items-center gap-4">
              <a href="https://wa.me/573052737622" target="_blank" rel="noopener noreferrer"
                 className="btn-accent">
                {t('home_cta_button')}
              </a>
              <Link to="/servicios" className="btn-ghost-light">
                {t('home_cta_secondary_button')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default Home;
