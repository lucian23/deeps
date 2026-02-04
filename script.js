// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 1)';
    } else {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-card, .record-card, .fact-card, .technique-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Calculator function for 800m pace splits
function calculateSplits() {
    const targetTime = parseFloat(document.getElementById('targetTime').value);
    const resultsDiv = document.getElementById('results');
    
    if (!targetTime || targetTime < 90 || targetTime > 300) {
        resultsDiv.innerHTML = '<p style="color: #e74c3c; font-weight: bold;">Te rog introdu un timp valid între 90 și 300 de secunde (1:30 - 5:00).</p>';
        resultsDiv.classList.add('show');
        return;
    }
    
    // Calculate splits
    const split100 = (targetTime / 8).toFixed(2);
    const split200 = (targetTime / 4).toFixed(2);
    const split400 = (targetTime / 2).toFixed(2);
    const split600 = (targetTime * 0.75).toFixed(2);
    
    // Format time function
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(2);
        return `${mins}:${secs.padStart(5, '0')}`;
    }
    
    // Calculate pace per 100m
    const pacePerHundred = (targetTime / 8).toFixed(2);
    
    // Display results
    resultsDiv.innerHTML = `
        <h3>Timpii Intermediari pentru ${formatTime(targetTime)}</h3>
        <div class="split-time">
            <span><strong>100m:</strong></span>
            <span>${formatTime(split100)}</span>
        </div>
        <div class="split-time">
            <span><strong>200m:</strong></span>
            <span>${formatTime(split200)}</span>
        </div>
        <div class="split-time">
            <span><strong>400m (1 tură):</strong></span>
            <span>${formatTime(split400)}</span>
        </div>
        <div class="split-time">
            <span><strong>600m:</strong></span>
            <span>${formatTime(split600)}</span>
        </div>
        <div class="split-time">
            <span><strong>800m (Final):</strong></span>
            <span>${formatTime(targetTime)}</span>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: white; border-radius: 5px; border-left: 3px solid #f39c12;">
            <strong>Ritm mediu:</strong> ${pacePerHundred}s per 100m
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-radius: 5px; font-size: 0.9rem;">
            <strong>💡 Sfat:</strong> Încearcă să menții un ritm constant! Diferența între cele două tururi nu ar trebui să depășească 3-4 secunde pentru o cursă optimă.
        </div>
    `;
    
    resultsDiv.classList.add('show');
    
    // Smooth scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add enter key support for calculator
document.addEventListener('DOMContentLoaded', function() {
    const targetTimeInput = document.getElementById('targetTime');
    if (targetTimeInput) {
        targetTimeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateSplits();
            }
        });
    }
});

// Runner animation speed variation
document.addEventListener('DOMContentLoaded', function() {
    const runner = document.getElementById('runner');
    if (runner) {
        // Add random speed variations to make it more dynamic
        setInterval(() => {
            const randomDuration = 6 + Math.random() * 4; // Between 6-10 seconds
            runner.style.animationDuration = `${randomDuration}s`;
        }, 8000);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Counter animation for record times
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        element.innerHTML = value.toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animation when records section is visible
const recordsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const recordTimes = entry.target.querySelectorAll('.record-time');
            recordTimes.forEach(timeElement => {
                const timeText = timeElement.textContent;
                const timeValue = parseFloat(timeText.replace(':', ''));
                if (!timeElement.dataset.animated) {
                    timeElement.dataset.animated = 'true';
                    // Simple fade in effect instead of counter for formatted time
                    timeElement.style.opacity = '0';
                    setTimeout(() => {
                        timeElement.style.transition = 'opacity 1s ease';
                        timeElement.style.opacity = '1';
                    }, 100);
                }
            });
            recordsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const recordsSection = document.querySelector('.records');
    if (recordsSection) {
        recordsObserver.observe(recordsSection);
    }
});

// Add hover effect sound (optional - commented out by default)
/*
document.querySelectorAll('.about-card, .fact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // You can add sound effects here if desired
        console.log('Card hovered');
    });
});
*/

// Progress bar animation on scroll
const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar && !progressBar.dataset.animated) {
                progressBar.dataset.animated = 'true';
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease';
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const techniqueItems = document.querySelectorAll('.technique-item');
    techniqueItems.forEach(item => {
        progressObserver.observe(item);
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

console.log('🏃 Site 800m Atletism încărcat cu succes!');
