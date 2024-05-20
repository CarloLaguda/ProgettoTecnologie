import { getBooks, deleteBook, createBook, getGenres } from "../script.js";

const libri = document.getElementById("books");
const selectGenere = document.getElementById("selectGenere");
const inputTitle = document.getElementById("title");
const addBook = document.getElementById("addBook");

let idNumber = 0;

function createDivBook(dataTitle, dataId) {
    const book = document.createElement("div");
    book.classList.add("book");

    const img = document.createElement("img");
    img.src = "#";
    img.alt = "Immagine del libro";
    book.appendChild(img);

    const desc = document.createElement("div");
    const title = document.createElement("h3");
    title.innerHTML = dataTitle;
    desc.appendChild(title);
    const description = document.createElement("p");
    description.innerHTML = "Breve desc";
    desc.appendChild(description);
    book.appendChild(desc);

    const stella = document.createElement("div");
    stella.classList.add("stella");
    const btnStella = document.createElement("button");
    btnStella.innerHTML = "Stellina";
    stella.appendChild(btnStella);
    book.appendChild(stella);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const btnModifica = document.createElement("button");
    btnModifica.classList.add("btn");
    btnModifica.innerHTML = "modifica";
    buttons.appendChild(btnModifica);
    const btnElimina = document.createElement("button");
    btnElimina.value = dataId;
    btnElimina.addEventListener("click", async function() {
        try {
            await deleteBook(parseInt(parseInt(this.value)));
            this.parentElement.parentElement.remove();
        } catch (error) {
            console.error('Failed to delete the book:', error);
        }
    });
    btnElimina.classList.add("btn");
    btnElimina.innerHTML = "elimina";
    buttons.appendChild(btnElimina);
    const btnSegnala = document.createElement("button");
    btnSegnala.classList.add("btn");
    btnSegnala.innerHTML = "segnala";
    buttons.appendChild(btnSegnala);
    book.appendChild(buttons);

    libri.appendChild(book);
}

addBook.addEventListener("click", async function() {
    // Controllo valore nullo
    const selectedGenre = selectGenere.options[selectGenere.selectedIndex];
    const selectedValue = selectedGenre.value;
    const titleValue = inputTitle.value.trim();

    if (titleValue === "") {
        alert("Il titolo del libro non può essere vuoto.");
        return;
    }

    let post = {
        id: idNumber,
        title: titleValue,
        price: 24,
        isOut: true,
        isbn: "asdasdasdasdasd",
        genreId: selectedValue,
        shelfId: 1,
        genreName: "string"
    };

    try {
        await createBook(post);
        while (libri.firstChild) {
            libri.removeChild(libri.lastChild);
        }
        loadBooks(titleValue, idNumber);
        idNumber++;
    } catch (error) {
        console.error('Failed to create the book:', error);
    }
    inputTitle.value = "";
});

async function loadBooks() {
    try {
        let data = await getBooks();
        data.forEach(bookData => {
            createDivBook(bookData.title, bookData.id);
        });
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

async function loadGenres() {
    try {
        let data = await getGenres();
        data.forEach(dataGenres => {
            const genre = document.createElement("option");
            genre.value = dataGenres.genreId;
            genre.innerHTML = dataGenres.description;
            selectGenere.appendChild(genre);
        });
    } catch (error) {
        console.error('Failed to load genres:', error);
    }
}

loadBooks();
loadGenres();