import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Reveal from "../../Animations/Reveal";
import ProjectCard from '../../Components/ProjectCard';
import FilterCarousel from '../../Components/FilterCarousel';
import { projects } from '../../Data/projectsData';
import { getCategories, CATEGORY_IDS } from '../../Data/categoriesData';

const WHATSAPP =
  "https://wa.me/573052737622?text=Hola%20Camilo,%20vi%20tu%20portfolio%20y%20me%20interesa%20trabajar%20contigo";

const Portfolio = () => {
  const t = useCustomTranslation();
  const [activeFilter, setActiveFilter] = useState(CATEGORY_IDS.ALL);

  useSeo({
    title: t('seo_portfolio_title'),
    description: t('seo_portfolio_description'),
    path: '/portfolio',
  });

  const categories = useMemo(() => getCategories(t), [t]);

  const filtered = useMemo(
    () =>
      activeFilter === CATEGORY_IDS.ALL
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  // Contador por categoría: deja ver cuántos proyectos hay sin tener que filtrar.
  const counts = useMemo(() => {
    const acc = { [CATEGORY_IDS.ALL]: projects.length };
    for (const p of projects) acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, []);

  const handleFilterChange = useCallback((id) => setActiveFilter(id), []);

  return (
    <main className="bg-ink text-white">

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(0,113,227,0.16) 0%, transparent 70%)',
          }}
        />

        <div className="container-page relative z-10">
          <p className="eyebrow mb-7 animate-fade-up">{t('pf_eyebrow')}</p>
          <h1 className="text-display-xl text-gradient-light max-w-4xl animate-fade-up delay-1">
            {t('pf_title')}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-ink-300 animate-fade-up delay-2">
            {t('pf_subtitle')}
          </p>
        </div>
      </section>

      {/* ──────────────────────── PROYECTOS ──────────────────────── */}
      <section className="pb-28 sm:pb-36">
        <div className="container-page">
          {/* Los filtros quedan fijos al hacer scroll: con 11 proyectos evita
              tener que volver arriba para cambiar de categoría. */}
          <div className="sticky top-12 z-30 -mx-6 mb-16 border-b border-white/[0.08]
                          bg-ink/85 px-6 py-5 backdrop-blur-2xl sm:top-14 sm:mx-0 sm:rounded-2xl
                          sm:border sm:border-white/[0.08] sm:px-6">
            <FilterCarousel
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              label={t('pf_filter_label')}
              counts={counts}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-body text-ink-400">{t('pf_empty')}</p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
              {filtered.map((item, i) => (
                <Reveal key={item.link} delay={(i % 2) * 0.08}>
                  <ProjectCard item={item} t={t} />
                </Reveal>
              ))}
            </div>
          )}
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
              {t('pf_cta_title')}
            </h2>
            <p className="mt-7 max-w-xl text-body-lg text-ink-300">
              {t('pf_cta_text')}
            </p>
            <div className="mt-11 flex flex-col sm:flex-row items-center gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-accent">
                {t('pf_cta_primary')}
              </a>
              <Link to="/servicios" className="btn-ghost-light">
                {t('pf_cta_secondary')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default Portfolio;
