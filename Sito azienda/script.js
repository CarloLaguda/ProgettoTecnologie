let currentIndex = 0;
let intervalId;

document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    boxes.forEach(box => {
        observer.observe(box);
    });
});
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
    intervalId = setInterval(nextSlide, 3000); // Change the interval as needed
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

function changeBackgroundColor(color) {
    const topSection = document.querySelector(".top");
    topSection.style.transition = "background-color 0.9s ease-in-out";
    topSection.style.backgroundColor = color;
}

document.getElementById("b1").addEventListener("click", function() {
    changeBackgroundColor("red");
});

document.getElementById("b2").addEventListener("click", function() {
    changeBackgroundColor("purple");
});

document.getElementById("b3").addEventListener("click", function() {
    changeBackgroundColor("green");
});

document.getElementById("b4").addEventListener("click", function() {
    changeBackgroundColor("blue");
});

function autoChangeColor() {
    const colors = ["red", "purple", "green", "blue"];
    let index = 0;
    
    setInterval(function() {
        changeBackgroundColor(colors[index]);
        index = (index + 1) % colors.length;
    }, 10000);
}

document.querySelector('.settings-btn').addEventListener('click', function(){
    document.getElementById("mySidebar").classList.toggle("open")
});


autoChangeColor();

