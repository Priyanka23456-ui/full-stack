const STORAGE_KEY = 'admin-dashboard-theme';
const DARK_MODE_CLASS = 'dark-mode';

function getCurrentTheme() {
    return document.body.classList.contains(DARK_MODE_CLASS) ? 'dark' : 'light';
}

function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY);
}

function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    console.log(`💾 Theme saved: ${theme}`);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add(DARK_MODE_CLASS);
    } else {
        document.body.classList.remove(DARK_MODE_CLASS);
    }
    
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');
    
    if (theme === 'dark') {
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'Light Mode';
    } else {
        toggleIcon.textContent = '🌙';
        toggleText.textContent = 'Dark Mode';
    }
    
    saveTheme(theme);
    console.log(`🎨 Theme changed to: ${theme}`);
}

function toggleTheme() {
    const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function loadTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

function setupThemeToggle() {
    const themeToggleButton = document.getElementById('themeToggle');
    
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
        themeToggleButton.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            console.log(`📍 Navigated to: ${link.textContent.trim()}`);
        });
    });
}

function setupCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
    });
}

function setupActivityItems() {
    const items = document.querySelectorAll('.activity-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'var(--bg-light)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'var(--bg-white)';
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupThemeToggle();
    setupNavigation();
    setupCardInteractions();
    setupActivityItems();
    
    console.log('%c✓ Admin Dashboard Ready!', 'color: #A8E6CF; font-size: 14px; font-weight: bold;');
});
