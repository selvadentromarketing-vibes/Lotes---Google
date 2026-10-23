import { SQUEEZE_LAYOUT_T, type SqueezeLang } from '../config/squeezeContent';

/** Footer shared by the squeeze landings and the /owning-tulum event page. */
export default function SqueezeFooter({ lang = 'es' }: { lang?: SqueezeLang }) {
  const t = SQUEEZE_LAYOUT_T[lang];
  const copyrightSuffix = lang === 'en' ? 'All rights reserved' : 'Todos los derechos reservados';

  return (
    <footer className="bg-[#1F2A22] text-white/60 text-xs py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>
          © {new Date().getFullYear()} Selvadentro Tulum · {copyrightSuffix} ·{' '}
          <a
            href="https://selvadentrotulum.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline"
          >
            {t.privacyPolicy}
          </a>
          {' '}·{' '}
          <a
            href="https://selvadentrotulum.com/terms-and-conditions/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline"
          >
            {t.termsConditions}
          </a>
          {' '}·{' '}
          <a href="https://tothemaxmedia.com" target="_blank" rel="noopener" className="hover:text-white">
            Built by To The Max Media
          </a>
        </span>
        <span>
          <a href="tel:+529994890828" className="hover:text-white">+52 999 489 0828</a>
          <span className="mx-2">·</span>
          <a href="mailto:info@selvadentrotulum.com" className="hover:text-white">
            info@selvadentrotulum.com
          </a>
        </span>
      </div>
    </footer>
  );
}
