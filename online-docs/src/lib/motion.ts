import gsap from 'gsap'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function animateProgress(el: HTMLElement | null, pct: number) {
  if (!el) return
  if (prefersReducedMotion()) {
    el.style.width = `${pct}%`
    return
  }
  gsap.to(el, { width: `${pct}%`, duration: 0.45, ease: 'power2.out' })
}

export function animateStepEnter(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
  )
}

export function animateHubCards(els: HTMLElement[]) {
  if (!els.length || prefersReducedMotion()) return
  gsap.fromTo(
    els,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
  )
}
