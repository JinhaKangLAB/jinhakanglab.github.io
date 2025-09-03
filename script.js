document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n =>
        n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            menu.classList.remove("active");
        }));
});

/*NAV FIXED ANIMATION*/
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { // adjust trigger point
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
});

/*ECOMMERCE GALLERY*/
(function () {
    const ecommerceImages = document.querySelectorAll('.ecommerceImage');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');

    function placeSpread(images) {
        const vw = window.innerWidth;
        let currentY = 100; // starting vertical position

        images.forEach(img => {
            const w = img.offsetWidth;
            const h = img.offsetHeight;

            // Random horizontal position but keep it fully inside viewport
            const x = Math.random() * (vw - w - 40) + 20;

            // Spread vertically with big enough gap to prevent overlap
            const y = currentY;

            img.style.left = x + "px";
            img.style.top = y + "px";

            // Move down for next image (add random spacing for variety)
            currentY += h + 200 + Math.random() * 100;
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                placeSpread(ecommerceImages);
                img.classList.add("visible");
                observer.unobserve(img);
            }
        });
    }, { root: null, threshold: 0.1 });

    ecommerceImages.forEach(img => observer.observe(img));

    // Modal logic
    ecommerceImages.forEach(img => {
        img.addEventListener("click", () => {
            modalImg.src = img.src;
            modal.classList.add("open");
        });
    });
    modal.addEventListener("click", () => modal.classList.remove("open"));

    // Recalculate positions on window resize
    window.addEventListener('resize', () => {
        placeSpread(ecommerceImages);
    });

})();

/*SCROLLANIMATION*/

(function () {
    const cards = Array.from(document.querySelectorAll('.scrollBox'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { root: null, threshold: 0.12 });

    cards.forEach(c => io.observe(c));

    let ticking = false;
    function onScroll() {
        if (ticking || reduceMotion) return;
        ticking = true;
        requestAnimationFrame(() => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            for (const el of cards) {
                if (!el.classList.contains('in-view')) continue;

                const rect = el.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const progress = (center - vh / 2) / (vh / 2);
                const speed = parseFloat(el.dataset.speed || '0.14');

                const maxLift = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--lift')) || 24;
                const y = -progress * maxLift * speed * 2;
                el.style.transform = `translateY(${y}px)`;
            }
            ticking = false;
        });
    }

    function onResize() {
        if (reduceMotion) return;
        for (const el of cards) {
            el.style.transform = '';
        }
        onScroll();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    onScroll();
})();
