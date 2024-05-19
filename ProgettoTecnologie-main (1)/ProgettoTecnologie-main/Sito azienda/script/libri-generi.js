import { getBooks, deleteBook, createBook } from "../script.js";

const libri = document.getElementById("books");

async function loadBooks() {
    let data = await getBooks();

    data.forEach(bookData => {
        const book = document.createElement("div");
        book.classList.add("book")

        const img = document.createElement("img")
        img.src = "#"
        img.alt = "Immagine del libro"
        book.appendChild(img)

        const desc = document.createElement("div");
        const title = document.createElement("h3")
        title.innerHTML = bookData.title;
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
        btnElimina.value = bookData.id
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
    });
}

loadBooks();