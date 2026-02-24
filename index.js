let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("content-image");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }    

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 5000); 
}

document.addEventListener("DOMContentLoaded", () => {
    const countElement = document.getElementById('count');
    const infoRow = document.querySelector('.data-info-row');

    const targetNumber = 133000000;
    const duration = 2000; 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentCount = Math.floor(progress * targetNumber);
                    countElement.innerText = currentCount.toLocaleString('id-ID');
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        countElement.innerText = targetNumber.toLocaleString('id-ID') + "+";
                        if(infoRow) {
                            infoRow.classList.add('reveal');
                        }
                    }
                };       
                window.requestAnimationFrame(step);
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 }); 
    if (countElement) {
        observer.observe(countElement);
    }
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {

        const currentItem = button.parentElement;
        const isOpen = currentItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isOpen) {
            currentItem.classList.add('active');
        }
    });
});