document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
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

    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .project-card, .stat-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимаций
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };

            // Здесь можно добавить отправку данных на сервер
            console.log('Form submitted:', formData);
            
            // Очистка формы и показ сообщения об успехе
            this.reset();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        });
    }

    // Мобильное меню
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.nav-container');
    const menu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        nav.insertBefore(mobileMenuBtn, menu);
        menu.style.display = 'none';
    }

    mobileMenuBtn.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.style.display = 'flex';
            if (mobileMenuBtn.parentNode === nav) {
                nav.removeChild(mobileMenuBtn);
            }
        } else {
            if (!nav.contains(mobileMenuBtn)) {
                nav.insertBefore(mobileMenuBtn, menu);
            }
            menu.style.display = 'none';
        }
    });

    // Анимация счетчиков статистики
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Запуск анимации счетчиков при появлении в поле зрения
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const finalValue = parseInt(statNumber.textContent);
                    animateValue(statNumber, 0, finalValue, 2000);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });
});
