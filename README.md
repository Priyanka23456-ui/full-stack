# Admin Dashboard - Experiment 1

## Aim
To develop an admin dashboard with CSS Grid layout and dynamic theme switching (dark/light mode).

## Objective
- ✅ Create grid-based responsive layout
- ✅ Implement dark/light mode toggle
- ✅ Use CSS variables for theme management
- ✅ Persist theme preference using localStorage

## About the Project
This is a **beginner-friendly admin dashboard** that demonstrates core web development concepts:
- **HTML** - Simple semantic structure
- **CSS** - CSS Grid, CSS Variables, Flexbox
- **JavaScript** - Event handling, localStorage, DOM manipulation

The dashboard features a clean, professional design with easy-to-understand code perfect for learning.

## Features

### 1. Responsive Layout
- Uses CSS Grid and Flexbox
- Works on desktop, tablet, and mobile devices
- Header, sidebar navigation, and main content area

### 2. Dark/Light Mode Toggle
- Click the button in the header to switch themes
- Theme preference is saved automatically
- Changes apply instantly across all elements

### 3. CSS Variables for Theming
The project uses CSS variables to manage colors:

**Light Mode:**
```css
:root {
    --bg-light: #f5f5f5;        /* Light gray background */
    --bg-white: #ffffff;        /* White cards */
    --text-dark: #333333;       /* Dark text */
    --primary-color: #4a90e2;   /* Blue buttons */
}
```

**Dark Mode:**
```css
body.dark-mode {
    --bg-light: #222222;        /* Dark background */
    --bg-white: #333333;        /* Dark cards */
    --text-dark: #ffffff;       /* Light text */
    --primary-color: #5fa3f0;   /* Lighter blue */
}
```

### 4. localStorage Persistence
Theme preference is saved using the browser's localStorage API:
```javascript
localStorage.setItem(STORAGE_KEY, theme);  // Save theme
localStorage.getItem(STORAGE_KEY);         // Retrieve theme
```

## File Structure

```
admin-dashboard/
├── admin-dashboard.html    (HTML Structure)
├── admin-dashboard.css     (Styling & Themes)
├── admin-dashboard.js      (Functionality)
└── README.md              (This file)
```

## How to Use

### 1. Open in Browser
Simply open `admin-dashboard.html` in any modern web browser.

### 2. Toggle Theme
Click the **🌙 Dark Mode** button in the header to switch between light and dark modes.

### 3. Navigate
Click the menu items in the sidebar to see navigation working.

## Code Explanation

### HTML (`admin-dashboard.html`)
The HTML is simple and semantic:

```html
<header class="header">
    <h1>Admin Dashboard</h1>
    <button class="theme-toggle" id="themeToggle">
        <span class="toggle-icon">🌙</span>
        <span class="toggle-text">Dark Mode</span>
    </button>
</header>

<div class="container">
    <aside class="sidebar">
        <ul class="nav-menu">
            <li><a href="#" class="nav-link active">Dashboard</a></li>
            <!-- More nav links -->
        </ul>
    </aside>

    <main class="main-content">
        <div class="stats">
            <div class="card">
                <h3>Total Users</h3>
                <p class="big-number">1,234</p>
            </div>
            <!-- More cards -->
        </div>
    </main>
</div>
```

**Key Elements:**
- `<header>` - Top navigation with theme toggle button
- `<aside>` - Sidebar with navigation menu
- `<main>` - Main content area with dashboard data
- `<button id="themeToggle">` - Theme toggle button (uses ID for JavaScript selection)

---

### CSS (`admin-dashboard.css`)
The CSS uses modern features:

#### 1. CSS Variables
```css
:root {
    --bg-light: #f5f5f5;
    --primary-color: #4a90e2;
}

body {
    background-color: var(--bg-light);
}
```

#### 2. Flexbox Layout
```css
.dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    display: flex;
    flex: 1;
}
```

#### 3. CSS Grid for Cards
```css
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
```

#### 4. Dark Mode Toggle
```css
body.dark-mode {
    --bg-light: #222222;
    --text-dark: #ffffff;
    --primary-color: #5fa3f0;
}
```

