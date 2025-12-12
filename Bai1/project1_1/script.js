const hamburger = document.querySelector('.header__hamburger');
const navMenu = document.querySelector('.header__menu');
const navLinks = document.querySelectorAll('.header__link');
const faqItems = document.querySelectorAll('.faq__item');
const header = document.querySelector('.header');
const signupForm = document.getElementById('signupForm');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    
    if (question && answer) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Đóng tất cả các items khác
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq__question');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                    }
                }
            });
            
            // Toggle item hiện tại
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0px';
            }
        });
    }
});

let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollPosition = currentScrollPosition;
});

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = signupForm.querySelector('.cta__input');
        const email = emailInput.value;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && emailRegex.test(email)) {
            const btn = signupForm.querySelector('.btn');
            const originalText = btn.textContent;
            const originalBg = btn.style.background;
            
            btn.textContent = '✓ Success!';
            btn.style.background = 'linear-gradient(135deg, #00CC00 0%, #009900 100%)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = originalBg;
                signupForm.reset();
            }, 3000);
        } else {
            emailInput.style.borderColor = '#EF4444';
            emailInput.placeholder = 'Please enter a valid email';
            
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.placeholder = 'Enter your email address';
            }, 3000);
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.features__card, .testimonials__card').forEach(card => {
    card.style.animationPlayState = 'paused';
    fadeInObserver.observe(card);
});

const heroChartCanvas = document.getElementById('heroChart');

if (heroChartCanvas) {
    const ctx = heroChartCanvas.getContext('2d');
    
    // Create gradient for bars
    const barGradient = ctx.createLinearGradient(0, 0, 0, 150);
    barGradient.addColorStop(0, 'rgba(0, 255, 0, 0.9)');
    barGradient.addColorStop(1, 'rgba(0, 180, 0, 0.6)');

    new Chart(heroChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Portfolio Value',
                data: [28000, 29500, 28800, 32000, 35000, 33500, 38000, 40000, 39000, 42000, 44000, 45250],
                backgroundColor: barGradient,
                borderColor: '#00FF00',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
                hoverBackgroundColor: '#00FF00',
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#00FF00',
                    borderColor: '#00FF00',
                    borderWidth: 2,
                    padding: 16,
                    displayColors: false,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 16
                    },
                    callbacks: {
                        label: function(context) {
                            return '$' + context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#999999',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(60, 60, 60, 0.3)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#999999',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return '$' + (value / 1000) + 'k';
                        },
                        padding: 8
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        highlightNavLink();
    });
});

const hero = document.querySelector('.hero');

if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.backgroundPositionY = `${rate}px`;
    });
}

function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + Math.round(target).toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

const statValues = document.querySelectorAll('.chart__stat-value');
if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const hasPlus = text.includes('+');
                const hasDollar = text.includes('$');
                
                if (!isNaN(number)) {
                    const prefix = hasDollar ? '$' : (hasPlus ? '+$' : '');
                    animateCounter(entry.target, number, 1500, prefix, '');
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        statsObserver.observe(stat);
    });
}

faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    
    if (question) {
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
            
            if (e.key === 'ArrowDown' && index < faqItems.length - 1) {
                faqItems[index + 1].querySelector('.faq__question').focus();
            }
            
            if (e.key === 'ArrowUp' && index > 0) {
                faqItems[index - 1].querySelector('.faq__question').focus();
            }
        });
    };
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    highlightNavLink();
    
    console.log('FinTrack initialized successfully');
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
        }
        
        if (hero) {
            if (window.innerWidth <= 768) {
                hero.style.backgroundPositionY = '';
            }
        }
    }, 250);
});
