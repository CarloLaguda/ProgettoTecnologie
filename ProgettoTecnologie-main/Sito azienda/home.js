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
/* area LAGUDA Social*/
const linkLaguda = document.getElementById('ToScocialCarlo')
const imgLaguda = document.getElementById('Image_Carlo')
const socialPNGLaguda = document.getElementById('socialPNGLaguda')
imgLaguda.addEventListener('mouseover', function() {
    imgLaguda.style.transition = "opacity 0.4s ease-in-out"
    imgLaguda.style.opacity = "0.5"
    socialPNGLaguda.style.transition = "transform 0.8s ease-in-out"
    socialPNGLaguda.style.transform = 'translateY(-200px)';
});
socialPNGLaguda.addEventListener('mouseover', function() {
    linkLaguda.href = 'https://www.instagram.com/carlo_laguda/'
})
socialPNGLaguda.addEventListener('mouseout', function() {
    imgLaguda.style.transition = "opacity 0.4s ease-in-out"
    imgLaguda.style.opacity = "1"
    linkLaguda.href = '#'
    socialPNGLaguda.style.transition = "transform 0.8s ease-in-out"
    socialPNGLaguda.style.transform = 'translateY(+200px)';
})

/* area MATTA Social*/
const imgMatta = document.getElementById('Image_Matta')
const linkMatta = document.getElementById('ToScocialMatta')
const socialPNGMatta = document.getElementById('socialPNGMatta')
imgMatta.addEventListener('mouseover', function() {
    imgMatta.style.transition = "opacity 0.4s ease-in-out"
    imgMatta.style.opacity = "0.5"
    socialPNGMatta.style.transition = "transform 0.8s ease-in-out"
    socialPNGMatta.style.transform = 'translateY(-215px)';
});
socialPNGMatta.addEventListener('mouseover', function() {
    linkMatta.href = 'https://www.twitch.tv/bluesaturntv?sr=a'
})
socialPNGMatta.addEventListener('mouseout', function() {
    imgMatta.style.transition = "opacity 0.4s ease-in-out"
    imgMatta.style.opacity = "1"
    linkMatta.href = '#'
    socialPNGMatta.style.transition = "transform 0.8s ease-in-out"
    socialPNGMatta.style.transform = 'translateY(+215px)';
})
/* area MARRO Social*/
const linkMarro = document.getElementById('ToScocialMarro')
const imgMarro = document.getElementById('Image_Marro')
const socialMarro = document.getElementById('socialPNGMarro')
imgMarro.addEventListener('mouseover', function() {
    imgMarro.style.transition = "opacity 0.4s ease-in-out"
    imgMarro.style.opacity = "0.5"
    socialMarro.style.transition = "transform 0.8s ease-in-out"
    socialMarro.style.transform = 'translateY(-215px)';
});
socialMarro.addEventListener('mouseover', function() {
    linkMarro.href = 'https://www.twitch.tv/mr_theghost?sr=a'
})
socialMarro.addEventListener('mouseout', function() {
    imgMarro.style.transition = "opacity 0.4s ease-in-out"
    imgMarro.style.opacity = "1"
    linkMarro.href = '#'
    socialMarro.style.transition = "transform 0.8s ease-in-out"
    socialMarro.style.transform = 'translateY(+215px)';
})
/* area TOCI Social*/
const imgToci = document.getElementById('Image_Toci')
const linkToci = document.getElementById('ToScocialToci')
const socialToci = document.getElementById('socialPNGToci')
imgToci.addEventListener('mouseover', function() {
    imgToci.style.transition = "opacity 0.4s ease-in-out"
    imgToci.style.opacity = "0.5"
    socialToci.style.transition = "transform 0.8s ease-in-out"
    socialToci.style.transform = 'translateY(-187px)';
});
socialToci.addEventListener('mouseover', function() {
    linkToci.href = 'https://www.instagram.com/ili_toci8/'
})
socialToci.addEventListener('mouseout', function() {
    imgToci.style.transition = "opacity 0.4s ease-in-out"
    imgToci.style.opacity = "1"
    linkToci.href = '#'
    socialToci.style.transition = "transform 0.8s ease-in-out"
    socialToci.style.transform = 'translateY(+187px)';
})

const h3_piccioni = document.getElementById('h3_piccioni')
const logo_piccioni = document.getElementById('logo_piccioni')

h3_piccioni.addEventListener('mouseover', function() {
    logo_piccioni.style.transition = "opacity 1.8s ease-in-out"
    logo_piccioni.style.opacity = "1"
    logo_piccioni.style.transition = "transform 1.8s ease-in-out"
    logo_piccioni.style.transform = 'translateX(350px)';
});
h3_piccioni.addEventListener('mouseout', function() {
    logo_piccioni.style.transition = "opacity 1.8s ease-in-out"
    logo_piccioni.style.opacity = "0.3"
    logo_piccioni.style.transition = "transform 1.5s ease-in-out"
    logo_piccioni.style.transform = 'translateX(340px)';
});

const tizi = document.getElementById('tizi')

tizi.addEventListener('click', function(){
    alert('Beta tester di questo fantastico sito, seguitelo su twitch :D https://www.twitch.tv/nominalatom3201')
})
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