// --- IMPROVED THEME MANAGER: PERFECT MOON FIX ---
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const moonMaskCircle = document.querySelector('#moon-mask circle');
    const sunCircle = document.querySelector('.sun');
    const body = document.body;

    function applyMoonShape(theme) {
        if (!moonMaskCircle) return;
        
        if (theme === 'dark-mode') {
            // Force the mask to a larger size and specific position 
            // to create a nice crescent shape on the sun
            moonMaskCircle.setAttribute('cx', '18'); 
            moonMaskCircle.setAttribute('cy', '10');
            moonMaskCircle.setAttribute('r', '7'); // Makes the "cut" larger for a better moon
            
            // Disable the CSS transform that was pushing it away
            moonMaskCircle.style.transform = 'translateX(0)'; 
            if(sunCircle) sunCircle.style.transform = 'scale(1)';
        } else {
            // Move it away entirely for the sun
            moonMaskCircle.setAttribute('cx', '25');
            moonMaskCircle.setAttribute('cy', '10');
            moonMaskCircle.setAttribute('r', '6');
            
            moonMaskCircle.style.transform = 'translateX(0)';
        }
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme);
    
    // Immediate apply and a small delay to override CSS transitions
    applyMoonShape(savedTheme);
    setTimeout(() => applyMoonShape(savedTheme), 100);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            const newTheme = isDark ? 'light-mode' : 'dark-mode';
            
            body.classList.remove('light-mode', 'dark-mode');
            body.classList.add(newTheme);
            
            localStorage.setItem('theme', newTheme);
            applyMoonShape(newTheme);
        });
    }
}

// --- ADVANCED TYPEWRITER WITH CURSOR ---
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const phrases = [
        "I build advanced web experiences😏...",
        "Creative Designer😌...",
        "Skilled Developer😌...",
        "Problem Solver😌...", 
        "This Portfolio was made by myself😊...",
        "You can create Advanced Portfolio like this😉..."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        // Use a vertical bar character to act as a cursor
        const cursor = `<span style="border-left: 2px solid var(--accent); margin-left: 3px; animation: blink 0.7s infinite;"></span>`;
        
        if (isDeleting) {
            target.innerHTML = currentPhrase.substring(0, charIndex - 1) + cursor;
            charIndex--;
        } else {
            target.innerHTML = currentPhrase.substring(0, charIndex + 1) + cursor;
            charIndex++;
        }

        // Speed Logic
        let typeSpeed = isDeleting ? 40 : 80; // Deleting is faster

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Stay on screen for 2 seconds
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Add the blinking cursor animation via JS to avoid touching CSS file
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    type();
}

// --- 2. INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    // Re-include your initTypewriter() call here
    if (typeof initTypewriter === 'function') initTypewriter();
    
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
});