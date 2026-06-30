/* =========================================================
   PEREZ AEP — LIQUID GLASS PORTFOLIO — INTERACTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- WELCOME SCREEN ---------- */
  const welcome = document.getElementById('welcome');
  const enterBtn = document.getElementById('enterBtn');

  enterBtn.addEventListener('click', () => {
    welcome.classList.add('hide');
    document.body.style.overflow = 'auto';
  });

  /* ---------- NAV: scrolled state + active link ---------- */
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header[id]');

  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 40);

    let current = sections[0]?.id;
    const offset = window.innerHeight * 0.35;

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= offset) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- 3D TILT + CURSOR GLOW ON CARDS ---------- */
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    const maxTilt = 8;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- AMBIENT BACKGROUND GLOW FOLLOW (subtle parallax) ---------- */
  const glowA = document.querySelector('.bg-glow-a');
  const glowB = document.querySelector('.bg-glow-b');

  window.addEventListener('mousemove', (e) => {
    const xPct = e.clientX / window.innerWidth - 0.5;
    const yPct = e.clientY / window.innerHeight - 0.5;

    if (glowA) glowA.style.transform = `translate(${xPct * 40}px, ${yPct * 40}px)`;
    if (glowB) glowB.style.transform = `translate(${xPct * -40}px, ${yPct * -40}px)`;
  }, { passive:true });

});
