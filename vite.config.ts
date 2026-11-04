import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { OWNING_TULUM_EVENTS, type OwningTulumEventConfig } from './src/config/owningTulumContent';
import { icsFile } from './src/utils/eventCalendar';

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Link previews (WhatsApp, Facebook, LinkedIn…) don't run JavaScript: they read
 * the meta tags of the HTML the server sends, and every route of this SPA gets
 * the same index.html. So for every Owning Tulum city the build also writes
 * <path>.html (owning-tulum.html, owning-tulum-montreal.html…) — the built
 * index.html with that city's title, description and image. Netlify serves a
 * file named after the path before the /* rewrite (as with /ad-landing), so
 * each event route gets its own and every other page keeps index.html untouched.
 *
 * It also writes each city's .ics file for "Add to calendar" on
 * <path>?registered=1 (only in builds: `vite dev` doesn't serve it).
 */
function owningTulumFiles(): Plugin {
  const metaTagsFor = ({ title, description, image }: OwningTulumEventConfig['meta']) =>
    [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:image', image],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', image],
    ] as [attr: 'name' | 'property', key: string, value: string][];

  return {
    name: 'owning-tulum-files',
    apply: 'build',
    enforce: 'post', // after Vite has emitted index.html
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') this.error('index.html not found in the bundle');

      for (const config of OWNING_TULUM_EVENTS) {
        const { htmlFile, meta, calendar } = config;
        if (htmlFile !== `${config.path.slice(1)}.html`) {
          this.error(`${htmlFile}: must be named after the route ${config.path}`);
        }
        let html = String(index.source);

        // Fail the build rather than ship the lots preview on the event page.
        const replace = (pattern: RegExp, replacement: string) => {
          if (!pattern.test(html)) this.error(`${htmlFile}: ${pattern} not found in index.html`);
          html = html.replace(pattern, () => replacement);
        };
        replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
        for (const [attr, key, value] of metaTagsFor(meta)) {
          replace(
            new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
            `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`,
          );
        }
        replace(
          /<meta property="og:type" content="website" \/>/,
          `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${escapeAttr(meta.url)}" />`,
        );

        this.emitFile({ type: 'asset', fileName: htmlFile, source: html });
        // Served as text/calendar (public/_headers) so phones open it in their calendar app.
        this.emitFile({
          type: 'asset',
          fileName: calendar.icsPath.slice(1),
          source: icsFile(calendar),
        });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), owningTulumFiles()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
