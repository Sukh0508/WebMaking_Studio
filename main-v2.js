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

/* ===================== Testimonial tabs ===================== */
const tTabs = document.querySelectorAll(".t-tab");
const tQuote = document.getElementById("testimonial-quote");

tTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    tQuote.textContent = `"${tab.dataset.quote}"`;
  });
});

/* ===================== Stats counter ===================== */
const statNums = document.querySelectorAll(".stat-num");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      statsObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
statNums.forEach((el) => statsObserver.observe(el));

/* ===================== Contact form ===================== */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();

  if (!name || !email) {
    formStatus.textContent = "Please fill in your name and email.";
    return;
  }

  // No backend is connected yet, so we open the user's email client
  // with the details pre-filled. Replace this with a real form
  // submission once a backend/contact endpoint is available.
  const subject = encodeURIComponent(`New project enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${contactForm.phone.value.trim()}\n` +
    `Project Type: ${contactForm.project_type.value}\n` +
    `Budget: ${contactForm.budget.value}\n\n` +
    `Details:\n${contactForm.details.value.trim()}`
  );

  window.location.href = `mailto:webmakingstudio05@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email app to send this enquiry...";
});
