// --- MOTION FEATURE 1: Parallax Mouse-Tracking ---
const heroContainer = document.querySelector('.hero-container');
const layers = document.querySelectorAll('.parallax-layer');
const sensitivity = 20; // Max shift in pixels for smooth desktop effect

if (heroContainer) {
    heroContainer.addEventListener('mousemove', (e) => {
        // Calculate the mouse position relative to the center of the hero area
        const rect = heroContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalized ratio (-1 to 1)
        const xRatio = (e.clientX - centerX) / (rect.width / 2);
        const yRatio = (e.clientY - centerY) / (rect.height / 2);

        layers.forEach((layer, index) => {
            // Speed factor: layers with higher index (more foreground) move faster
            const speed = (index + 1) * 0.3; 
            
            const xTranslate = xRatio * sensitivity * speed;
            const yTranslate = yRatio * sensitivity * speed;

            // Apply 3D transform for hardware acceleration and smooth motion
            // Use the existing translateZ value (set in CSS) to maintain depth
            const zValue = (layer.classList.contains('layer-bg')) ? '-500px' : '0';

            layer.style.transform = `
                translate3d(${xTranslate}px, ${yTranslate}px, ${zValue})
            `;
        });
    });
}


// --- MOTION FEATURE 2: Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    for (let i = 0; i < revealElements.length; i++) {
        let element = revealElements[i];
        
        // When the element is 150px into the viewport, it's considered active
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 150; 

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            // Optional: Remove 'active' if element scrolls out of view (for repeated viewing)
            element.classList.remove('active');
        }
    }
}

// Initial check when the page loads
window.addEventListener('load', checkReveal);
// Check whenever the user scrolls
window.addEventListener('scroll', checkReveal);


// Functional Feature: Contact Form Submission
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! A specialist from Kakra Auto Works will contact you shortly.');
    e.target.reset(); // Clear the form
});