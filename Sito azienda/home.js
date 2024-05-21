import { getBooks } from "./script.js"

let currentIndex = 0;
let intervalId;

const catalogo = document.getElementsByClassName("scorri-libri")[0]
const oggetto = document.getElementById("oggettoValue")

document.addEventListener("DOMContentLoaded", function () {
    const bookes = document.querySelectorAll('.book');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    bookes.forEach(book => {
        observer.observe(book);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const bookes = document.querySelectorAll('.book');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    bookes.forEach(book => {
        observer.observe(book);
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
    intervalId = setInterval(nextSlide, 3000); // Cambia l'intervallo se necessario
}

function stopCarousel() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
    startCarousel();
    document.querySelector('.carousel-container').addEventListener('mouseenter', stopCarousel);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startCarousel);
    showSlide(currentIndex);
    loadCatalogo()
});
function changeBackgroundImage(imageUrl) {
    const topSection = document.querySelector(".top");
    topSection.style.transition = "background-image 0.9s ease-in-out";
    topSection.style.backgroundImage = `url(${imageUrl})`;
    topSection.style.backgroundSize = 'cover'; // Per coprire l'intera sezione
    topSection.style.backgroundPosition = 'center'; // Per centrare l'immagine
}

document.getElementById("b1").addEventListener("click", function() {
    changeBackgroundImage("IMG/granburrone.jpg");
});

document.getElementById("b2").addEventListener("click", function() {
    changeBackgroundImage("IMG/mappa.jpg");
});

document.getElementById("b3").addEventListener("click", function() {
    changeBackgroundImage("IMG/the-lord-of-the-rings.jpg");
});

document.getElementById("b4").addEventListener("click", function() {
    changeBackgroundImage("IMG/montagnasolitaria.jpg");
});

function autoChangeImage() {
    const images = ["IMG/granburrone.jpg", "IMG/mappa.jpg", "IMG/the-lord-of-the-rings.jpg", "IMG/montagnasolitaria.jpg"];
    let index = 0;
    
    setInterval(function() {
        changeBackgroundImage(images[index]);
        index = (index + 1) % images.length;
    }, 10000);
}


document.querySelector('.settings-btn').addEventListener('click', function(){
    document.getElementById("mySidebar").classList.toggle("open")
});


autoChangeColor();

async function loadCatalogo(){
    const bookData = await getBooks()
    bookData.forEach(data => {
        const libro = document.createElement("div")
        libro.classList.add("libroCatalogo")

        const titolo = document.createElement("h3")
        titolo.innerHTML = data.title
        libro.appendChild(titolo)

        catalogo.appendChild(libro)
    })
}

document.getElementById("tizzi").addEventListener("click", function(){
    alert("cupardo gay")
})

document.querySelectorAll('.scroll-to-bottom')[0].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.scroll-to-bottom')[1].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btnDeveloper').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementsById('about').scrollIntoView({ behavior: 'smooth' });
});