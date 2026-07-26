import { Link } from "react-router-dom";
import useCustomTranslation from "../../Hooks/useCustomTranslation";

const NAV = [
  { to: '/servicios', key: 'services'  },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/sobre-mi',  key: 'about'     },
  { to: '/contacto',  key: 'contact'   },
];

const SOCIAL = [
  { href: 'https://www.linkedin.com/in/camilo-taborda-20724917a/', label: 'LinkedIn' },
  { href: 'https://github.com/CamiloTaborda',                      label: 'GitHub'   },
  { href: 'https://x.com/CamiloT08701893',                         label: 'X'        },
  { href: 'https://www.instagram.com/camilo.tl/',                  label: 'Instagram'},
];

const Footer = () => {
  const t = useCustomTranslation();
  const year = new Date().getFullYear();

  const linkClass =
    'text-[0.8125rem] text-ink-400 hover:text-white transition-colors duration-400 ease-smooth';

  return (
    <footer className="border-t border-white/[0.08] bg-ink">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <p className="text-[0.9375rem] font-semibold tracking-tight text-white">
              Camilo Taborda
            </p>
            <p className="mt-3 max-w-xs text-[0.8125rem] leading-relaxed text-ink-400">
              {t('footer_tagline')}
            </p>
            <p className="mt-6 text-[0.8125rem] text-ink-400">Medellín, Colombia</p>
          </div>

          <nav aria-label={t('footer_nav_label')}>
            <h2 className="mb-4 text-caption uppercase tracking-widest text-ink-300">
              {t('footer_nav_label')}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{t(l.key)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-caption uppercase tracking-widest text-ink-300">
              {t('footer_contact_label')}
            </h2>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:camilotaborda2010@gmail.com" className={linkClass}>
                  camilotaborda2010@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/573052737622" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  +57 305 273 7622
                </a>
              </li>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-7">
          <p className="text-[0.8125rem] text-ink-500">
            © {year} Camilo Taborda. {t('rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
