/* =========================================
   EMF HOME TESTING
   MAIN.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initRevealAnimations();
    initCounters();
    initParticles();
    initNavbarEffects();

});

/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    const links = navMenu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });
}

/* =========================================
   SCROLL REVEAL
========================================= */

function initRevealAnimations() {

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                }
            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(el => observer.observe(el));
}

/* =========================================
   COUNTER ANIMATION
========================================= */

function initCounters() {

    const counters = document.querySelectorAll(".hero-stats h3");

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);
            });

        },

        {
            threshold: 0.5
        }

    );

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {

    const originalText = element.textContent.trim();

    let target = 0;

    if (originalText.includes("500")) {
        target = 500;
    }
    else if (originalText.includes("100")) {
        target = 100;
    }
    else {
        return;
    }

    const suffix = originalText.replace(/[0-9]/g, "");

    let current = 0;

    const duration = 2000;
    const stepTime = 16;

    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);
        }

        element.textContent =
            Math.floor(current) + suffix;

    }, stepTime);
}

/* =========================================
   NAVBAR EFFECT
========================================= */

function initNavbarEffects() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(5,8,22,.92)";

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.35)";

        } else {

            navbar.style.background =
                "rgba(5,8,22,.75)";

            navbar.style.boxShadow = "none";
        }
    });
}

/* =========================================
   PARTICLE SYSTEM
========================================= */

function initParticles() {

    const canvas =
        document.getElementById("particle-canvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    function resize() {

        width = canvas.width =
            window.innerWidth;

        height = canvas.height =
            window.innerHeight;

        generateParticles();
    }

    function generateParticles() {

        particles = [];

        const count =
            Math.floor(width / 18);

        for (let i = 0; i < count; i++) {

            particles.push({

                x: Math.random() * width,
                y: Math.random() * height,

                size:
                    Math.random() * 2 + 1,

                speedX:
                    (Math.random() - 0.5) * 0.4,

                speedY:
                    (Math.random() - 0.5) * 0.4,

                opacity:
                    Math.random() * 0.6 + 0.1
            });
        }
    }

    function drawParticle(p) {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0,212,255,${p.opacity})`;

        ctx.fill();
    }

    function connectParticles() {

        const maxDistance = 120;

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx =
                    particles[a].x - particles[b].x;

                const dy =
                    particles[a].y - particles[b].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {

                    const opacity =
                        (maxDistance - distance) /
                        maxDistance *
                        0.15;

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                        `rgba(0,212,255,${opacity})`;

                    ctx.lineWidth = 1;

                    ctx.stroke();
                }
            }
        }
    }

    function updateParticles() {

        particles.forEach(p => {

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
    }

    function render() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateParticles();

        connectParticles();

        particles.forEach(drawParticle);

        requestAnimationFrame(render);
    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );

    render();
}

/* =========================================
   SMOOTH SCROLL ENHANCEMENT
========================================= */

document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (targetId === "#")
                return;

            const target =
                document.querySelector(targetId);

            if (!target)
                return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"
            });
        });
    });

/* =========================================
   OPTIONAL FUTURE FEATURES

   - GSAP Animations
   - Testimonial Carousel
   - Report Gallery
   - Contact Form API
   - Booking Calendar
   - Interactive EMF Heatmap
   - Google Reviews Feed
   - Dark/Light Toggle
========================================= */
