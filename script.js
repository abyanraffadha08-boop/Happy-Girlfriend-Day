/* ============================================================
   HAPPY GIRLFRIEND DAY — script.js  (v2)

   1. Smooth scroll — Open button
   2. Floating Hearts — Hero background
   3. Reveal on Scroll — IntersectionObserver
   4. Love Button — click hearts + toast
   ============================================================ */


/* ============================================================
   1. SMOOTH SCROLL — "Open this for you" button
   ============================================================ */
const btnOpen = document.getElementById("btnOpen");
const introSection = document.getElementById("intro");

btnOpen.addEventListener("click", function () {
  introSection.scrollIntoView({ behavior: "smooth" });
});


/* ============================================================
   2. FLOATING HEARTS — Hero background
   Small hearts drift upward slowly. Kept minimal (not too many).
   ============================================================ */
const heartsContainer = document.getElementById("heartsContainer");
const heartSymbols = ["\u2665", "\u2661"];

function spawnHeroHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.setAttribute("aria-hidden", "true");

  // Horizontal position: avoid extreme edges
  heart.style.left = (8 + Math.random() * 84) + "%";

  // Size: small and varied
  const size = (Math.random() * 0.55 + 0.55).toFixed(2);
  heart.style.fontSize = size + "rem";

  // Float duration: slow and relaxed
  const duration = (Math.random() * 9 + 14).toFixed(1);
  heart.style.animationDuration = duration + "s";

  // Delay so they stagger naturally
  const delay = (Math.random() * 6).toFixed(1);
  heart.style.animationDelay = delay + "s";

  heartsContainer.appendChild(heart);

  // Clean up DOM after animation ends
  const totalMs = (parseFloat(duration) + parseFloat(delay)) * 1000 + 400;
  setTimeout(function () { heart.remove(); }, totalMs);
}

// Initial wave
for (let i = 0; i < 6; i++) { spawnHeroHeart(); }

// Keep a gentle trickle going
setInterval(function () {
  const count = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < count; i++) { spawnHeroHeart(); }
}, 3000);


/* ============================================================
   3. REVEAL ON SCROLL — fade + slide-up on viewport entry
   ============================================================ */
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }
);

revealEls.forEach(function (el) { observer.observe(el); });


/* ============================================================
   4. LOVE BUTTON — flying hearts + toast notification
   ============================================================ */
const btnLove = document.getElementById("btnLove");
const toast = document.getElementById("toast");
const clickHeartsWrap = document.getElementById("clickHearts");

let toastTimer = null;

btnLove.addEventListener("click", function () {
  const rect = btnLove.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  launchHearts(cx, cy);
  showToast();
});

function launchHearts(originX, originY) {
  const chars = ["\u2665", "\u2661", "\u2665", "\u2665"];
  const total = 10;

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("span");
    heart.className = "click-heart";
    heart.textContent = chars[Math.floor(Math.random() * chars.length)];

    // Spread around origin
    const offsetX = (Math.random() - 0.5) * 120;
    const offsetY = (Math.random() - 0.5) * 50;
    heart.style.left = (originX + offsetX) + "px";
    heart.style.top  = (originY + offsetY) + "px";

    // Varied size
    const size = (Math.random() * 0.7 + 0.85).toFixed(2);
    heart.style.fontSize = size + "rem";

    // Stagger slightly
    heart.style.animationDelay = (i * 0.04).toFixed(2) + "s";

    clickHeartsWrap.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 1600);
  }
}

function showToast() {
  if (toastTimer) clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
    toastTimer = null;
  }, 3200);
}
