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

      <figcaption className="flex items-baseline justify-between gap-4 border-t border-white/8 bg-ink-raised px-5 py-4">
        <div>
          <p className="font-display text-base tracking-tight text-bone">
            {item.client}
          </p>
          <p className="mt-0.5 text-[0.8125rem] text-mute">{item.title}</p>
        </div>
        <span className="shrink-0 text-[0.75rem] text-mute/70">
          {item.type}
        </span>
      </figcaption>
    </figure>
  );
}
