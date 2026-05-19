/* ============================================
   MAIN SCRIPT - AutoTool Website Interactions
   ============================================ */

// ============================================
// Navigation & Scroll
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FAQ Accordion
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// Contact Methods Handlers
// ============================================

function handleContactClick(method) {
    switch(method) {
        case 'line':
            window.open('https://line.me/ti/p/~dunkliao', '_blank');
            break;
        case 'email':
            window.location.href = 'mailto:dicksskimo@yahoo.com.tw?subject=自動化工具諮詢';
            break;
        case 'form':
            document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
            break;
        default:
            break;
    }
}

// ============================================
// Button Ripple Effect
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// Intersection Observer for Lazy Loading
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.pain-card, .service-card, .scenario-card, .diff-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// Smooth Scroll on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
    
    // Add active class to first nav link on load
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for better performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Accessibility Enhancements
// ============================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close menu with Escape key
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab navigation for FAQ
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('faq-question')) {
            e.preventDefault();
            document.activeElement.parentElement.classList.toggle('active');
        }
    }
});

console.log('AutoTool Website Initialized Successfully!');
