/* ===================== Mobile menu ===================== */
const hamburger = document.getElementById("hamburger");
const hamburgerIcon = document.getElementById("hamburger-icon");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  hamburgerIcon.className = "ri-menu-3-line";
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburgerIcon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
  hamburger.setAttribute("aria-expanded", String(isOpen));
});
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

/* ===================== Rail nav active state ===================== */
const railLinks = document.querySelectorAll(".rail-link");
const sections = [...railLinks].map((l) => document.querySelector(l.getAttribute("href")));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      railLinks.forEach((l) => l.classList.remove("active"));
      const match = [...railLinks].find((l) => l.getAttribute("href") === `#${entry.target.id}`);
      if (match) match.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((s) => s && sectionObserver.observe(s));

/* ===================== FAQ accordion ===================== */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
  });
});

/* ===================== Work scroll counter ===================== */
const workScroll = document.getElementById("work-scroll");
const workCounter = document.getElementById("work-counter");
const workSlides = document.querySelectorAll(".work-slide");

if (workScroll && workCounter) {
  workCounter.textContent = `01 / ${String(workSlides.length).padStart(2, "0")}`;
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = [...workSlides].indexOf(entry.target) + 1;
          workCounter.textContent = `${String(idx).padStart(2, "0")} / ${String(workSlides.length).padStart(2, "0")}`;
        }
      });
    },
    { root: workScroll, threshold: 0.6 }
  );
  workSlides.forEach((s) => slideObserver.observe(s));
}

/* ===================== Contact form ===================== */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();

  // No backend is connected yet, so we open the user's email client
  // with the details pre-filled. Replace this with a real form
  // submission once a backend/contact endpoint is available.
  const subject = encodeURIComponent(`New project enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${String(formData.get("phone") || "").trim()}\n` +
    `Project Type: ${String(formData.get("project_type") || "")}\n` +
    `Budget: ${String(formData.get("budget") || "")}\n\n` +
    `Details:\n${String(formData.get("details") || "").trim()}`
  );

  window.location.href = `mailto:webmakingstudio05@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email app to send this enquiry...";
});
