import SqueezeLayout from '../components/SqueezeLayout';
import type { SqueezeLang } from '../config/squeezeContent';

interface Props { lang?: SqueezeLang; }
export default function SqueezeEscape({ lang = 'es' }: Props) {
  return <SqueezeLayout angle="escape" lang={lang} />;
}
