import Image from 'next/image';
import type { WorkItem } from '@/lib/site';

/**
 * Portfolio card. The source assets are full-length email screenshots
 * (600 x ~2200), so instead of cropping them to a thumbnail the card shows
 * the top of the email and pans down the whole creative on hover or focus.
 * The motion is there to make the artefact readable, not for decoration.
 *
 * Nothing is overlaid on the image itself: the label lives in the caption
 * underneath, where it does not sit on top of the client's work.
 */
export default function EmailCard({
  item,
  priority = false,
}: {
  item: WorkItem;
  priority?: boolean;
}) {
  return (
    <figure className="email-card group" tabIndex={0}>
      <div className="viewport">
        <Image
          src={item.image}
          alt={item.alt}
          width={item.width}
          height={item.height}
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          className="w-full"
        />
      </div>

      <figcaption className="border-t border-white/10 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-lg tracking-tight text-bone">
            {item.client}
          </p>
          <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.09em] text-flame/80">
            {item.type}
          </span>
        </div>
        <p className="mt-0.5 text-[0.8125rem] text-mute">{item.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-mute">{item.note}</p>
        <a href={item.image} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">Open full email<span className="sr-only">: {item.client}, {item.title}</span></a>
      </figcaption>
    </figure>
  );
}
