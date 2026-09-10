/** Marks panels, boxes and indexes once when they enter view so CSS can play
 * a one-shot flourish (red hairline settling to grey). All devices; no-op
 * under reduced motion because the CSS animation is disabled there. */
const SEEN_SELECTOR = '.panel-set, .panel, .card, .proof-panel, .start-box, .hud-box, .section-index, .testimonial, .email-card, .hero-frame, .cta-gradient';
export function mountSeen() {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-seen');
      io.unobserve(entry.target);
    }
  }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll(SEEN_SELECTOR).forEach((el) => io.observe(el));
  return () => io.disconnect();
}
