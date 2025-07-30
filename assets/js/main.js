/**
 * Ivan Vaccari Portfolio JavaScript
 * Version: 1.0.0
 * Description: Interactive functionality for professional portfolio
 * Author: Ivan Vaccari
 * Last Updated: January 2025
 */

(function() {
    'use strict';

    // Configuration object
    const CONFIG = {
        TYPING_SPEED: 50,
        TYPING_DELAY: 500,
        SCROLL_THRESHOLD: 0.4,
        REVEAL_THRESHOLD: 0.15
    };

    // Utility functions
    const utils = {
        /**
         * Safely query selector with error handling
         * @param {string} selector - CSS selector
         * @param {Element} context - Context element (optional)
         * @returns {Element|null}
         */
        safeQuerySelector(selector, context = document) {
            try {
                return context.querySelector(selector);
            } catch (error) {
                console.warn(`Invalid selector: ${selector}`, error);
                return null;
            }
        },

        /**
         * Safely query all selectors with error handling
         * @param {string} selector - CSS selector
         * @param {Element} context - Context element (optional)
         * @returns {NodeList}
         */
        safeQuerySelectorAll(selector, context = document) {
            try {
                return context.querySelectorAll(selector);
            } catch (error) {
                console.warn(`Invalid selector: ${selector}`, error);
                return [];
            }
        }
    };

    /**
     * Portfolio Application Class
     */
    class PortfolioApp {
        constructor() {
            this.observers = new Map();
            this.basePath = this.getBasePath();
            this.init();
        }

        /**
         * Get the base path for the current page
         * @returns {string} Base path for components and assets
         */
        getBasePath() {
            const path = window.location.pathname;
            if (path.includes('/pages/')) {
                return '../';
            }
            return './';
        }

        /**
         * Initialize the application
         */
        async init() {
            await this.loadComponents();
            this.setupSmoothScrolling();
            this.setupActiveNavigation();
            this.setupSectionReveals();
            this.setupTypingAnimation();
            this.setupErrorHandling();
            this.setupThemeToggle();
            this.setupMobileMenu();
        }

        /**
         * Load header and footer components
         */
        async loadComponents() {
            try {
                await Promise.all([
                    this.loadComponent('header', '#header-placeholder'),
                    this.loadComponent('footer', '#footer-placeholder')
                ]);
                this.setupNavigation();
            } catch (error) {
                console.error('Error loading components:', error);
            }
        }

        /**
         * Load a single component
         * @param {string} componentName - Name of the component
         * @param {string} targetSelector - Target element selector
         */
        async loadComponent(componentName, targetSelector) {
            try {
                const response = await fetch(`${this.basePath}components/${componentName}.html`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentName}: ${response.statusText}`);
                }
                
                const html = await response.text();
                const targetElement = utils.safeQuerySelector(targetSelector);
                
                if (targetElement) {
                    targetElement.innerHTML = html;
                } else {
                    console.warn(`Target element ${targetSelector} not found`);
                }
            } catch (error) {
                console.error(`Error loading ${componentName}:`, error);
            }
        }

        /**
         * Setup navigation links based on current page
         */
        setupNavigation() {
            const navList = utils.safeQuerySelector('#main-nav-list');
            const mobileNavList = utils.safeQuerySelector('#mobile-nav-list');
            const logoLink = utils.safeQuerySelector('#nav-logo-link');
            
            // Navigation items configuration
            const navItems = [
                { text: 'About me', href: this.basePath === '../' ? '../index.html#about' : '#about' },
                { text: 'Experience & Education', href: this.basePath === '../' ? 'experience.html' : 'pages/experience.html' },
                { text: 'Skills & Certifications', href: this.basePath === '../' ? 'details.html' : 'pages/details.html' }
            ];

            // Set logo link
            if (logoLink) {
                logoLink.href = this.basePath === '../' ? '../index.html' : '#hero';
            }

            // Populate navigation lists
            if (navList) {
                navList.innerHTML = navItems.map(item => 
                    `<li><a href="${item.href}">${item.text}</a></li>`
                ).join('');
            }

            if (mobileNavList) {
                mobileNavList.innerHTML = navItems.map(item => 
                    `<li><a href="${item.href}">${item.text}</a></li>`
                ).join('');
            }
        }

        /**
         * Setup smooth scrolling for navigation links
         */
        setupSmoothScrolling() {
            const navLinks = utils.safeQuerySelectorAll('.main-nav a');

            navLinks.forEach(link => {
                link.addEventListener('click', this.handleNavClick.bind(this));
            });
        }

        /**
         * Handle navigation link clicks
         * @param {Event} event - Click event
         */
        handleNavClick(event) {
            const href = event.currentTarget.getAttribute('href');

            // If it's an on-page anchor link, handle with smooth scroll
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetElement = utils.safeQuerySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL without triggering scroll
                    if (window.history && window.history.pushState) {
                        window.history.pushState({}, '', href);
                    }
                }
            }
        }

        /**
         * Setup active navigation highlighting on scroll
         */
        setupActiveNavigation() {
            const sections = utils.safeQuerySelectorAll('section[id]');
            const navLinks = utils.safeQuerySelectorAll('.main-nav ul li a');

            if (sections.length === 0 || navLinks.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: CONFIG.SCROLL_THRESHOLD
            };

            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active class from all nav links
                        navLinks.forEach(link => link.classList.remove('active'));
                        
                        // Add active class to the corresponding nav link
                        const currentLink = utils.safeQuerySelector(`.main-nav a[href="#${entry.target.id}"]`);
                        if (currentLink) {
                            currentLink.classList.add('active');
                        }
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                navObserver.observe(section);
            });

            this.observers.set('navigation', navObserver);
        }

        /**
         * Setup reveal animations for sections
         */
        setupSectionReveals() {
            const revealSections = utils.safeQuerySelectorAll('.content-section');

            if (revealSections.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: CONFIG.REVEAL_THRESHOLD
            };

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Stop observing the element once it's visible to save resources
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealSections.forEach(section => {
                revealObserver.observe(section);
            });

            this.observers.set('reveal', revealObserver);
        }

        /**
         * Setup typing animation for subtitle
         */
        setupTypingAnimation() {
            const heroSubtitle = utils.safeQuerySelector('.hero-subtitle');
            if (!heroSubtitle) return;

            // Store the original text
            const originalText = heroSubtitle.textContent;
            
            // Create elements for typing effect
            const typingElement = document.createElement('span');
            typingElement.id = 'typing-text';
            typingElement.setAttribute('aria-live', 'polite');
            
            const cursorElement = document.createElement('span');
            cursorElement.className = 'cursor';
            cursorElement.innerHTML = '|';
            cursorElement.setAttribute('aria-hidden', 'true');
            
            // Clear the subtitle and add our new elements
            heroSubtitle.textContent = '';
            heroSubtitle.appendChild(typingElement);
            heroSubtitle.appendChild(cursorElement);
            
            // Start typing animation
            this.typeText(typingElement, originalText);
        }

        /**
         * Typing animation implementation
         * @param {Element} element - Element to type into
         * @param {string} text - Text to type
         */
        typeText(element, text) {
            let charIndex = 0;
            
            const typeNextChar = () => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextChar, CONFIG.TYPING_SPEED);
                }
            };
            
            // Start typing with initial delay
            setTimeout(typeNextChar, CONFIG.TYPING_DELAY);
        }

        /**
         * Setup global error handling
         */
        setupErrorHandling() {
            window.addEventListener('error', (event) => {
                console.error('Portfolio JavaScript Error:', event.error);
                // Could send to analytics service here
            });

            window.addEventListener('unhandledrejection', (event) => {
                console.error('Unhandled Promise Rejection:', event.reason);
                // Could send to analytics service here
            });
        }

        /**
         * Setup theme toggle functionality
         */
        setupThemeToggle() {
            const themeToggleBtn = utils.safeQuerySelector('#theme-toggle');
            const mobileThemeToggle = utils.safeQuerySelector('.mobile-theme-toggle');
            
            if (themeToggleBtn) {
                // Check for saved theme preference or respect OS preference
                const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const savedTheme = localStorage.getItem('theme');
                
                // Apply theme based on saved preference or OS preference
                if (savedTheme === 'light') {
                    document.body.classList.add('light-theme');
                    this.updateThemeIcons(true);
                } else if (savedTheme === 'dark' || prefersDarkScheme) {
                    document.body.classList.remove('light-theme');
                    this.updateThemeIcons(false);
                }
                
                // Add event listener to theme toggle button
                themeToggleBtn.addEventListener('click', (event) => {
                    // Prevent navigation to home when clicked
                    event.preventDefault();
                    event.stopPropagation();
                    
                    document.body.classList.toggle('light-theme');
                    const isLightTheme = document.body.classList.contains('light-theme');
                    
                    // Save preference to localStorage
                    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
                    
                    // Update icons and text
                    this.updateThemeIcons(isLightTheme);
                });
            }
            
            if (mobileThemeToggle) {
                mobileThemeToggle.addEventListener('click', (event) => {
                    // Prevent navigation when clicked
                    event.preventDefault();
                    event.stopPropagation();
                    
                    document.body.classList.toggle('light-theme');
                    const isLightTheme = document.body.classList.contains('light-theme');
                    
                    // Save preference to localStorage
                    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
                    
                    // Update icons and text
                    this.updateThemeIcons(isLightTheme);
                });
            }
        }
        
        /**
         * Update theme icons and text based on current theme
         * @param {boolean} isLightTheme - Whether the theme is currently light
         */
        updateThemeIcons(isLightTheme) {
            const themeIcon = utils.safeQuerySelector('#theme-toggle i');
            const mobileThemeIcon = utils.safeQuerySelector('.mobile-theme-toggle i');
            const mobileThemeText = utils.safeQuerySelector('.mobile-theme-toggle .theme-text');
            
            if (themeIcon) {
                themeIcon.className = isLightTheme ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            if (mobileThemeIcon) {
                mobileThemeIcon.className = isLightTheme ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
            }
            
            if (mobileThemeText) {
                mobileThemeText.textContent = isLightTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode';
            }
        }
        
        /**
         * Setup mobile menu functionality
         */
        setupMobileMenu() {
            const hamburgerMenu = utils.safeQuerySelector('.hamburger-menu');
            const mobileMenuContainer = utils.safeQuerySelector('.mobile-menu-container');
            const closeMenuButton = utils.safeQuerySelector('.close-menu');
            const overlay = utils.safeQuerySelector('.overlay');
            const mobileNavLinks = utils.safeQuerySelectorAll('.mobile-nav-list a');
            
            if (!hamburgerMenu || !mobileMenuContainer || !closeMenuButton || !overlay) return;
            
            // Open menu when hamburger is clicked
            hamburgerMenu.addEventListener('click', () => {
                mobileMenuContainer.classList.add('open');
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
            
            // Close menu when close button is clicked
            closeMenuButton.addEventListener('click', this.closeMenu.bind(this));
            
            // Close menu when overlay is clicked
            overlay.addEventListener('click', this.closeMenu.bind(this));
            
            // Close menu when a nav link is clicked
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', this.closeMenu.bind(this));
            });
        }
        
        /**
         * Close the mobile menu
         */
        closeMenu() {
            const mobileMenuContainer = utils.safeQuerySelector('.mobile-menu-container');
            const overlay = utils.safeQuerySelector('.overlay');
            
            if (mobileMenuContainer) {
                mobileMenuContainer.classList.remove('open');
            }
            
            if (overlay) {
                overlay.classList.remove('open');
            }
            
            document.body.style.overflow = ''; // Re-enable scrolling
        }

        /**
         * Cleanup method for observers
         */
        destroy() {
            this.observers.forEach(observer => {
                observer.disconnect();
            });
            this.observers.clear();
        }
    }

    // Initialize the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new PortfolioApp();
        });
    } else {
        new PortfolioApp();
    }

    // Expose for debugging in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.PortfolioApp = PortfolioApp;
        window.portfolioUtils = utils;
    }

})();