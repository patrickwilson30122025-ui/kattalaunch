// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimation(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Function to determine animation based on element type
function getAnimation(element) {
    const animations = {
        'destination-card': 'fadeInUp 0.8s ease forwards',
        'service-card': 'zoomIn 0.8s ease forwards',
        'testimonial-card': 'slideInLeft 0.8s ease forwards',
        'section-title': 'fadeInUp 0.8s ease forwards',
        'info-item': 'fadeInUp 0.8s ease forwards'
    };

    for (const [className, animation] of Object.entries(animations)) {
        if (element.classList.contains(className)) {
            return animation;
        }
    }
    return 'fadeInUp 0.8s ease forwards';
}

// Observe all animated elements
document.querySelectorAll(
    '.destination-card, .service-card, .testimonial-card, .section-title, .info-item'
).forEach(el => observer.observe(el));

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Add underline animation to active link
    const activeLink = document.querySelector('.nav-link[href="#' + current + '"]');
    if (activeLink) {
        activeLink.style.color = '#FFE66D';
    }
});

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero-image img');
    parallaxElements.forEach(el => {
        const scrollPosition = window.pageYOffset;
        el.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
});

// ===== Form Submission with Animation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formElements = contactForm.querySelectorAll('input, textarea');
        
        // Add submit animation
        formElements.forEach(el => {
            el.style.animation = 'pulse 0.5s ease';
        });

        // Get form values
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', {
            name: formElements[0].value,
            email: formElements[1].value,
            message: formElements[2].value
        });

        // Simulate form submission with visual feedback
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#4ECDC4';
        submitBtn.style.animation = 'heartbeat 0.6s ease';

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.animation = '';
            
            // Reset input animations
            formElements.forEach(el => {
                el.style.animation = '';
            });
        }, 2000);
    });
}

// ===== Button Ripple Effect =====
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remove any existing ripple
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
}

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ===== Smooth Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeInUp 0.8s ease';
});

// ===== Number Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== Stagger Animation on Hover =====
document.querySelectorAll('.destination-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const siblings = this.parentElement.querySelectorAll(
            '.destination-card, .service-card'
        );
        let delay = 0;
        siblings.forEach(sibling => {
            if (sibling !== this) {
                sibling.style.opacity = '0.7';
                sibling.style.transition = 'opacity 0.3s ease';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        const siblings = this.parentElement.querySelectorAll(
            '.destination-card, .service-card'
        );
        siblings.forEach(sibling => {
            sibling.style.opacity = '1';
        });
    });
});

// ===== Add CSS for Ripple Effect =====
const style = document.createElement('style');
style.textContent = `
    .cta-button, .submit-btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Scroll Progress Bar =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
    width: 0%;
    z-index: 999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// ===== Random hover color change for service icons =====
const serviceIcons = document.querySelectorAll('.service-icon');
const colors = ['🌟', '✨', '🎯', '💫', '⭐', '🚀', '🎨', '💎'];

serviceIcons.forEach(icon => {
    const originalContent = icon.textContent;
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'heartbeat 0.6s ease';
    });
});

// ===== Add dynamic date to footer =====
const year = new Date().getFullYear();
const footerBottomText = document.querySelector('.footer-bottom p');
if (footerBottomText) {
    footerBottomText.textContent = `© ${year} TravelMate. All rights reserved.`;
}

// ===== Intersection Observer for Cards with Stagger =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = (index * 0.1) + 's';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.destination-card').forEach(card => {
    card.style.opacity = '0';
    cardObserver.observe(card);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Add touch support for mobile =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - could navigate to next section
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right - could navigate to previous section
    }
}

// ===== Image loading animation =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeInUp 0.6s ease';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
    });
});

// ===== Add focus animations for accessibility =====
document.querySelectorAll('input, textarea, button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = 'none';
        this.style.boxShadow = '0 0 0 3px rgba(78, 205, 196, 0.5)';
    });
    
    element.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
});

console.log('%c✈️ Welcome to TravelMate!', 'font-size: 20px; color: #FF6B6B; font-weight: bold;');
console.log('%cExplore amazing destinations and create unforgettable memories!', 'font-size: 14px; color: #4ECDC4;');
