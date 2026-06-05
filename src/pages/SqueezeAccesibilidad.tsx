import SqueezeLayout from '../components/SqueezeLayout';
import type { SqueezeLang } from '../config/squeezeContent';

interface Props { lang?: SqueezeLang; }
export default function SqueezeAccesibilidad({ lang = 'es' }: Props) {
  return <SqueezeLayout angle="accesibilidad" lang={lang} />;
}
