document.addEventListener('DOMContentLoaded', () => {




    //nobile-about-page-scroll
const contactPage = document.querySelector('.contact-form-wrapper');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        contactPage.classList.add('contact-visible');
    }
});

    //navbar mobile
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    function closeNav() {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('#mobile-nav a').forEach(link => {
        link.addEventListener('click', closeNav);
    });


    /* ── FIX 1: Hamburger colour adapts to background section ───── */
    const lightSections = ['about-page', 'services-page', 'results-page', 'contact-page', 'footer'];
    
    function updateHamburgerColour() {
        if (window.innerWidth > 768) return;
        const midY = window.innerHeight / 2;
        let isDark = false;
        for (const id of lightSections) {
            const el = document.getElementById(id) || document.querySelector('.' + id);
            if (!el) continue;
            const r = el.getBoundingClientRect();
            if (r.top <= midY && r.bottom >= midY) { isDark = true; break; }
        }
        hamburger.classList.toggle('dark', isDark);
    }
    
    window.addEventListener('scroll', updateHamburgerColour, { passive: true });
    updateHamburgerColour();
    
    /* ── FIX 6: Touch swipe on reviews carousel ────────────────── */
    (function() {
        const container = document.querySelector('.review-container');
        if (!container) return;
    
        let startX = 0;
    
        container.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        }, { passive: true });
    
        container.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) < 40) return; // ignore tiny taps
            if (diff > 0) {
                document.getElementById('arrow-right')?.click();
            } else {
                document.getElementById('arrow-left')?.click();
            }
        }, { passive: true });
    })();



    //subject-form
    const subjectPills = [...document.querySelectorAll('[data-subject]')];
    const levelPills = [...document.querySelectorAll('[data-level]')];
    const infoCard = document.querySelector('.subject-info');
    const titleEl = document.getElementById('subject-title');
    const textEl = document.getElementById('subject-text');
    const tagEl = document.getElementById('subject-tag');

    const defaultTitle = 'What we Offer';
    const defaultText = `
    <p>UpGrade Tutors offers tutoring in a wide range of STEM subjects aligned with the SQA curriculum</p>
    <br>
    <p>Our tutors offer tutoring at NAT 5, Higher and Advanced Higher levels.</p>
    `;

    const content = {
    nat5: {
        maths: {
        title: 'Maths',
        text: `<p>National 5 Maths covers algebra,
         geometry, trigonometry, statistics, 
        probability and numeracy.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        physics: {
        title: 'Physics',
        text: `<p>National 5 Physics covers forces, energy, electricity, waves and space.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        chemistry: {
        title: 'Chemistry',
        text: `<p>National 5 Chemistry covers chemical reactions, atoms, bonding, acids and bases, and energy.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        biology: {
        title: 'Biology',
        text: `<p>National 5 Biology covers cell biology, multicellular organisms and life on Earth.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        mathsapps: {
        title: 'Applications of Maths',
        text: `<p>National 5 Applications of Mathematics develops mathematical skills through real-life and practical contexts.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        engineeringscience: {
        title: 'Engineering Science',
        text: `<p>National 5 Engineering Science covers mechanical, electronic and structural systems and their applications.<br><br>Our tutors help students develop problem-solving skills and confidence across the course.</p>`
        }
    },

    higher: {
        maths: {
        title: 'Maths',
        text: `<p>Higher Maths covers algebra, geometry, trigonometry, calculus, statistics and mathematical reasoning.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        physics: {
        title: 'Physics',
        text: `<p>Higher Physics covers mechanics, electricity, waves, particles and space.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        chemistry: {
        title: 'Chemistry',
        text: `<p>Higher Chemistry covers chemical reactions, bonding, energetics, organic chemistry and chemical analysis.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        biology: {
        title: 'Biology',
        text: `<p>Higher Biology covers DNA and the genome, metabolism and survival, and sustainability and interdependence.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        mathsapps: {
        title: 'Applications of Maths',
        text: `<p>Higher Applications of Mathematics develops mathematical skills through real-life, financial and statistical contexts.<br><br>Our tutors help students build confidence while developing the skills needed to succeed in the course.</p>`
        },
        engineeringscience: {
        title: 'Engineering Science',
        text: `<p>Higher Engineering Science covers mechanical, structural and electronic systems, alongside design and problem-solving.<br><br>Our tutors help students develop confidence in applying engineering principles to complex problems.</p>`
        }

    },
    advancedhigher: {
        maths: {
        title: 'Maths',
        text: `<p>Advanced Higher Maths further develops skills in algebra, calculus, geometry, trigonometry and mathematical reasoning.<br><br>Our tutors help students develop the depth of understanding needed to tackle challenging problems.</p>`
        },
        physics: {
        title: 'Physics',
        text: `<p>Advanced Higher Physics explores mechanics, waves, fields, particles and the wider principles of modern physics.<br><br>Our tutors help students develop strong problem-solving skills and a deeper understanding of physics.</p>`
        },
        chemistry: {
        title: 'Chemistry',
        text: `<p>Advanced Higher Chemistry covers advanced organic, inorganic and physical chemistry alongside experimental techniques.<br><br>Our tutors help students develop the understanding and analytical skills needed for advanced study.</p>`
        },
        biology: {
        title: 'Biology',
        text: `<p>Advanced Higher Biology explores complex biological processes, cells, organisms and evolution through a deeper scientific approach.<br><br>Our tutors help students develop the knowledge and analytical skills needed for advanced study.</p>`
        },
        mathsapps: {
        title: 'Applications of Maths',
        text: `<p>Your NAT 5 Maths text here.</p>`
        },
        engineeringscience: {
        title: 'Engineering Science',
        text: `<p>Advanced Higher Engineering Science develops advanced understanding of mechanical, structural and electronic systems.<br><br>Our tutors help students apply engineering principles to challenging problems and design tasks.</p>`
        }

    }
  

    };



if (infoCard && titleEl && textEl) {

    let subject = '';
    let level = '';

    const labelOf = (pills, attr, value) => {
        const p = pills.find(x => x.dataset[attr] === value);
        return p ? p.textContent.trim() : '';
    };

    function updateSubjectInfo() {
        const match = content[level] && content[level][subject];
        let title = defaultTitle;
        let text = defaultText;
        let tag = '';

        if (match) {
            title = match.title;
            text = match.text;
            tag = labelOf(levelPills, 'level', level) + ' \u00b7 ' + labelOf(subjectPills, 'subject', subject);
        } else if (subject) {
            title = labelOf(subjectPills, 'subject', subject);
            text = '<p>Now choose a level to see what we cover.</p>';
        } else if (level) {
            title = labelOf(levelPills, 'level', level);
            text = '<p>Now choose a subject to see what we cover.</p>';
        }

        infoCard.classList.add('swap');
        setTimeout(() => {
            titleEl.textContent = title;
            textEl.innerHTML = text;
            if (tagEl) {
                tagEl.textContent = tag;
                tagEl.hidden = !tag;
            }
            infoCard.classList.remove('swap');
        }, 160);
    }

    function syncPills() {
        const current = subjectPills.find(p => p.dataset.subject === subject);
        const allowed = current && current.dataset.levels ? current.dataset.levels.split(',') : null;

        levelPills.forEach(p => {
            const blocked = !!allowed && !allowed.includes(p.dataset.level);
            p.classList.toggle('disabled', blocked);
            p.setAttribute('aria-disabled', String(blocked));
            if (blocked && level === p.dataset.level) level = '';
        });

        subjectPills.forEach(p => {
            const on = p.dataset.subject === subject;
            p.classList.toggle('active', on);
            p.setAttribute('aria-pressed', String(on));
        });
        levelPills.forEach(p => {
            const on = p.dataset.level === level;
            p.classList.toggle('active', on);
            p.setAttribute('aria-pressed', String(on));
        });
    }

    subjectPills.forEach(p => p.addEventListener('click', () => {
        subject = subject === p.dataset.subject ? '' : p.dataset.subject;
        syncPills();
        updateSubjectInfo();
    }));

    levelPills.forEach(p => p.addEventListener('click', () => {
        if (p.classList.contains('disabled')) return;
        level = level === p.dataset.level ? '' : p.dataset.level;
        syncPills();
        updateSubjectInfo();
    }));
}

    //Contact form
    const subjectsContainer = document.getElementById('subjects-container');
    const MAX_SUBJECTS = 3;

    function updateRemoveButtons() {
        const rows = subjectsContainer.querySelectorAll('.form-group-row');
        rows.forEach((row, index) => {
            const removeBtn = row.querySelector('.remove-subject-btn');
            const isLastRow = index === rows.length - 1;
            const isOnlyRow = rows.length === 1;
            removeBtn.style.display = (isLastRow && !isOnlyRow) ? 'inline-block' : 'none';
        });
    }

    function updateAddButtons() {
        const rows = subjectsContainer.querySelectorAll('.form-group-row');
        rows.forEach((row, index) => {
            const addBtn = row.querySelector('.add-subject-btn');
            const isLastRow = index === rows.length - 1;
            const belowMax = rows.length < MAX_SUBJECTS;
            addBtn.style.display = (isLastRow && belowMax) ? 'inline-block' : 'none';
        });
    }

    if (subjectsContainer) {
        subjectsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.add-subject-btn')) {
                const rows = subjectsContainer.querySelectorAll('.form-group-row');
                if (rows.length >= MAX_SUBJECTS) return;

                const firstRow = subjectsContainer.querySelector('.form-group-row');
                const newRow = firstRow.cloneNode(true);

                newRow.querySelectorAll('select').forEach(select => {
                    select.selectedIndex = 0;
                });

                subjectsContainer.appendChild(newRow);
                updateRemoveButtons();
                updateAddButtons();
            }

            if (e.target.closest('.remove-subject-btn')) {
                e.target.closest('.form-group-row').remove();
                updateRemoveButtons();
                updateAddButtons();
            }
        });

        updateRemoveButtons();
        updateAddButtons();
    }

    // Form submission and redirect
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {

            // Stop Formspree from controlling the page redirect
            e.preventDefault();

            const submitButton = contactForm.querySelector('.contact-submit');

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            try {

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {

                    // Formspree accepted the submission
                    window.location.href = 'https://upgrade-tutors.com/thank-you.html';

                } else {

                    throw new Error('Form submission failed');

                }

            } catch (error) {

                console.error(error);

                submitButton.disabled = false;
                submitButton.textContent = 'Submit';

                alert('There was a problem sending your enquiry. Please try again.');

            }
        });
    }


    //review section
    const container = document.querySelector('.review-container');
    const positions = ['far-left', 'left', 'active', 'right', 'far-right'];

    function getCards() {
        return [...container.querySelectorAll('.review')];
    }

    function assignClasses() {
        getCards().forEach((card, i) => {
            card.classList.remove(...positions);
            card.classList.add(positions[i]);
        });
    }

    function rotateLeft() {
        const cards = getCards();
        container.prepend(cards[cards.length - 1]);
        assignClasses();
    }

    function rotateRight() {
        const cards = getCards();
        container.appendChild(cards[0]);
        assignClasses();
    }

    document.getElementById('arrow-left').addEventListener('click', rotateLeft);
    document.getElementById('arrow-right').addEventListener('click', rotateRight);

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.review');
        if (!card) return;
        const i = getCards().indexOf(card);
        if (i < 2) rotateLeft();
        else if (i > 2) rotateRight();
    });

    assignClasses();

    });



    //mobile about boxes
    const aboutTrack = document.querySelector('.about-track');
    const aboutDots = document.querySelectorAll('.about-dot');
    const aboutThumb = document.getElementById('about-thumb');

    if (aboutTrack) {
        aboutTrack.addEventListener('scroll', () => {
            // dots
            const total = aboutTrack.scrollWidth - aboutTrack.clientWidth;
            const progress = aboutTrack.scrollLeft / total;
            const index = Math.round(progress * (aboutDots.length - 1));
            aboutDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // thumb
            if (aboutThumb) {
                const percent = (aboutTrack.scrollLeft / total) * 100;
                aboutThumb.style.left = `calc(${percent}% - 6px)`;
            }
        }, { passive: true });
    }


// tutor "Request" buttons: pre-fill the enquiry form with the chosen tutor
(function () {
    const info = document.getElementById('info');
    if (!info) return;

    document.querySelectorAll('.tutor-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const note = "I'd like to request " + btn.dataset.tutor + " as my tutor.";
            // only fill the box if it's empty or still holds our own earlier text
            if (!info.value.trim() || info.value === info.dataset.auto) {
                info.value = note;
                info.dataset.auto = note;
            }
        });
    });
});

    (function () {
        const stage = document.getElementById('rv-stage');
        const grid = document.getElementById('rv-grid');
        if (!stage || !grid) return;
 
        const cards = [...grid.querySelectorAll('.rv-card')];
        const prev = document.getElementById('rv-prev');
        const next = document.getElementById('rv-next');
        const count = document.getElementById('rv-count');
        const dotsBox = document.getElementById('rv-dots');
        const empty = document.getElementById('rv-empty');
        const emptyTitle = document.getElementById('rv-empty-title');
        const pills = [...document.querySelectorAll('[data-filter]')];
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
        let filter = 'all';
        let page = 0;
        let size = 3;
 
        // cards per row: 3 on desktop, 2 on tablet, 1 on phone
        function perRow() {
            const w = window.innerWidth;
            return w >= 760 ? 3 : (w >= 520 ? 2 : 1);
        }
 
        function pool() {
            return cards.filter(c => filter === 'all' || c.dataset.subject === filter);
        }
 
        function pageCount(n) {
            return Math.max(1, Math.ceil(n / size));
        }
 
        // the last row always shows the final cards, so it is never half empty
        function startOf(p, n) {
            return Math.max(0, Math.min(p * size, n - size));
        }
 
        function render(dir) {
            const list = pool();
            const n = list.length;
            const pages = pageCount(n);
            page = Math.min(page, pages - 1);
            const start = startOf(page, n);
            const end = Math.min(n, start + size);
 
            grid.style.setProperty('--cols', size);
            cards.forEach(c => { c.hidden = true; });
            list.slice(start, end).forEach(c => { c.hidden = false; });
 
            // no reviews for this subject yet
            empty.hidden = n !== 0;
            grid.hidden = n === 0;
            if (n === 0) {
                const active = document.querySelector('[data-filter][aria-pressed="true"]');
                emptyTitle.textContent = 'No ' + active.textContent + ' reviews yet';
            }
 
            if (n === 0) {
                count.textContent = 'No reviews for this subject yet';
            } else if (n <= size) {
                count.textContent = 'Showing all ' + n + (n === 1 ? ' review' : ' reviews');
            } else if (start + 1 === end) {
                count.textContent = 'Showing ' + end + ' of ' + n + ' reviews';
            } else {
                count.textContent = 'Showing ' + (start + 1) + '\u2013' + end + ' of ' + n + ' reviews';
            }
 
            prev.disabled = page <= 0;
            next.disabled = page >= pages - 1;
 
            // dots: one per row of cards
            dotsBox.innerHTML = '';
            if (pages > 1) {
                for (let i = 0; i < pages; i++) {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'rv-dot';
                    dot.setAttribute('aria-label', 'Go to row ' + (i + 1));
                    if (i === page) dot.setAttribute('aria-current', 'true');
                    dot.addEventListener('click', () => go(i));
                    dotsBox.appendChild(dot);
                }
            }
 
            if (dir && !reduceMotion && grid.animate) {
                grid.animate(
                    [{ opacity: 0, transform: 'translateX(' + (dir * 48) + 'px)' }, { opacity: 1, transform: 'none' }],
                    { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' }
                );
            }
        }
 
        function go(p) {
            const pages = pageCount(pool().length);
            p = Math.max(0, Math.min(pages - 1, p));
            if (p === page) return;
            const dir = p > page ? 1 : -1;
            page = p;
            render(dir);
        }
 
        prev.addEventListener('click', () => go(page - 1));
        next.addEventListener('click', () => go(page + 1));
 
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(o => o.setAttribute('aria-pressed', String(o === pill)));
                filter = pill.dataset.filter;
                page = 0;
                render(0);
            });
        });
 
        // swipe or drag sideways to turn the row
        let startX = 0;
        let startY = 0;
        let tracking = false;
        let suppress = false;
 
        stage.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, a')) return;
            tracking = true;
            startX = e.clientX;
            startY = e.clientY;
        });
 
        stage.addEventListener('pointerup', (e) => {
            if (!tracking) return;
            tracking = false;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 10) {
                suppress = true;                  // a drag shouldn't count as a click on a card
                setTimeout(() => { suppress = false; }, 0);
            }
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
                go(page + (dx < 0 ? 1 : -1));
            }
        });
 
        stage.addEventListener('pointercancel', () => { tracking = false; });
 
        stage.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') go(page + 1);
            if (e.key === 'ArrowLeft') go(page - 1);
        });
 
        // full review pop-up
        const modal = document.getElementById('rv-modal');
        const modalCard = document.getElementById('rv-modal-card');
        const modalBody = document.getElementById('rv-modal-body');
        const closeBtn = document.getElementById('rv-close');
        let lastFocus = null;
 
        function openModal(card) {
            lastFocus = document.activeElement;
            modalBody.innerHTML = '';
 
            const text = document.createElement('p');
            text.className = 'rv-modal-text';
            text.textContent = card.querySelector('.rv-text').textContent;
 
            modalBody.appendChild(card.querySelector('.rv-stars').cloneNode(true));
            modalBody.appendChild(text);
            modalBody.appendChild(card.querySelector('.rv-foot').cloneNode(true));
 
            modalCard.classList.toggle('sample', card.classList.contains('sample'));
            modalCard.scrollTop = 0;
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }
 
        function closeModal() {
            modal.hidden = true;
            document.body.style.overflow = '';
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }
 
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.rv-card');
            if (!card || suppress) return;
            openModal(card);
        });
 
        closeBtn.addEventListener('click', closeModal);
 
        modal.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-close')) closeModal();
        });
 
        document.addEventListener('keydown', (e) => {
            if (modal.hidden) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'Tab') {                // keeps focus inside the pop-up
                e.preventDefault();
                closeBtn.focus();
            }
        });
 
        window.addEventListener('resize', () => {
            const s = perRow();
            if (s !== size) {
                size = s;
                render(0);
            }
        });
 
        size = perRow();
        render(0);
    })();

    // Results section: count the stats up from 0 when they scroll into view
(function () {
    const wrap = document.getElementById('results-stats');
    if (!wrap) return;

    const stats = [...wrap.querySelectorAll('.results-stat')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DURATION = 2200;                    // ms
    const STAGGER = 150;                      // ms between cards

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function format(n) {
        return Math.round(n).toLocaleString('en-GB');
    }

    function paint(stat, progress) {
        const el = stat.querySelector('.results-value');
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        el.textContent = format(target * progress) + suffix;
        stat.style.setProperty('--p', progress);
    }

    function run(stat, delay) {
        const start = performance.now() + delay;

        function frame(now) {
            if (now < start) { requestAnimationFrame(frame); return; }
            const t = Math.min((now - start) / DURATION, 1);
            paint(stat, easeOutCubic(t));
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    // no animation wanted: leave the final numbers (already in the HTML) and fill the bars
    if (reduceMotion || !('IntersectionObserver' in window)) {
        stats.forEach(s => paint(s, 1));
        return;
    }

    // start everything at 0 (the HTML holds the final numbers as a no-JS fallback)
    stats.forEach(s => paint(s, 0));

    let played = false;
    const io = new IntersectionObserver((entries) => {
        if (played || !entries.some(e => e.isIntersecting)) return;
        played = true;                        // only count up the first time
        stats.forEach((s, i) => run(s, i * STAGGER));
        io.disconnect();
    }, { threshold: 0.35 });

    io.observe(wrap);
})();
 

const tutorCards = document.querySelectorAll('.tutor-card');

function closeTutorCards() {
    tutorCards.forEach(c => c.classList.remove('is-open'));
}

tutorCards.forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('.tutor-cta')) return;   // let the Request link work normally
        const wasOpen = card.classList.contains('is-open');
        closeTutorCards();
        if (!wasOpen) card.classList.add('is-open');
    });
});

// tapping anywhere outside a card closes it and restarts the carousel
document.addEventListener('click', e => {
    if (!e.target.closest('.tutor-card')) closeTutorCards();
});

