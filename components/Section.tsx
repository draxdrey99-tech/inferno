/**
 * Section header: optional eyebrow, headline, optional lede.
 *
 * The eyebrow is deliberately optional and deliberately rare. A small
 * uppercase label above every single section is the fastest way to make a
 * page read as templated, so the budget is one per three sections and most
 * sections open on the headline alone.
 *
 * Uses the same `.section-head` rhythm (a vertical gap, no manual margins)
 * as the home page's section openers, so this header reads as part of the
 * same system rather than a one-off.
 *
 * `as` defaults to h2. Pass `as="h1"` when this is the page heading.
 */
export default function SectionHead({
  eyebrow,
  title,
  lede,
  as: Heading = 'h2',
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={`reveal section-head ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="display-lg max-w-4xl">{title}</Heading>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