---

### JavaScript (`admin-dashboard.js`)
Simple functions that handle theme switching:

#### 1. Get Current Theme
```javascript
function getCurrentTheme() {
    return document.body.classList.contains(DARK_MODE_CLASS) ? 'dark' : 'light';
}
```
Checks if the `dark-mode` class is applied to the body.

#### 2. Save Theme to localStorage
```javascript
function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    console.log(`💾 Theme saved: ${theme}`);
}
```
Stores the theme choice in browser storage.

#### 3. Apply Theme
```javascript
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add(DARK_MODE_CLASS);  // Add dark-mode class
    } else {
        document.body.classList.remove(DARK_MODE_CLASS); // Remove dark-mode class
    }
    
    // Update button text and icon
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
}
```
Applies the theme by toggling the class and updating button appearance.

#### 4. Toggle Theme
```javascript
function toggleTheme() {
    const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}
```
Switches between light and dark mode.

#### 5. Load Theme on Page Load
```javascript
function loadTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
        applyTheme(savedTheme);  // Use saved theme
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');  // Use system preference
    }
}
```
Loads saved theme when page opens, or uses system preference.

#### 6. Setup Event Listeners
```javascript
function setupThemeToggle() {
    const themeToggleButton = document.getElementById('themeToggle');
    
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}
```
Attaches click handlers to buttons and navigation links.

#### 7. Initialize on Page Load
```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();              // Load saved theme
    setupThemeToggle();       // Setup theme button
    setupNavigation();        // Setup nav links
    setupCardInteractions();  // Setup card hover effects
    setupActivityItems();     // Setup activity list
});
```

---

## How It All Works Together

1. **Page Loads** → JavaScript runs `loadTheme()`
2. **Load Theme** → Checks localStorage for saved theme, applies it
3. **CSS Updates** → When `dark-mode` class is added/removed, CSS variables change
4. **User Clicks Button** → `toggleTheme()` is called
5. **Theme Changes** → `applyTheme()` updates class and button text
6. **Save to Storage** → `saveTheme()` saves preference in localStorage
7. **Page Reload** → `loadTheme()` retrieves saved theme automatically

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## CSS Variables Used

| Variable | Light Mode | Dark Mode |
|----------|-----------|-----------|
| `--bg-light` | #f5f5f5 | #222222 |
| `--bg-white` | #ffffff | #333333 |
| `--text-dark` | #333333 | #ffffff |
| `--text-light` | #666666 | #cccccc |
| `--border-color` | #dddddd | #444444 |
| `--primary-color` | #4a90e2 | #5fa3f0 |

## Key Learning Points

### 1. CSS Grid
```css
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}
```
Creates responsive columns that adapt to screen size.

### 2. CSS Variables
```css
color: var(--primary-color);
background-color: var(--bg-light);
```
Makes it easy to change colors globally.

### 3. localStorage API
```javascript
localStorage.setItem(key, value);
localStorage.getItem(key);
```
Saves data in the browser persistently.

### 4. DOM Manipulation
```javascript
document.body.classList.add('dark-mode');
document.querySelector('.toggle-icon').textContent = '☀️';
```
Changes HTML elements dynamically with JavaScript.

### 5. Event Listeners
```javascript
button.addEventListener('click', function);
```
Responds to user actions.

## Future Improvements

- [ ] Add more dashboard cards/widgets
- [ ] Create actual charts (Chart.js)
- [ ] Add form inputs for data entry
- [ ] Connect to a backend API
- [ ] Add animations on theme switch
- [ ] Mobile menu toggle
- [ ] Settings page for customization
- [ ] Export dashboard data

## Summary

This admin dashboard demonstrates:
- **HTML** - Semantic structure
- **CSS** - Grid, Flexbox, Variables, Responsive Design
- **JavaScript** - Events, localStorage, DOM manipulation
- **Web APIs** - matchMedia for system preferences

Perfect for learning modern web development! 🚀

---

**Created:** January 2026  
**Experiment:** Admin Dashboard with Dynamic Theme Switching  
**Level:** Beginner-Friendly
