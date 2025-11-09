document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for "Begin Chapter 1" button
    const beginReadingBtn = document.querySelector('.btn-start-reading');
    if (beginReadingBtn) {
        beginReadingBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href'); // Get the href (e.g., "#chapter-start")
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll smoothly to the target element
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 2. Element Fade-in on Scroll (Intersection Observer)
    const faders = document.querySelectorAll('.manga-panel, .chapter-intro, .chapter-divider, .site-footer');

    const appearOptions = {
        threshold: 0.3, // When 30% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start observing 50px before the bottom of the viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Not visible, do nothing
            } else {
                entry.target.classList.add('appear'); // Add 'appear' class to trigger CSS animation
                appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader); // Observe all elements
    });

    // 3. Title Animation on Page Load
    const heroTitle = document.querySelector('.hero-text h1');
    const heroSubtitle = document.querySelector('.hero-text p');

    if (heroTitle && heroSubtitle) {
        heroTitle.style.opacity = 0;
        heroTitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.opacity = 0;
        heroSubtitle.style.transform = 'translateY(20px)';

        // Animate title
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroTitle.style.opacity = 1;
            heroTitle.style.transform = 'translateY(0)';
        }, 500); // Delay for title

        // Animate subtitle after title
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroSubtitle.style.opacity = 1;
            heroSubtitle.style.transform = 'translateY(0)';
        }, 1500); // Delay for subtitle
    }

    // Optional: Add a simple hover effect to panel images (pure CSS is better for this)
    // For more complex JS animations, you'd use libraries like GSAP.
});