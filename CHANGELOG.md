# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-08-18

### Added
- SEO improvements for GitHub Pages hosting:
  - Canonical links and robots meta across pages
  - Absolute Open Graph/Twitter images and `og:site_name`, `og:locale`, `og:image:alt`
  - WebSite JSON-LD on homepage and BreadcrumbList JSON-LD on subpages
  - Noscript navigation fallback to ensure crawlability without JavaScript
  - Preconnect hints and preload for LCP image on homepage
- Footer enhancements:
  - Social links area (LinkedIn, GitHub, Google Scholar)
  - Dynamic current year (auto-updates)
  - Quick links to `sitemap.xml` and `robots.txt`

### Changed
- `sitemap.xml` now references `pages/experience.html` and `pages/details.html` and updated `lastmod`
- `manifest.json` icons corrected to existing `android-chrome-192x192.png` and `android-chrome-512x512.png`
- Improved image attributes for LCP (width/height, decoding)

### Fixed
- Ensured social sharing uses absolute URLs for preview images

## [1.3.0] - 2025-07-30

### Added
- **Component-based architecture**: Implemented modular header and footer components
- `components/` directory with reusable HTML components:
  - `header.html`: Dynamic navigation header with mobile menu
  - `footer.html`: Standardized footer across all pages
  - `head-common.html`: Common meta tags and resources (for future use)
- Dynamic component loading via JavaScript fetch API
- Intelligent path detection for proper asset and navigation links
- Centralized navigation management with automatic link generation

### Changed
- **BREAKING**: Refactored all pages to use dynamic component loading
- Enhanced JavaScript architecture with async component initialization
- Improved `main.js` with component loading capabilities:
  - Added `loadComponents()` and `loadComponent()` methods
  - Implemented `setupNavigation()` for dynamic link generation
  - Enhanced path detection with `getBasePath()` method
- Updated all HTML pages to use placeholder divs for header and footer
- Streamlined HTML structure by removing duplicate header/footer code

### Technical Improvements
- **DRY principle**: Eliminated code duplication across pages
- **Maintainability**: Single source of truth for header and footer
- **Consistency**: Guaranteed uniform navigation and footer across all pages
- **Performance**: Parallel loading of components with Promise.all()
- **Error handling**: Comprehensive error handling for component loading
- **Future-ready**: Scalable architecture for additional components

### Developer Experience
- Simplified page maintenance (edit once, update everywhere)
- Easy navigation updates through single configuration
- Better code organization and separation of concerns
- Reduced HTML file sizes and complexity

### File Structure Changes
```
NEW in this release:
├── components/
│   ├── header.html      (Dynamic navigation header)
│   ├── footer.html      (Standardized footer)
│   └── head-common.html (Common meta tags - future use)
├── assets/js/main.js    (Enhanced with component loading)
├── index.html           (Refactored to use components)
└── pages/
    ├── experience.html  (Refactored to use components)
    └── details.html     (Refactored to use components)
```

## [1.2.0] - 2025-07-29

### Added
- Created `pages/` directory for better project organization
- Enhanced README.md with updated project structure and setup instructions
- Comprehensive documentation of the new file organization

### Changed
- **BREAKING**: Moved `experience.html` to `pages/experience.html`
- **BREAKING**: Moved `details.html` to `pages/details.html`
- Updated all navigation links across all pages to reflect new structure
- Updated all asset references in moved pages (CSS, JS, images, manifest)
- Updated Open Graph URLs to reflect new page locations
- Enhanced project structure documentation in README.md
- `index.html` remains as the entry point in the root directory

### Technical Improvements
- Cleaner root directory with only essential files
- Better maintainability with logical page grouping
- Preserved all SEO metadata and functionality
- All relative paths correctly updated for new structure
- GitHub Pages compatibility maintained

### File Structure Changes
```
OLD:                    NEW:
├── index.html          ├── index.html (unchanged)
├── experience.html  →  ├── pages/
├── details.html        │   ├── experience.html
├── assets/             │   └── details.html
└── ...                 ├── assets/ (unchanged)
                        └── ... (unchanged)
```

## [1.1.0] - 2025-07-29

### Added
- Twitter Card meta tags to details.html for improved social sharing
- "Renewal in Progress" status for Azure AI Engineer certification

### Changed
- Updated page title from "Skills & Projects" to "Skills & Certifications" for accuracy
- Improved meta descriptions for better SEO performance
- Standardized favicon configuration across all HTML files
- Fixed duplicate manifest references
- Updated README.md to reflect current project structure and features
- Enhanced documentation with more detailed project information

### Fixed
- Inconsistent meta tags across pages
- Conflicting favicon and manifest references
- Image file extension references (.jpg vs .jpeg)

## [1.0.0] - 2025-01-23

### Added
- Professional project structure with organized asset folders
- Comprehensive documentation (README.md, development guide)
- SEO optimization with meta tags, sitemap, and robots.txt
- Accessibility improvements (ARIA labels, skip links, semantic HTML)
- Progressive Web App features (manifest.json)
- Modern CSS architecture with custom properties and utility classes
- Enhanced JavaScript with error handling and performance optimization
- Deployment configurations for GitHub Pages and Netlify
- GitHub Actions workflow for automated deployment
- Package.json for development tooling
- .gitignore for version control
- Performance optimizations and caching strategies

### Changed
- Reorganized file structure with assets/ directory
- Improved CSS organization with better commenting and sections
- Enhanced JavaScript with class-based architecture
- Updated HTML with better semantic structure and accessibility
- Optimized images with descriptive naming

### Technical Improvements
- Mobile-first responsive design approach
- Cross-browser compatibility testing
- WCAG 2.1 AA accessibility compliance
- Modern web standards implementation
- Performance optimization techniques
- SEO best practices implementation

### File Structure Changes
```
OLD:                    NEW:
├── index.html          ├── index.html
├── details.html        ├── details.html
├── style.css     →     ├── assets/
├── script.js           │   ├── css/main.css
└── myphoto.jpg         │   ├── js/main.js
                        │   └── images/ivan-vaccari-profile.jpg
                        ├── docs/README.md
                        ├── .github/workflows/deploy.yml
                        ├── manifest.json
                        ├── robots.txt
                        ├── sitemap.xml
                        ├── netlify.toml
                        ├── package.json
                        ├── .gitignore
                        └── README.md
```

## [Future Releases]

### Planned Features
- Contact form with backend integration
- Blog section for technical articles (likely in `pages/blog/`)
- Advanced animations and micro-interactions
- Integration with portfolio CMS
- Performance monitoring and analytics
- Advanced PWA features (offline support)
- Multi-language support
- Project showcase section with case studies
- Additional pages in the organized `pages/` directory structure
