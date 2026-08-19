document.addEventListener('DOMContentLoaded', () => {



    //Navbar
    const navbar = document.getElementById('navbar');
    const navbarBlur = document.getElementById('navbar-blur');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            navbar.classList.add('navbar-visible');
            navbarBlur.style.opacity = '1';
        } else {
            navbar.classList.remove('navbar-visible');
            navbarBlur.style.opacity = '0';
        }
    });


    //nobile-about-page-scroll
const aboutPage = document.querySelector('.about-page');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        aboutPage.classList.add('about-visible');
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
    const subjectSelect = document.getElementById('subject-select');
    const levelSelect = document.getElementById('level-select');

    const titleEl = document.querySelector('.subject-title p');
    const textEl = document.querySelector('.subject-text');

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



subjectSelect.addEventListener('change', updateSubjectInfo);
levelSelect.addEventListener('change', updateSubjectInfo);


function updateSubjectInfo() {
  const subject = subjectSelect.value;
  const level = levelSelect.value;
  const buttonHTML = document.querySelector('.subject-button').outerHTML;

  // Filter level options
  const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
  const allowedLevels = selectedOption.dataset.levels;
  Array.from(levelSelect.options).forEach(opt => {
    if (!allowedLevels || allowedLevels.split(',').includes(opt.value) || opt.value === '') {
      opt.hidden = false;
    } else {
      opt.hidden = true;
      if (levelSelect.value === opt.value) levelSelect.value = '';
    }
  });

  // Adjust title font size for long names
  const longTitles = ['mathsapps', 'engineeringscience'];
  titleEl.style.fontSize = longTitles.includes(subject) ? '1.8rem' : '2.8rem';

  // Update content
  if (content[level] && content[level][subject]) {
    const match = content[level][subject];
    titleEl.textContent = match.title;
    textEl.innerHTML = match.text + buttonHTML;
  } else {
    titleEl.textContent = defaultTitle;
    textEl.innerHTML = defaultText + buttonHTML;
  }
}

subjectSelect.addEventListener('change', updateSubjectInfo);
levelSelect.addEventListener('change', updateSubjectInfo);



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



//mobile services scrollbar 
const container = document.querySelector('.services-container');
const thumb = document.getElementById('services-thumb');

container.addEventListener('scroll', () => {
    const scrolled = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const percent = (scrolled / maxScroll) * 100;
    thumb.style.left = `calc(${percent}% - 6px)`;
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