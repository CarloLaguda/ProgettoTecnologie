import { getBooks, deleteBook, createBook } from "../script.js";

const libri = document.getElementById("libri");

async function loadBooks() {
    let data = await getBooks();

    data.forEach(bookData => {
        const book = document.createElement("div");
        const title = document.createElement("h3");
        title.innerHTML = bookData.title;

        const genere = document.createElement("h4");
        genere.innerHTML = bookData.genreName;

        const prezzo = document.createElement("h4");
        prezzo.innerHTML = bookData.price;

        book.appendChild(title);
        book.appendChild(genere);
        book.appendChild(prezzo);

        libri.appendChild(book); 
    });
}

loadBooks();