// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide for testimonials
    setInterval(() => {
        if (testimonialSlides.length > 0) {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
    }, 5000);
    
    // Animate elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    function checkCounters() {
        statNumbers.forEach(counter => {
            const elementTop = counter.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Initial check
    checkCounters();
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
});




// Additional JavaScript for the new pages

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Project Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project Details
    const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
    const projectDetails = document.querySelectorAll('.project-details');
    const closeDetailsBtns = document.querySelectorAll('.close-details');
    
    if (projectDetailsBtns.length > 0) {
        projectDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project');
                const details = document.getElementById(`${projectId}-details`);
                
                if (details) {
                    details.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    if (closeDetailsBtns.length > 0) {
        closeDetailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const details = btn.closest('.project-details');
                
                if (details) {
                    details.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Close project details when clicking outside
    projectDetails.forEach(details => {
        details.addEventListener('click', (e) => {
            if (e.target === details) {
                details.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For this demo, we'll just show an alert
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});