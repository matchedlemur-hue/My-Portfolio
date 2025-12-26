// Enhanced Project Data
const myProjects = [
    { title: "Movie Website", category: "js", desc: "Dynamic content fetching project." },
    { title: "Bruno Simon Clone", category: "css", desc: "Static animated website." },
    { title: "AI Dashboard", category: "js", desc: "Interactive data visualization." }
];

class ThemeManager {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        // Initializing based on localStorage or System Preference
        this.theme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode');
        this.init();
    }
    init() {
        document.body.className = this.theme;
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }
    toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    }
}

// 1. FEATURE: Project Rendering
function displayProjects() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;
    grid.innerHTML = myProjects.map(p => `
        <div class="project-card ${p.category}" data-aos="fade-up">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <span class="tag" style="color:var(--accent); font-size: 0.8rem;">#${p.category.toUpperCase()}</span>
        </div>
    `).join('');
}

// 2. FEATURE: Scroll Progress Indicator
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style = "position:fixed;top:0;left:0;height:4px;background:var(--accent);z-index:9999;width:0%;transition:width 0.1s;";
    bar.id = "scroll-bar";
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        document.getElementById("scroll-bar").style.width = (winScroll / height) * 100 + "%";
    });
}

// 3. ADVANCED FEATURE: Parallax Background Images
// This makes your background images move slightly during scroll
function initParallax() {
    window.addEventListener('scroll', () => {
        const images = document.querySelectorAll('.section-image img');
        const scrolled = window.pageYOffset;
        
        images.forEach(img => {
            const speed = 0.05;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    displayProjects();
    initScrollProgress();
    initParallax(); 
    
    // Refresh AOS to detect the dynamically injected projects
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
});
