# Ivan Vaccari - Professional Portfolio

> 🌟 **Hey there, fellow developer!** If you're about to fork this repo, how about giving it a star first? It's like saying "thanks" but with more sparkle! ✨ (Plus, it makes me do a little happy dance 💃)

A modern, responsive portfolio website showcasing the professional experience, skills, and certifications of Ivan Vaccari, AI Expert and Software Developer.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Component-based Architecture**: Modular HTML components for better maintainability
- **Dynamic Content Loading**: JavaScript-powered component system for DRY principles
- **Performance Optimized**: Fast loading times with optimized assets and parallel component loading
- **SEO Friendly**: Canonicals, absolute OG/Twitter images, JSON-LD (Person, WebSite, Breadcrumbs), sitemap/robots
   - Includes `og:image:width`, `og:image:height`, and `twitter:image:alt` for robust social previews
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Cross-browser Compatible**: Works across all modern browsers
- **Organized Structure**: Clean file organization with dedicated pages and components directories
- **PWA Ready**: Progressive Web App manifest for enhanced mobile experience
- **Theme Toggle**: Dynamic dark/light mode switching with localStorage persistence
- **Accessible Navigation**: Noscript fallback for links (works without JS)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with modern best practices
- **CSS3**: Modern CSS with custom properties and flexbox/grid layouts
- **Vanilla JavaScript**: ES6+ with async/await, fetch API, and modular architecture
- **Component System**: Custom component loading system with error handling
- **Google Fonts**: Professional typography — Zodiak (serif display), Satoshi (body), and IBM Plex Mono (data/labels)
- **Font Awesome**: Icon library for social media and UI elements

## 📁 Project Structure

```
ivanvaccarics.github.io/
├── components/               # ✨ NEW: Reusable HTML components
│   ├── header.html          # Dynamic navigation header
│   ├── footer.html          # Standardized footer
│   └── head-common.html     # Common meta tags (future use)
├── assets/
│   ├── css/
│   │   └── main.css          # Main stylesheet
│   ├── js/
│   │   └── main.js           # Enhanced JS with component loading
│   └── images/
│       ├── favicon.ico       # Favicon icons
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── site.webmanifest
│       ├── wave.gif          # Animated wave emoji
│       ├── ivan-vaccari-profile.jpeg
│       ├── ivan-vaccari-profile.webp   # WebP version for <picture>
│       └── og-ivan-vaccari-1200x630.jpg # OG/Twitter sharing image (1200x630)
├── pages/                    # Organized page directory
│   ├── experience.html       # Experience & Education page
│   └── details.html          # Skills & Certifications page
├── index.html                # Homepage (entry point)
├── manifest.json             # PWA manifest file
├── robots.txt                # Search engine crawling instructions
├── sitemap.xml               # Site structure for search engines
├── CHANGELOG.md              # Project changelog
├── LICENSE                   # MIT License
└── README.md                 # This file
```

## 🎨 Design Features

- **"Graphite & Copper" identity**: An instrument-inspired palette (graphite ink, warm paper-white, copper signal accent, teal trace) drawn from Ivan's IoT / signal-processing roots — deliberately distinct from generic SaaS-blue portfolios
- **Typography system**: Three deliberate roles — Zodiak serif display (scholarship), Satoshi body (clarity), IBM Plex Mono (data/labels)
- **Signature signal trace**: An SVG waveform sweeps across the hero floor — chaotic experiment oscillations resolving into a clean rising curve (research → production); respects `prefers-reduced-motion`
- **Hero as thesis**: A monospace metrics row (h-index, papers, EU projects, certifications) over a faint plotted grid, with a registration-framed portrait
- **Interactive Elements**: Hover effects and smooth transitions

- **Timeline Design**: Single measured time-axis with square "sample-point" nodes and monospace metadata
- **Card Components**: Organized skill and certification cards
- **Responsive Navigation**: Sticky header with smooth scrolling
- **Dynamic Theme Toggle**: Dark/light mode switching with localStorage persistence
- **Component-based UI**: Modular header and footer components loaded dynamically
- **Mobile-first Design**: Optimized mobile menu and responsive layouts
 - **Footer**: Social links (LinkedIn, GitHub, Scholar) and dynamic year
 

## 🏗️ Architecture

 - **Media Optimization**: Hero image with `<picture>` (WebP + JPEG fallback)
 - **ContactPoint JSON-LD**: Preserved in structured data for findability
 - **Micro-interactions**: Subtle hover/focus states and lift effects across interactive components
- **Modular Design**: Clean separation of concerns with organized methods
- **Event Handling**: Efficient event delegation and proper cleanup
- **Theme Management**: Persistent theme switching with localStorage

### ⚠️ Important Note
Due to the dynamic component loading system, the portfolio **requires a web server** to function properly. Opening `index.html` directly in a browser will result in CORS errors. Use one of the server methods above for development and testing.

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Optimized Images**: Compressed and properly sized images
   - LCP image preloaded; width/height attributes set to avoid CLS
- **Minimal Dependencies**: Only external fonts and Font Awesome icons
- **Component Caching**: Efficient component loading with browser caching
- **Parallel Loading**: Components loaded concurrently for faster initialization
- **Clean Code**: Well-structured, commented, and maintainable
- **Mobile Optimized**: Fast loading and smooth interactions on mobile devices

## 🚀 Recent Updates (v1.4.0)

### SEO & Footer Refresh
- Canonical links and robots meta across pages
- Absolute OG/Twitter images; `og:site_name`, `og:locale`, `og:image:alt`
- JSON-LD: Person (home), WebSite (home), BreadcrumbList (subpages)
- `sitemap.xml` paths corrected and dates updated
- `manifest.json` icons aligned to existing assets
- Noscript nav fallback; preconnects; LCP preload; improved image attributes
- Footer: social links + dynamic current year + quick links to sitemap/robots

## Previous Updates (v1.3.0)

### Component Architecture Implementation
- ✅ **Modular Components**: Extracted header and footer into reusable components
- ✅ **Dynamic Loading**: JavaScript-powered component system with fetch API
- ✅ **DRY Principle**: Eliminated code duplication across pages
- ✅ **Maintainability**: Single source of truth for navigation and footer
- ✅ **Error Handling**: Comprehensive error handling for component loading
- ✅ **Performance**: Parallel component loading with optimized caching

### Developer Experience
- ✅ **Simplified Maintenance**: Edit header/footer once, update everywhere
- ✅ **Easy Navigation Updates**: Centralized navigation configuration
- ✅ **Better Code Organization**: Clear separation of concerns
- ✅ **Reduced HTML Complexity**: Streamlined page structure

## 📧 Contact

For inquiries about this portfolio or collaboration opportunities:

- **LinkedIn**: [linkedin.com/in/ivanvaccari](https://www.linkedin.com/in/ivanvaccari/)
- **GitHub**: [github.com/ivanvaccarics](https://github.com/ivanvaccarics)
- **Google Scholar**: [scholar.google.it/citations?user=O09fwToAAAAJ](https://scholar.google.it/citations?user=O09fwToAAAAJ&hl=it)

## 📄 License

© 2025 Ivan Vaccari. All Rights Reserved.

---

*Built with ❤️ using modern web technologies*

