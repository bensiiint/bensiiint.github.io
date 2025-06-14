/* MENU SHOW */ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/*----- ANIMATE -----*/
// OVERLAY
gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: Expo.easeInOut});

// IMG
gsap.from('.home__img', {opacity: 0, duration: 2, delay: 2, x: 60})

// INFORMATION
gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25})
gsap.from('.anime-text', {opacity: 0, duration: 3, delay: 2.3, y: 25, ease:'expo.out', stagger: .3})

// NAV ITEM
gsap.from('.nav__logo', {opacity:0, duration: 3, delay: 3.2, y: 25, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: 3.2, y: 25, ease:'expo.out', stagger: .2})

// SOCIAL
gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease:'expo.out', stagger: .2})

/*----- SMOOTH SCROLLING -----*/
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });
});

/*----- ENHANCED FORM VALIDATION -----*/
// Enhanced contact form validation
const contactForm = document.querySelector('form[action*="web3forms"]');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const subject = contactForm.querySelector('[name="subject"]');
        const message = contactForm.querySelector('[name="message"]');

        // Check required fields
        if (!name.value.trim()) {
            e.preventDefault();
            alert('Please enter your name.');
            name.focus();
            return;
        }

        if (!email.value.trim()) {
            e.preventDefault();
            alert('Please enter your email address.');
            email.focus();
            return;
        }

        if (!subject.value) {
            e.preventDefault();
            alert('Please select a subject.');
            subject.focus();
            return;
        }

        if (!message.value.trim()) {
            e.preventDefault();
            alert('Please enter your message.');
            message.focus();
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            email.focus();
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.contact__button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Reset form after a delay (simulating successful submission)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/*----- PRINT RESUME FUNCTIONALITY -----*/
// Print resume functionality
function printResume() {
    const resumeSection = document.querySelector('.resume-container');
    if (!resumeSection) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>John Vincent S. Arino - Resume</title>
            <style>
                body { 
                    font-family: Arial, sans-serif;
                    color: #000;
                    background: #fff;
                    margin: 20px;
                    line-height: 1.6;
                }
                .resume-header { 
                    text-align: center; 
                    border-bottom: 2px solid #4e1116;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .resume-header h1 { 
                    color: #4e1116; 
                    margin-bottom: 5px;
                }
                .resume-section { 
                    margin: 20px 0; 
                }
                .resume-section h3 { 
                    color: #4e1116;
                    border-bottom: 1px solid #4e1116;
                    padding-bottom: 5px;
                }
                .project-resume { 
                    margin-bottom: 15px; 
                }
                .resume-actions { 
                    display: none; 
                }
                @media print {
                    body { margin: 0; }
                    .resume-actions { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${resumeSection.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Add print functionality to resume buttons
document.addEventListener('DOMContentLoaded', () => {
    const printButtons = document.querySelectorAll('[onclick*="print"]');
    printButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            printResume();
        });
    });
});

/*----- ACTIVE NAVIGATION -----*/
// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id], .home');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id') || 'home';
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if ((href === '#' && current === 'home') || href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/*----- CONSOLE SIGNATURE -----*/
console.log(`
🚀 John Vincent S. Arino's Portfolio
📧 Contact: johnvincent.arino31@gmail.com
🌐 Built with HTML, CSS, and JavaScript
✨ Enhanced with GSAP animations
`);

/*----- ERROR HANDLING -----*/
// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
    });
});

/*----- PERFORMANCE MONITORING -----*/
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
    }
});