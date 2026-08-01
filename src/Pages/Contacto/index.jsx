import { useState, useId } from "react";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Reveal from "../../Animations/Reveal";

const WHATSAPP = "https://wa.me/573052737622";
const EMAIL = "camilotaborda2010@gmail.com";
const FORMSPREE = "https://formspree.io/f/mpwqrnzq";

const SOCIAL = [
  { href: 'https://www.linkedin.com/in/camilo-taborda-20724917a/', label: 'LinkedIn' },
  { href: 'https://github.com/CamiloTaborda',                      label: 'GitHub'   },
  { href: 'https://x.com/CamiloT08701893',                         label: 'X'        },
  { href: 'https://www.instagram.com/camilo.tl/',                  label: 'Instagram'},
];

// idle | sending | ok | error
const Contacto = () => {
  const t = useCustomTranslation();
  const uid = useId();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // Honeypot: campo invisible para personas. Si viene con contenido, quien
  // envió el formulario es un bot rellenando todos los campos del DOM.
  const [trap, setTrap] = useState("");
  const [state, setState] = useState('idle');

  useSeo({
    title: t('seo_contact_title'),
    description: t('seo_contact_description'),
    path: '/contacto',
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === 'sending') return;

    // Bot detectado: fingimos éxito y descartamos. Mostrar un error le diría
    // al bot qué campo evitar en el siguiente intento.
    if (trap) {
      setState('ok');
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setState('sending');

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // _gotcha es el nombre que Formspree reconoce como honeypot: si llega
        // con contenido, descarta el envío también del lado del servidor.
        body: JSON.stringify({ ...form, _gotcha: trap }),
      });

      if (res.ok) {
        setState('ok');
        setForm({ name: "", email: "", message: "" });
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  // Campos con etiqueta real: antes el placeholder hacía de label, así que
  // al escribir se perdía la referencia de qué pedía cada campo.
  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-[0.9375rem] " +
    "text-white placeholder:text-ink-500 transition-colors duration-400 ease-smooth " +
    "hover:border-white/20 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  const labelClass = "block text-caption uppercase tracking-widest text-ink-400 mb-2.5";

  return (
    <main className="bg-ink text-white">

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(0,113,227,0.16) 0%, transparent 70%)',
          }}
        />
        <div className="container-page relative z-10">
          <p className="eyebrow mb-7 animate-fade-up">{t('ct_eyebrow')}</p>
          <h1 className="text-display-xl text-gradient-light animate-fade-up delay-1">
            {t('ct_title')}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-ink-300 animate-fade-up delay-2">
            {t('ct_subtitle')}
          </p>
        </div>
      </section>

      {/* ─────────────────── CONTACTO + FORMULARIO ─────────────────── */}
      <section className="pb-28 sm:pb-36">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">

            {/* Vías directas */}
            <Reveal>
              <div className="flex flex-col gap-10">
                <div>
                  <h2 className="text-caption uppercase tracking-widest text-ink-400 pb-4 border-b border-white/[0.08]">
                    {t('ct_direct')}
                  </h2>

                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                     className="group mt-7 flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-display-sm transition-colors duration-400 ease-smooth group-hover:text-accent-soft">
                        {t('ct_whatsapp')}
                      </span>
                      <span className="mt-1.5 block text-[0.8125rem] text-ink-400">
                        {t('ct_whatsapp_note')}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] text-ink-200 tabular-nums">
                        +57 305 273 7622
                      </span>
                    </span>
                    <svg className="mt-2 h-3.5 w-3.5 flex-shrink-0 text-ink-500 transition-all duration-400 ease-smooth
                                    group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                         viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5v4" stroke="currentColor" strokeWidth="1.4"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  <a href={`mailto:${EMAIL}`} className="group mt-9 block">
                    <span className="block text-display-sm transition-colors duration-400 ease-smooth group-hover:text-accent-soft">
                      {t('ct_email')}
                    </span>
                    <span className="mt-2 block break-all text-[0.9375rem] text-ink-200">
                      {EMAIL}
                    </span>
                  </a>
                </div>

                <div>
                  <h2 className="text-caption uppercase tracking-widest text-ink-400 pb-4 border-b border-white/[0.08]">
                    {t('ct_location_label')}
                  </h2>
                  <p className="mt-6 text-[0.9375rem] text-ink-200">{t('ct_location')}</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-400">
                    {t('ct_timezone')}
                  </p>
                </div>

                <div>
                  <h2 className="text-caption uppercase tracking-widest text-ink-400 pb-4 border-b border-white/[0.08]">
                    {t('ct_social')}
                  </h2>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {SOCIAL.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer"
                           className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-2
                                      text-[0.8125rem] text-ink-200 transition-colors duration-400 ease-smooth
                                      hover:border-white/25 hover:text-white">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Formulario */}
            <Reveal delay={0.1}>
              <div className="card-glass p-8 sm:p-10">
                <h2 className="text-display-sm">{t('ct_form_title')}</h2>

                <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6" noValidate={false}>
                  {/* Honeypot. Fuera de pantalla en vez de display:none, porque
                      algunos bots ignoran los campos ocultos por CSS. Sin
                      tabIndex ni autocompletado, así que ninguna persona que
                      navegue con teclado o lector de pantalla lo encuentra. */}
                  <div className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor={`${uid}-company`}>No completar este campo</label>
                    <input
                      id={`${uid}-company`}
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-name`} className={labelClass}>
                      {t('ct_form_name')}
                    </label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder={t('ct_form_name_ph')}
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} className={labelClass}>
                      {t('ct_form_email')}
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder={t('ct_form_email_ph')}
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-message`} className={labelClass}>
                      {t('ct_form_message')}
                    </label>
                    <textarea
                      id={`${uid}-message`}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t('ct_form_message_ph')}
                      className={`${field} resize-y min-h-[150px]`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === 'sending' ? t('ct_form_sending') : t('ct_form_send')}
                    </button>

                    {/* aria-live: los lectores de pantalla anuncian el resultado
                        sin que el foco tenga que moverse hasta aquí. */}
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-[0.875rem] ${
                        state === 'ok' ? 'text-emerald-400'
                        : state === 'error' ? 'text-red-400'
                        : 'text-ink-400'
                      }`}
                    >
                      {state === 'ok' && t('ct_form_ok')}
                      {state === 'error' && t('ct_form_error')}
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contacto;
