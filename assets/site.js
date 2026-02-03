// /assets/site.js
// Lightweight helpers for a simple static site (Cloudflare Pages)

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupSmoothAnchors();
  highlightActiveNavLink();
  preventDoubleSubmit();
  setupRotatingHeroWord();
});

/**
 * Mobile menu toggle for pages that include:
 *   <button id="menuBtn">...</button>
 *   <div class="nav" id="nav">...</div>
 */
function setupMobileMenu() {
  const nav = document.getElementById("nav");
  const btn = document.getElementById("menuBtn");
  if (!nav || !btn) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile UX)
  nav.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });

  // Close menu when pressing Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") nav.classList.remove("open");
  });
}

/**
 * Smooth scroll for in-page anchor links:
 * <a href="#services">Services</a>
 */
function setupSmoothAnchors() {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      // If you have a sticky header, this helps keep the section title visible
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top, behavior: "smooth" });

      // Update URL hash without jumping
      history.pushState(null, "", id);
    });
  });
}

/**
 * Adds "active" styling to nav links that match the current path.
 * Works with links like /about/, /apply/, etc.
 *
 * Note: You can style .active in CSS if you want.
 */
function highlightActiveNavLink() {
  const path = normalizePath(window.location.pathname);

  // Find nav links anywhere on the page
  const navLinks = document.querySelectorAll('nav a[href^="/"]');
  if (!navLinks.length) return;

  navLinks.forEach((a) => {
    const href = normalizePath(a.getAttribute("href") || "");
    if (!href) return;

    // Mark active if exact match, or if you're on root "/" and href "/"
    const isActive = href === path;
    if (isActive) {
      a.classList.add("active");
      // Optional inline style if you haven't added CSS for .active
      // a.style.background = "rgba(255,255,255,.06)";
      // a.style.color = "rgba(238,242,255,1)";
    }
  });
}

function normalizePath(p) {
  if (!p) return "/";
  // Ensure trailing slash, except keep root as "/"
  if (p === "/") return "/";
  return p.endsWith("/") ? p : p + "/";
}

/**
 * Prevents accidental double-submit on forms.
 * - Disables submit button
 * - Changes button text to "Submitting…"
 *
 * If the form is missing a button[type=submit], does nothing.
 */
function preventDoubleSubmit() {
  const forms = document.querySelectorAll("form");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", () => {
      const btn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (!btn) return;

      // Disable and show feedback
      btn.disabled = true;

      // Handle both <button> and <input>
      if (btn.tagName.toLowerCase() === "button") {
        btn.dataset.originalText = btn.textContent || "";
        btn.textContent = "Submitting…";
      } else {
        btn.dataset.originalValue = btn.value || "";
        btn.value = "Submitting…";
      }
    });
  });
}

/**
 * Rotates the first word in the hero headline:
 *   <span id="rotWord" class="rotWord">Life</span> won’t wait for your settlement.
 *
 * Cycles every 3s: Bills → Rent → Life
 */
function setupRotatingHeroWord() {
  const el = document.getElementById("rotWord");
  if (!el) return;

  const words = ["Bills", "Rent", "Life"];
  const current = (el.textContent || "").trim();
  let idx = words.indexOf(current);
  if (idx < 0) idx = 0;

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setInterval(() => {
    idx = (idx + 1) % words.length;

    if (reduced) {
      el.textContent = words[idx];
      return;
    }

    el.classList.add("is-out");
    setTimeout(() => {
      el.textContent = words[idx];
      el.classList.remove("is-out");
      el.classList.add("is-in");
      setTimeout(() => el.classList.remove("is-in"), 360);
    }, 220);
  }, 3000);
}
