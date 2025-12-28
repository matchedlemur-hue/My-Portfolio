// --- 1. TYPEWRITER LOGIC ---
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const phrases = ["I build advanced web experiences...", "Creative Designer", "Skilled Developer"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        const cursor = `<span style="border-left: 2px solid var(--accent); margin-left: 3px; animation: blink 0.7s infinite;">|</span>`;
        
        target.innerHTML = isDeleting 
            ? current.substring(0, charIndex - 1) + cursor 
            : current.substring(0, charIndex + 1) + cursor;

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

// --- 2. THEME & MOON LOGIC ---
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function applyMoonShape(theme) {
        const moonMaskCircle = document.querySelector('#moon-mask circle');
        if (!moonMaskCircle) return;
        
        if (theme === 'dark-mode') {
            moonMaskCircle.setAttribute('cx', '18');
            moonMaskCircle.setAttribute('cy', '10');
            moonMaskCircle.setAttribute('r', '7');
            moonMaskCircle.style.transform = 'translateX(0)'; 
        } else {
            moonMaskCircle.setAttribute('cx', '25');
            moonMaskCircle.style.transform = 'translateX(0)';
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.add(savedTheme);
    setTimeout(() => applyMoonShape(savedTheme), 200);

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

// --- 3. RUN EVERYTHING ---
// Use window.onload to ensure EVERYTHING (images, SVGs) is loaded on GitHub
window.onload = () => {
    initTheme();
    initTypewriter();
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
};

// Add cursor animation
const style = document.createElement('style');
style.innerHTML = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
document.head.appendChild(style);