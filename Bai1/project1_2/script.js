const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navRight = document.querySelector('.nav-right');
const header = document.querySelector('.header');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navRight.classList.toggle('active');
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.dashboard-card, .organize-card, .visual-card, .stat-card, .invoice-preview, .solution-card, .step-card, .pricing-card, .review-card').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active,
    .nav-right.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        gap: 16px;
    }
    
    .nav-menu.active {
        top: 72px;
    }
    
    .nav-right.active {
        top: 200px;
        align-items: flex-start;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    
    .header.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
`;
document.head.appendChild(style);

const chartBars = document.querySelectorAll('.mini-chart .bar, .chart-bar .bar-fill');
chartBars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.1}s`;
});

const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => c.style.transform = 'scale(0.98)');
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.08)';
        } else {
            card.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            if (c.classList.contains('featured')) {
                c.style.transform = 'scale(1.05)';
            } else {
                c.style.transform = 'scale(1)';
            }
        });
    });
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = '$' + value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const balanceElement = document.querySelector('.balance-amount');
if (balanceElement) {
    const balanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(balanceElement, 0, 80000, 2000);
                balanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    balanceObserver.observe(balanceElement);
}
