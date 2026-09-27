gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {

  /* ===================== Hero entrance ===================== */
  gsap.from(".hero-anim", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.14,
    ease: "power2.out",
  });

  /* ===================== Scroll reveal ===================== */
  const revealGroups = [
    ".bento-card",
    "#services-list .service-row",
    "#value blockquote, #value .value-point",
    ".work-slide",
    "#about h2, #about p, .focus-item, .about-portrait",
    ".timeline-step",
    ".price-row:not(.header)",
    "#testimonials blockquote, #testimonial-tabs .t-tab",
    "#faq-list .faq-item",
    "#contact h2, #contact p, #contact-form",
  ];

  revealGroups.forEach((selector) => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    gsap.from(els, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: els[0].closest("section") || els[0],
        start: "top 85%",
      },
    });
  });

} else {
  gsap.set(".hero-anim", { opacity: 1, y: 0 });
}
