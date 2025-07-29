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
            this.init();
        }

        /**
         * Initialize the application
         */
        init() {
            this.setupSmoothScrolling();
            this.setupActiveNavigation();
            this.setupSectionReveals();
            this.setupTypingAnimation();
            this.setupErrorHandling();
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