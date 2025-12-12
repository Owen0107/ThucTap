const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar__menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navbar__link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollPosition = currentScrollPosition;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const chartCanvas = document.getElementById('financeChart');

if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    
    // Create radial gradient for doughnut chart
    const centerX = chartCanvas.width / 2;
    const centerY = chartCanvas.height / 2;
    const radius = Math.min(centerX, centerY);
    
    const gradient1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient1.addColorStop(0, 'rgba(78, 205, 196, 1)');
    gradient1.addColorStop(1, 'rgba(78, 205, 196, 0.6)');
    
    const gradient2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient2.addColorStop(0, 'rgba(26, 43, 78, 1)');
    gradient2.addColorStop(1, 'rgba(26, 43, 78, 0.6)');

    // Calculate totals from the original data
    const revenueTotal = 3200 + 4500 + 3800 + 5200 + 6100 + 5800; // 28600
    const expensesTotal = 2800 + 3200 + 2900 + 3800 + 4200 + 3900; // 20800
    const profit = revenueTotal - expensesTotal; // 7800

    new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Revenue', 'Expenses', 'Profit'],
            datasets: [{
                data: [revenueTotal, expensesTotal, profit],
                backgroundColor: [
                    '#4ECDC4',
                    '#1A2B4E',
                    '#FF6B6B'
                ],
                borderColor: '#FFFFFF',
                borderWidth: 4,
                hoverOffset: 20,
                hoverBorderColor: '#FFFFFF',
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#1A2B4E',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 43, 78, 0.95)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#4ECDC4',
                    borderColor: '#4ECDC4',
                    borderWidth: 2,
                    padding: 16,
                    displayColors: true,
                    titleFont: {
                        size: 15,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return context.label + ': $' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutCubic'
            }
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .story-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

const progressBars = document.querySelectorAll('.progress-bar__fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

const barChartItems = document.querySelectorAll('.bar-chart__bar');

const barChartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar-chart__bar');
            bars.forEach((bar, index) => {
                const targetHeight = bar.style.height;
                bar.style.height = '0';
                setTimeout(() => {
                    bar.style.height = targetHeight;
                }, 100 + (index * 100));
            });
        }
    });
}, observerOptions);

const barChart = document.querySelector('.bar-chart');
if (barChart) {
    barChartObserver.observe(barChart);
}

const sections = document.querySelectorAll('section[id], .hero-section');

function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.id || section.classList.contains('hero-section') ? 'overview' : '';
        
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

window.addEventListener('scroll', highlightActiveNavLink);

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

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

const balanceAmount = document.querySelector('.balance__amount');
if (balanceAmount) {
    const balanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(balanceAmount, 625, 1500, '$', '.00');
                balanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    balanceObserver.observe(balanceAmount);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const mockups = document.querySelector('.hero-section__mockups');
    
    if (mockups && window.innerWidth > 768) {
        const rate = scrolled * 0.1;
        mockups.style.transform = `translateY(${rate}px)`;
    }
});

const loginButton = document.querySelector('.header__login');
if (loginButton) {
    loginButton.addEventListener('click', () => {
        alert('Login functionality would be implemented here');
    });
}

const pricingButtons = document.querySelectorAll('.pricing-card__button');
pricingButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('.pricing-card__name').textContent;
        console.log(`Selected plan: ${planName}`);
        alert(`You selected the ${planName} plan. This would proceed to checkout.`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    highlightActiveNavLink();
    
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
        
        const mockups = document.querySelector('.hero-section__mockups');
        if (mockups && window.innerWidth <= 768) {
            mockups.style.transform = 'none';
        }
    }, 250);
});
