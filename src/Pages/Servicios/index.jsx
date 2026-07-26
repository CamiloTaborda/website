import { Link } from "react-router-dom";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Reveal from "../../Animations/Reveal";
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const WHATSAPP =
  "https://wa.me/573052737622?text=Hola%20Camilo,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios";

// Cuatro servicios, uno por cada bloque de trabajo real del CV.
const SERVICES = [1, 2, 3, 4].map((n) => ({
  n,
  Icon: [
    HiOutlineSquares2X2,
    HiOutlineCube,
    HiOutlineDevicePhoneMobile,
    HiOutlineGlobeAlt,
  ][n - 1],
}));

const Servicios = () => {
  const t = useCustomTranslation();

  useSeo({
    title: t('seo_services_title'),
    description: t('seo_services_description'),
    path: '/servicios',
  });

  return (
    <main className="bg-ink text-white">

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative flex min-h-[78svh] items-center overflow-hidden pt-32 pb-24">
        {/* Halo tenue arriba: da profundidad sin competir con el texto */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,113,227,0.16) 0%, transparent 70%)',
          }}
        />

        <div className="container-page relative z-10">
          <div className="max-w-4xl">
            <p className="eyebrow mb-7 animate-fade-up">{t('sv_eyebrow')}</p>
            <h1 className="text-display-xl text-gradient-light animate-fade-up delay-1">
              {t('sv_title')}
            </h1>
            <p className="mt-8 max-w-2xl text-body-lg text-ink-300 animate-fade-up delay-2">
              {t('sv_subtitle')}
            </p>
            <div className="mt-11 animate-fade-up delay-3">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('sv_cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── SERVICIOS ──────────────────────── */}
      <section className="bg-ink-50 text-ink-700">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow text-accent mb-6">{t('sv_what_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-dark max-w-3xl">
              {t('sv_what_title')}
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {SERVICES.map(({ n, Icon }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <article className="card-light flex h-full flex-col p-9 lg:p-11
                                    hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-700 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-caption tabular-nums text-ink-300">0{n}</span>
                  </div>

                  <h3 className="text-display-sm">{t(`sv_${n}_title`)}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                    {t(`sv_${n}_text`)}
                  </p>

                  <div className="mt-9">
                    <p className="text-caption uppercase tracking-widest text-ink-300">
                      {t('sv_includes')}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {[1, 2, 3, 4, 5].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-ink-600">
                          <svg className="mt-[7px] h-3 w-3 flex-shrink-0 text-accent" viewBox="0 0 12 12"
                               fill="none" aria-hidden="true">
                            <path d="M2 6.2l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.8"
                                  strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t(`sv_${n}_f${f}`)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* mt-auto en el envoltorio: alinea el bloque final abajo en
                      todas las tarjetas aunque las listas midan distinto. */}
                  <div className="mt-auto pt-9">
                    <div className="border-t border-ink-700/10 pt-7">
                      <p className="text-[0.8125rem] text-ink-400">
                        <span className="text-ink-300">{t('sv_for')}: </span>
                        {t(`sv_${n}_for`)}
                      </p>
                      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                         className="btn-ghost-dark mt-6">
                        {t('sv_quote')}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PROCESO ───────────────────────── */}
      <section className="border-t border-white/[0.08]">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow mb-6">{t('sv_process_eyebrow')}</p>
            <h2 className="text-display-lg text-gradient-light max-w-3xl">
              {t('sv_process_title')}
            </h2>
          </Reveal>

          <ol className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((s, i) => (
              <Reveal key={s} delay={i * 0.08}>
                <li className="relative pt-8 border-t border-white/[0.12]">
                  {/* El número vive en el borde superior, como en una tabla de contenidos */}
                  <span className="absolute -top-[9px] left-0 bg-ink pr-4 text-caption tabular-nums text-accent-soft">
                    0{s}
                  </span>
                  <h3 className="text-display-sm">{t(`sv_step_${s}_title`)}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-400">
                    {t(`sv_step_${s}_text`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ────────────────────────── POR QUÉ ────────────────────────── */}
      <section className="bg-ink-50 text-ink-700">
        <div className="container-page section-y">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Reveal>
              <p className="eyebrow text-accent mb-6">{t('sv_why_eyebrow')}</p>
              <h2 className="text-display-md text-gradient-dark lg:sticky lg:top-32">
                {t('sv_why_title')}
              </h2>
            </Reveal>

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {[1, 2, 3, 4].map((w, i) => (
                <Reveal key={w} delay={i * 0.08}>
                  <h3 className="text-display-sm">{t(`sv_why_${w}_title`)}</h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-500">
                    {t(`sv_why_${w}_text`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
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
              {t('sv_cta_title')}
            </h2>
            <p className="mt-7 max-w-xl text-body-lg text-ink-300">
              {t('sv_cta_text')}
            </p>
            <div className="mt-11 flex flex-col sm:flex-row items-center gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-accent">
                {t('sv_cta_primary')}
              </a>
              <Link to="/portfolio" className="btn-ghost-light">
                {t('sv_cta_secondary')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default Servicios;
