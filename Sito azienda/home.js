import { getBooks } from "./script.js"

let currentIndex = 0;
let intervalId;

const catalogo = document.getElementsByClassName("scorri-libri")[0]
const oggetto = document.getElementById("oggettoValue")
const bugBtn1 = document.getElementsByClassName("scroll-to-bottom")[0]
const bugBtn2 = document.getElementsByClassName("scroll-to-bottom")[1]


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
    }, 12000);
}


document.querySelector('.settings-btn').addEventListener('click', function(){
    document.getElementById("mySidebar").classList.toggle("open")
});


autoChangeImage();

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

document.querySelectorAll('.scroll-to-bottom')[0].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.scroll-to-bottom')[1].addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
});

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

window.addEventListener('scroll', function() {
    console.log(this.window.scrollY)
    const navbar = document.getElementsByTagName("header")[0];
    if (this.window.scrollY > 1000) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  bugBtn1.addEventListener("click", function(){
    oggetto.value = "Voglio segnalare un bug"
  })

  bugBtn2.addEventListener("click", function(){
    oggetto.value = "Voglio segnalare un contenuto inappropriato"
  })

  const textColorPairs = [
    { text: "[0x9] [0MN1]", color: "yellow", tryHackMeVisible: false },
    { text: "[0x9] [OMNI]", color: "green", tryHackMeVisible: true }
  ];
  
  const textContainer = document.getElementById("text-container").querySelector("p");
  const tryHackMeContainer = document.getElementById("tryhackme");

  let index = 0;
  
  function changeTextAndColor() {

    const currentPair = textColorPairs[index];
  
    textContainer.textContent = currentPair.text;
    textContainer.style.color = currentPair.color;
  
    tryHackMeContainer.style.display = currentPair.tryHackMeVisible ? 'block' : 'none';
  
    index = (index + 1) % textColorPairs.length;
  }
  
  changeTextAndColor();

  setInterval(changeTextAndColor, 4000);