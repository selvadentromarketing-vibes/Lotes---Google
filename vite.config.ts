import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { OWNING_TULUM_META } from './src/config/owningTulumContent';

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Link previews (WhatsApp, Facebook, LinkedIn…) don't run JavaScript: they read
 * the meta tags of the HTML the server sends, and every route of this SPA gets
 * the same index.html. So the build also writes owning-tulum.html — the built
 * index.html with the event's title, description and image. Netlify serves a
 * file named after the path before the /* rewrite (as with /ad-landing), so
 * /owning-tulum gets it and every other page keeps index.html untouched.
 */
function owningTulumMetaPage(): Plugin {
  const { url, title, description, image } = OWNING_TULUM_META;
  const metaTags: [attr: 'name' | 'property', key: string, value: string][] = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:image', image],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
  ];

  return {
    name: 'owning-tulum-meta-page',
    apply: 'build',
    enforce: 'post', // after Vite has emitted index.html
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') this.error('index.html not found in the bundle');
      let html = String(index.source);

      // Fail the build rather than ship the lots preview on the event page.
      const replace = (pattern: RegExp, replacement: string) => {
        if (!pattern.test(html)) this.error(`owning-tulum.html: ${pattern} not found in index.html`);
        html = html.replace(pattern, () => replacement);
      };
      replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
      for (const [attr, key, value] of metaTags) {
        replace(
          new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
          `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`,
        );
      }
      replace(
        /<meta property="og:type" content="website" \/>/,
        `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${escapeAttr(url)}" />`,
      );

      this.emitFile({ type: 'asset', fileName: 'owning-tulum.html', source: html });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), owningTulumMetaPage()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
