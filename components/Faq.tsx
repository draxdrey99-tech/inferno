import { Plus } from '@phosphor-icons/react/dist/ssr';

/**
 * Native <details> accordion. Keyboard accessible, and the answers stay in
 * the HTML with no JS, which matters because they are the source for the
 * FAQ rich result.
 */
export default function Faq({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="border-t border-white/9">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-white/9">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-lg tracking-tight md:text-xl">
              {item.q}
            </h3>
            <Plus
              size={18}
              weight="bold"
              aria-hidden
              className="mt-1 shrink-0 text-flame transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-2xl pb-7 text-[0.9375rem] leading-relaxed text-mute">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
