import { Link } from "react-router-dom";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";

const NotFound = () => {
  const t = useCustomTranslation();

  useSeo({
    title: t('seo_notfound_title'),
    description: t('seo_notfound_description'),
    path: '/404',
  });

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(0,113,227,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container-page relative z-10">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow mb-7 tabular-nums animate-fade-up">404</p>

          <h1 className="text-display-xl text-gradient-light max-w-2xl animate-fade-up delay-1">
            {t('not_found_title')}
          </h1>

          <p className="mt-7 max-w-md text-body-lg text-ink-300 animate-fade-up delay-2">
            {t('not_found_text')}
          </p>

          <div className="mt-11 flex flex-col sm:flex-row items-center gap-4 animate-fade-up delay-3">
            <Link to="/" className="btn-primary">
              {t('not_found_button')}
            </Link>
            <Link to="/portfolio" className="btn-ghost-light">
              {t('home_cta_primary')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
