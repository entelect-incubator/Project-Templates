(function () {
    'use strict'
    const form = document.getElementById("pezza-form");
    const successAlert = document.getElementById("successAlert");
    const errorAlert = document.getElementById("errorAlert");

    form.addEventListener("submit", onFormSubmit);

    function onFormSubmit(event) {
        event.preventDefault();
        
        // Hide alerts
        successAlert.classList.add('hidden');
        errorAlert.classList.add('hidden');

        // Check if pizzas are selected
        const checkboxes = document.querySelectorAll("input[name='pizza-selection']:checked");
        if (checkboxes.length === 0) {
            errorAlert.classList.remove('hidden');
            return;
        }

        // Build data object
            // Build data object including quantities for selected pizzas
            const dataObject = Object.fromEntries(new FormData(event.target).entries());
            // gather selected pizzas with quantities
            const pizzas = Array.from(checkboxes).map(checkbox => {
                const id = checkbox.value; // e.g. 'hawaiian'
                // try to find quantity input by convention: qty_<id>
                const qtyInput = document.getElementById('qty_' + id);
                const quantity = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
                return { id, quantity };
            });
            // remove checkbox entries from dataObject (we'll provide structured pizzas)
            delete dataObject["pizza-selection"];
            // include structured pizzas array
            dataObject.pizzas = pizzas;

    // Log order data (in real app, would send to server)
    console.log('Order placed:', dataObject);

        // Show payload inside the success alert for demo / integration testing
        const payloadEl = document.getElementById('orderPayload');
        if (payloadEl) {
            try {
                payloadEl.textContent = JSON.stringify(dataObject, null, 2);
                payloadEl.style.display = 'block';
                payloadEl.setAttribute('aria-hidden', 'false');
            } catch (err) {
                // ignore JSON issues
            }
        }

        // Show success
        successAlert.classList.remove('hidden');

        // Reset form inputs (order fields only)
        form.reset();

        // Also clear menu selections (checkboxes outside the form) and reset quantities
        const pizzaCheckboxes = document.querySelectorAll("input[name='pizza-selection']");
        pizzaCheckboxes.forEach(cb => cb.checked = false);
        const qtyInputs = document.querySelectorAll("input[id^='qty_']");
        qtyInputs.forEach(q => q.value = 1);

        // Auto-hide success message (and payload) after 5 seconds
        setTimeout(() => {
            successAlert.classList.add('hidden');
            if (payloadEl) {
                payloadEl.style.display = 'none';
                payloadEl.setAttribute('aria-hidden', 'true');
            }
        }, 5000);

        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
})();

/* ============================================
     Cursor-follow glow for .card-hover
     Adds --mouse-x and --mouse-y CSS variables (percent) and toggles .has-glow
     so the CSS pseudo-element displays a radial glow following the pointer.
     Works with pointer events (mouse/touch/stylus).
============================================ */
(function () {
    const cards = document.querySelectorAll('.card-hover');
    if (!cards || cards.length === 0) return;

    function handlePointerMove(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        el.style.setProperty('--mouse-x', px + '%');
        el.style.setProperty('--mouse-y', py + '%');
    }

    function handlePointerEnter(e) {
        e.currentTarget.classList.add('has-glow');
    }

    function handlePointerLeave(e) {
        const el = e.currentTarget;
        el.classList.remove('has-glow');
        // optional: reset to center
        el.style.setProperty('--mouse-x', '50%');
        el.style.setProperty('--mouse-y', '50%');
    }

    cards.forEach(card => {
        // set sensible defaults
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
        card.addEventListener('pointermove', handlePointerMove);
        card.addEventListener('pointerenter', handlePointerEnter);
        card.addEventListener('pointerleave', handlePointerLeave);
    });
})();

/* ============================================
   Hero parallax: move the overlay (not the video) for a subtle parallax.
   This keeps the video visually stable while the overlay shifts slightly.
   Uses rAF throttling and avoids running on small screens.
============================================ */
(function () {
    const hero = document.querySelector('.hero-video');
    const overlay = document.querySelector('.hero-overlay');
    const video = document.querySelector('.hero-video video');
    if (!hero || !overlay || !video) return;

    // Disable on small screens to avoid layout issues
    function isSmallScreen() {
        return window.innerWidth < 640;
    }

    let ticking = false;
    const AMPLITUDE = 12; // px, changeable

    function resetTransforms() {
        overlay.style.transform = '';
        video.style.transform = '';
    }

    function update() {
        const rect = hero.getBoundingClientRect();
        const windowH = window.innerHeight || document.documentElement.clientHeight;

        // If the hero is not visible in the viewport, reset transforms and skip.
        if (rect.bottom <= 0 || rect.top >= windowH) {
            resetTransforms();
            ticking = false;
            return;
        }

        const heroCenter = rect.top + rect.height / 2;
        const viewportCenter = windowH / 2;
        const diff = viewportCenter - heroCenter;
        const pct = Math.max(-1, Math.min(1, diff / rect.height));
        // translate amount
        const translate = pct * AMPLITUDE; // px

    // Apply vertical transform to the absolute video (keep scale from CSS)
    video.style.transform = `translate3d(0, ${translate}px, 0) scale(1.15)`;

    // Optionally a tiny overlay nudge for foreground elements (subtle)
    overlay.style.transform = `translate3d(0, ${translate * 0.35}px, 0)`;

        ticking = false;
    }

    function onScroll() {
        if (isSmallScreen()) {
            // reset transform on small screens
            resetTransforms();
            return;
        }

        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // initial
    onScroll();
})();

/* ============================================
   Footer snap visibility observer
   Adds/removes `.footer-visible` when the footer is in view so CSS can
   animate the footer when snapped into the viewport.
============================================ */
(function () {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Use IntersectionObserver to toggle a presentational class when the
    // footer is sufficiently visible (60% of viewport height).
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
                footer.classList.add('footer-visible');
            } else {
                footer.classList.remove('footer-visible');
            }
        });
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    io.observe(footer);
})();