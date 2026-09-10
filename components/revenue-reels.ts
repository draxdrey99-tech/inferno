/** One-shot number reels on every device: each amount settles once, smoothly,
 * when it enters view. No pinning, no scroll scrubbing. */
export function mountRevenueReels() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  const cancel = () => animations.forEach(animation => animation.cancel());
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || reduced.matches) continue;
      observer.unobserve(entry.target);
      entry.target.querySelectorAll<HTMLElement>('.revenue-strip').forEach((strip, index) => {
        const animation = strip.animate([
          {transform: 'translateY(0%)'},
          {transform: `translateY(-${Number(strip.dataset.digit) * 10}%)`},
        ], {duration: 1300, delay: index * 20, easing: 'cubic-bezier(.16,1,.3,1)'});
        animations.add(animation);
        void animation.finished.catch(() => {}).finally(() => animations.delete(animation));
      });
    }
  }, {threshold: .4, rootMargin: '0px 0px -6% 0px'});
  document.querySelectorAll('.revenue-reels').forEach(reels => observer.observe(reels));
  const preferenceChanged = () => { if (reduced.matches) cancel(); };
  reduced.addEventListener('change', preferenceChanged);
  return () => {
    observer.disconnect();
    reduced.removeEventListener('change', preferenceChanged);
    cancel();
  };
}
