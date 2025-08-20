// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initTypingEffect();
    initParticleSystem();
    initButtonEffects();
    initContactForm();
    initThemeSystem();
    initPerformanceOptimizations();
    
    // Console easter egg
    showConsoleMessage();
});

// Mobile Navigation System
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (!mobileToggle || !navLinks) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking on links
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    function toggleMobileMenu() {
        const isActive = navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling System
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects System
function initScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleNavbarScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Navbar background change on scroll
    function handleNavbarScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Animation System
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for multiple elements
                if (entry.target.dataset.delay) {
                    entry.target.style.animationDelay = entry.target.dataset.delay;
                }
            }
        });
    }, observerOptions);

    // Add animations to elements
    addAnimationToElements(observer);

    // Parallax effect for hero section
    initParallaxEffect();
}

function addAnimationToElements(observer) {
    // Skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.dataset.delay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Hero content animations
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.classList.add('slide-in-left');
        observer.observe(heroText);
    }
    
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }

    // Contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.dataset.delay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Project card animation
    const projectCard = document.querySelector('.project-card');
    if (projectCard) {
        projectCard.classList.add('fade-in');
        observer.observe(projectCard);
    }

    // About content animation
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('fade-in');
        observer.observe(aboutContent);
    }

    // Certificate items animation
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.dataset.delay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Education card animation
    const educationCard = document.querySelector('.education-card');
    if (educationCard) {
        educationCard.classList.add('slide-in-right');
        observer.observe(educationCard);
    }
}

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Typing Effect System
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, pauseTime);
            }
        }
        type();
    }

    function deleteText(element, callback) {
        const text = element.innerHTML;
        let i = text.length;
        
        function deleteChar() {
            if (i > 0) {
                element.innerHTML = text.substring(0, i - 1);
                i--;
                setTimeout(deleteChar, deletingSpeed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        deleteChar();
    }

    // Start typing animation
    setTimeout(() => {
        typeWriter(heroTitle, originalText, typingSpeed);
    }, 1000);
}

// Particle System
function initParticleSystem() {
    let particleInterval;
    let particles = [];

    function createParticle() {
        if (particles.length > 20) return; // Limit particles for performance

        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 4 + 2;
        const speed = Math.random() * 2 + 1;
        const direction = Math.random() * 2 * Math.PI;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: x,
            y: y,
            speed: speed,
            direction: direction,
            opacity: 0.6,
            life: 0
        });
    }

    function updateParticles() {
        particles.forEach((particle, index) => {
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            particle.opacity -= 0.003;
            particle.life++;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.opacity;
            
            // Remove particle if it's out of bounds or faded
            if (particle.opacity <= 0 || 
                particle.x < -10 || particle.x > window.innerWidth + 10 ||
                particle.y < -10 || particle.y > window.innerHeight + 10 ||
                particle.life > 300) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(updateParticles);
    }

    function startParticleSystem() {
        if (window.innerWidth > 768 && !particleInterval) {
            particleInterval = setInterval(createParticle, 3000);
            updateParticles();
        }
    }

    function stopParticleSystem() {
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
        // Clean up existing particles
        particles.forEach(particle => particle.element.remove());
        particles = [];
    }

    // Initialize particle system
    startParticleSystem();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        stopParticleSystem();
        if (window.innerWidth > 768) {
            setTimeout(startParticleSystem, 1000);
        }
    });
}

// Button Effects System
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Loading state for primary buttons
        if (button.classList.contains('btn-primary') && !button.href) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalContent = this.innerHTML;
                this.innerHTML = '<span class="loading"></span> Processing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                }, 2000);
            });
        }
    });

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Contact Form System (for future implementation)
function initContactForm() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Email link handler
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks (for analytics if needed)
            console.log('Email link clicked');
        });
    });
}

// Theme System (Dark/Light mode toggle)
function initThemeSystem() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
    }

    // Theme toggle functionality (if you add a toggle button)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Update toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    preloadResources();
    
    // Optimize scroll performance
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // Scroll ended - perform cleanup if needed
            optimizePerformance();
        }, 150);
    }, { passive: true });
}

function preloadResources() {
    // Preload important fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

function optimizePerformance() {
    // Remove invisible particles to save memory
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const opacity = parseFloat(particle.style.opacity);
        if (opacity < 0.1) {
            particle.remove();
        }
    });
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Easter Egg Console Message
function showConsoleMessage() {
    const message = `
%c🌟 Welcome to Rhythm Priya's Portfolio! 🌟

%cThanks for checking out the code! 
If you're here, you might be interested in connecting.

%cFeel free to reach out:
📧 rhythmpriya680@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/rhythm-priya-1046b2329/
🐙 GitHub: https://github.com/RhythmPriya

%cHappy coding! 💻✨
    `;
    
    console.log(
        message,
        'color: #667eea; font-size: 16px; font-weight: bold;',
        'color: #64748b; font-size: 14px;',
        'color: #2c3e50; font-size: 12px;',
        'color: #667eea; font-size: 14px; font-weight: bold;'
    );
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.click();
            }
        }
    }
    
    // Arrow key navigation between sections
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        scrollToNextSection();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        scrollToPrevSection();
    }
});

function scrollToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const current = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => section.id === current);
    
    if (currentIndex < sections.length - 1) {
        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const current = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => section.id === current);
    
    if (currentIndex > 0) {
        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations and particles
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible - resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
});

// Service worker registration (for PWA functionality if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
