import useCustomTranslation from "../../Hooks/useCustomTranslation";
import Reveal from "../../Animations/Reveal";
import { faqItems } from "../../Seo/schema";

// Dos tonos para encajar en el ritmo de cada página: en Servicios va oscura
// tras una sección clara, y en Inicio clara entre dos oscuras.
const TONES = {
  dark: {
    section: 'border-t border-white/[0.08]',
    eyebrow: '',
    title: 'text-gradient-light',
    border: 'border-white/[0.12]',
    question: 'text-white',
    icon: 'text-ink-400',
    answer: 'text-ink-300',
  },
  light: {
    section: 'bg-ink-50 text-ink-700',
    eyebrow: 'text-accent',
    title: 'text-gradient-dark',
    border: 'border-ink-700/12',
    question: 'text-ink-700',
    icon: 'text-ink-400',
    answer: 'text-ink-500',
  },
};

/**
 * Preguntas frecuentes. <details> en lugar de un acordeón con estado: la
 * respuesta está en el HTML aunque esté plegada, que es lo que leen los
 * buscadores y los motores de respuesta.
 *
 * El JSON-LD FAQPage solo se publica en /servicios (ver Seo/schema): Google
 * pide marcar una única instancia cuando el mismo contenido se repite en
 * varias páginas del sitio.
 */
const Faq = ({ tone = 'dark' }) => {
  const t = useCustomTranslation();
  const c = TONES[tone];

  return (
    <section className={c.section}>
      <div className="container-page section-y">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <p className={`eyebrow mb-6 ${c.eyebrow}`}>{t('sv_faq_eyebrow')}</p>
            <h2 className={`text-display-md lg:sticky lg:top-32 ${c.title}`}>
              {t('sv_faq_title')}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className={`border-t ${c.border}`}>
              {faqItems(t).map(({ q, a }) => (
                <details key={q} className={`group border-b ${c.border}`}>
                  <summary className={`flex cursor-pointer list-none items-start justify-between gap-6 py-7
                                       text-display-sm [&::-webkit-details-marker]:hidden ${c.question}`}>
                    <h3>{q}</h3>
                    <svg className={`mt-2 h-3.5 w-3.5 flex-shrink-0 transition-transform duration-400
                                     ease-smooth group-open:rotate-45 ${c.icon}`}
                         viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className={`max-w-prose pb-8 text-[0.9375rem] leading-relaxed ${c.answer}`}>{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Faq;
