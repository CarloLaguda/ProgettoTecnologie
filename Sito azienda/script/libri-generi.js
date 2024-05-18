import { getBooks, deleteBook, createBook, getGenres } from "../script.js";

const libri = document.getElementById("books");
const selectGenere = document.getElementById("selectGenere") 
const inputTitle = document.getElementById("title")
const addBook = document.getElementById("addBook")

let idNumber = 0;

function createDivBook(dataTitle, dataId){
    const book = document.createElement("div");
        book.classList.add("book")

        const img = document.createElement("img")
        img.src = "#"
        img.alt = "Immagine del libro"
        book.appendChild(img)

        const desc = document.createElement("div");
        const title = document.createElement("h3")
        title.innerHTML = dataTitle;
        desc.appendChild(title)
        const description = document.createElement("p")
        description.innerHTML = "Breve desc"
        desc.appendChild(description)
        book.appendChild(desc)

        const stella = document.createElement("div")
        stella.classList.add("stella")
        const btnStella = document.createElement("button")
        btnStella.innerHTML = "Stellina"
        stella.appendChild(btnStella)
        book.appendChild(stella)

        const buttons = document.createElement("div")
        buttons.classList.add("buttons")
        const btnModifica = document.createElement("button")
        btnModifica.classList.add("btn")
        btnModifica.innerHTML = "modifica"
        buttons.appendChild(btnModifica)
        const btnElimina = document.createElement("button")
        btnElimina.value = dataId
        btnElimina.addEventListener("click", function(){
            deleteBook(parseInt(this.value))
            this.parentElement.parentElement.remove()
        })
        btnElimina.classList.add("btn")
        btnElimina.innerHTML = "elimina"
        buttons.appendChild(btnElimina)
        const btnSegnala = document.createElement("button")
        btnSegnala.classList.add("btn")
        btnSegnala.innerHTML = "segnala"
        buttons.appendChild(btnSegnala)
        book.appendChild(buttons)

        libri.appendChild(book);
}

addBook.addEventListener("click", async function(){
    await createBook(inputTitle.value, selectGenere.options[selectGenere.selectedIndex].text, idNumber)

    createBook(inputTitle.value, idNumber)

    idNumber++
})

async function loadBooks() {
    let data = await getBooks();

    data.forEach(bookData => {
        createDivBook(bookData.title, bookData.id)
    });
}

loadBooks();

async function loadGenres(){
    let data = await getGenres()

    data.forEach(dataGenres => {
        const genre = document.createElement("option")
        genre.innerHTML = dataGenres.description
        selectGenere.appendChild(genre)
    })
}

loadGenres()