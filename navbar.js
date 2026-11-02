/* navbar.js: scroll-spy, compact-on-scroll, progress line, mobile menu extras.
   Kept separate from script.js so it can't be affected by errors in that file. */
(() => {
    const nav = document.getElementById('navbar');
    const ids = ['home-page', 'about-page', 'services-page', 'tutors-page', 'reviews-page', 'results-page', 'contact-page'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

    // every nav link (desktop + mobile), grouped by the section it points to
    const links = new Map();
    document.querySelectorAll('#navbar a.navbar-link, #mobile-nav a').forEach(a => {
        const id = (a.getAttribute('href') || '').replace('#', '');
        if (!ids.includes(id)) return;
        if (!links.has(id)) links.set(id, []);
        links.get(id).push(a);
    });

    let ticking = false;

    function update() {
        ticking = false;
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight;
        const maxScroll = docH - window.innerHeight;

        if (nav) {
            nav.classList.toggle('scrolled', y > 40);
            nav.style.setProperty('--progress', maxScroll > 0 ? Math.min(y / maxScroll, 1).toFixed(4) : '0');
        }

        // current section = the last one whose top has passed 40% of the way down the screen
        let current = sections.length ? sections[0].id : '';
        const line = window.innerHeight * 0.4;
        sections.forEach(s => {
            if (s.getBoundingClientRect().top <= line) current = s.id;
        });
        if (maxScroll > 0 && y >= maxScroll - 4) current = 'contact-page';   // bottom of page

        links.forEach((els, id) => {
            els.forEach(a => {
                const on = id === current;
                a.classList.toggle('active', on);
                if (on) a.setAttribute('aria-current', 'true');
                else a.removeAttribute('aria-current');
            });
        });
    }

    function requestUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    // mobile menu: accessibility state + Escape to close
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.setAttribute('aria-controls', 'mobile-nav');
        hamburger.setAttribute('aria-expanded', 'false');
        const sync = () => hamburger.setAttribute('aria-expanded', String(mobileNav.classList.contains('open')));
        new MutationObserver(sync).observe(mobileNav, { attributes: true, attributeFilter: ['class'] });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) hamburger.click();
        });
    }
})();
