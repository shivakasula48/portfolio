// Enhanced Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();

    initMobileMenu();
    initSmoothScrolling();
    initSocialTracking();
    initGitHubIntegration();

    initThemeToggle();
    initEnhancedScrollAnimations();

    // Initialize typing animation after a delay
    setTimeout(initTypingAnimation, 500);

    // Initialize section tracking and interactivity
    setTimeout(() => {
        initSectionTracking();
        initSkillAnimations();
        initSectionInteractivity();
    }, 1000);
});

// Navigation functionality with enhanced smooth scrolling
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        }
    });

    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle all navigation links and hero buttons
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navToggle = document.querySelector('.nav-toggle');
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .certification-card, .experience-item, .education-item, .about-content'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.1; // Reduced parallax effect
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}



// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles with enhanced cybersecurity theme colors
    const bgColor = type === 'error' ? '#ef4444' :
        type === 'success' ? '#10b981' :
            '#22d3ee';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${bgColor};
        color: #0a0f1c;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px ${bgColor}40;
        animation: slideInRight 0.3s ease;
        opacity: 0.95;
        border: 1px solid ${bgColor};
        font-weight: 500;
        font-size: 14px;
        line-height: 1.4;
    `;

    // Add animation styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 0.95; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            .notification-icon {
                font-size: 16px;
                flex-shrink: 0;
            }
            .notification-message {
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                color: #0a0f1c;
                cursor: pointer;
                font-size: 14px;
                opacity: 0.8;
                font-weight: bold;
                padding: 4px;
                flex-shrink: 0;
            }
            .notification-close:hover {
                opacity: 1;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 7 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 7000);
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// GitHub projects integration
function initGitHubIntegration() {
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Add loading effect
            this.style.opacity = '0.7';
            setTimeout(() => {
                if (this.style) {
                    this.style.opacity = '1';
                }
            }, 200);
        });
    });
}

// Social media link tracking and functionality
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        // Ensure social links work properly
        link.addEventListener('click', function (e) {
            const platform = this.href.includes('github') ? 'GitHub' :
                this.href.includes('linkedin') ? 'LinkedIn' :
                    this.href.includes('mailto') ? 'Email' : 'Unknown';

            console.log(`Social link clicked: ${platform}`);

            // For mailto links, let browser handle naturally
            if (platform === 'Email') {
                return true;
            }

            // For external links, ensure they open in new tab
            if (!this.target) {
                this.target = '_blank';
                this.rel = 'noopener noreferrer';
            }
        });
    });
}



// Add typing animation to hero subtitle
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #22d3ee';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (subtitle && subtitle.style) {
                    subtitle.style.borderRight = 'none';
                }
            }, 1000);
        }
    };

    // Start typing animation
    typeWriter();
}

// Enhanced theme functionality
function initThemeToggle() {
    console.log('Enhanced cybersecurity theme system initialized');

    // Add subtle glow effects on hover for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .project-card, .skill-category, .certification-card, .education-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.filter = 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))';
        });

        element.addEventListener('mouseleave', function () {
            this.style.filter = 'none';
        });
    });
}

// Enhanced scroll reveal animations
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add enhanced animation styles if not already present
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.8s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 0.95; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Observe sections for enhanced animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Section visibility tracker for about/education separation
function initSectionTracking() {
    console.log('Section tracking initialized for About and Education separation');

    // Add special handling for About and Education sections
    const aboutSection = document.getElementById('about');
    const educationSection = document.getElementById('education');

    if (aboutSection && educationSection) {
        // Create intersection observer for section-specific animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    console.log(`${sectionId} section is visible`);

                    // Add section-specific class for animations
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.3
        });

        sectionObserver.observe(aboutSection);
        sectionObserver.observe(educationSection);
    }
}

// Initialize skill progress animations
function initSkillAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function () {
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.boxShadow = '0 4px 8px rgba(34, 211, 238, 0.2)';
                }, index * 100);
            });
        });

        category.addEventListener('mouseleave', function () {
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = 'none';
            });
        });
    });
}

// Add enhanced interactivity for About and Education sections
function initSectionInteractivity() {
    // About section interactions
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.3s ease';
        });

        aboutContent.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Education timeline interactions
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(8px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Also close any notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function () {
    // Additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation and scroll to top functionality
window.addEventListener('load', function () {
    // Hide loader if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Animate hero section on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollBtn.onclick = scrollToTop;
            scrollBtn.setAttribute('aria-label', 'Scroll to top');

            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82ff, #22d3ee);
                border: none;
                color: #0a0f1c;
                font-size: 16px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(34, 211, 238, 0.3);
                transition: all 0.3s ease;
            `;

            scrollBtn.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.1)';
                this.style.boxShadow = '0 6px 16px rgba(34, 211, 238, 0.4)';
            });

            scrollBtn.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(34, 211, 238, 0.3)';
            });

            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});