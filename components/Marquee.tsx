import Image from 'next/image';
import { CLIENTS } from '@/lib/site';

/**
 * Client logo strip. The list is rendered twice so the CSS translate of
 * -50% loops seamlessly; the duplicate is hidden from assistive tech.
 * Pausable by the checkbox, by hover and by focus.
 */
export default function Marquee() {
  const row = (dup: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={dup || undefined}>
      {CLIENTS.map((c) => {
        // Square marks read far smaller than wordmarks at the same height, so
        // give them more room and keep the row optically even.
        const squarish = c.width / c.height < 1.8;
        return (
          <div
            key={`${c.name}-${dup ? 'b' : 'a'}`}
            className="flex w-[11rem] shrink-0 items-center justify-center px-6 md:w-[15rem]"
          >
            <Image
              src={c.logo}
              alt={dup ? '' : c.name}
              width={c.width}
              height={c.height}
              className={`w-auto max-w-full object-contain opacity-55 brightness-0 invert transition-opacity duration-500 hover:opacity-100 ${
                squarish ? 'h-12 md:h-14' : 'h-9 md:h-11'
              }`}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="marquee-wrap relative overflow-hidden border-y border-[#2a2a2a] py-10 md:py-12"
      role="region"
      aria-label="Client logos"
      tabIndex={0}
    >
      <p className="marquee-label mono-label mono-label-dot">Trusted by</p>
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
      {/* Feathered edges so logos enter and leave instead of being clipped. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-28" />
    </div>
  );
}
