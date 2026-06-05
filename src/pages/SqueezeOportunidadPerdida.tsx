import SqueezeLayout from '../components/SqueezeLayout';
import type { SqueezeLang } from '../config/squeezeContent';

interface Props { lang?: SqueezeLang; }
export default function SqueezeOportunidadPerdida({ lang = 'es' }: Props) {
  return <SqueezeLayout angle="oportunidad-perdida" lang={lang} />;
}
