import SqueezeLayout from '../components/SqueezeLayout';
import type { SqueezeLang } from '../config/squeezeContent';

interface Props { lang?: SqueezeLang; }
export default function SqueezeSeguridad({ lang = 'es' }: Props) {
  return <SqueezeLayout angle="seguridad" lang={lang} />;
}
