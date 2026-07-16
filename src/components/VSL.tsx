import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface VSLProps {
  mediaId: string;
  language?: 'en' | 'es';
}

const SWATCH = (id: string) => `https://fast.wistia.com/embed/medias/${id}/swatch`;

/**
 * Fetch the HD first-frame thumbnail for a Wistia media via oEmbed.
 * Returns the low-res swatch until the request resolves, so the facade
 * always paints something immediately.
 */
function useWistiaPoster(mediaId: string): string {
  const [url, setUrl] = useState(() => SWATCH(mediaId));
  useEffect(() => {
    setUrl(SWATCH(mediaId));
    let cancelled = false;
    fetch(
      `https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/${mediaId}&format=json`,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        if (cancelled || !data?.thumbnail_url) return;
        // oEmbed hands back a resized crop; bump it to 1920x1080 for retina heros.
        const hd = data.thumbnail_url.replace(
          /image_crop_resized=\d+x\d+/,
          'image_crop_resized=1920x1080',
        );
        setUrl(hd);
      })
      .catch(() => {
        /* keep swatch */
      });
    return () => {
      cancelled = true;
    };
  }, [mediaId]);
  return url;
}

/**
 * Wistia VSL embed with click-to-load thumbnail facade.
 * The Wistia player script + embed module (~700KB combined) only download
 * after the visitor explicitly clicks Play. This keeps the squeeze pages
 * under the 3-second load-time target requested by marketing.
 */
function WistiaPlayer({ mediaId }: { mediaId: string }) {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
    script2.async = true;
    script2.type = 'module';
    document.body.appendChild(script2);

    return () => {
      if (script1.parentNode) document.body.removeChild(script1);
      if (script2.parentNode) document.body.removeChild(script2);
    };
  }, [mediaId]);

  return (
    <>
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        <wistia-player media-id={mediaId} aspect="1.7777777777777777" autoplay="true"></wistia-player>
      </div>
    </>
  );
}

export default function VSL({ mediaId }: VSLProps) {
  const [loaded, setLoaded] = useState(false);
  const posterUrl = useWistiaPoster(mediaId);

  if (loaded) {
    return (
      <div className="w-full">
        <WistiaPlayer mediaId={mediaId} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="group relative w-full rounded-2xl overflow-hidden shadow-2xl bg-brand-dark-green block focus:outline-none focus:ring-4 focus:ring-brand-copper/40"
        aria-label="Play video"
        style={{
          aspectRatio: '16 / 9',
          backgroundImage: `url('${posterUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-copper text-white shadow-2xl transition-transform group-hover:scale-110 group-active:scale-95">
            <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="white" />
          </span>
        </span>
      </button>
    </div>
  );
}
