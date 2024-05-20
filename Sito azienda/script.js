let currentIndex = 0;
let intervalId;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const newTransform = -currentIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${newTransform}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function startCarousel() {
    intervalId = setInterval(nextSlide, 9000); // Change image every 10 seconds
}

function stopCarousel() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
    startCarousel();
    document.querySelector('.carousel-container').addEventListener('mouseenter', stopCarousel);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startCarousel);
    showSlide(currentIndex);
});