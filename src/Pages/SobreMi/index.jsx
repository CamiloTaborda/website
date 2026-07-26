import { Suspense, lazy } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Reveal from "../../Animations/Reveal";
import SafeVisual from "../../Components/SafeVisual";
import Diplomas from "../../Components/Diplomas";

const Ribbons = lazy(() => import("../../Components/Ribbons"));

// Fuera del componente: un array inline se recrea en cada render y haría que
// Ribbons reconstruya su escena WebGL.
const RIBBON_COLORS = ['#0071e3'];

const WHATSAPP =
  "https://wa.me/573052737622?text=Hola%20Camilo,%20me%20gustar%C3%ADa%20hablar%20contigo";

const EXPERIENCE = [
  { n: 1, url: 'https://ardatatech.co/' },
  { n: 2, url: 'https://www.77renderstudio.com/' },
];

const STACK = [
  {
    key: 'am_stack_front',
    items: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Three.js',
            'React Three Fiber', 'model-viewer', 'Realidad Aumentada', 'Tailwind CSS',
            'GSAP', 'Framer Motion'],
  },
  {
    key: 'am_stack_back',
    items: ['Supabase', 'Autenticación', 'REST APIs', 'Python', 'Django'],
  },
  {
    key: 'am_stack_tools',
    items: ['Git & GitHub', 'Vite', 'Vercel', 'Claude Code'],
  },
];

const SOCIAL = [
  { href: 'https://www.linkedin.com/in/camilo-taborda-20724917a/', label: 'LinkedIn' },
  { href: 'https://github.com/CamiloTaborda',                      label: 'GitHub'   },
];

const SobreMi = () => {
  const t = useCustomTranslation();

  useSeo({
    title: t('seo_about_title'),
    description: t('seo_about_description'),
    path: '/sobre-mi',
  });

  return (
    <main className="bg-ink text-white">

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 0%, rgba(0,113,227,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="container-page relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              {/* La foto en 4:5, sin marcos ni sombras de colores */}
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src="/Icons/img1.webp"
                  alt="Camilo Taborda"
                  width="1200"
                  height="1500"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-7">{t('am_eyebrow')}</p>
              <h1 className="text-display-xl text-gradient-light">{t('am_name')}</h1>

              <p className="mt-5 text-body-lg text-ink-200">
                {t('am_role')}
                <span className="mx-2.5 text-ink-500">·</span>
                <span className="text-ink-400">{t('am_location')}</span>
              </p>

              <div className="mt-9 flex flex-col gap-5 max-w-prose">
                <p className="text-body text-ink-300">{t('am_intro_1')}</p>
                <p className="text-body text-ink-300">{t('am_intro_2')}</p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className="btn-ghost-light">
                    {s.label}
                  </a>
                ))}
                <a href="/CV/cv-camilo-taborda.pdf" download className="btn-ghost-light">
                  {t('am_cta_secondary')}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────── EXPERIENCIA ──────────────────────── */}
      <section className="border-t border-white/[0.08]">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow mb-6">{t('am_exp_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-light max-w-3xl">
              {t('am_exp_title')}
            </h2>
          </Reveal>

          <div className="mt-20 flex flex-col gap-16">
            {EXPERIENCE.map(({ n, url }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <article className="grid gap-8 border-t border-white/[0.12] pt-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
                  <div>
                    <p className="text-caption tabular-nums text-accent-soft">
                      {t(`am_exp_${n}_period`)}
                    </p>
                    <h3 className="mt-4 text-display-sm">
                      <a href={url} target="_blank" rel="noopener noreferrer"
                         className="transition-colors duration-400 ease-smooth hover:text-accent-soft">
                        {t(`am_exp_${n}_company`)}
                      </a>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-ink-400">
                      {t(`am_exp_${n}_role`)}
                    </p>
                  </div>

                  <div>
                    <p className="text-body text-ink-300 max-w-prose">
                      {t(`am_exp_${n}_text`)}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2.5">
                      {[1, 2, 3].map((h) => (
                        <li key={h}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2
                                       text-[0.8125rem] text-ink-200">
                          {t(`am_exp_${n}_h${h}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── STACK ────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-50 text-ink-700">
        {/* Ribbons como fondo sutil: es un guiño a lo que construyo, no un
            protagonista. Va detrás del contenido y sin capturar el puntero. */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.13]">
          <SafeVisual>
            <Suspense fallback={null}>
              <Ribbons
                baseThickness={12}
                colors={RIBBON_COLORS}
                speedMultiplier={0.4}
                maxAge={420}
                enableFade={false}
                enableShaderEffect
              />
            </Suspense>
          </SafeVisual>
        </div>

        <div className="container-page section-y relative z-10">
          <Reveal>
            <p className="eyebrow text-accent mb-6">{t('am_stack_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-dark max-w-3xl">
              {t('am_stack_title')}
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
            {STACK.map((group, i) => (
              <Reveal key={group.key} delay={i * 0.07}>
                <h3 className="border-b border-ink-700/15 pb-4 text-caption uppercase tracking-widest text-ink-400">
                  {t(group.key)}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <li key={tech}
                        className="rounded-full border border-ink-700/12 bg-white px-4 py-2
                                   text-[0.8125rem] text-ink-600">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal delay={0.21}>
              <h3 className="border-b border-ink-700/15 pb-4 text-caption uppercase tracking-widest text-ink-400">
                {t('am_stack_lang')}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                <li className="text-[0.9375rem] text-ink-600">{t('am_lang_es')}</li>
                <li className="text-[0.9375rem] text-ink-600">{t('am_lang_en')}</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FORMACIÓN ───────────────────────── */}
      <section className="border-t border-white/[0.08]">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow mb-6">{t('am_edu_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-light max-w-3xl">
              {t('am_edu_title')}
            </h2>
            <p className="mt-7 max-w-prose text-body text-ink-300">
              {t('am_edu_text')}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <Diplomas />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── CTA FINAL ─────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.08]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0,113,227,0.15) 0%, transparent 70%)',
          }}
        />
        <div className="container-page section-y relative z-10">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="text-display-lg text-gradient-light max-w-3xl">
              {t('am_cta_title')}
            </h2>
            <p className="mt-7 max-w-xl text-body-lg text-ink-300">
              {t('am_cta_text')}
            </p>
            <div className="mt-11 flex flex-col sm:flex-row items-center gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-accent">
                {t('am_cta_primary')}
              </a>
              <a href="/CV/cv-camilo-taborda.pdf" download className="btn-ghost-light">
                {t('am_cta_secondary')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default SobreMi;
